/**
 * 現在のページの場所に基づいてWASMファイルへの正しいパスを決定する
 * @returns {string} WASMファイルへのパス
 */
function getWasmPath() {
	const currentPath = window.location.pathname;

	// ルートディレクトリの場合
	if (
		currentPath === "/" ||
		currentPath.endsWith("index.html") ||
		currentPath.endsWith("/")
	) {
		return "./nanai_wasm_rs/pkg/nanai_wasm_rs_bg.wasm";
	}

	// pages直下の場合
	if (
		currentPath.includes("/pages/") &&
		!currentPath.includes("/pages/mil/") &&
		!currentPath.includes("/pages/tech/")
	) {
		return "../nanai_wasm_rs/pkg/nanai_wasm_rs_bg.wasm";
	}

	// pages/mil/ または pages/tech/ の場合
	if (
		currentPath.includes("/pages/mil/") ||
		currentPath.includes("/pages/tech/")
	) {
		return "../../nanai_wasm_rs/pkg/nanai_wasm_rs_bg.wasm";
	}

	// test/ の場合
	if (currentPath.includes("/test/")) {
		return "../nanai_wasm_rs/pkg/nanai_wasm_rs_bg.wasm";
	}

	// デフォルト（ルートからの相対パス）
	return "./nanai_wasm_rs/pkg/nanai_wasm_rs_bg.wasm";
}

/**
 * WebAssemblyモジュールをロードする関数
 * @returns {Promise<Object|null>} ロードされたWASMモジュールまたはnull
 */
