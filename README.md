# AI 生成です。

# nanaisisi.github.io

# How to

#nushell

#locate root<br />
cd nanai_wasm_rs;

#locate root<br />
cargo update -Z unstable-options --breaking

#locate root<br />
cargo audit

#locate root<br />
cargo build

#locate root<br />
wasm-pack build --target web

#locate root<br />
cd ..

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

## How to Release

1. バージョン決定: セマンティックバージョン (例: `v0.2.0`).
2. 変更確認: ローカルで `nanai_wasm_rs` をビルド & テスト。

## Dev phase

- Nushell
- VSCode
- Deno

## License

All files are licensed with [Apache License 2.0](./LICENSE-APACHE) + [MIT License](./doc/LICENSE-MIT).
