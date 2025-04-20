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
function menu_button() {
	// メニューの開閉機能
	const toggle_menu_btn = document.getElementById("toggle_menu_btn");
	const menu_open_tab = document.getElementById("menu_tab");
	toggle_menu(toggle_menu_btn, menu_open_tab);
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

// 一部国家の月名を表示する関数
function display_now_month_names_js() {
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

// WASM版の月名表示関数
async function display_now_month_names_wasm() {
	const wasmModule = await loadWasm();
	if (!wasmModule) {
		// WASmのロードに失敗した場合はJavaScriptバージョンを使用
		console.log("Falling back to JS implementation");
		display_now_month_names_js();
		return;
	}

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

// ページのロード時にWasmを使用して機能を実行
window.addEventListener("load", async () => {
	// メニューボタンの初期化
	menu_button();

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
	}
});
