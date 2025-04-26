// menu.htmlに追加するスクリプト
import { initMonthDisplay } from './script/month-display.js'; * メニューボタンの初期化と制御を行う

window.addEventListener("load", async () => {on initMenuButton() {
  // 月名表示機能の初期化 ID名を環境に合わせて修正
  await initMonthDisplay();ntById("toggle_menu_btn");
});nt.getElementById("menu_tab");

import { loadWasm } from "./wasm-loader.js";	// メニューの初期状態を非表示に設定

/**none";
 * 月名表示機能を初期化
 */		console.warn("Menu element not found: menu_tab");
export async function initMonthDisplay() {
	// 月名表示要素がすでにある場合はそれを使用
	let month_names_element = document.getElementById("month_names"););

	// 要素がない場合は、メニュー内に作成
	if (!month_names_element) {
		const menuElement = document.getElementById("menu_tab");

		if (menuElement) { * @param {HTMLElement} menu_tab メニュータブ要素
			month_names_element = document.createElement("div");
			month_names_element.id = "month_names";etupMenuToggle(toggle_menu_btn, menu_tab) {
			month_names_element.className = "month-names-display";
 = () => {
			// メニューの最初の子要素として追加if (menu_tab.style.display === "block") {
			// iframeの前に配置		menu_tab.style.display = "none";
			menuElement.insertBefore(month_names_element, menuElement.firstChild);				document.body.classList.remove("menu-open");

			console.log("Created month_names element in menu");nu_tab.style.display = "block";
		} else {"menu-open");
			console.log("Menu element not found, skipping month name display");
			return; // メニューがなければ終了
		}
	}console.warn(
		"Menu elements not found. Button: " +
	// 月名表示処理を実行				(toggle_menu_btn ? "✓" : "✗") +
	try {	", Menu: " +
		await displayMonthNamesWasm(); "✓" : "✗"),
	} catch (error) {;
		console.error("Error in WASM implementation, falling back to JS:", error);
		displayMonthNamesJs();
	}}/** * WASM版の月名表示関数 */async function displayMonthNamesWasm() {	const wasmModule = await loadWasm();	if (!wasmModule) {		// WASmのロードに失敗した場合はJavaScriptバージョンを使用		console.log("Falling back to JS implementation");		displayMonthNamesJs();		return;	}	try {		const current_month = wasmModule.get_current_month();		const japanese_now_month_name =			wasmModule.get_japanese_month_name(current_month);		const english_now_month_name =			wasmModule.get_english_month_name(current_month);		const ukrainian_now_month_name =			wasmModule.get_ukrainian_month_name(current_month);		const ukrainian_alphabet_now_month_name =			wasmModule.get_ukrainian_alphabet_month_name(current_month);		const swedish_now_month_name =			wasmModule.get_swedish_month_name(current_month);		const suomi_now_month_name = wasmModule.get_suomi_month_name(current_month);		updateMonthNamesDisplay(			japanese_now_month_name,			english_now_month_name,			ukrainian_now_month_name,			ukrainian_alphabet_now_month_name,			swedish_now_month_name,			suomi_now_month_name,		);	} catch (error) {		console.error("Error calling WASM functions:", error);		displayMonthNamesJs();	}}/** * JavaScript版の月名表示関数 */function displayMonthNamesJs() {	const english_month_names = [		"January",		"February",		"March",		"April",		"May",		"June",		"July",		"August",		"September",		"October",		"November",		"December",	];	const japanese_month_names = [		"睦月",		"如月",		"弥生",		"卯月",		"皐月",		"水無月",		"文月",		"葉月",		"長月",		"神無月",		"霜月",		"師走",	];	const ukrainian_month_names = [		"Січень",		"Лютий",		"Березень",		"Квітень",		"Травень",		"Червень",		"Липень",		"Серпень",		"Вересень",		"Жовтень",		"Листопад",		"Грудень",	];	const ukrainian_alphabet_month_names = [		"si-chen",		"lu-tyi",		"be-re-zen",		"kvi-ten",		"tra-vehn",		"cher-vehn",		"ly-pehn",		"ser-pehn",		"ve-re-sehn",		"zhov-tehn",		"lys-to-pad",		"hru-dehn",	];	const swedish_month_names = [		"Januari",		"Februari",		"Mars",		"April",		"Maj",		"Juni",		"Juli",		"Augusti",		"September",		"Oktober",		"November",		"December",	];	const suomi_month_names = [		"Tammikuu",		"Helmikuu",		"Maaliskuu",		"Huhtikuu",		"Toukokuu",		"Kesäkuu",		"Heinäkuu",		"Elokuu",		"Syyskuu",		"Lokakuu",		"Marraskuu",		"Joulukuu",	];	const current_month = new Date().getMonth(); // 0から11の値を返す	updateMonthNamesDisplay(		japanese_month_names[current_month],		english_month_names[current_month],		ukrainian_month_names[current_month],		ukrainian_alphabet_month_names[current_month],		swedish_month_names[current_month],		suomi_month_names[current_month],	);}/** * 月名表示を更新 */function updateMonthNamesDisplay(jp, en, ua, ua_en, se, fi) {	const month_names_element = document.getElementById("month_names");	if (month_names_element) {		month_names_element.innerHTML = `            JP: ${jp}<br>            EN: ${en}<br>
            UA: ${ua}<br>
            UA_EN: ${ua_en}<br>
            SE: ${se}<br>
            FI: ${fi}
        `;
	}
}
