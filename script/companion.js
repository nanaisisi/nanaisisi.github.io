<<<<<<< HEAD
<<<<<<< HEAD
function tp_top() {
  const tp_top_btn = document.getElementById("tp_top_btn");
  /** @type {HTMLFrameElement} */
  const top_iframe = document.getElementById("top_iframe");
  if (top_iframe) {
    const top_iframe_window = top_iframe.contentWindow;
    if (tp_top_btn) {
      tp_top_btn.addEventListener("click", () => {
        if (top_iframe_window)
          top_iframe_window.scroll({
            top: 0,
            behavior: "smooth",
          });
      });
    }
  }
=======
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2e10f48 (ok)
// サイト全体の機能を統合するメインスクリプト
<<<<<<< HEAD
import { initMenuButton } from "./menu-handler.js";
import { initMonthDisplay } from "./month-display.js";
import { initThemeManager } from "./theme-manager.js";
>>>>>>> 108aa1f (menu.html の更新)
=======
import { initMenuButton } from "./menu_handler.js";
import { initMonthDisplay } from "./month_display.js";
import { initThemeManager } from "./theme_manager.js";
>>>>>>> 54908d2 (ok)

<<<<<<< HEAD
<<<<<<< HEAD
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const darkModeOn = darkModeMediaQuery.matches;
  const color_scheme_btn = document.getElementById("scheme_toggle");
  if (color_scheme_btn) {
    color_scheme_btn.addEventListener("click", () => {
      if (darkModeOff) {
        document.documentElement.classList.add("darkmode");
      } else {
        document.documentElement.classList.remove("darkmode");
      }
    });
  }
}
=======
=======
>>>>>>> b884a0d (ok)
<<<<<<< HEAD
// ページのロード時に各機能を初期化
window.addEventListener("load", async () => {
	// テーマ関連の初期化
	initThemeManager();
=======
// 既存のJavaScriptコード（フォールバック用）
=======
//before rust test_code

>>>>>>> 6b1a8b9 (ok)
=======
// Wasmモジュールのロードと既存のJavaScript機能
// WASMのロード関数
async function loadWasm() {
	try {
		// Wasmモジュールの読み込み
		const wasm = await import("../nanai_wasm_rs/pkg/nanai_wasm_rs.js");
		await wasm.default();
		console.log("WASM loaded successfully!");
		return wasm;
	} catch (error) {
		console.error("Error loading WASM:", error);
		return null;
	}
}

// 既存のJavaScriptコード（フォールバック用）
>>>>>>> f57d49c (yet)
function menu_button() {
<<<<<<< HEAD
<<<<<<< HEAD
	// メニューの開閉機能
<<<<<<< HEAD
	const toggle_menu_btn = document.getElementById("toggle_menu_btn");
	const menu_tab = document.getElementById("menu_tab");

	// メニューの初期状態を非表示に設定
	if (menu_tab) {
		menu_tab.style.display = "none";
	}

	toggle_menu(toggle_menu_btn, menu_tab);
=======
function menu_open_button() {
=======
function menu_button() {
>>>>>>> 70ed32c (ok)
	// メニューの開閉機能
	const menu_tab = document.getElementById("menu_tab");
=======
>>>>>>> 65e056c (test)
=======
	メニューの開閉機能;
>>>>>>> 90c2b70 (ok)
	const toggle_menu_open_btn = document.getElementById("toggle_menu_open_btn");
	const toggle_menu_close_btn = document.getElementById(
		"toggle_menu_close_btn",
	);
=======
	// メニューの開閉機能
	const toggle_menu_btn = document.getElementById("toggle_menu_btn");
<<<<<<< HEAD
>>>>>>> b5033fb (ok)
	const menu_open_tab = document.getElementById("menu_tab");
	toggle_menu(toggle_menu_btn, menu_open_tab);
=======
	const menu_tab = document.getElementById("menu_tab");
	toggle_menu(toggle_menu_btn, menu_tab);
>>>>>>> bd5aca8 (ok)
}

function toggle_menu(toggle_menu_btn, menu_tab) {
	if (toggle_menu_btn) {
		toggle_menu_btn.onclick = () => {
			if (menu_tab.style.display === "block") {
				menu_tab.style.display = "none";
			} else if (menu_tab.style.display === "none") {
				menu_tab.style.display = "block";
			} else {
				console.error("Unexpected menu state");
			}
		};
	} else {
		console.error("toggle_menu_btn is not found");
	}
}

<<<<<<< HEAD
// メニューを閉じるボタンの関数を追加
function menu_close_button() {
<<<<<<< HEAD
	// メニューの開閉機能
	const menu_close_tab = document.getElementById("menu_tab");
	const toggle_menu_close_btn = document.getElementById("toggle_menu_close_btn");
	toggle_menu_close_btn.onclick = () => {
		if (menu_close_tab.style.display === "block") {
			menu_close_tab.style.display = "none";
		} else if (menu_close_tab.style.display === "none") {
			menu_close_tab.style.display = "block";
		} else {
			console.error("Unexpected menu state");
		}
	};
>>>>>>> eb97852 (Add light mode styles changed dark mode styles code)
}

<<<<<<< HEAD
function toggle_menu(toggle_menu_btn, menu_tab) {
	if (toggle_menu_btn) {
		toggle_menu_btn.onclick = () => {
			if (menu_tab.style.display === "block") {
				menu_tab.style.display = "none";
			} else if (menu_tab.style.display === "none") {
				menu_tab.style.display = "block";
			} else {
				console.error("Unexpected menu state");
			}
		};
	} else {
		console.error("toggle_menu_btn is not found");
=======
	const menu_tab = document.getElementById("menu_tab");
	if (menu_tab) {
		menu_tab.style.display = "none";
	} else {
		console.error("menu_tab is not found");
>>>>>>> 70ed32c (ok)
	}
}

=======
>>>>>>> 65e056c (test)
// 一部国家の月名を表示する関数
function display_now_month_names_js() {
=======
// 一部国家の月名を表示する関数
<<<<<<< HEAD
function display_now_month_names() {
>>>>>>> c608b8e (ok)
=======
function display_now_month_names_js() {
>>>>>>> f57d49c (yet)
	const english_month_names = [
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
	const japanese_month_names = [
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
	const ukrainian_month_names = [
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
	const ukrainian_alphabet_month_names = [
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
	const swedish_month_names = [
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
	const suomi_month_names = [
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
	const current_month = new Date().getMonth(); // 0から11の値を返す
	const english_now_month_name = english_month_names[current_month];
	const japanese_now_month_name = japanese_month_names[current_month];
	const ukrainian_now_month_name = ukrainian_month_names[current_month];
	const ukrainian_alphabet_now_month_name =
		ukrainian_alphabet_month_names[current_month];
	const swedish_now_month_name = swedish_month_names[current_month];
	const suomi_now_month_name = suomi_month_names[current_month];
	const month_names_element = document.getElementById("month_names");
	if (month_names_element) {
		month_names_element.innerHTML = `
            JP: ${japanese_now_month_name}<br>
            EN: ${english_now_month_name}<br>
            UA: ${ukrainian_now_month_name}<br>
            UA_EN: ${ukrainian_alphabet_now_month_name}<br>
            SE: ${swedish_now_month_name}<br>
            FI: ${suomi_now_month_name}
        `;
	}
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f57d49c (yet)
// WASM版の月名表示関数
async function display_now_month_names_wasm() {
	const wasmModule = await loadWasm();
	if (!wasmModule) {
		// WASmのロードに失敗した場合はJavaScriptバージョンを使用
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b5033fb (ok)
		console.log("Falling back to JS implementation");
		display_now_month_names_js();
		return;
=======
// ページロード
// 時に実行されるイベントリスナーを追加
=======
// ページロード時に実行されるイベントリスナーを追加
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 55dcacd (ok)
=======
// メニューを開くボタン
>>>>>>> c608b8e (ok)
window.addEventListener("load", () => {
	if (menu_open_button) {
		menu_open_button();
>>>>>>> eb97852 (Add light mode styles changed dark mode styles code)
	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b5033fb (ok)
	try {
		const current_month = wasmModule.get_current_month();
		const japanese_now_month_name =
			wasmModule.get_japanese_month_name(current_month);
		const english_now_month_name =
			wasmModule.get_english_month_name(current_month);
		const ukrainian_now_month_name =
			wasmModule.get_ukrainian_month_name(current_month);
		const ukrainian_alphabet_now_month_name =
			wasmModule.get_ukrainian_alphabet_month_name(current_month);
		const swedish_now_month_name =
			wasmModule.get_swedish_month_name(current_month);
		const suomi_now_month_name = wasmModule.get_suomi_month_name(current_month);
<<<<<<< HEAD
=======
=======
// メニューを閉じるボタン
>>>>>>> c608b8e (ok)
=======

>>>>>>> 70ed32c (ok)
window.addEventListener("load", () => {
	// メニューを開くボタンと閉じるボタンの関数の読み込み
	if (menu_button) {
		menu_button();
=======
		display_now_month_names_js();
		return;
>>>>>>> f57d49c (yet)
	}
<<<<<<< HEAD
});
>>>>>>> eb97852 (Add light mode styles changed dark mode styles code)

<<<<<<< HEAD
		const month_names_element = document.getElementById("month_names");
		if (month_names_element) {
			month_names_element.innerHTML = `
                JP: ${japanese_now_month_name}<br>
                EN: ${english_now_month_name}<br>
                UA: ${ukrainian_now_month_name}<br>
                UA_EN: ${ukrainian_alphabet_now_month_name}<br>
                SE: ${swedish_now_month_name}<br>
                FI: ${suomi_now_month_name}
            `;
		}
	} catch (error) {
		console.error("Error calling WASM functions:", error);
		display_now_month_names_js();
=======
// 各国の月名を表示する関数
window.addEventListener("load", () => {
=======

<<<<<<< HEAD
	// 各国の月名を表示する関数の読み込み
>>>>>>> 70ed32c (ok)
	if (display_now_month_names) {
		display_now_month_names();
>>>>>>> c608b8e (ok)
=======
	const current_month = wasmModule.get_current_month();
	const japanese_now_month_name =
		wasmModule.get_japanese_month_name(current_month);
	const english_now_month_name =
		wasmModule.get_english_month_name(current_month);
	const ukrainian_now_month_name =
		wasmModule.get_ukrainian_month_name(current_month);
	const ukrainian_alphabet_now_month_name =
		wasmModule.get_ukrainian_alphabet_month_name(current_month);
	const swedish_now_month_name =
		wasmModule.get_swedish_month_name(current_month);
	const suomi_now_month_name = wasmModule.get_suomi_month_name(current_month);
=======
>>>>>>> b5033fb (ok)

		const month_names_element = document.getElementById("month_names");
		if (month_names_element) {
			month_names_element.innerHTML = `
                JP: ${japanese_now_month_name}<br>
                EN: ${english_now_month_name}<br>
                UA: ${ukrainian_now_month_name}<br>
                UA_EN: ${ukrainian_alphabet_now_month_name}<br>
                SE: ${swedish_now_month_name}<br>
                FI: ${suomi_now_month_name}
            `;
		}
	} catch (error) {
		console.error("Error calling WASM functions:", error);
		display_now_month_names_js();
	}
}

// テーマ切り替え機能
function toggleTheme() {
	const body = document.body;
	if (body.classList.contains("light-theme")) {
		body.classList.remove("light-theme");
		body.classList.add("dark-theme");
		localStorage.setItem("theme", "dark");
	} else {
		body.classList.remove("dark-theme");
		body.classList.add("light-theme");
		localStorage.setItem("theme", "light");
	}

	// テーマ変更を他のページに通知
	if (window.parent && window.parent !== window) {
		// iframeから親ページへの通知
		window.parent.postMessage(
			{ type: "theme-change", theme: localStorage.getItem("theme") },
			"*",
		);
	} else {
		// 親ページからiframeへの通知
		const iframes = document.querySelectorAll("iframe");
		// biome-ignore lint/complexity/noForEach: <explanation>
		iframes.forEach((iframe) => {
			try {
				iframe.contentWindow.postMessage(
					{ type: "theme-change", theme: localStorage.getItem("theme") },
					"*",
				);
			} catch (e) {
				console.error("Failed to send theme to iframe:", e);
			}
		});
	}
}

// メッセージイベントを監視して他ページからのテーマ変更を受け取る
function setupThemeMessageListener() {
	window.addEventListener("message", (event) => {
		// メッセージがテーマ変更に関するものかチェック
		if (event.data && event.data.type === "theme-change") {
			const newTheme = event.data.theme;
			const body = document.body;

			// 受け取ったテーマを適用
			if (newTheme === "dark") {
				body.classList.remove("light-theme");
				body.classList.add("dark-theme");
				localStorage.setItem("theme", "dark");
			} else if (newTheme === "light") {
				body.classList.remove("dark-theme");
				body.classList.add("light-theme");
				localStorage.setItem("theme", "light");
			}
		}
	});
}

// 保存されたテーマ設定を適用
function applyStoredTheme() {
	const storedTheme = localStorage.getItem("theme");
	const body = document.body;
	const prefersDark = window.matchMedia?.(
		"(prefers-color-scheme: dark)",
	).matches;

	if (storedTheme) {
		if (storedTheme === "dark") {
			body.classList.remove("light-theme");
			body.classList.add("dark-theme");
		} else {
			body.classList.remove("dark-theme");
			body.classList.add("light-theme");
		}
	} else {
		// ユーザーの設定がなければシステム設定に合わせる
		if (prefersDark) {
			body.classList.add("dark-theme");
		} else {
			body.classList.add("light-theme");
		}
	}
}

// ページのロード時にWasmを使用して機能を実行
window.addEventListener("load", async () => {
	// テーマ設定の適用
	applyStoredTheme();

	// テーマメッセージリスナーのセットアップ
	setupThemeMessageListener();

	// テーマ切り替えボタンの初期化
	const themeToggleBtn = document.getElementById("theme-toggle-btn");
	if (themeToggleBtn) {
		themeToggleBtn.addEventListener("click", toggleTheme);
	}

	// メニューボタンの初期化
	menu_button();

<<<<<<< HEAD
	// 月名表示 - WasmとJavaScriptのハイブリッド実装
	try {
		await display_now_month_names_wasm();
	} catch (error) {
		console.error("Error in WASM implementation, falling back to JS:", error);
		display_now_month_names_js();
>>>>>>> f57d49c (yet)
=======
	// 月名表示 - 月名表示要素があるかチェック
	const month_names_element = document.getElementById("month_names");
	if (month_names_element) {
		try {
			await display_now_month_names_wasm();
		} catch (error) {
			console.error("Error in WASM implementation, falling back to JS:", error);
			display_now_month_names_js();
		}
	} else {
		console.log("month_names element not found, skipping month name display");
>>>>>>> b5033fb (ok)
	}
}

// テーマ切り替え機能
function toggleTheme() {
	const body = document.body;
	if (body.classList.contains("light-theme")) {
		body.classList.remove("light-theme");
		body.classList.add("dark-theme");
		localStorage.setItem("theme", "dark");
	} else {
		body.classList.remove("dark-theme");
		body.classList.add("light-theme");
		localStorage.setItem("theme", "light");
	}

	// テーマ変更を他のページに通知
	if (window.parent && window.parent !== window) {
		// iframeから親ページへの通知
		window.parent.postMessage(
			{ type: "theme-change", theme: localStorage.getItem("theme") },
			"*",
		);
	} else {
		// 親ページからiframeへの通知
		const iframes = document.querySelectorAll("iframe");
		// biome-ignore lint/complexity/noForEach: <explanation>
		iframes.forEach((iframe) => {
			try {
				iframe.contentWindow.postMessage(
					{ type: "theme-change", theme: localStorage.getItem("theme") },
					"*",
				);
			} catch (e) {
				console.error("Failed to send theme to iframe:", e);
			}
		});
	}
}

// メッセージイベントを監視して他ページからのテーマ変更を受け取る
function setupThemeMessageListener() {
	window.addEventListener("message", (event) => {
		// メッセージがテーマ変更に関するものかチェック
		if (event.data && event.data.type === "theme-change") {
			const newTheme = event.data.theme;
			const body = document.body;

			// 受け取ったテーマを適用
			if (newTheme === "dark") {
				body.classList.remove("light-theme");
				body.classList.add("dark-theme");
				localStorage.setItem("theme", "dark");
			} else if (newTheme === "light") {
				body.classList.remove("dark-theme");
				body.classList.add("light-theme");
				localStorage.setItem("theme", "light");
			}
		}
	});
}

// 保存されたテーマ設定を適用
function applyStoredTheme() {
	const storedTheme = localStorage.getItem("theme");
	const body = document.body;
	const prefersDark = window.matchMedia?.(
		"(prefers-color-scheme: dark)",
	).matches;

	if (storedTheme) {
		if (storedTheme === "dark") {
			body.classList.remove("light-theme");
			body.classList.add("dark-theme");
		} else {
			body.classList.remove("dark-theme");
			body.classList.add("light-theme");
		}
	} else {
		// ユーザーの設定がなければシステム設定に合わせる
		if (prefersDark) {
			body.classList.add("dark-theme");
		} else {
			body.classList.add("light-theme");
		}
	}
}

// ページのロード時にWasmを使用して機能を実行
=======
// ページのロード時に各機能を初期化
>>>>>>> 44eb280 (divide)
window.addEventListener("load", async () => {
	// テーマ関連の初期化
	initThemeManager();

	// メニューボタンの初期化
<<<<<<< HEAD
	menu_button();
>>>>>>> de119b1 (cant_run)

	// メニューボタンの初期化
	initMenuButton();

=======
	initMenuButton();

>>>>>>> 44eb280 (divide)
	// 月名表示機能の初期化
	await initMonthDisplay();
});
>>>>>>> 5b4337d (dark default)
