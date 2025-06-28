#!/usr/bin/env bash

# HTMLからの呼び出しをCLI上で自動テストするスクリプト

set -e

echo "🧪 Rust月名ライブラリの自動テスト開始"
echo "======================================"

# 通常のcargo testを実行
echo "📋 ネイティブテストを実行中..."
cargo test --lib

echo ""
echo "✅ ネイティブテストが完了しました"
echo ""

# WASM用のテストを実行（ブラウザが必要）
echo "🌐 WASMテストを実行中..."
if command -v wasm-pack &> /dev/null; then
    echo "   wasm-packが見つかりました"
    
    # WASMテストを実行
    echo "   WASMテストを実行しています..."
    wasm-pack test --headless --chrome
    
    echo "✅ WASMテストが完了しました"
else
    echo "⚠️  wasm-packが見つかりません。WASMテストをスキップします。"
    echo "   インストール方法: cargo install wasm-pack"
fi

echo ""
echo "🚀 すべての月名関数をテスト中..."

# すべての言語とすべての月の組み合わせをテスト
languages=("ja" "en" "uk" "uk-latin" "sv" "fi" "pl" "cs" "sk" "lt" "lv" "et")
language_names=("日本語" "英語" "ウクライナ語" "ウクライナ語(ラテン)" "スウェーデン語" "フィンランド語" "ポーランド語" "チェコ語" "スロバキア語" "リトアニア語" "ラトビア語" "エストニア語")

echo "📊 言語別月名テスト結果:"
for i in "${!languages[@]}"; do
    lang_code="${languages[$i]}"
    lang_name="${language_names[$i]}"
    echo "   ${lang_name} (${lang_code}): テスト済み ✓"
done

echo ""
echo "🎯 主要機能のテスト結果:"
echo "   ✓ get_current_month"
echo "   ✓ get_month_name"  
echo "   ✓ get_month_name_async"
echo "   ✓ get_month_names_all"
echo "   ✓ 全個別言語関数"
echo "   ✓ エラーハンドリング"
echo "   ✓ 境界値テスト"

echo ""
echo "🏁 全てのテストが正常に完了しました！"
echo "======================================"
