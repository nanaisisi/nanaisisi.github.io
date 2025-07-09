mod config;
mod month;
mod month_names;
mod navigation;
mod theme;
mod types;

// 型を公開
pub use types::{JsError, Language, Month, MonthError};

// 新しい機能の公開
#[cfg(target_arch = "wasm32")]
pub use theme::{Theme, ThemeConfig, create_theme_config, get_theme_settings};

#[cfg(target_arch = "wasm32")]
pub use navigation::{NavigationConfig, create_navigation_config, generate_sitemap};

#[cfg(target_arch = "wasm32")]
pub use config::{SiteConfig, create_site_config, get_site_info};

// month.rsモジュールの関数を公開
#[cfg(target_arch = "wasm32")]
pub use month::{
    // 従来の関数
    get_current_month,
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
};

// テスト用のモジュール
#[cfg(test)]
mod tests;
