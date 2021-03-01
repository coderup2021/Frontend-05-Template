const http = require("http");
const https = require("https");
let fs = require("fs");
const archiver = require("archiver");
const child_process = require("child_process");
const queryString = require("querystring");

//1. 打开 https://github.com/login/oauth/authorize
child_process.exec(
	`chromium-browser https://github.com/login/oauth/authorize?client_id=Iv1.a8d36ef3baf559b7`,
);

//3. 创建server, 接收token， 后点击发布
const server = http
	.createServer((request, response) => {
		if (request.url === "/favicon.ico") return;
		let query = queryString.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
		publish(query.token, () => {
			console.log("publish success");
			response.end("publish success"); //发布成功后，页面显示publish success
			server.close();
			process.exit();
		});
	})
	.listen(8088);

function publish(token, callback) {
	const request = http.request(
		{
			hostname: "127.0.0.1",
			port: 8080,
			method: "POST",
			path: "/publish?token=" + token,
			headers: {
				"Content-Type": "application/octet-stream",
			},
		},
		(response) => {
			console.log("response success");
			callback();
		},
	);

	const archive = archiver("zip", {
		zlib: { level: 9 },
	});

	archive.directory("./sample", false);
	archive.finalize();
	archive.pipe(request); //将archive流输出pipe重定向到request流
}
