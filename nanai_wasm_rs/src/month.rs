use js_sys::{Array, Promise};
use std::collections::HashMap;
use std::sync::LazyLock;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::types::{JsError, Language, Month, MonthError};

// 月名のデータを一箇所に集約
// LazyLockを使用して初期化時のコストを削減
static MONTH_NAMES: LazyLock<HashMap<Language, [&'static str; 12]>> = LazyLock::new(|| {
    let mut map = HashMap::new();
    map.insert(
        Language::Japanese,
        [
            "睦月",
            "如月",
            "弥生",
            "卯月",
            "皐月",
            "水無月",
            "文月",
            "葉月",
            "長月",
            "神無月",
            "霜月",
            "師走",
        ],
    );
    map.insert(
        Language::English,
        [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    );
    map.insert(
        Language::Ukrainian,
        [
            "Січень",
            "Лютий",
            "Березень",
            "Квітень",
            "Травень",
            "Червень",
            "Липень",
            "Серпень",
            "Вересень",
            "Жовтень",
            "Листопад",
            "Грудень",
        ],
    );
    map.insert(
        Language::UkrainianAlphabet,
        [
            "si-chen",
            "lu-tyi",
            "be-re-zen",
            "kvi-ten",
            "tra-vehn",
            "cher-vehn",
            "ly-pehn",
            "ser-pehn",
            "ve-re-sehn",
            "zhov-tehn",
            "lys-to-pad",
            "hru-dehn",
        ],
    );
    map.insert(
        Language::Swedish,
        [
            "Januari",
            "Februari",
            "Mars",
            "April",
            "Maj",
            "Juni",
            "Juli",
            "Augusti",
            "September",
            "Oktober",
            "November",
            "December",
        ],
    );
    map.insert(
        Language::Finnish,
        [
            "Tammikuu",
            "Helmikuu",
            "Maaliskuu",
            "Huhtikuu",
            "Toukokuu",
            "Kesäkuu",
            "Heinäkuu",
            "Elokuu",
            "Syyskuu",
            "Lokakuu",
            "Marraskuu",
            "Joulukuu",
        ],
    );
    map
});

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
