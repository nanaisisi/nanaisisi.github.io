<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 8f79a68 (ok)
=======
>>>>>>> ad04ae0 (ok)
<<<<<<< HEAD
mod config;
>>>>>>> 88effcf (ok)
mod month;
<<<<<<< HEAD
=======
mod month_names;
mod types;

// 型を公開
pub use types::{JsError, Language, Month, MonthError};
>>>>>>> 23ec7fa (ok)

// month.rsモジュールの関数を公開
pub use month::{
    get_current_month,
<<<<<<< HEAD
    get_japanese_month_name,
    get_english_month_name,
    get_ukrainian_month_name,
    get_ukrainian_alphabet_month_name,
    get_swedish_month_name,
    get_suomi_month_name,
=======
    get_czech_month_name,
    get_english_month_name,
    get_estonian_month_name,
    get_japanese_month_name,
    get_latvian_month_name,
    get_lithuanian_month_name,
    // 新しい関数
    get_month_name,
    get_month_name_async,
    get_month_names_all,
    // 新しい言語の関数
    get_polish_month_name,
    get_slovak_month_name,
    get_suomi_month_name,
    get_swedish_month_name,
    get_ukrainian_alphabet_month_name,
    get_ukrainian_month_name,
>>>>>>> 23ec7fa (ok)
};
<<<<<<< HEAD
=======

// テスト用のモジュール
#[cfg(test)]
<<<<<<< HEAD
mod tests {
    use crate::types::{Language, Month};

    #[test]
    fn test_month_from_index() {
        assert_eq!(Month::from_index(0).unwrap(), Month::January);
        assert_eq!(Month::from_index(11).unwrap(), Month::December);

        // 12で割った余りを使用しているため、範囲外の値でもエラーにならない
        assert_eq!(Month::from_index(12).unwrap(), Month::January);
        assert_eq!(Month::from_index(13).unwrap(), Month::February);
    }

    #[test]
    fn test_get_month_name_internal() {
        use crate::month::get_month_name_internal;

        assert_eq!(
            get_month_name_internal(Month::January, Language::Japanese).unwrap(),
            "睦月"
        );
        assert_eq!(
            get_month_name_internal(Month::June, Language::English).unwrap(),
            "June"
        );
        assert_eq!(
            get_month_name_internal(Month::December, Language::Finnish).unwrap(),
            "Joulukuu"
        );
    }

    // HTMLからの呼び出しをシミュレートするテスト
    #[cfg(target_arch = "wasm32")]
    mod wasm_interface_tests {
        use crate::month::*;
        use wasm_bindgen_test::*;

        wasm_bindgen_test_configure!(run_in_browser);

        #[wasm_bindgen_test]
        fn test_get_current_month_interface() {
            let current = get_current_month();
            assert!(
                current <= 11,
                "月のインデックスは0-11の範囲内である必要があります"
            );
        }

        #[wasm_bindgen_test]
        fn test_get_month_name_interface() {
            // 日本語テスト
            let result = get_month_name(0, "ja");
            assert!(result.is_ok());
            assert_eq!(result.unwrap(), "睦月");

            // 英語テスト
            let result = get_month_name(5, "en");
            assert!(result.is_ok());
            assert_eq!(result.unwrap(), "June");

            // 新しい言語のテスト
            let result = get_month_name(2, "pl");
            assert!(result.is_ok());
            assert_eq!(result.unwrap(), "Marzec");

            // 無効な言語コードのテスト
            let result = get_month_name(0, "invalid");
            assert!(result.is_err());
        }

        #[wasm_bindgen_test]
        fn test_all_individual_month_functions() {
            // 各言語の個別関数をテスト
            assert_eq!(get_japanese_month_name(0), "睦月");
            assert_eq!(get_english_month_name(0), "January");
            assert_eq!(get_ukrainian_month_name(0), "Січень");
            assert_eq!(get_ukrainian_alphabet_month_name(0), "si-chen");
            assert_eq!(get_swedish_month_name(0), "Januari");
            assert_eq!(get_suomi_month_name(0), "Tammikuu");
            assert_eq!(get_polish_month_name(0), "Styczeń");
            assert_eq!(get_czech_month_name(0), "Leden");
            assert_eq!(get_slovak_month_name(0), "Január");
            assert_eq!(get_lithuanian_month_name(0), "Sausis");
            assert_eq!(get_latvian_month_name(0), "Janvāris");
            assert_eq!(get_estonian_month_name(0), "Jaanuar");
        }

