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
		localStorage.setItem("theme", "dark");
	} else {
		body.classList.remove("dark-theme");
		body.classList.add("light-theme");
		localStorage.setItem("theme", "light");
	}

	// テーマ変更を他のページに通知
	if (window.parent && window.parent !== window) {
		// iframeから親ページへの通知
		window.parent.postMessage(
			{ type: "theme-change", theme: localStorage.getItem("theme") },
			"*",
		);
	} else {
		// 親ページからiframeへの通知
		const iframes = document.querySelectorAll("iframe");
		// biome-ignore lint/complexity/noForEach: <explanation>
		iframes.forEach((iframe) => {
			try {
				iframe.contentWindow.postMessage(
					{ type: "theme-change", theme: localStorage.getItem("theme") },
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
				localStorage.setItem("theme", "dark");
			} else if (newTheme === "light") {
				body.classList.remove("dark-theme");
				body.classList.add("light-theme");
				localStorage.setItem("theme", "light");
			}
		}
	});
}

/**
 * 保存されたテーマ設定を適用
 */
function applyStoredTheme() {
	const storedTheme = localStorage.getItem("theme");
	const body = document.body;
	const prefersDark = window.matchMedia?.(
		"(prefers-color-scheme: dark)",
	).matches;

	if (storedTheme) {
		if (storedTheme === "dark") {
			body.classList.remove("light-theme");
			body.classList.add("dark-theme");
		} else {
			body.classList.remove("dark-theme");
			body.classList.add("light-theme");
		}
	} else {
		// ユーザーの設定がなければシステム設定に合わせる
		if (prefersDark) {
			body.classList.add("dark-theme");
		} else {
			body.classList.add("light-theme");
		}
	}
}
