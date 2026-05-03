use js_sys::{Array, Promise};
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::month_names::MONTH_NAMES;
use crate::types::{JsError, Language, Month, MonthError};

// 内部関数：月名を取得する共通ロジック
// テストで使用するためにpub(crate)にします
pub(crate) fn get_month_name_internal(
    month: Month,
    language: Language,
) -> Result<String, MonthError> {
    let month_names = MONTH_NAMES
        .get(&language)
        .ok_or_else(|| MonthError::UnsupportedLanguage(language.to_string()))?;

    Ok(month_names[month as usize].to_string())
}

// 現在の月を返す関数
// 空の引数リストを明示的に指定することでABI互換性を確保
#[wasm_bindgen(js_name = get_current_month)]
pub fn get_current_month() -> usize {
    Month::current() as usize
}

// 共通の月名取得関数 - 指定された言語で月名を返す
#[wasm_bindgen(js_name = get_month_name)]
pub fn get_month_name(month_index: usize, language_code: &str) -> Result<String, JsError> {
    let month = Month::from_index(month_index).map_err(JsError::from)?;

    let language = match language_code {
        "ja" => Language::Japanese,
        "en" => Language::English,
        "uk" => Language::Ukrainian,
        "uk-latin" => Language::UkrainianAlphabet,
        "sv" => Language::Swedish,
        "fi" => Language::Finnish,
        "pl" => Language::Polish,
        "cs" => Language::Czech,
        "sk" => Language::Slovak,
        "lt" => Language::Lithuanian,
        "lv" => Language::Latvian,
        "et" => Language::Estonian,
        _ => {
            return Err(JsError::new(format!(
                "Unsupported language code: {language_code}"
            )));
        }
    };

    get_month_name_internal(month, language).map_err(JsError::from)
}

// 非同期版の月名取得関数 - PromiseをJavaScriptに返す
#[wasm_bindgen(js_name = get_month_name_async)]
pub fn get_month_name_async(month_index: usize, language_code: &str) -> Promise {
    let language_code = language_code.to_string(); // クロージャにmoveするためにString化

    future_to_promise(async move {
        match get_month_name(month_index, &language_code) {
            Ok(name) => Ok(JsValue::from_str(&name)),
            Err(js_error) => Err(JsValue::from(js_error)),
        }
    })
}

// すべての言語で月名を一度に取得
#[wasm_bindgen(js_name = get_month_names_all)]
pub fn get_month_names_all(month_index: usize) -> Result<JsValue, JsError> {
    let month = Month::from_index(month_index).map_err(JsError::from)?;

    let result = Array::new();

    for language in &[
        Language::Japanese,
        Language::English,
        Language::Ukrainian,
        Language::UkrainianAlphabet,
        Language::Swedish,
        Language::Finnish,
        Language::Polish,
        Language::Czech,
        Language::Slovak,
        Language::Lithuanian,
        Language::Latvian,
        Language::Estonian,
    ] {
        let name = get_month_name_internal(month, *language).map_err(JsError::from)?;
        result.push(&JsValue::from_str(&name));
    }

    Ok(result.into())
}

// 以下は後方互換性のための関数
#[wasm_bindgen(js_name = get_japanese_month_name)]
pub fn get_japanese_month_name(month_index: usize) -> String {
    get_month_name(month_index, "ja").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_english_month_name)]
pub fn get_english_month_name(month_index: usize) -> String {
    get_month_name(month_index, "en").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_ukrainian_month_name)]
pub fn get_ukrainian_month_name(month_index: usize) -> String {
    get_month_name(month_index, "uk").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_ukrainian_alphabet_month_name)]
pub fn get_ukrainian_alphabet_month_name(month_index: usize) -> String {
    get_month_name(month_index, "uk-latin").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_swedish_month_name)]
pub fn get_swedish_month_name(month_index: usize) -> String {
    get_month_name(month_index, "sv").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_suomi_month_name)]
pub fn get_suomi_month_name(month_index: usize) -> String {
    get_month_name(month_index, "fi").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_polish_month_name)]
pub fn get_polish_month_name(month_index: usize) -> String {
    get_month_name(month_index, "pl").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_czech_month_name)]
pub fn get_czech_month_name(month_index: usize) -> String {
    get_month_name(month_index, "cs").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_slovak_month_name)]
pub fn get_slovak_month_name(month_index: usize) -> String {
    get_month_name(month_index, "sk").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_lithuanian_month_name)]
pub fn get_lithuanian_month_name(month_index: usize) -> String {
    get_month_name(month_index, "lt").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_latvian_month_name)]
pub fn get_latvian_month_name(month_index: usize) -> String {
    get_month_name(month_index, "lv").unwrap_or_else(|_| String::from("Error"))
}

#[wasm_bindgen(js_name = get_estonian_month_name)]
pub fn get_estonian_month_name(month_index: usize) -> String {
    get_month_name(month_index, "et").unwrap_or_else(|_| String::from("Error"))
}
