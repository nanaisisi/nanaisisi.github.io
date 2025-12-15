/* tslint:disable */
/* eslint-disable */

export class JsError {
  free(): void;
  [Symbol.dispose](): void;
  constructor(message: string);
  readonly message: string;
}

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

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_jserror_free: (a: number, b: number) => void;
  readonly __wbg_navigationconfig_free: (a: number, b: number) => void;
  readonly __wbg_siteconfig_free: (a: number, b: number) => void;
  readonly __wbg_themeconfig_free: (a: number, b: number) => void;
  readonly createNavigationConfig: (a: number, b: number) => number;
  readonly createSiteConfig: () => number;
  readonly createThemeConfig: () => number;
  readonly generateSitemap: (a: number, b: number) => [number, number];
  readonly getSiteInfo: () => any;
  readonly getThemeSettings: () => any;
  readonly get_current_month: () => number;
  readonly get_czech_month_name: (a: number) => [number, number];
  readonly get_english_month_name: (a: number) => [number, number];
  readonly get_estonian_month_name: (a: number) => [number, number];
  readonly get_japanese_month_name: (a: number) => [number, number];
  readonly get_latvian_month_name: (a: number) => [number, number];
  readonly get_lithuanian_month_name: (a: number) => [number, number];
  readonly get_month_name: (a: number, b: number, c: number) => [number, number, number, number];
  readonly get_month_name_async: (a: number, b: number, c: number) => any;
  readonly get_month_names_all: (a: number) => [number, number, number];
  readonly get_polish_month_name: (a: number) => [number, number];
  readonly get_slovak_month_name: (a: number) => [number, number];
  readonly get_suomi_month_name: (a: number) => [number, number];
  readonly get_swedish_month_name: (a: number) => [number, number];
  readonly get_ukrainian_alphabet_month_name: (a: number) => [number, number];
  readonly get_ukrainian_month_name: (a: number) => [number, number];
  readonly jserror_message: (a: number) => [number, number];
  readonly jserror_new: (a: number, b: number) => number;
  readonly navigationconfig_buildBreadcrumb: (a: number, b: number, c: number) => [number, number];
  readonly navigationconfig_getAllCategories: (a: number) => [number, number];
  readonly navigationconfig_getPageTitle: (a: number, b: number, c: number) => [number, number];
  readonly navigationconfig_getPageUrl: (a: number, b: number, c: number) => [number, number];
  readonly navigationconfig_getPagesByCategory: (a: number, b: number, c: number) => [number, number];
  readonly siteconfig_disableFeature: (a: number, b: number, c: number) => void;
  readonly siteconfig_enableFeature: (a: number, b: number, c: number) => void;
  readonly siteconfig_exportConfig: (a: number) => [number, number, number, number];
  readonly siteconfig_getCompactMode: (a: number) => number;
  readonly siteconfig_getMenuAutoHide: (a: number) => number;
  readonly siteconfig_getShowBreadcrumbs: (a: number) => number;
  readonly siteconfig_getSiteName: (a: number) => [number, number];
  readonly siteconfig_getVersion: (a: number) => [number, number];
  readonly siteconfig_importConfig: (a: number, b: number, c: number) => [number, number];
  readonly siteconfig_isFeatureEnabled: (a: number, b: number, c: number) => number;
  readonly siteconfig_setCompactMode: (a: number, b: number) => void;
  readonly siteconfig_setMenuAutoHide: (a: number, b: number) => void;
  readonly siteconfig_setShowBreadcrumbs: (a: number, b: number) => void;
  readonly themeconfig_getCurrentTheme: (a: number) => number;
  readonly themeconfig_getThemeClassName: (a: number) => [number, number];
  readonly themeconfig_setUserPreference: (a: number, b: number) => void;
  readonly themeconfig_toggleTheme: (a: number) => number;
  readonly themeconfig_updateSystemPreference: (a: number, b: number) => void;
  readonly navigationconfig_new: (a: number, b: number) => number;
  readonly siteconfig_new: () => number;
  readonly themeconfig_new: () => number;
  readonly wasm_bindgen_cba787ebaeaa46e3___convert__closures_____invoke___wasm_bindgen_cba787ebaeaa46e3___JsValue_____: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen_cba787ebaeaa46e3___closure__destroy___dyn_core_bb1c441fd6008630___ops__function__FnMut__wasm_bindgen_cba787ebaeaa46e3___JsValue____Output_______: (a: number, b: number) => void;
  readonly wasm_bindgen_cba787ebaeaa46e3___convert__closures_____invoke___wasm_bindgen_cba787ebaeaa46e3___JsValue__wasm_bindgen_cba787ebaeaa46e3___JsValue_____: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

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
