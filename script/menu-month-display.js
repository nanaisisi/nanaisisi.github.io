// 月名表示のための処理
import { initThemeManager } from "./theme-manager.js";
import { loadWasm } from "./wasm-loader.js";

// メイン初期化関数
export async function initializeMenu() {
	try {
		// テーマ管理を初期化
		initThemeManager();

		// 月名表示を初期化
		await initializeMonthDisplay();
	} catch (error) {
		console.error("Error in initializeMenu:", error);
	}
}

// 月名表示の初期化
async function initializeMonthDisplay() {
	const monthElement = document.getElementById("month_names");
	if (!monthElement) {
		console.warn("month_names element not found in menu.html");
		return;
	}

	// 初期メッセージを表示
	monthElement.textContent = "月名を読み込み中...";

	try {
		// WAsmモジュールを読み込み
		const wasmModule = await loadWasm();
		if (wasmModule) {
			const current_month = wasmModule.get_current_month();
			const japanese = wasmModule.get_japanese_month_name(current_month);
			const english = wasmModule.get_english_month_name(current_month);
			const ukrainian = wasmModule.get_ukrainian_month_name(current_month);
			const ukrAlphabet =
				wasmModule.get_ukrainian_alphabet_month_name(current_month);
			const swedish = wasmModule.get_swedish_month_name(current_month);
			const finnish = wasmModule.get_suomi_month_name(current_month);

			// 月名を表示
			monthElement.innerHTML = `
        JP: ${japanese}<br>
        EN: ${english}<br>
        UA: ${ukrainian}<br>
        UA_EN: ${ukrAlphabet}<br>
        SE: ${swedish}<br>
        FI: ${finnish}
      `;
		} else {
			// WAsmの読み込みに失敗した場合
			monthElement.textContent = "月名の読み込みに失敗しました";
		}
	} catch (error) {
		console.error("Error initializing WASM in menu.html:", error);
		// エラー時はメッセージを表示
		monthElement.textContent = "月名の読み込み中にエラーが発生しました";
	}
}

// DOMContentLoadedイベントの処理
function handleDOMContentLoaded() {
	initializeMenu().catch((error) => {
		console.error("Error during menu initialization:", error);
	});
}

// DOMContentLoadedイベントでinitializeMenuを呼び出す
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
