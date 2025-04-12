function menu_button() {
	// メニューの開閉機能
	const menu_tab = document.getElementById("menu_tab");
	const toggle_menu_open_btn = document.getElementById("toggle_menu_open_btn");
	if (toggle_menu_open_btn) {
		toggle_menu_open_btn.onclick = () => {
			if (menu_tab.style.display === "none") {
				menu_tab.style.display = "block";
			} else if (menu_tab.style.display === "block") {
				menu_tab.style.display = "none";
			} else {
				console.error("Unexpected menu state");
			}
		};
	} else {
		console.error("toggle_menu_open_btn is not found");
	}

	const toggle_menu_close_btn = document.getElementById(
		"toggle_menu_close_btn",
	);
	if (toggle_menu_close_btn) {
		toggle_menu_close_btn.onclick = () => {
			if (menu_tab.style.display === "block") {
				menu_tab.style.display = "none";
			} else if (menu_tab.style.display === "none") {
				menu_tab.style.display = "block";
			} else {
				console.error("Unexpected menu state");
			}
		};
	} else {
		console.error("toggle_menu_close_btn is not found");
	}
}

// メニューを閉じるボタンの関数を追加
function menu_close_button() {
	const menu_tab = document.getElementById("menu_tab");
	if (menu_tab) {
		menu_tab.style.display = "none";
	} else {
		console.error("menu_tab is not found");
	}
}

// 一部国家の月名を表示する関数
function display_now_month_names() {
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

// ページロード時に実行されるイベントリスナーを追加

window.addEventListener("load", () => {
	// メニューを開くボタンと閉じるボタンの関数の読み込み
	if (menu_button) {
		menu_button();
	}

	// 各国の月名を表示する関数の読み込み
	if (display_now_month_names) {
		display_now_month_names();
	}
});