        #[wasm_bindgen_test]
        async fn test_get_month_name_async_interface() {
            use wasm_bindgen_futures::JsFuture;

            let promise = get_month_name_async(0, "ja");
            let result = JsFuture::from(promise).await;
            assert!(result.is_ok());

            let js_value = result.unwrap();
            let result_str = js_value.as_string().unwrap();
            assert_eq!(result_str, "睦月");
        }

        #[wasm_bindgen_test]
        fn test_get_month_names_all_interface() {
            let result = get_month_names_all(0);
            assert!(result.is_ok());

            let js_value = result.unwrap();
            let array: js_sys::Array = js_value.into();
            assert_eq!(array.length(), 12); // 12言語分

            // 最初の要素（日本語）をチェック
            let first_element = array.get(0);
            assert_eq!(first_element.as_string().unwrap(), "睦月");
        }
    }

    // 非WASM環境でのテスト（通常のcargo test用）
    #[cfg(not(target_arch = "wasm32"))]
    mod native_tests {
        use crate::month::*;

        #[test]
        fn test_all_languages_all_months() {
            // 全ての言語で全ての月をテスト
            let languages = vec![
                ("ja", "Japanese"),
                ("en", "English"),
                ("uk", "Ukrainian"),
                ("uk-latin", "Ukrainian Alphabet"),
                ("sv", "Swedish"),
                ("fi", "Finnish"),
                ("pl", "Polish"),
                ("cs", "Czech"),
                ("sk", "Slovak"),
                ("lt", "Lithuanian"),
                ("lv", "Latvian"),
                ("et", "Estonian"),
            ];

            for (lang_code, lang_name) in languages {
                for month in 0..12 {
                    let result = get_month_name(month, lang_code);
                    assert!(
                        result.is_ok(),
                        "{}の{}月の取得に失敗しました: {:?}",
                        lang_name,
                        month + 1,
                        result.err()
                    );

                    let month_name = result.unwrap();
                    assert!(
                        !month_name.is_empty(),
                        "{}の{}月の名前が空です",
                        lang_name,
                        month + 1
                    );
                }
            }
        }

        #[test]
        fn test_individual_functions_consistency() {
            // 個別関数とget_month_name関数の一貫性をテスト
            for month in 0..12 {
                assert_eq!(
                    get_japanese_month_name(month),
                    get_month_name(month, "ja").unwrap()
                );
                assert_eq!(
                    get_english_month_name(month),
                    get_month_name(month, "en").unwrap()
                );
                assert_eq!(
                    get_polish_month_name(month),
                    get_month_name(month, "pl").unwrap()
                );
                assert_eq!(
                    get_czech_month_name(month),
                    get_month_name(month, "cs").unwrap()
                );
                assert_eq!(
                    get_slovak_month_name(month),
                    get_month_name(month, "sk").unwrap()
                );
                assert_eq!(
                    get_lithuanian_month_name(month),
                    get_month_name(month, "lt").unwrap()
                );
                assert_eq!(
                    get_latvian_month_name(month),
                    get_month_name(month, "lv").unwrap()
                );
                assert_eq!(
                    get_estonian_month_name(month),
                    get_month_name(month, "et").unwrap()
                );
            }
        }

        #[test]
        fn test_error_handling() {
            // 無効な言語コードのテスト
            let result = get_month_name(0, "invalid_lang");
            assert!(result.is_err());

            // 範囲外の月インデックス（12で割った余りを使用するのでエラーにならない）
            let result = get_month_name(15, "ja");
            assert!(result.is_ok());
            // 15 % 12 = 3なので、4月（0ベース）
            assert_eq!(result.unwrap(), "卯月");
        }

