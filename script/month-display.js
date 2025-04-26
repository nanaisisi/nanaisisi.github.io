import { loadWasm } from "./wasm-loader.js";

/**
 * 月名表示機能を初期化
 */
export async function initMonthDisplay() {
	// メニューのiframeを取得
	const menuFrame = document.querySelector('iframe[name="menu"]');

	if (!menuFrame) {
		console.log("Menu iframe not found, skipping month name display");
		return;
	}

	// iframeのロード完了を待つ
	await new Promise((resolve) => {
		if (
			menuFrame.contentDocument &&
			menuFrame.contentDocument.readyState === "complete"
		) {
			resolve();
		} else {
			menuFrame.onload = () => resolve();
		}
	});

	// iframe内の月名表示要素を取得
	try {
		const monthElement =
			menuFrame.contentDocument.getElementById("month_names");

		if (!monthElement) {
			console.log("month_names element not found in menu iframe");
			return;
		}

		// 月名表示処理を実行
		try {
			await displayMonthNamesWasm(monthElement);
		} catch (error) {
			console.error("Error in WASM implementation, falling back to JS:", error);
			displayMonthNamesJs(monthElement);
		}
	} catch (error) {
		// セキュリティの制限などでiframeにアクセスできない場合
		console.error("Cannot access iframe content:", error);
	}
}

/**
 * WASM版の月名表示関数
 */
async function displayMonthNamesWasm(monthElement) {
	const wasmModule = await loadWasm();
	if (!wasmModule) {
		// WASmのロードに失敗した場合はJavaScriptバージョンを使用
		console.log("Falling back to JS implementation");
		displayMonthNamesJs(monthElement);
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

		updateMonthNamesDisplay(
			monthElement,
			japanese_now_month_name,
			english_now_month_name,
			ukrainian_now_month_name,
			ukrainian_alphabet_now_month_name,
			swedish_now_month_name,
			suomi_now_month_name,
		);
	} catch (error) {
		console.error("Error calling WASM functions:", error);
		displayMonthNamesJs(monthElement);
	}
}

/**
 * JavaScript版の月名表示関数
 */
function displayMonthNamesJs(monthElement) {
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

	updateMonthNamesDisplay(
		monthElement,
		japanese_month_names[current_month],
		english_month_names[current_month],
		ukrainian_month_names[current_month],
		ukrainian_alphabet_month_names[current_month],
		swedish_month_names[current_month],
		suomi_month_names[current_month],
	);
}

/**
 * 月名表示を更新
 */
function updateMonthNamesDisplay(element, jp, en, ua, ua_en, se, fi) {
	if (element) {
		element.innerHTML = `
        JP: ${jp}<br>
        EN: ${en}<br>
        UA: ${ua}<br>
        UA_EN: ${ua_en}<br>
        SE: ${se}<br>
        FI: ${fi}
    `;
	}
}
