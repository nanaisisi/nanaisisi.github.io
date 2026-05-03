// サイト全体の機能を統合するメインスクリプト
import { initMenuButton } from "./menu_handler.js";
import { initMonthDisplay } from "./month_display.js";
import { initThemeManager } from "./theme_manager.js";

// ページのロード時に各機能を初期化
window.addEventListener("load", async () => {
	// テーマ関連の初期化
	initThemeManager();

	// メニューボタンの初期化
	initMenuButton();

	// 月名表示機能の初期化
	await initMonthDisplay();
});
