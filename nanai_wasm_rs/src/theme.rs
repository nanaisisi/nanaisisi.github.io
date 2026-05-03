use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
pub enum Theme {
    Light,
    Dark,
    Auto,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct ThemeConfig {
    current_theme: Theme,
    system_preference: Theme,
    user_preference: Option<Theme>,
}

#[wasm_bindgen]
impl ThemeConfig {
    #[wasm_bindgen(constructor)]
    pub fn new() -> ThemeConfig {
        ThemeConfig {
            current_theme: Theme::Auto,
            system_preference: Theme::Light,
            user_preference: None,
        }
    }

    #[wasm_bindgen(js_name = getCurrentTheme)]
    pub fn get_current_theme(&self) -> Theme {
        self.current_theme
    }

    #[wasm_bindgen(js_name = setUserPreference)]
    pub fn set_user_preference(&mut self, theme: Theme) {
        self.user_preference = Some(theme);
        self.update_current_theme();
    }

    #[wasm_bindgen(js_name = toggleTheme)]
    pub fn toggle_theme(&mut self) -> Theme {
        let new_theme = match self.current_theme {
            Theme::Light => Theme::Dark,
            Theme::Dark => Theme::Light,
            Theme::Auto => Theme::Light, // Autoの場合は明示的にLightに
        };
        self.set_user_preference(new_theme);
        new_theme
    }

    #[wasm_bindgen(js_name = getThemeClassName)]
    pub fn get_theme_class_name(&self) -> String {
        match self.current_theme {
            Theme::Light => "light-theme".to_string(),
            Theme::Dark => "dark-theme".to_string(),
            Theme::Auto => {
                // システムの設定に基づく
                match self.system_preference {
                    Theme::Dark => "dark-theme".to_string(),
                    _ => "light-theme".to_string(),
                }
            }
        }
    }

    #[wasm_bindgen(js_name = updateSystemPreference)]
    pub fn update_system_preference(&mut self, is_dark: bool) {
        self.system_preference = if is_dark { Theme::Dark } else { Theme::Light };
        if self.user_preference.is_none() || self.current_theme == Theme::Auto {
            self.update_current_theme();
        }
    }

    fn update_current_theme(&mut self) {
        self.current_theme = match self.user_preference {
            Some(theme) => theme,
            None => self.system_preference,
        };
    }
}

#[wasm_bindgen(js_name = createThemeConfig)]
pub fn create_theme_config() -> ThemeConfig {
    ThemeConfig::new()
}

// テーマに関連する設定値を取得
#[wasm_bindgen(js_name = getThemeSettings)]
pub fn get_theme_settings() -> JsValue {
    let settings = serde_json::json!({
        "themes": ["light", "dark", "auto"],
        "defaultTheme": "auto",
        "storageKey": "theme-preference"
    });

    serde_wasm_bindgen::to_value(&settings).unwrap_or(JsValue::NULL)
}
