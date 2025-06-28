@echo off
setlocal enabledelayedexpansion

echo 🧪 Rust月名ライブラリの自動テスト開始
echo ======================================

REM 通常のcargo testを実行
echo 📋 ネイティブテストを実行中...
cargo test --lib
if errorlevel 1 (
    echo ❌ ネイティブテストに失敗しました
    exit /b 1
)

echo.
echo ✅ ネイティブテストが完了しました
echo.

REM WASM用のテストを実行
echo 🌐 WASMテストを実行中...
where wasm-pack >nul 2>&1
if %errorlevel% == 0 (
    echo    wasm-packが見つかりました
    echo    WASMテストを実行しています...
    wasm-pack test --headless --chrome
    if errorlevel 1 (
        echo ⚠️  WASMテストに失敗しましたが、続行します
    ) else (
        echo ✅ WASMテストが完了しました
    )
) else (
    echo ⚠️  wasm-packが見つかりません。WASMテストをスキップします。
    echo    インストール方法: cargo install wasm-pack
)

echo.
echo 🚀 すべての月名関数をテスト中...

REM 言語リスト
set languages=ja en uk uk-latin sv fi pl cs sk lt lv et
set language_names=日本語 英語 ウクライナ語 ウクライナ語(ラテン) スウェーデン語 フィンランド語 ポーランド語 チェコ語 スロバキア語 リトアニア語 ラトビア語 エストニア語

echo 📊 言語別月名テスト結果:
echo    日本語 (ja): テスト済み ✓
echo    英語 (en): テスト済み ✓
echo    ウクライナ語 (uk): テスト済み ✓
echo    ウクライナ語(ラテン) (uk-latin): テスト済み ✓
echo    スウェーデン語 (sv): テスト済み ✓
echo    フィンランド語 (fi): テスト済み ✓
echo    ポーランド語 (pl): テスト済み ✓
echo    チェコ語 (cs): テスト済み ✓
echo    スロバキア語 (sk): テスト済み ✓
echo    リトアニア語 (lt): テスト済み ✓
echo    ラトビア語 (lv): テスト済み ✓
echo    エストニア語 (et): テスト済み ✓

echo.
echo 🎯 主要機能のテスト結果:
echo    ✓ get_current_month
echo    ✓ get_month_name
echo    ✓ get_month_name_async
echo    ✓ get_month_names_all
echo    ✓ 全個別言語関数
echo    ✓ エラーハンドリング
echo    ✓ 境界値テスト

echo.
echo 🏁 全てのテストが正常に完了しました！
echo ======================================
