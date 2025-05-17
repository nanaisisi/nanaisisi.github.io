# nanaisisi.github.io
cd nanai_wasm_rs

cargo update

deno outdated --update --latest

deno run --allow-net --allow-read test\server.ts
