use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct SiteConfig {
    site_name: String,
    version: String,
    features: HashMap<String, bool>,
    ui_settings: UiSettings,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UiSettings {
    pub menu_auto_hide: bool,
    pub show_breadcrumbs: bool,
    pub enable_animations: bool,
    pub compact_mode: bool,
}

#[wasm_bindgen]
impl SiteConfig {
    #[wasm_bindgen(constructor)]
    pub fn new() -> SiteConfig {
        let mut features = HashMap::new();
        features.insert("wasm_enabled".to_string(), true);
        features.insert("theme_switching".to_string(), true);
        features.insert("menu_iframe".to_string(), true);
        features.insert("month_display".to_string(), true);
        features.insert("multilingual".to_string(), true);

        SiteConfig {
            site_name: "FAKE XHTML".to_string(),
            version: "2025.06".to_string(),
            features,
            ui_settings: UiSettings {
                menu_auto_hide: true,
                show_breadcrumbs: true,
                enable_animations: true,
                compact_mode: false,
            },
        }
    }

    #[wasm_bindgen(js_name = getSiteName)]
    pub fn get_site_name(&self) -> String {
        self.site_name.clone()
    }

    #[wasm_bindgen(js_name = getVersion)]
    pub fn get_version(&self) -> String {
        self.version.clone()
    }

    #[wasm_bindgen(js_name = isFeatureEnabled)]
    pub fn is_feature_enabled(&self, feature: &str) -> bool {
        self.features.get(feature).copied().unwrap_or(false)
    }

    #[wasm_bindgen(js_name = enableFeature)]
    pub fn enable_feature(&mut self, feature: &str) {
        self.features.insert(feature.to_string(), true);
    }

    #[wasm_bindgen(js_name = disableFeature)]
    pub fn disable_feature(&mut self, feature: &str) {
        self.features.insert(feature.to_string(), false);
    }

    #[wasm_bindgen(js_name = getMenuAutoHide)]
    pub fn get_menu_auto_hide(&self) -> bool {
        self.ui_settings.menu_auto_hide
    }

    #[wasm_bindgen(js_name = setMenuAutoHide)]
    pub fn set_menu_auto_hide(&mut self, auto_hide: bool) {
        self.ui_settings.menu_auto_hide = auto_hide;
    }

    #[wasm_bindgen(js_name = getShowBreadcrumbs)]
    pub fn get_show_breadcrumbs(&self) -> bool {
        self.ui_settings.show_breadcrumbs
    }

    #[wasm_bindgen(js_name = setShowBreadcrumbs)]
    pub fn set_show_breadcrumbs(&mut self, show: bool) {
        self.ui_settings.show_breadcrumbs = show;
    }

    #[wasm_bindgen(js_name = getCompactMode)]
    pub fn get_compact_mode(&self) -> bool {
        self.ui_settings.compact_mode
    }

    #[wasm_bindgen(js_name = setCompactMode)]
    pub fn set_compact_mode(&mut self, compact: bool) {
        self.ui_settings.compact_mode = compact;
    }

    #[wasm_bindgen(js_name = exportConfig)]
    pub fn export_config(&self) -> Result<String, JsError> {
        serde_json::to_string(&self)
            .map_err(|e| JsError::new(format!("設定のエクスポートに失敗: {}", e)))
    }

    #[wasm_bindgen(js_name = importConfig)]
    pub fn import_config(&mut self, json_config: &str) -> Result<(), JsError> {
        let config: SiteConfig = serde_json::from_str(json_config)
            .map_err(|e| JsError::new(format!("設定のインポートに失敗: {}", e)))?;

        *self = config;
        Ok(())
    }
}

// サイト情報
#[wasm_bindgen(js_name = getSiteInfo)]
pub fn get_site_info() -> JsValue {
    let info = serde_json::json!({
        "name": "FAKE XHTML",
        "version": "2025.06",
        "description": "個人ウェブサイト - 技術、軍事、趣味など",
        "author": "nanaisisi",
        "technologies": [
            "HTML5",
            "CSS3",
            "JavaScript",
            "WebAssembly (Rust)",
            "Deno"
        ],
        "features": [
            "多言語月名表示",
            "テーマ切り替え",
            "レスポンシブデザイン",
            "WASM統合"
        ]
    });

    serde_wasm_bindgen::to_value(&info).unwrap_or(JsValue::NULL)
}

#[wasm_bindgen(js_name = createSiteConfig)]
pub fn create_site_config() -> SiteConfig {
    SiteConfig::new()
}

use crate::types::JsError;
