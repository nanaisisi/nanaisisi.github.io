/* tslint:disable */
/* eslint-disable */
export function get_current_month(): number;
export function get_japanese_month_name(month_index: number): string;
export function get_english_month_name(month_index: number): string;
export function get_ukrainian_month_name(month_index: number): string;
export function get_ukrainian_alphabet_month_name(month_index: number): string;
export function get_swedish_month_name(month_index: number): string;
export function get_suomi_month_name(month_index: number): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly get_current_month: () => number;
  readonly get_japanese_month_name: (a: number) => [number, number];
  readonly get_english_month_name: (a: number) => [number, number];
  readonly get_ukrainian_month_name: (a: number) => [number, number];
  readonly get_ukrainian_alphabet_month_name: (a: number) => [number, number];
  readonly get_swedish_month_name: (a: number) => [number, number];
  readonly get_suomi_month_name: (a: number) => [number, number];
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
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
