use wasm_bindgen::prelude::*;
use std::collections::HashMap;

#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct NavigationConfig {
    base_url: String,
    pages: HashMap<String, PageInfo>,
}

#[derive(Debug, Clone)]
pub struct PageInfo {
    pub title: String,
    pub path: String,
    pub category: String,
}

#[wasm_bindgen]
impl NavigationConfig {
    #[wasm_bindgen(constructor)]
    pub fn new(base_url: String) -> NavigationConfig {
        let mut pages = HashMap::new();
        
        // ページ情報を登録
        pages.insert("home".to_string(), PageInfo {
            title: "ふんわり更新履歴".to_string(),
            path: "index.html".to_string(),
            category: "main".to_string(),
        });
        
        pages.insert("nav".to_string(), PageInfo {
            title: "このサイトの使い方紹介".to_string(),
            path: "pages/nav.html".to_string(),
            category: "main".to_string(),
        });
        
        pages.insert("naming".to_string(), PageInfo {
            title: "私のネーミング".to_string(),
            path: "pages/naming.html".to_string(),
            category: "personal".to_string(),
        });
        
        pages.insert("hobby".to_string(), PageInfo {
            title: "趣味".to_string(),
            path: "pages/hobby.html".to_string(),
            category: "personal".to_string(),
        });
        
        // 技術カテゴリ
        pages.insert("tech_env".to_string(), PageInfo {
            title: "ソフトウェア環境".to_string(),
            path: "pages/tech/env.html".to_string(),
            category: "tech".to_string(),
        });
        
        pages.insert("tech_vscode".to_string(), PageInfo {
            title: "vscode拡張機能".to_string(),
            path: "pages/tech/vscode.html".to_string(),
            category: "tech".to_string(),
        });
        
        // 軍事カテゴリ
        pages.insert("mil_menu".to_string(), PageInfo {
            title: "軍事メニュー".to_string(),
            path: "pages/mil/miL_menu.html".to_string(),
            category: "military".to_string(),
        });

        NavigationConfig { base_url, pages }
    }

    #[wasm_bindgen(js_name = getPageUrl)]
    pub fn get_page_url(&self, page_id: &str) -> Option<String> {
        self.pages.get(page_id).map(|info| {
            format!("{}/{}", self.base_url.trim_end_matches('/'), info.path)
        })
    }

    #[wasm_bindgen(js_name = getPageTitle)]
    pub fn get_page_title(&self, page_id: &str) -> Option<String> {
        self.pages.get(page_id).map(|info| info.title.clone())
    }

    #[wasm_bindgen(js_name = getPagesByCategory)]
    pub fn get_pages_by_category(&self, category: &str) -> Vec<String> {
        self.pages
            .iter()
            .filter(|(_, info)| info.category == category)
            .map(|(id, _)| id.clone())
            .collect()
    }

    #[wasm_bindgen(js_name = getAllCategories)]
    pub fn get_all_categories(&self) -> Vec<String> {
        let mut categories: Vec<String> = self.pages
            .values()
            .map(|info| info.category.clone())
            .collect::<std::collections::HashSet<_>>()
            .into_iter()
            .collect();
        
        categories.sort();
        categories
    }

    #[wasm_bindgen(js_name = buildBreadcrumb)]
    pub fn build_breadcrumb(&self, page_id: &str) -> Option<String> {
        self.pages.get(page_id).map(|info| {
            match info.category.as_str() {
                "main" => format!("ホーム > {}", info.title),
                "tech" => format!("ホーム > 技術 > {}", info.title),
                "military" => format!("ホーム > 軍事 > {}", info.title),
                "personal" => format!("ホーム > 個人 > {}", info.title),
                _ => format!("ホーム > {}", info.title),
            }
        })
    }
}

#[wasm_bindgen(js_name = createNavigationConfig)]
pub fn create_navigation_config(base_url: String) -> NavigationConfig {
    NavigationConfig::new(base_url)
}

// サイトマップ生成
#[wasm_bindgen(js_name = generateSitemap)]
pub fn generate_sitemap(base_url: String) -> String {
    let nav = NavigationConfig::new(base_url);
    let mut sitemap = String::from("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
    sitemap.push_str("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
    
    for (_, info) in nav.pages.iter() {
        sitemap.push_str(&format!(
            "  <url>\n    <loc>{}/{}</loc>\n    <changefreq>weekly</changefreq>\n  </url>\n",
            nav.base_url.trim_end_matches('/'),
            info.path
        ));
    }
    
    sitemap.push_str("</urlset>");
    sitemap
}
