# AI 生成です。

# nanaisisi.github.io

# How to

#nushell

#locate root<br />
cd nanai_wasm_rs;cargo update

#locate root<br />
cd nanai_wasm_rs; cargo build

#locate root<br />
cd nanai_wasm_rs; wasm-pack build --target web

#locate root<br />
deno outdated --update --latest

#locate root<br />
deno run --allow-net --allow-read test\server.ts

# structure

- right:content-page
- right-example:index.html
- left:menu.html

## backside

- JavaScript
- WASM(Rust)

## Development

- Start local dev server: `deno run --allow-net --allow-read test/server.ts`
- Access at: http://localhost:8000
- WASM modules load automatically via wasm-bindgen
- Theme preferences stored as JSON in localStorage for compatibility

## Dev phase

- Nushell
- VSCode
- Deno

## License

All files in the [img](./img) and [pages](./pages), [doc](./doc), [nanai_wasm_rs](./nanai_wasm_rs) folders are licensed with [Apache License 2.0](./doc/LICENSE-APACHE) + [MIT License](./doc/LICENSE-MIT). The rest of the files in this repository are licensed with [CC0](./LICENSE).