        #[test]
        fn test_month_boundary_cases() {
            // 境界値のテスト
            assert!(get_month_name(0, "ja").is_ok()); // 最小値
            assert!(get_month_name(11, "ja").is_ok()); // 最大値
            assert!(get_month_name(12, "ja").is_ok()); // 12 % 12 = 0
            assert!(get_month_name(1000, "ja").is_ok()); // 大きな値
        }
    }
}
>>>>>>> a480072 (ok not exe)
=======
mod tests;
<<<<<<< HEAD
>>>>>>> 38a284e (ok perhaps)
=======
=======
use wasm_bindgen::prelude::*;

// 現在の月を返す関数
#[wasm_bindgen]
pub fn get_current_month() -> usize {
    let date = js_sys::Date::new_0();
    date.get_month() as usize
}

// 月名を返す関数群
#[wasm_bindgen]
pub fn get_japanese_month_name(month_index: usize) -> String {
    let japanese_month_names = [
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
    ];
    japanese_month_names[month_index % 12].to_string()
}

#[wasm_bindgen]
pub fn get_english_month_name(month_index: usize) -> String {
    let english_month_names = [
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
    ];
    english_month_names[month_index % 12].to_string()
}

#[wasm_bindgen]
pub fn get_ukrainian_month_name(month_index: usize) -> String {
    let ukrainian_month_names = [
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
    ];
    ukrainian_month_names[month_index % 12].to_string()
}

#[wasm_bindgen]
pub fn get_ukrainian_alphabet_month_name(month_index: usize) -> String {
    let ukrainian_alphabet_month_names = [
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
    ];
    ukrainian_alphabet_month_names[month_index % 12].to_string()
}

#[wasm_bindgen]
pub fn get_swedish_month_name(month_index: usize) -> String {
    let swedish_month_names = [
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
    ];
    swedish_month_names[month_index % 12].to_string()
}

#[wasm_bindgen]
pub fn get_suomi_month_name(month_index: usize) -> String {
    let suomi_month_names = [
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
    ];
    suomi_month_names[month_index % 12].to_string()
}
>>>>>>> f57d49c (yet)
<<<<<<< HEAD
>>>>>>> 88effcf (ok)
=======
=======
mod month;
mod types;

// 型を公開
pub use types::{JsError, Language, Month, MonthError};

=======
mod month;

>>>>>>> 7a89e13 (cng)
// month.rsモジュールの関数を公開
#[cfg(target_arch = "wasm32")]
pub use month::{
    // 従来の関数
    get_current_month,
    get_english_month_name,
    get_japanese_month_name,
    // 新しい関数
    get_month_name,
    get_month_name_async,
    get_month_names_all,
    get_suomi_month_name,

    get_swedish_month_name,
    get_ukrainian_alphabet_month_name,
    get_ukrainian_month_name,
};
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> aeb1588 (cng)
<<<<<<< HEAD
>>>>>>> 8f79a68 (ok)
=======
=======
>>>>>>> 7a89e13 (cng)
<<<<<<< HEAD
>>>>>>> ad04ae0 (ok)
=======
=======

// テスト用のモジュール
#[cfg(test)]
mod tests {
    use crate::types::{Language, Month};

    #[test]
    fn test_month_from_index() {
        assert_eq!(Month::from_index(0).unwrap(), Month::January);
        assert_eq!(Month::from_index(11).unwrap(), Month::December);

        // 12で割った余りを使用しているため、範囲外の値でもエラーにならない
        assert_eq!(Month::from_index(12).unwrap(), Month::January);
        assert_eq!(Month::from_index(13).unwrap(), Month::February);
    }

    #[test]
    fn test_get_month_name_internal() {
        use crate::month::get_month_name_internal;

        assert_eq!(
            get_month_name_internal(Month::January, Language::Japanese).unwrap(),
            "睦月"
        );
        assert_eq!(
            get_month_name_internal(Month::June, Language::English).unwrap(),
            "June"
        );
        assert_eq!(
            get_month_name_internal(Month::December, Language::Finnish).unwrap(),
            "Joulukuu"
        );
    }
}
>>>>>>> 69d9913 (yet)
>>>>>>> 906146a (yet menu css)
