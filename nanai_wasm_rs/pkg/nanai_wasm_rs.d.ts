/* tslint:disable */
/* eslint-disable */
<<<<<<< HEAD
<<<<<<< HEAD
export function get_current_month(): number;
export function get_month_name(month_index: number, language_code: string): string;
export function get_month_name_async(month_index: number, language_code: string): Promise<any>;
export function get_month_names_all(month_index: number): any;
export function get_japanese_month_name(month_index: number): string;
export function get_english_month_name(month_index: number): string;
export function get_ukrainian_month_name(month_index: number): string;
export function get_ukrainian_alphabet_month_name(month_index: number): string;
export function get_swedish_month_name(month_index: number): string;
export function get_suomi_month_name(month_index: number): string;
=======
=======
>>>>>>> 817e691 (ok)
<<<<<<< HEAD

>>>>>>> 8d7dade (ok)
export class JsError {
  free(): void;
  constructor(message: string);
  readonly message: string;
}

<<<<<<< HEAD
=======
export class NavigationConfig {
  free(): void;
  [Symbol.dispose](): void;
  getPageUrl(page_id: string): string | undefined;
  getPageTitle(page_id: string): string | undefined;
  buildBreadcrumb(page_id: string): string | undefined;
  getAllCategories(): string[];
  getPagesByCategory(category: string): string[];
  constructor(base_url: string);
}

export class SiteConfig {
  free(): void;
  [Symbol.dispose](): void;
  getVersion(): string;
  exportConfig(): string;
  getSiteName(): string;
  importConfig(json_config: string): void;
  enableFeature(feature: string): void;
  disableFeature(feature: string): void;
  getCompactMode(): boolean;
  setCompactMode(compact: boolean): void;
  getMenuAutoHide(): boolean;
  isFeatureEnabled(feature: string): boolean;
  setMenuAutoHide(auto_hide: boolean): void;
  getShowBreadcrumbs(): boolean;
  setShowBreadcrumbs(show: boolean): void;
  constructor();
}

export enum Theme {
  Light = 0,
  Dark = 1,
  Auto = 2,
}

export class ThemeConfig {
  free(): void;
  [Symbol.dispose](): void;
  toggleTheme(): Theme;
  getCurrentTheme(): Theme;
  setUserPreference(theme: Theme): void;
  getThemeClassName(): string;
  updateSystemPreference(is_dark: boolean): void;
  constructor();
}

export function createNavigationConfig(base_url: string): NavigationConfig;

export function createSiteConfig(): SiteConfig;

export function createThemeConfig(): ThemeConfig;

export function generateSitemap(base_url: string): string;

export function getSiteInfo(): any;

export function getThemeSettings(): any;

export function get_current_month(): number;

export function get_czech_month_name(month_index: number): string;

export function get_english_month_name(month_index: number): string;

export function get_estonian_month_name(month_index: number): string;

export function get_japanese_month_name(month_index: number): string;

export function get_latvian_month_name(month_index: number): string;

export function get_lithuanian_month_name(month_index: number): string;

export function get_month_name(month_index: number, language_code: string): string;

export function get_month_name_async(month_index: number, language_code: string): Promise<any>;

export function get_month_names_all(month_index: number): any;

export function get_polish_month_name(month_index: number): string;

export function get_slovak_month_name(month_index: number): string;

export function get_suomi_month_name(month_index: number): string;

export function get_swedish_month_name(month_index: number): string;

export function get_ukrainian_alphabet_month_name(month_index: number): string;

export function get_ukrainian_month_name(month_index: number): string;
=======
=======
>>>>>>> bd4f053 (ok)
export function get_current_month(): number;
export function get_month_name(month_index: number, language_code: string): string;
export function get_month_name_async(month_index: number, language_code: string): Promise<any>;
export function get_month_names_all(month_index: number): any;
export function get_japanese_month_name(month_index: number): string;
export function get_english_month_name(month_index: number): string;
export function get_ukrainian_month_name(month_index: number): string;
export function get_ukrainian_alphabet_month_name(month_index: number): string;
export function get_swedish_month_name(month_index: number): string;
export function get_suomi_month_name(month_index: number): string;
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2dd3de3 (ok)
=======
>>>>>>> bd4f053 (ok)
=======
export class JsError {
  free(): void;
  constructor(message: string);
  readonly message: string;
}
>>>>>>> 69d9913 (yet)

