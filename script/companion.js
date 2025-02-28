function menu_button() {
	// メニューの開閉機能
	const menu_tab = document.getElementById("menu_tab");
	const toggle_menu_btn = document.getElementById("toggle_menu_btn");
	toggle_menu_btn.onclick = () => {
		if (menu_tab.style.display === "none") {
			menu_tab.style.display = "block";
		} else {
			menu_tab.style.display = "none";
		}
	};
}

// 旧暦の和風月名を表示する関数
function display_japanese_month_name() {
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
	const ukrainian_kana_month_names = [
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
	const swed_kanaish_kana_month_names = [
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
	const suomi_kana_month_names = [
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
	const swedish_now_month_name = swedish_month_names[current_month];
	const suomi_now_month_name = suomi_month_names[current_month];
	const month_name_element = document.getElementById("month_name");
	if (month_name_element) {
		month_name_element.innerHTML = `
            JP:${japanese_now_month_name}<br>
            EM:${english_now_month_name}<br>
            FI:${ukrainian_now_month_name}<br>
            SE:${swedish_now_month_name}<br>
            UA:${suomi_now_month_name}
        `;
	}
}

// ページロード
window.addEventListener("load", () => {
	if (tp_top()) {
		tp_top();
	}
});

window.addEventListener("load", () => {
	if (menu_button()) {
		menu_button();
	}
});
window.addEventListener("load", () => {
	display_japanese_month_name();
});
