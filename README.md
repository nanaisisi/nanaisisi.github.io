# AI 生成です。

# nanaisisi.github.io
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7f8fa00 (fin)

![Rust CI](https://github.com/nanaisisi/nanaisisi.github.io/actions/workflows/rust.yml/badge.svg)
![Release Workflow](https://github.com/nanaisisi/nanaisisi.github.io/actions/workflows/release.yml/badge.svg)

# How to
<<<<<<< HEAD

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

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
## Automation Pipeline (CI & Updates)

| Stage                            | Trigger             | Action                                                       | Output                               |
| -------------------------------- | ------------------- | ------------------------------------------------------------ | ------------------------------------ |
| Dependabot (Cargo)               | Daily               | Opens PRs for dependency updates in `nanai_wasm_rs`          | PR with version bumps                |
| Dependabot (GitHub Actions)      | Weekly              | Suggests workflow action version updates                     | PR with action bumps                 |
| Build Workflow (`rust.yml`)      | Push / PR to `main` | Cache + fmt + clippy + native build + test + wasm-pack build | WASM artifacts (not committed on PR) |
| Commit Job (`rust.yml`)          | Push on `main` only | Downloads artifact, commits updated `nanai_wasm_rs/pkg`      | Versioned WASM output                |
| Release Workflow (`release.yml`) | Tag push `v*`       | Release build, package artifacts, publish GitHub Release     | tar.gz + wasm binaries               |

運用ポリシー:

将来検討:

- `cargo audit` をブロッキング化する運用方針への切替。

>>>>>>> 0f31362 (broken)
>>>>>>> 6bfd3c1 (ok)
## How to Release

1. バージョン決定: セマンティックバージョン (例: `v0.2.0`).
2. 変更確認: ローカルで `nanai_wasm_rs` をビルド & テスト。
<<<<<<< HEAD
=======
3. タグ付与:
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```
4. GitHub Actions が `release.yml` を実行し以下を生成:
   - 最適化済み WASM (`wasm-pack --release`)
   - アーカイブ: `wasm-artifacts-<tag>.tar.gz`
   - 個別 wasm バイナリ zip: `wasm-binaries-<tag>.zip`
5. 自動生成された GitHub Release を確認し、必要なら Release Notes を追記。

### Optional: ブロッキングセキュリティモード

`cargo audit` を失敗扱いにするには `rust.yml` の該当ステップを:

```yaml
		- name: Security audit (blocking)
		  run: cd nanai_wasm_rs && cargo audit
```

に変更。

### Rollback

問題が発生した場合:

```bash
git revert <problematic-commit>
git push
```

タグを取り消す場合:

```bash
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0
```

- wasm-pack から wasm-bindgen 生フローへの完全移行統一。
- リリースタグ自動生成ワークフローの追加。
- `pkg/` をコミットせず Pages ビルド工程へ分離する代替案。
>>>>>>> 0f31362 (broken)

>>>>>>> 35df5f2 (rollback doc)
## Dev phase

- Nushell
- VSCode
- Deno

## License

<<<<<<< HEAD
<<<<<<< HEAD
All files in the [img](./img) and [pages](./pages), [doc](./doc) folders are licensed with  [Apache License 2.0](./doc/LICENSE-APACHE) + [MIT License](./doc/LICENSE-MIT). The rest of the files in this repository are licensed with [CC0](./LICENSE).
=======
All files in the [img](./img) and [pages](./pages), [doc](./doc), [nanai_wasm_rs](./nanai_wasm_rs) folders are licensed with [Apache License 2.0](./doc/LICENSE-APACHE) + [MIT License](./doc/LICENSE-MIT). The rest of the files in this repository are licensed with [CC0](./LICENSE).
>>>>>>> 6d5778d (index changelog)
=======
All files are licensed with [Apache License 2.0](./LICENSE-APACHE) + [MIT License](./doc/LICENSE-MIT).
<<<<<<< HEAD
>>>>>>> a724e4f (re license)
=======
=======
=======
# How to
>>>>>>> e0b33be (ok)
cd nanai_wasm_rs
=======
>>>>>>> f56ec8e (ok)

#nushell

#locate root<br />
cd nanai_wasm_rs;

#locate root<br />
cargo update -Z unstable-options --breaking

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
<<<<<<< HEAD
>>>>>>> e8c6b27 (ok)
<<<<<<< HEAD
>>>>>>> c8c2409 (update)
=======
=======

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

<<<<<<< HEAD
<<<<<<< HEAD
All files in the [img](./img) and [pages](./pages), [doc](./doc) folders are licensed with  [Apache License 2.0](./doc/LICENSE-APACHE) + [MIT License](./doc/LICENSE-MIT). The rest of the files in this repository are licensed with [CC0](./LICENSE).
>>>>>>> ed059b3 (Update README.md)
<<<<<<< HEAD
>>>>>>> e16530f (Rename license.yaml to license.yml)
=======
=======
All files in the [img](./img) and [pages](./pages), [doc](./doc), [nanai_wasm_rs](./nanai_wasm_rs) folders are licensed with  [Apache License 2.0](./doc/LICENSE-APACHE) + [MIT License](./doc/LICENSE-MIT). The rest of the files in this repository are licensed with [CC0](./LICENSE).
>>>>>>> 1d1bb25 (yet)
<<<<<<< HEAD
>>>>>>> 74dc9a4 (menu.html の更新)
=======
=======
All files in the [img](./img) and [pages](./pages), [doc](./doc), [nanai_wasm_rs](./nanai_wasm_rs) folders are licensed with [Apache License 2.0](./doc/LICENSE-APACHE) + [MIT License](./doc/LICENSE-MIT). The rest of the files in this repository are licensed with [CC0](./LICENSE).
>>>>>>> 7f8fa00 (fin)
>>>>>>> cbb0dbd (my_repo_list.html の更新)