export async function loadWasm() {
	try {
		// WASMファイルを動的パスで直接ロード
		const wasmPath = getWasmPath();
		console.log(
			`Loading WASM from path: ${wasmPath} (current location: ${window.location.pathname})`,
		);

		// 文字列デコーダー
		const textDecoder = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true,
		});

		// WASMモジュールをインスタンス化
		const wasmModule = await WebAssembly.instantiateStreaming(fetch(wasmPath), {
			wbg: {
				__wbindgen_throw: (ptr, len) => {
					// メモリが利用可能になってから使用
					const memory = wasmModule.instance.exports.memory;
					const decoder = new TextDecoder("utf-8");
					const memoryArray = new Uint8Array(memory.buffer);
					const message = decoder.decode(memoryArray.subarray(ptr, ptr + len));
					throw new Error(message);
				},
				__wbindgen_rethrow: (exn) => {
					throw exn;
				},
				__wbg_jserror_new: (ptr) => {
					return new Error("WASM Error");
				},
				__wbindgen_object_drop_ref: () => {},
				__wbindgen_jsval_eq: (a, b) => a === b,
				__wbindgen_boolean_get: (i) => Boolean(i),
				__wbindgen_number_get: (i) => Number(i),
				__wbindgen_number_new: (i) => i,
				__wbindgen_string_get: (arg0, arg1) => {
					const memory = wasmModule.instance.exports.memory;
					const decoder = new TextDecoder("utf-8");
					const memoryArray = new Uint8Array(memory.buffer);
					return decoder.decode(memoryArray.subarray(arg0, arg0 + arg1));
				},
				__wbindgen_is_null: (i) => i === null,
				__wbindgen_is_undefined: (i) => i === undefined,
				__wbindgen_is_function: (i) => typeof i === "function",
				__wbg_call_672a4d21634d4a24: () => {},
				__wbg_call_7cccdd69e0791ae2: () => {},
				__wbg_getMonth_d37edcd23642c97d: () => new Date().getMonth(),
				__wbg_new0_f788a2397c7ca929: () => new Date(),
				__wbg_new_23a2665fac83c611: () => {},
				__wbg_new_78feb108b6472713: () => {},
				__wbg_newnoargs_105ed471475aaf50: () => {},
				__wbg_push_737cfc8c1432c2c6: () => {},
				__wbg_queueMicrotask_97d92b4fcc8a61c5: () => {},
				__wbg_queueMicrotask_d3219def82552485: () => {},
				__wbg_resolve_4851785c9c5f573d: () => {},
				__wbg_static_accessor_GLOBAL_88a902d13a557d07: () => globalThis,
				__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: () => globalThis,
				__wbg_static_accessor_SELF_37c5d418e4bf5819: () => self,
				__wbg_static_accessor_WINDOW_5de37043a91a9c40: () => window,
				__wbg_then_44b73946d2fb3e7d: () => {},
				__wbindgen_cb_drop: () => {},
				__wbindgen_closure_wrapper130: () => {},
				__wbindgen_closure_wrapper468: () => {},
				__wbindgen_init_externref_table: () => {},
				// JSON/Serde関連の関数
				__wbindgen_json_parse: (ptr, len) => {
					const memory = wasmModule.instance.exports.memory;
					const decoder = new TextDecoder("utf-8");
					const memoryArray = new Uint8Array(memory.buffer);
					const jsonStr = decoder.decode(memoryArray.subarray(ptr, ptr + len));
					return JSON.parse(jsonStr);
				},
				__wbindgen_json_serialize: (obj) => {
					return JSON.stringify(obj);
				},
				// その他の必要な関数
				__wbindgen_describe: () => {},
				__wbindgen_describe_closure: () => {},
				__wbindgen_externref_table_grow: () => {},
				__wbindgen_externref_table_set_null: () => {},
			},
		});

		// WebAssemblyのインスタンスから関数を取得
		const wasmInstance = wasmModule.instance;
		const wasmExports = wasmInstance.exports;
		const wasmMemory = wasmExports.memory;

		// 文字列をデコードする関数
		function getStringFromWasm(ptr, len) {
			const memory = new Uint8Array(wasmMemory.buffer);
			return textDecoder.decode(memory.subarray(ptr, ptr + len));
		}

		// 関数をラップしてJavaScriptから呼び出し可能にする
		const wrappedFunctions = {
			get_current_month: () => {
				return wasmExports.get_current_month();
			},

			get_month_name: (month_index, language_code) => {
				// 文字列をWASMメモリに書き込む
				const stringBytes = new TextEncoder().encode(language_code);
				const stringPtr = wasmExports.__wbindgen_malloc(stringBytes.length);
				const memory = new Uint8Array(wasmMemory.buffer);
				memory.set(stringBytes, stringPtr);

				try {
					const ret = wasmExports.get_month_name(
						month_index,
						stringPtr,
						stringBytes.length,
					);
					if (ret[3]) {
						// エラーが発生した場合
						throw new Error("Month name lookup failed");
					}
					const result = getStringFromWasm(ret[0], ret[1]);
					if (wasmExports.__wbindgen_free) {
						wasmExports.__wbindgen_free(ret[0], ret[1], 1);
					}
					return result;
				} finally {
					wasmExports.__wbindgen_free(stringPtr, stringBytes.length, 1);
				}
			},

			get_month_name_async: (month_index, language_code) => {
				// 文字列をWASMメモリに書き込む
				const stringBytes = new TextEncoder().encode(language_code);
				const stringPtr = wasmExports.__wbindgen_malloc(stringBytes.length);
				const memory = new Uint8Array(wasmMemory.buffer);
				memory.set(stringBytes, stringPtr);

				try {
					const ret = wasmExports.get_month_name_async(
						month_index,
						stringPtr,
						stringBytes.length,
					);
					return ret;
				} finally {
					wasmExports.__wbindgen_free(stringPtr, stringBytes.length, 1);
				}
			},

			get_month_names_all: (month_index) => {
				const ret = wasmExports.get_month_names_all(month_index);
				if (ret[2]) {
					// エラーが発生した場合
					throw new Error("Month names lookup failed");
				}
				return ret[0]; // JS Arrayが返される
			},

			get_japanese_month_name: (month_index) => {
				const ret = wasmExports.get_japanese_month_name(month_index);
				// retは配列 [ptr, len] の形式で返される
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_english_month_name: (month_index) => {
				const ret = wasmExports.get_english_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_ukrainian_month_name: (month_index) => {
				const ret = wasmExports.get_ukrainian_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_ukrainian_alphabet_month_name: (month_index) => {
				const ret = wasmExports.get_ukrainian_alphabet_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_swedish_month_name: (month_index) => {
				const ret = wasmExports.get_swedish_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_suomi_month_name: (month_index) => {
				const ret = wasmExports.get_suomi_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_polish_month_name: (month_index) => {
				const ret = wasmExports.get_polish_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_czech_month_name: (month_index) => {
				const ret = wasmExports.get_czech_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_slovak_month_name: (month_index) => {
				const ret = wasmExports.get_slovak_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_lithuanian_month_name: (month_index) => {
				const ret = wasmExports.get_lithuanian_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_latvian_month_name: (month_index) => {
				const ret = wasmExports.get_latvian_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			get_estonian_month_name: (month_index) => {
				const ret = wasmExports.get_estonian_month_name(month_index);
				const result = getStringFromWasm(ret[0], ret[1]);
				if (wasmExports.__wbindgen_free) {
					wasmExports.__wbindgen_free(ret[0], ret[1], 1);
				}
				return result;
			},

			// 新機能: テーマ管理
			createThemeConfig: () => {
				if (wasmExports.createThemeConfig) {
					return wasmExports.createThemeConfig();
				}
				return null;
			},

			getThemeSettings: () => {
				if (wasmExports.getThemeSettings) {
					return wasmExports.getThemeSettings();
				}
				return null;
			},

			// 新機能: ナビゲーション管理
			createNavigationConfig: (base_url) => {
				if (wasmExports.createNavigationConfig) {
					return wasmExports.createNavigationConfig(base_url);
				}
				return null;
			},

			generateSitemap: (base_url) => {
				if (wasmExports.generateSitemap) {
					const ret = wasmExports.generateSitemap(base_url);
					const result = getStringFromWasm(ret[0], ret[1]);
					if (wasmExports.__wbindgen_free) {
						wasmExports.__wbindgen_free(ret[0], ret[1], 1);
					}
					return result;
				}
				return null;
			},

			// 新機能: 設定管理
			createSiteConfig: () => {
				if (wasmExports.createSiteConfig) {
					return wasmExports.createSiteConfig();
				}
				return null;
			},

			getSiteInfo: () => {
				if (wasmExports.getSiteInfo) {
					return wasmExports.getSiteInfo();
				}
				return null;
			},
		};

		console.log("WASM loaded successfully!");
		console.log("Available WASM exports:", Object.keys(wasmExports));
		return wrappedFunctions;
	} catch (error) {
		console.error("Error loading WASM:", error);
		return null;
	}
}
