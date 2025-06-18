import { loadWasm } from "./wasm-loader.js";

/**
 * 月名表示機能を初期化
 */
export async function initMonthDisplay() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	// メニューのiframeを取得
	const menuFrame = document.querySelector('iframe[name="menu"]');
=======
	// 直接要素を取得する場合とiframe内の要素を取得する場合の両方に対応
	await tryDisplayInMainPage();
	await tryDisplayInMenuFrame();
=======
	try {
		// 直接要素を取得する場合とiframe内の要素を取得する場合の両方に対応
		await tryDisplayInMainPage();
		await tryDisplayInMenuFrame();
	} catch (error) {
		console.error("Error in initMonthDisplay:", error);
	}
>>>>>>> 15b638d (auto rollback)
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
>>>>>>> 34f080f (yet)

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
				if (originalOnload && typeof originalOnload === "function") {
					try {
						originalOnload.call(menuFrame);
					} catch (e) {
						console.warn("Error calling original onload:", e);
					}
				}
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
<<<<<<< HEAD
		console.error("Cannot access iframe content:", error);
=======
	// 月名表示要素があるかチェック
	const month_names_element = document.getElementById("month_names");
	if (month_names_element) {
		try {
			await displayMonthNamesWasm();
		} catch (error) {
			console.error("Error in WASM implementation, falling back to JS:", error);
			displayMonthNamesJs();
		}
	} else {
		console.log("month_names element not found, skipping month name display");
>>>>>>> fb6f1c2 (divide)
=======
	// 月名表示要素がすでにある場合はそれを使用
	let month_names_element = document.getElementById("month_names");
=======
	// メニューのiframeを取得
	const menuFrame = document.querySelector('iframe[name="menu"]');
>>>>>>> c329f2d (err fix)

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
<<<<<<< HEAD
		console.error("Error in WASM implementation, falling back to JS:", error);
		displayMonthNamesJs();
>>>>>>> f3659f8 (fix)
=======
		// セキュリティの制限などでiframeにアクセスできない場合
		console.error("Cannot access iframe content:", error);
>>>>>>> c329f2d (err fix)
=======
		console.error("Cannot access or process iframe content:", error);
>>>>>>> 34f080f (yet)
	}
}

/**
 * WASM版の月名表示関数
 */