>>>>>>> 8d7dade (ok)
export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  readonly __wbg_jserror_free: (a: number, b: number) => void;
  readonly jserror_new: (a: number, b: number) => number;
  readonly jserror_message: (a: number) => [number, number];
  readonly get_current_month: () => number;
  readonly get_month_name: (a: number, b: number, c: number) => [number, number, number, number];
  readonly get_month_name_async: (a: number, b: number, c: number) => any;
  readonly get_month_names_all: (a: number) => [number, number, number];
  readonly get_japanese_month_name: (a: number) => [number, number];
  readonly get_english_month_name: (a: number) => [number, number];
  readonly get_ukrainian_month_name: (a: number) => [number, number];
  readonly get_ukrainian_alphabet_month_name: (a: number) => [number, number];
  readonly get_swedish_month_name: (a: number) => [number, number];
  readonly get_suomi_month_name: (a: number) => [number, number];
<<<<<<< HEAD
=======
  readonly get_polish_month_name: (a: number) => [number, number];
  readonly get_czech_month_name: (a: number) => [number, number];
  readonly get_slovak_month_name: (a: number) => [number, number];
  readonly get_lithuanian_month_name: (a: number) => [number, number];
  readonly get_latvian_month_name: (a: number) => [number, number];
  readonly get_estonian_month_name: (a: number) => [number, number];
>>>>>>> 23ec7fa (ok)
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
<<<<<<< HEAD
  readonly closure27_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure39_externref_shim: (a: number, b: number, c: any, d: any) => void;
=======
  readonly __externref_drop_slice: (a: number, b: number) => void;
=======
=======
>>>>>>> bd4f053 (ok)
=======
  readonly __wbg_jserror_free: (a: number, b: number) => void;
  readonly jserror_new: (a: number, b: number) => number;
  readonly jserror_message: (a: number) => [number, number];
>>>>>>> 9e2ac12 (ok)
  readonly get_current_month: () => number;
  readonly get_month_name: (a: number, b: number, c: number) => [number, number, number, number];
  readonly get_month_name_async: (a: number, b: number, c: number) => any;
  readonly get_month_names_all: (a: number) => [number, number, number];
  readonly get_japanese_month_name: (a: number) => [number, number];
  readonly get_english_month_name: (a: number) => [number, number];
  readonly get_ukrainian_month_name: (a: number) => [number, number];
  readonly get_ukrainian_alphabet_month_name: (a: number) => [number, number];
  readonly get_swedish_month_name: (a: number) => [number, number];
  readonly get_suomi_month_name: (a: number) => [number, number];
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2dd3de3 (ok)
<<<<<<< HEAD
>>>>>>> 8d7dade (ok)
=======
=======
>>>>>>> bd4f053 (ok)
<<<<<<< HEAD
>>>>>>> 817e691 (ok)
=======
=======
  readonly closure29_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure41_externref_shim: (a: number, b: number, c: any, d: any) => void;
>>>>>>> 69d9913 (yet)
<<<<<<< HEAD
>>>>>>> 906146a (yet menu css)
=======
=======
=======
  readonly __externref_table_dealloc: (a: number) => void;
>>>>>>> 9e2ac12 (ok)
  readonly closure27_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure39_externref_shim: (a: number, b: number, c: any, d: any) => void;
>>>>>>> 91b1784 (ok)
>>>>>>> dcfe758 (debugger)
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 817e691 (ok)
<<<<<<< HEAD

=======
>>>>>>> 2dd3de3 (ok)
<<<<<<< HEAD
>>>>>>> 8d7dade (ok)
=======
=======
>>>>>>> bd4f053 (ok)
>>>>>>> 817e691 (ok)
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
