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
		return null;
	}
}
