import { serve } from "https://deno.land/std@0.207.0/http/server.ts";

// MIMEタイプのマッピング
const mimeTypes = {
	".html": "text/html",
	".css": "text/css",
	".js": "application/javascript",
	".json": "application/json",
	".wasm": "application/wasm",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".ico": "image/x-icon",
	".md": "text/markdown",
};

function getMimeType(path) {
	const extension = path.substring(path.lastIndexOf("."));
	return mimeTypes[extension] || "application/octet-stream";
}

async function handler(req) {
	// URLからパスを取得
	const url = new URL(req.url);
	let path = url.pathname;

	// インデックスページのハンドリング
	if (path === "/") path = "/index.html";

	try {
		// ファイルを読み込む
		const filePath = `.${path}`;
		const data = await Deno.readFile(filePath);

		// MIMEタイプを取得
		const contentType = getMimeType(path);

		// WASMファイルに必要なヘッダーを追加
		const headers = new Headers({
			"content-type": contentType,
		});

		if (contentType === "application/wasm") {
			headers.append(
				"Content-Disposition",
				"attachment; filename=nanai_wasm_rs.wasm",
			);
		}

		return new Response(data, {
			status: 200,
			headers,
		});
	} catch (e) {
		console.error(`${path}の取得中にエラーが発生しました:`, e);
		return new Response(`File ${path} not found`, { status: 404 });
	}
}

console.log("サーバーを起動しています...");
console.log("http://localhost:8000 でアクセスできます");
serve(handler, { port: 8000 });
