// WebAssemblyモジュールの読み込み
import { loadWasm } from "./wasm_loader.js";

// モジュールの初期化
let wasmInitialized = false;
let wasmModule = null;

async function initializeWasm() {
	try {
		wasmModule = await loadWasm();
		if (!wasmModule) {
			throw new Error("WASM module failed to load");
		}

		wasmInitialized = true;
		console.log("WebAssembly module initialized successfully");

		// WASM関数の利用可能性を確認
		console.log("Available WASM functions:");
		const functionNames = [
			"get_current_month",
			"get_month_name",
			"get_month_name_async",
			"get_month_names_all",
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
			// 新機能
			"createThemeConfig",
			"getThemeSettings",
			"createNavigationConfig",
			"generateSitemap",
			"createSiteConfig",
			"getSiteInfo",
		];

		for (const funcName of functionNames) {
			console.log(`  ${funcName}: ${typeof wasmModule[funcName]}`);
		}

		// 新機能のテスト
		console.log("Testing new features:");
		try {
			// テーマ設定のテスト
			const themeSettings = wasmModule.getThemeSettings();
			console.log("Theme settings:", themeSettings);

			// サイト情報のテスト
			const siteInfo = wasmModule.getSiteInfo();
			console.log("Site info:", siteInfo);

			// サイトマップ生成のテスト
			const sitemap = wasmModule.generateSitemap("https://example.com");
			console.log(
				"Generated sitemap (first 200 chars):",
				`${sitemap?.substring(0, 200)}...`,
			);
		} catch (error) {
			console.error("Error testing new features:", error);
		}

		// 現在の月を設定
		const currentMonth = wasmModule.get_current_month();
		console.log("Current month:", currentMonth);
		document.getElementById("monthSelect").value = currentMonth;

		// 新しい言語の個別関数テスト
		console.log("Testing new language functions:");
		try {
			const testMonth = 0; // 1月でテスト
			const polish = wasmModule.get_polish_month_name(testMonth);
			const czech = wasmModule.get_czech_month_name(testMonth);
			const slovak = wasmModule.get_slovak_month_name(testMonth);
			const lithuanian = wasmModule.get_lithuanian_month_name(testMonth);
			const latvian = wasmModule.get_latvian_month_name(testMonth);
			const estonian = wasmModule.get_estonian_month_name(testMonth);

			console.log("New language month names for January:", {
				polish,
				czech,
				slovak,
				lithuanian,
				latvian,
				estonian,
			});
		} catch (error) {
			console.error("Error testing new language functions:", error);
		}

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

// 新機能をテストする関数
function testNewFeatures() {
	if (!wasmInitialized || !wasmModule) {
		document.getElementById("newFeaturesResult").innerText = "WASM未初期化";
		return;
	}

	try {
		let result = "=== 新機能テスト結果 ===\n\n";

		// テーマ設定のテスト
		const themeSettings = wasmModule.getThemeSettings();
		result += `テーマ設定: ${JSON.stringify(themeSettings, null, 2)}\n\n`;

		// サイト情報のテスト
		const siteInfo = wasmModule.getSiteInfo();
		result += `サイト情報: ${JSON.stringify(siteInfo, null, 2)}\n\n`;

		// サイトマップ生成のテスト
		const sitemap = wasmModule.generateSitemap("https://example.com");
		result += `サイトマップ(最初の300文字):\n${sitemap?.substring(0, 300)}...\n\n`;

		document.getElementById("newFeaturesResult").innerText = result;
	} catch (error) {
		document.getElementById("newFeaturesResult").innerText =
			`新機能テストエラー: ${error.message || error}`;
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

	document
		.getElementById("testNewFeaturesBtn")
		.addEventListener("click", () => {
			testNewFeatures();
		});

	document.getElementById("monthSelect").addEventListener("change", () => {
		displayMonthName();
	});

	document.getElementById("langSelect").addEventListener("change", () => {
		displayMonthName();
	});
});
