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
	const monthElement = document.getElementById("month-names");
	if (!monthElement) {
		console.warn("month-names element not found in menu.html");
		return;
	}

	// 初期メッセージを表示
	monthElement.textContent = "月名を読み込み中...";

	try {
		const wasmModule = await loadWasm();
		if (wasmModule) {
			console.log("WASM module loaded successfully in menu");
			console.log("Available WASM functions:", Object.keys(wasmModule));

			const current_month = wasmModule.get_current_month();
			console.log("Current month index:", current_month);

			// 各関数の存在確認
			const functionList = [
				"get_japanese_month_name",
				"get_english_month_name",
				"get_ukrainian_month_name",
				"get_ukrainian_alphabet_month_name",
				"get_swedish_month_name",
				"get_suomi_month_name",
				"get_polish_month_name",
				"get_czech_month_name",
				"get_slovak_month_name",
				"get_lithuanian_month_name",
				"get_latvian_month_name",
				"get_estonian_month_name",
			];

			console.log("Function availability check:");
			for (const funcName of functionList) {
				console.log(`  ${funcName}: ${typeof wasmModule[funcName]}`);
			}

			const japanese = wasmModule.get_japanese_month_name(current_month);
			const english = wasmModule.get_english_month_name(current_month);
			const ukrainian = wasmModule.get_ukrainian_month_name(current_month);
			const ukrAlphabet =
				wasmModule.get_ukrainian_alphabet_month_name(current_month);
			const swedish = wasmModule.get_swedish_month_name(current_month);
			const finnish = wasmModule.get_suomi_month_name(current_month);
			const polish = wasmModule.get_polish_month_name(current_month);
			const czech = wasmModule.get_czech_month_name(current_month);
			const slovak = wasmModule.get_slovak_month_name(current_month);
			const lithuanian = wasmModule.get_lithuanian_month_name(current_month);
			const latvian = wasmModule.get_latvian_month_name(current_month);
			const estonian = wasmModule.get_estonian_month_name(current_month);

			console.log("All month names loaded:", {
				japanese,
				english,
				ukrainian,
				ukrAlphabet,
				swedish,
				finnish,
				polish,
				czech,
				slovak,
				lithuanian,
				latvian,
				estonian,
			});

			// 月名を表示
			monthElement.innerHTML = `
        JP: ${japanese}<br>
        EN: ${english}<br>
        UA: ${ukrainian}<br>
        UA_EN: ${ukrAlphabet}<br>
        SE: ${swedish}<br>
        FI: ${finnish}<br>
        PL: ${polish}<br>
        CS: ${czech}<br>
        SK: ${slovak}<br>
        LT: ${lithuanian}<br>
        LV: ${latvian}<br>
        ET: ${estonian}
      `;
		} else {
			// WASMの読み込みに失敗した場合
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
