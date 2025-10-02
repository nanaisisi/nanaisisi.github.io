/**
 * テーマ関連の初期化を行う
 */
export function initThemeManager() {
	// テーマ設定の適用
	applyStoredTheme();

	// テーマメッセージリスナーのセットアップ
	setupThemeMessageListener();

	// テーマ切り替えボタンの初期化
	const themeToggleBtn = document.getElementById("theme_toggle_btn");
	if (themeToggleBtn) {
		themeToggleBtn.addEventListener("click", toggleTheme);
	}
}

/**
 * テーマを切り替える
 */
export function toggleTheme() {
	const body = document.body;
	if (body.classList.contains("light-theme")) {
		body.classList.remove("light-theme");
		body.classList.add("dark-theme");
		localStorage.setItem("theme", JSON.stringify("dark"));
	} else {
		body.classList.remove("dark-theme");
		body.classList.add("light-theme");
		localStorage.setItem("theme", JSON.stringify("light"));
	}

	// テーマ変更を他のページに通知
	if (window.parent && window.parent !== window) {
		// iframeから親ページへの通知
		const themeItem = localStorage.getItem("theme");
		let theme = null;
		if (themeItem) {
			try {
				theme = JSON.parse(themeItem);
			} catch (e) {
				theme = themeItem;
			}
		}
		window.parent.postMessage(
			{ type: "theme-change", theme: theme },
			"*",
		);
	} else {
		// 親ページからiframeへの通知
		const iframes = document.querySelectorAll("iframe");
		// biome-ignore lint/complexity/noForEach: <explanation>
		iframes.forEach((iframe) => {
			try {
				const themeItem = localStorage.getItem("theme");
				let theme = null;
				if (themeItem) {
					try {
						theme = JSON.parse(themeItem);
					} catch (e) {
						theme = themeItem;
					}
				}
				iframe.contentWindow.postMessage(
					{ type: "theme-change", theme: theme },
					"*",
				);
			} catch (e) {
				console.error("Failed to send theme to iframe:", e);
			}
		});
	}
}

/**
 * メッセージイベントを監視して他ページからのテーマ変更を受け取る
 */
function setupThemeMessageListener() {
	window.addEventListener("message", (event) => {
		// メッセージがテーマ変更に関するものかチェック
		if (event.data && event.data.type === "theme-change") {
			const newTheme = event.data.theme;
			const body = document.body;

			// 受け取ったテーマを適用
			if (newTheme === "dark") {
				body.classList.remove("light-theme");
				body.classList.add("dark-theme");
				localStorage.setItem("theme", JSON.stringify("dark"));
			} else if (newTheme === "light") {
				body.classList.remove("dark-theme");
				body.classList.add("light-theme");
				localStorage.setItem("theme", JSON.stringify("light"));
			}
		}
	});
}

/**
 * 保存されたテーマ設定を適用
 */
function applyStoredTheme() {
	const storedItem = localStorage.getItem("theme");
	let storedTheme = null;

	if (storedItem) {
		try {
			// 新しいJSON形式を試す
			storedTheme = JSON.parse(storedItem);
		} catch (e) {
			// 古い形式（文字列）の場合
			storedTheme = storedItem;
		}
	}

	const body = document.body;

	if (storedTheme) {
		if (storedTheme === "dark") {
			body.classList.remove("light-theme");
			body.classList.add("dark-theme");
		} else {
			body.classList.remove("dark-theme");
			body.classList.add("light-theme");
		}
	} else {
		// ユーザーの設定がなければダークテーマをデフォルトとして使用する
		body.classList.remove("light-theme");
		body.classList.add("dark-theme");
		// オプションでローカルストレージにも保存（次回以降のためのデフォルト設定）
		localStorage.setItem("theme", JSON.stringify("dark"));
	}
}
