mod month;

// month.rsモジュールの関数を公開
pub use month::{
    get_current_month,
    get_japanese_month_name,
    get_english_month_name,
    get_ukrainian_month_name,
    get_ukrainian_alphabet_month_name,
    get_swedish_month_name,
    get_suomi_month_name,
};
<<<<<<< HEAD
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
>>>>>>> a480072 (ok not exe)
