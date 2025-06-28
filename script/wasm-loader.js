/**
 * WebAssemblyモジュールをロードする関数
 * @returns {Promise<Object|null>} ロードされたWASMモジュールまたはnull
 */
export async function loadWasm() {
	try {
		// WASMファイルを直接ロード
		const wasmPath = "../nanai_wasm_rs/pkg/nanai_wasm_rs_bg.wasm";
		const wasmModule = await WebAssembly.instantiateStreaming(fetch(wasmPath));

		// WebAssemblyのインスタンスから関数を取得
		const wasmInstance = wasmModule.instance;
		const wasmExports = wasmInstance.exports;

		// メモリとテーブルの初期化
		const memory = wasmExports.memory;
		const __wbindgen_malloc = wasmExports.__wbindgen_malloc;
		const __wbindgen_realloc = wasmExports.__wbindgen_realloc;
		const __wbindgen_free = wasmExports.__wbindgen_free;

		// 文字列デコーダー
		const textDecoder = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true,
		});

		// メモリからUint8Arrayを取得する関数
		function getUint8Memory() {
			return new Uint8Array(memory.buffer);
		}

		// 文字列をデコードする関数
		function getStringFromWasm(ptr, len) {
			return textDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
		}

		// 関数をラップしてJavaScriptから呼び出し可能にする
		const wrappedFunctions = {
			get_current_month: () => {
				return wasmExports.get_current_month();
			},

			get_japanese_month_name: (month_index) => {
				const ret = wasmExports.get_japanese_month_name(month_index);
				const len = wasmExports.get_japanese_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_english_month_name: (month_index) => {
				const ret = wasmExports.get_english_month_name(month_index);
				const len = wasmExports.get_english_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_ukrainian_month_name: (month_index) => {
				const ret = wasmExports.get_ukrainian_month_name(month_index);
				const len = wasmExports.get_ukrainian_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_ukrainian_alphabet_month_name: (month_index) => {
				const ret = wasmExports.get_ukrainian_alphabet_month_name(month_index);
				const len =
					wasmExports.get_ukrainian_alphabet_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_swedish_month_name: (month_index) => {
				const ret = wasmExports.get_swedish_month_name(month_index);
				const len = wasmExports.get_swedish_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_suomi_month_name: (month_index) => {
				const ret = wasmExports.get_suomi_month_name(month_index);
				const len = wasmExports.get_suomi_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_polish_month_name: (month_index) => {
				const ret = wasmExports.get_polish_month_name(month_index);
				const len = wasmExports.get_polish_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_czech_month_name: (month_index) => {
				const ret = wasmExports.get_czech_month_name(month_index);
				const len = wasmExports.get_czech_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_slovak_month_name: (month_index) => {
				const ret = wasmExports.get_slovak_month_name(month_index);
				const len = wasmExports.get_slovak_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_lithuanian_month_name: (month_index) => {
				const ret = wasmExports.get_lithuanian_month_name(month_index);
				const len = wasmExports.get_lithuanian_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_latvian_month_name: (month_index) => {
				const ret = wasmExports.get_latvian_month_name(month_index);
				const len = wasmExports.get_latvian_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},

			get_estonian_month_name: (month_index) => {
				const ret = wasmExports.get_estonian_month_name(month_index);
				const len = wasmExports.get_estonian_month_name_len(month_index);
				const result = getStringFromWasm(ret, len);
				__wbindgen_free(ret, len);
				return result;
			},
		};

		console.log("WASM loaded successfully!");
		return wrappedFunctions;
	} catch (error) {
		console.error("Error loading WASM:", error);
		return null;
	}
}
