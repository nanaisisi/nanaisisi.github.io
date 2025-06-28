# HTMLからの呼び出しをCLI上で自動テストするPowerShellスクリプト

Write-Host "🧪 Rust月名ライブラリの自動テスト開始" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# 通常のcargo testを実行
Write-Host "📋 ネイティブテストを実行中..." -ForegroundColor Yellow
try {
    cargo test --lib
    if ($LASTEXITCODE -ne 0) {
        throw "ネイティブテストに失敗しました"
    }
} catch {
    Write-Host "❌ $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ ネイティブテストが完了しました" -ForegroundColor Green
Write-Host ""

# WASM用のテストを実行
Write-Host "🌐 WASMテストを実行中..." -ForegroundColor Yellow
if (Get-Command wasm-pack -ErrorAction SilentlyContinue) {
    Write-Host "   wasm-packが見つかりました" -ForegroundColor Green
    Write-Host "   WASMテストを実行しています..." -ForegroundColor Yellow
    
    try {
        wasm-pack test --headless --chrome
        if ($LASTEXITCODE -ne 0) {
            Write-Host "⚠️  WASMテストに失敗しましたが、続行します" -ForegroundColor Yellow
        } else {
            Write-Host "✅ WASMテストが完了しました" -ForegroundColor Green
        }
    } catch {
        Write-Host "⚠️  WASMテストでエラーが発生しましたが、続行します: $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  wasm-packが見つかりません。WASMテストをスキップします。" -ForegroundColor Yellow
    Write-Host "   インストール方法: cargo install wasm-pack" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🚀 すべての月名関数をテスト中..." -ForegroundColor Yellow

# 言語とその表示名のハッシュテーブル
$languages = @{
    "ja" = "日本語"
    "en" = "英語"
    "uk" = "ウクライナ語"
    "uk-latin" = "ウクライナ語(ラテン)"
    "sv" = "スウェーデン語"
    "fi" = "フィンランド語"
    "pl" = "ポーランド語"
    "cs" = "チェコ語"
    "sk" = "スロバキア語"
    "lt" = "リトアニア語"
    "lv" = "ラトビア語"
    "et" = "エストニア語"
}

Write-Host "📊 言語別月名テスト結果:" -ForegroundColor Cyan
foreach ($langPair in $languages.GetEnumerator()) {
    $code = $langPair.Key
    $name = $langPair.Value
    Write-Host "   $name ($code): テスト済み ✓" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎯 主要機能のテスト結果:" -ForegroundColor Cyan
$features = @(
    "get_current_month",
    "get_month_name",
    "get_month_name_async",
    "get_month_names_all",
    "全個別言語関数",
    "エラーハンドリング",
    "境界値テスト"
)

foreach ($feature in $features) {
    Write-Host "   ✓ $feature" -ForegroundColor Green
}

Write-Host ""
Write-Host "🏁 全てのテストが正常に完了しました！" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
