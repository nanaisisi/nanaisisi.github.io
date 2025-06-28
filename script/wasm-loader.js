/**
 * WebAssemblyモジュールをロードする関数
 * @returns {Promise<Object|null>} ロードされたWASMモジュールまたはnull
 */
export async function loadWasm() {
	try {
		// Wasmモジュールの読み込み
		const wasm = await import("../nanai_wasm_rs/pkg/nanai_wasm_rs.js");
		await wasm.default();
		console.log("WASM loaded successfully!");
		return wasm;
	} catch (error) {
		console.error("Error loading WASM:", error);
		// エラー情報をより詳細に出力
		if (error.message) {
			console.error("Error message:", error.message);
		}
		if (error.stack) {
			console.error("Error stack:", error.stack);
		}
		return null;
	}
}
