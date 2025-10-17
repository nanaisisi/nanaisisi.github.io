/**
 * メニューボタンの初期化と制御を行う
 */
export function initMenuButton() {
	const toggleMenuBtn = document.getElementById("toggle-menu-btn");
	const menuTab = document.getElementById("menu-tab");

	if (!menuTab) {
		// メニュー要素が存在しないページでは何もしない
		return;
	}

	if (menuTab) {
		menuTab.style.display = "none";
	} else {
		console.warn("Menu element not found: menuTab");
	}

	setupMenuToggle(toggleMenuBtn, menuTab);
}

/**
 * メニュートグル機能を設定
 * @param {HTMLElement} toggleMenuBtn メニュートグルボタン要素
 * @param {HTMLElement} menuTab メニュータブ要素
 */
function setupMenuToggle(toggleMenuBtn, menuTab) {
	if (toggleMenuBtn && menuTab) {
		toggleMenuBtn.onclick = () => {
			if (menuTab.style.display === "block") {
				menuTab.style.display = "none";
				document.body.classList.remove("menu-open");
			} else {
				menuTab.style.display = "block";
				document.body.classList.add("menu-open");
			}
		};
	} else {
		console.warn(
			`Menu elements not found. Button: ${toggleMenuBtn ? "✓" : "✗"}, Menu: ${menuTab ? "✓" : "✗"}`,
		);
	}
}
