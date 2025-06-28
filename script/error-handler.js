/**
 * エラーハンドリングとデバッグ用のユーティリティ
 */

/**
 * 未処理のPromise拒否をキャッチしてログに出力
 */
window.addEventListener("unhandledrejection", (event) => {
	// Chrome拡張機能関連のエラーは無視
	if (event.reason && typeof event.reason === "object") {
		const message = event.reason.message || event.reason.toString();
		if (
			message.includes("message channel closed") ||
			message.includes("listener indicated an asynchronous response")
		) {
			console.warn(
				"Chrome extension message channel warning (ignored):",
				message,
			);
			event.preventDefault();
			return;
		}
	}

	console.error("Unhandled promise rejection:", event.reason);
});

/**
 * グローバルエラーハンドラー
 */
window.addEventListener("error", (event) => {
	// Chrome拡張機能関連のエラーは無視
	const message = event.message || "";
	if (
		message.includes("message channel closed") ||
		message.includes("listener indicated an asynchronous response")
	) {
		console.warn("Chrome extension error (ignored):", message);
		return;
	}

	console.error("Global error:", event.error);
});

/**
 * 安全な非同期関数実行ヘルパー
 * @param {Function} asyncFn 非同期関数
 * @param {string} context エラーコンテキスト
 */
export async function safeExecuteAsync(asyncFn, context = "unknown") {
	try {
		return await asyncFn();
	} catch (error) {
		console.error(`Error in ${context}:`, error);
		return null;
	}
}

/**
 * デバッグ情報を出力
 */
export function logDebugInfo() {
	console.log("Debug Info:", {
		userAgent: navigator.userAgent,
		location: window.location.href,
		timestamp: new Date().toISOString(),
		hasWasmSupport: typeof WebAssembly !== "undefined",
	});
}
