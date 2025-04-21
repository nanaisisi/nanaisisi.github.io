use std::fmt;
use thiserror::Error;
use wasm_bindgen::prelude::*;

/// 月を表す列挙型
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Month {
    January = 0,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

impl Month {
    /// 月のインデックス（0〜11）から Month を作成
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2c21a2e (yet)
    ///
    /// # Errors
    ///
    /// インデックスが無効な場合に`MonthError::InvalidMonthIndex`を返します。
    /// ただし、現在の実装では12以上のインデックスを渡した場合は12で割った余りを使用するため、
    /// エラーは発生しません。
<<<<<<< HEAD
=======
>>>>>>> 69d9913 (yet)
=======
>>>>>>> 2c21a2e (yet)
    pub fn from_index(index: usize) -> Result<Self, MonthError> {
        match index % 12 {
            0 => Ok(Self::January),
            1 => Ok(Self::February),
            2 => Ok(Self::March),
            3 => Ok(Self::April),
            4 => Ok(Self::May),
            5 => Ok(Self::June),
            6 => Ok(Self::July),
            7 => Ok(Self::August),
            8 => Ok(Self::September),
            9 => Ok(Self::October),
            10 => Ok(Self::November),
            11 => Ok(Self::December),
            _ => Err(MonthError::InvalidMonthIndex(index)),
        }
    }

    /// 現在の月を取得
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2c21a2e (yet)
    ///
    /// # Panics
    ///
    /// この関数は`js_sys::Date`から取得した月のインデックスが0-11の範囲内であることを
    /// 前提としており、そうでない場合は`unwrap()`でパニックする可能性があります。
    /// ただし、JavaScriptのDate APIの仕様上、月のインデックスは常に0-11の範囲内であるため、
    /// 実際にはパニックは発生しません。
    #[must_use]
<<<<<<< HEAD
=======
>>>>>>> 69d9913 (yet)
=======
>>>>>>> 2c21a2e (yet)
    pub fn current() -> Self {
        let date = js_sys::Date::new_0();
        let month_index = date.get_month() as usize;
        Self::from_index(month_index).unwrap() // 0-11の範囲であることが保証されているため unwrap は安全
    }
}

/// 言語を表す列挙型
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Language {
    Japanese,
    English,
    Ukrainian,
    UkrainianAlphabet,
    Swedish,
    Finnish,
<<<<<<< HEAD
=======
<<<<<<< HEAD
    Polish,
    Czech,
    Slovak,
    Lithuanian,
    Latvian,
    Estonian,
=======
>>>>>>> 69d9913 (yet)
>>>>>>> 906146a (yet menu css)
}

impl fmt::Display for Language {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Language::Japanese => write!(f, "Japanese"),
            Language::English => write!(f, "English"),
            Language::Ukrainian => write!(f, "Ukrainian"),
            Language::UkrainianAlphabet => write!(f, "UkrainianAlphabet"),
            Language::Swedish => write!(f, "Swedish"),
            Language::Finnish => write!(f, "Finnish"),
<<<<<<< HEAD
=======
<<<<<<< HEAD
            Language::Polish => write!(f, "Polish"),
            Language::Czech => write!(f, "Czech"),
            Language::Slovak => write!(f, "Slovak"),
            Language::Lithuanian => write!(f, "Lithuanian"),
            Language::Latvian => write!(f, "Latvian"),
            Language::Estonian => write!(f, "Estonian"),
=======
>>>>>>> 69d9913 (yet)
>>>>>>> 906146a (yet menu css)
        }
    }
}

/// 月関連の操作で発生するエラー
#[derive(Debug, Error)]
pub enum MonthError {
    #[error("Invalid month index: {0}")]
    InvalidMonthIndex(usize),

    #[error("Unsupported language: {0}")]
    UnsupportedLanguage(String),

    #[error("Failed to convert to JavaScript value: {0}")]
    JsValueConversionError(String),
}

// JavaScript側に返すためのエラー型
#[wasm_bindgen]
<<<<<<< HEAD
#[derive(Debug)]
=======
>>>>>>> 69d9913 (yet)
pub struct JsError {
    message: String,
}

#[wasm_bindgen]
impl JsError {
    // js_classは使われていないので削除し、constructorだけにします
    #[wasm_bindgen(constructor)]
<<<<<<< HEAD
<<<<<<< HEAD
    #[must_use]
=======
>>>>>>> 69d9913 (yet)
=======
    #[must_use]
>>>>>>> 2c21a2e (yet)
    pub fn new(message: String) -> Self {
        Self { message }
    }

    #[wasm_bindgen(getter)]
<<<<<<< HEAD
<<<<<<< HEAD
    #[must_use]
=======
>>>>>>> 69d9913 (yet)
=======
    #[must_use]
>>>>>>> 2c21a2e (yet)
    pub fn message(&self) -> String {
        self.message.clone()
    }
}

impl From<MonthError> for JsError {
    fn from(error: MonthError) -> Self {
        Self {
            message: error.to_string(),
        }
    }
}
