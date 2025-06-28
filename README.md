# nanaisisi.github.io
cd nanai_wasm_rs

cargo update

deno outdated --update --latest

deno run --allow-net --allow-read test\server.ts

## License

All files in the [img](./img) and [pages](./pages), [doc](./doc) folders are licensed with  [Apache License 2.0](./doc/LICENSE-APACHE) + [MIT License](./doc/LICENSE-MIT). The rest of the files in this repository are licensed with [CC0](./LICENSE).
