// WebAssemblyモジュールの読み込み
import init, * as wasmModule from "../nanai_wasm_rs/pkg/nanai_wasm_rs.js";

// モジュールの初期化
let wasmInitialized = false;

async function initializeWasm() {
	try {
		await init();
		wasmInitialized = true;
		console.log("WebAssembly module initialized successfully");

		// 現在の月を設定
		const currentMonth = wasmModule.get_current_month();
		document.getElementById("monthSelect").value = currentMonth;

		// 初期表示
		await displayMonthName();
	} catch (error) {
		console.error("Failed to initialize WebAssembly module:", error);
		document.getElementById("result").innerText =
			`エラー: ${error.message || error}`;
	}
}

// 月名を表示
async function displayMonthName() {
	if (!wasmInitialized) {
		document.getElementById("result").innerText =
			"WebAssemblyモジュールを読み込み中...";
		return;
	}

	try {
		const monthIndex = Number.parseInt(
			document.getElementById("monthSelect").value,
			10,
		);
		const langCode = document.getElementById("langSelect").value;

		// 同期メソッドで月名を取得
		const monthName = wasmModule.get_month_name(monthIndex, langCode);
		document.getElementById("result").innerText = monthName;

		// 非同期メソッドで月名を取得
		wasmModule
			.get_month_name_async(monthIndex, langCode)
			.then((name) => {
				document.getElementById("asyncResult").innerText =
					`非同期結果: ${name}`;
			})
			.catch((error) => {
				document.getElementById("asyncResult").innerText =
					`非同期エラー: ${error.message || error}`;
			});
	} catch (error) {
		document.getElementById("result").innerText =
			`エラー: ${error.message || error}`;
	}
}

// すべての言語で月名を表示
function displayAllMonthNames() {
	if (!wasmInitialized) return;

	try {
		const monthIndex = Number.parseInt(
			document.getElementById("monthSelect").value,
			10,
		);
		const allNames = wasmModule.get_month_names_all(monthIndex);

		const languages = [
			"日本語",
			"英語",
			"ウクライナ語",
			"ウクライナ語(ラテン)",
			"スウェーデン語",
			"フィンランド語",
			"ポーランド語",
			"チェコ語",
			"スロバキア語",
			"リトアニア語",
			"ラトビア語",
			"エストニア語",
		];
		const resultHTML = Array.from(allNames)
			.map((name, i) => `<div><strong>${languages[i]}:</strong> ${name}</div>`)
			.join("");

		document.getElementById("result").innerHTML = resultHTML;
	} catch (error) {
		document.getElementById("result").innerText =
			`エラー: ${error.message || error}`;
	}
}

// イベントハンドラーの登録
window.addEventListener("DOMContentLoaded", () => {
	initializeWasm();

	document.getElementById("getMonthBtn").addEventListener("click", () => {
		displayMonthName();
	});

	document.getElementById("getAllBtn").addEventListener("click", () => {
		displayAllMonthNames();
	});

	document.getElementById("monthSelect").addEventListener("change", () => {
		displayMonthName();
	});

	document.getElementById("langSelect").addEventListener("change", () => {
		displayMonthName();
	});
});
