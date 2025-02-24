function menu_button() {
	// メニューの開閉機能
	const menuTab = document.getElementById("menu_tab");
	const toggleMenuBtn = document.getElementById("toggle_menu_btn");
	toggleMenuBtn.onclick = () => {
		if (menuTab.style.display === "none") {
			menuTab.style.display = "block";
		} else {
			menuTab.style.display = "none";
		}
	};
}

// 旧暦の和風月名を表示する関数
function displayJapaneseMonthName() {
	const japaneseMonthNames = [
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
	const currentMonth = new Date().getMonth(); // 0から11の値を返す
	const japaneseMonthName = japaneseMonthNames[currentMonth];
	const monthNameElement = document.getElementById("japanese_month_name");
	if (monthNameElement) {
		monthNameElement.textContent = japaneseMonthName;
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
	displayJapaneseMonthName();
});
