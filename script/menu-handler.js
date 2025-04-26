/**
 * メニューボタンの初期化と制御を行う
 */
export function initMenuButton() {
	const toggle_menu_btn = document.getElementById("toggle_menu_btn");
	const menu_tab = document.getElementById("menu_tab");

<<<<<<< HEAD
	if (menu_tab) {
		menu_tab.style.display = "none";
	} else {
		console.warn("Menu element not found: menu_tab");
=======
	// メニューの初期状態を非表示に設定
	if (menu_tab) {
		menu_tab.style.display = "none";
>>>>>>> 44eb280 (divide)
	}

	setupMenuToggle(toggle_menu_btn, menu_tab);
}

/**
 * メニュートグル機能を設定
 * @param {HTMLElement} toggle_menu_btn メニュートグルボタン要素
 * @param {HTMLElement} menu_tab メニュータブ要素
 */
function setupMenuToggle(toggle_menu_btn, menu_tab) {
	if (toggle_menu_btn && menu_tab) {
		toggle_menu_btn.onclick = () => {
			if (menu_tab.style.display === "block") {
				menu_tab.style.display = "none";
<<<<<<< HEAD
				document.body.classList.remove("menu-open");
			} else {
				menu_tab.style.display = "block";
				document.body.classList.add("menu-open");
			}
		};
	} else {
		console.warn(
			`Menu elements not found. Button: ${toggle_menu_btn ? "✓" : "✗"}, Menu: ${menu_tab ? "✓" : "✗"}`,
		);
=======
			} else if (menu_tab.style.display === "none") {
				menu_tab.style.display = "block";
			} else {
				console.error("Unexpected menu state");
			}
		};
	} else {
		console.error("Menu elements not found");
>>>>>>> 44eb280 (divide)
	}
}
