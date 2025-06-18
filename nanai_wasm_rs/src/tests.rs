// 月名機能のテスト
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
    assert_eq!(
        get_month_name_internal(Month::March, Language::Polish).unwrap(),
        "Marzec"
    );
    assert_eq!(
        get_month_name_internal(Month::September, Language::Czech).unwrap(),
        "Září"
    );
    assert_eq!(
        get_month_name_internal(Month::May, Language::Lithuanian).unwrap(),
        "Gegužė"
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
