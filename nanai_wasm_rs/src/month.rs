use wasm_bindgen::prelude::*;

// 現在の月を返す関数
#[wasm_bindgen]
pub fn get_current_month() -> usize {
    let date = js_sys::Date::new_0();
    date.get_month() as usize
}

// 日本語の月名を返す関数
#[wasm_bindgen]
pub fn get_japanese_month_name(month_index: usize) -> String {
    let japanese_month_names = [
        "睦月", "如月", "弥生", "卯月", "皐月", "水無月",
        "文月", "葉月", "長月", "神無月", "霜月", "師走",
    ];
    japanese_month_names[month_index % 12].to_string()
}

// 英語の月名を返す関数
#[wasm_bindgen]
pub fn get_english_month_name(month_index: usize) -> String {
    let english_month_names = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    english_month_names[month_index % 12].to_string()
}

// ウクライナ語の月名を返す関数
#[wasm_bindgen]
pub fn get_ukrainian_month_name(month_index: usize) -> String {
    let ukrainian_month_names = [
        "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
    ];
    ukrainian_month_names[month_index % 12].to_string()
}

// ウクライナ語の月名（アルファベット表記）を返す関数
#[wasm_bindgen]
pub fn get_ukrainian_alphabet_month_name(month_index: usize) -> String {
    let ukrainian_alphabet_month_names = [
        "si-chen", "lu-tyi", "be-re-zen", "kvi-ten", "tra-vehn", "cher-vehn",
        "ly-pehn", "ser-pehn", "ve-re-sehn", "zhov-tehn", "lys-to-pad", "hru-dehn",
    ];
    ukrainian_alphabet_month_names[month_index % 12].to_string()
}

// スウェーデン語の月名を返す関数
#[wasm_bindgen]
pub fn get_swedish_month_name(month_index: usize) -> String {
    let swedish_month_names = [
        "Januari", "Februari", "Mars", "April", "Maj", "Juni",
        "Juli", "Augusti", "September", "Oktober", "November", "December",
    ];
    swedish_month_names[month_index % 12].to_string()
}

// フィンランド語の月名を返す関数
#[wasm_bindgen]
pub fn get_suomi_month_name(month_index: usize) -> String {
    let suomi_month_names = [
        "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
        "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu",
    ];
    suomi_month_names[month_index % 12].to_string()
}