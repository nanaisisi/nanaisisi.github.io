/* tslint:disable */
/* eslint-disable */
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
export class JsError {
  free(): void;
  constructor(message: string);
  readonly message: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
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
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly closure27_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure39_externref_shim: (a: number, b: number, c: any, d: any) => void;
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