<<<<<<< HEAD
<<<<<<< HEAD
async function displayMonthNamesWasm(monthElement) {
=======
async function displayMonthNamesWasm() {
>>>>>>> fb6f1c2 (divide)
=======
async function displayMonthNamesWasm(monthElement) {
>>>>>>> c329f2d (err fix)
	const wasmModule = await loadWasm();
	if (!wasmModule) {
		// WASmのロードに失敗した場合はJavaScriptバージョンを使用
		console.log("Falling back to JS implementation");
<<<<<<< HEAD
<<<<<<< HEAD
		displayMonthNamesJs(monthElement);
=======
		displayMonthNamesJs();
>>>>>>> fb6f1c2 (divide)
=======
		displayMonthNamesJs(monthElement);
>>>>>>> c329f2d (err fix)
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
		const polish_now_month_name =
			wasmModule.get_polish_month_name(current_month);
		const czech_now_month_name = wasmModule.get_czech_month_name(current_month);
		const slovak_now_month_name =
			wasmModule.get_slovak_month_name(current_month);
		const lithuanian_now_month_name =
			wasmModule.get_lithuanian_month_name(current_month);
		const latvian_now_month_name =
			wasmModule.get_latvian_month_name(current_month);
		const estonian_now_month_name =
			wasmModule.get_estonian_month_name(current_month);

		updateMonthNamesDisplay(
<<<<<<< HEAD
<<<<<<< HEAD
			monthElement,
=======
>>>>>>> fb6f1c2 (divide)
=======
			monthElement,
>>>>>>> c329f2d (err fix)
			japanese_now_month_name,
			english_now_month_name,
			ukrainian_now_month_name,
			ukrainian_alphabet_now_month_name,
			swedish_now_month_name,
			suomi_now_month_name,
			polish_now_month_name,
			czech_now_month_name,
			slovak_now_month_name,
			lithuanian_now_month_name,
			latvian_now_month_name,
			estonian_now_month_name,
		);
	} catch (error) {
		console.error("Error calling WASM functions:", error);
<<<<<<< HEAD
<<<<<<< HEAD
		displayMonthNamesJs(monthElement);
=======
		displayMonthNamesJs();
>>>>>>> fb6f1c2 (divide)
=======
		displayMonthNamesJs(monthElement);
>>>>>>> c329f2d (err fix)
	}
}

/**
 * JavaScript版の月名表示関数（WASMが利用できない場合のフォールバック）
 */
<<<<<<< HEAD
<<<<<<< HEAD
function displayMonthNamesJs(monthElement) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
function displayMonthNamesJs() {
>>>>>>> fb6f1c2 (divide)
=======
function displayMonthNamesJs(monthElement) {
>>>>>>> c329f2d (err fix)
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

=======
	// WAsmが利用できない場合の簡単なエラー表示
>>>>>>> 6807485 (ok)
=======
	// WASMが利用できない場合の簡単なエラー表示
>>>>>>> 188369a (yet wasm)
	updateMonthNamesDisplay(
<<<<<<< HEAD
<<<<<<< HEAD
		monthElement,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fb6f1c2 (divide)
=======
		monthElement,
>>>>>>> c329f2d (err fix)
		japanese_month_names[current_month],
		english_month_names[current_month],
		ukrainian_month_names[current_month],
		ukrainian_alphabet_month_names[current_month],
		swedish_month_names[current_month],
		suomi_month_names[current_month],
=======
		"WAsmエラー",
		"WAsmエラー",
		"WAsmエラー",
		"WAsmエラー",
		"WAsmエラー",
		"WAsmエラー",
>>>>>>> 6807485 (ok)
=======
		"WASMエラー",
		"WASMエラー",
		"WASMエラー",
		"WASMエラー",
		"WASMエラー",
		"WASMエラー",
<<<<<<< HEAD
>>>>>>> 188369a (yet wasm)
=======
		"WASMエラー",
		"WASMエラー",
		"WASMエラー",
		"WASMエラー",
		"WASMエラー",
		"WASMエラー",
>>>>>>> 10a1e1b (wasm fin)
	);
}

/**
 * 月名表示を更新
 */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c329f2d (err fix)
function updateMonthNamesDisplay(element, jp, en, ua, ua_en, se, fi) {
=======
function updateMonthNamesDisplay(
	element,
	jp,
	en,
	ua,
	ua_en,
	se,
	fi,
	pl,
	cs,
	sk,
	lt,
	lv,
	et,
) {
>>>>>>> 10a1e1b (wasm fin)
	if (element) {
		element.innerHTML = `
        JP: ${jp}<br>
        EN: ${en}<br>
        UA: ${ua}<br>
        UA_EN: ${ua_en}<br>
        SE: ${se}<br>
        FI: ${fi}<br>
        PL: ${pl}<br>
        CS: ${cs}<br>
        SK: ${sk}<br>
        LT: ${lt}<br>
        LV: ${lv}<br>
        ET: ${et}
    `;
<<<<<<< HEAD
=======
function updateMonthNamesDisplay(jp, en, ua, ua_en, se, fi) {
	const month_names_element = document.getElementById("month_names");
	if (month_names_element) {
		month_names_element.innerHTML = `
            JP: ${jp}<br>
            EN: ${en}<br>
            UA: ${ua}<br>
            UA_EN: ${ua_en}<br>
            SE: ${se}<br>
            FI: ${fi}
        `;
>>>>>>> fb6f1c2 (divide)
=======
>>>>>>> c329f2d (err fix)
	}
}
