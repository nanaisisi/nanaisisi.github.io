import initWasm, * as wasmBindings from "../nanai_wasm_rs/pkg/nanai_wasm_rs.js";

const EXPORTED_FUNCTIONS = [
	"get_current_month",
	"get_month_name",
	"get_month_name_async",
	"get_month_names_all",
	"get_japanese_month_name",
	"get_english_month_name",
	"get_ukrainian_month_name",
	"get_ukrainian_alphabet_month_name",
	"get_swedish_month_name",
	"get_suomi_month_name",
	"get_polish_month_name",
	"get_czech_month_name",
	"get_slovak_month_name",
	"get_lithuanian_month_name",
	"get_latvian_month_name",
	"get_estonian_month_name",
	"createThemeConfig",
	"getThemeSettings",
	"createNavigationConfig",
	"generateSitemap",
	"createSiteConfig",
	"getSiteInfo",
];

let wasmExports = null;
let wasmInitPromise = null;

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
	if (wasmExports) {
		return wasmExports;
	}

	if (!wasmInitPromise) {
		const wasmPath = getWasmPath();
		console.log(
			`Loading WASM via wasm-bindgen init from path: ${wasmPath} (current location: ${window.location.pathname})`,
		);

		    wasmInitPromise = initWasm({ module_or_path: wasmPath })
			.then(() => {
				wasmExports = buildWasmExports();
				console.log("WASM initialized successfully");
				return wasmExports;
			})
			.catch((error) => {
				console.error("Error initializing WASM:", error);
				wasmInitPromise = null;
				return null;
			});
	}

	return wasmInitPromise;
}

function buildWasmExports() {
	const exportsObject = {};

	for (const name of EXPORTED_FUNCTIONS) {
		if (typeof wasmBindings[name] === "function") {
			exportsObject[name] = wasmBindings[name];
		}
	}

	return exportsObject;
}
