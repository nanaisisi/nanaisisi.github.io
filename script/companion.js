function tp_top() {
	const tp_top_btn = document.getElementById("tp_top_btn");
	/** @type {HTMLFrameElement} */
	const top_iframe = document.getElementById("top_iframe");
	if (top_iframe) {
		const top_iframe_window = top_iframe.contentWindow;
		if (tp_top_btn) {
			tp_top_btn.addEventListener("click", () => {
				if (top_iframe_window)
					top_iframe_window.scroll({
						top: 0,
						behavior: "smooth",
					});
			});
		}
	}

	const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const darkModeOn = darkModeMediaQuery.matches;
	const color_scheme_btn = document.getElementById("scheme_toggle");
	if (color_scheme_btn) {
		color_scheme_btn.addEventListener("click", () => {
			if (darkModeOff) {
				document.documentElement.classList.add("darkmode");
			} else {
				document.documentElement.classList.remove("darkmode");
			}
		});
	}
}
function menu_button() {
	const number_display = document.getElementById("number_display");
	const count_up_btn = document.getElementById("count_up_btn");
	let count_value = 0;
	let count_value_str = String(0);
	if (count_up_btn) {
		count_up_btn.onclick = () => {
			count_value += 1;
			count_value_str = String(count_value);
			if (number_display) {
				number_display.innerHTML = count_value_str;
			}
		};
	}

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
