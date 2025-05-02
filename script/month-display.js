import { loadWasm } from "./wasm-loader.js";

/**
 * 月名表示機能を初期化
 */
export async function initMonthDisplay() {
	// 直接要素を取得する場合とiframe内の要素を取得する場合の両方に対応
	await tryDisplayInMainPage();
	await tryDisplayInMenuFrame();
}

/**
 * メインページ内の月名表示を試みる
 */
async function tryDisplayInMainPage() {
	// メインページ内に月名表示要素があるか確認
	const monthElement = document.getElementById("month_names");
	if (monthElement) {
		try {
			await displayMonthNamesWasm(monthElement);
		} catch (error) {
			console.error("Error in WASM implementation for main page:", error);
			displayMonthNamesJs(monthElement);
		}
	}
}

/**
 * メニューiframe内での月名表示を試みる
 */
async function tryDisplayInMenuFrame() {
	// メニューのiframeを取得（複数の方法を試行）
	let menuFrame = document.querySelector('iframe[name="menu"]');

	// 見つからない場合はクラスで検索
	if (!menuFrame) {
		menuFrame = document.querySelector(".menu iframe");
	}

	// それでも見つからない場合は全てのiframeを確認
	if (!menuFrame) {
		const allFrames = document.querySelectorAll("iframe");
		for (const frame of allFrames) {
			if (frame.src?.includes("menu.html")) {
				menuFrame = frame;
				break;
			}
		}
	}

	if (!menuFrame) {
		console.log("Menu iframe not found after multiple attempts");
		return;
	}

	// iframeのロード完了を待つ
	try {
		await new Promise((resolve, reject) => {
			// すでにロード完了している場合
			if (
				menuFrame.contentDocument?.readyState === "complete" &&
				menuFrame.contentDocument?.getElementById("month_names")
			) {
				resolve();
				return;
			}

			// 既存のonloadを保存
			const originalOnload = menuFrame.onload;

			// 30秒のタイムアウトを設定
			const timeout = setTimeout(() => {
				menuFrame.onload = originalOnload;
				reject(new Error("Iframe load timeout"));
			}, 30000);

			// 新しいonloadハンドラを設定
			menuFrame.onload = () => {
				clearTimeout(timeout);
				// 元のonloadがあれば呼び出す
				if (originalOnload) originalOnload.call(menuFrame);
				resolve();
			};

			// すでにロード済みだがonloadが発火していない場合のフォールバック
			if (menuFrame.contentDocument?.readyState === "complete") {
				clearTimeout(timeout);
				resolve();
			}
		});

		// iframe内の月名表示要素を取得
		const frameDocument =
			menuFrame.contentDocument ?? menuFrame.contentWindow?.document;

		if (!frameDocument) {
			throw new Error("Cannot access iframe document");
		}

		const monthElement = frameDocument.getElementById("month_names");

		if (!monthElement) {
			console.log("month_names element not found in menu iframe");
			return;
		}

		// 月名表示処理を実行
		try {
			await displayMonthNamesWasm(monthElement);
		} catch (error) {
			console.error("Error in WASM implementation for iframe:", error);
			displayMonthNamesJs(monthElement);
		}
	} catch (error) {
		// セキュリティの制限などでiframeにアクセスできない場合
		console.error("Cannot access or process iframe content:", error);
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
