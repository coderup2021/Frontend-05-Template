/**
 * 使用archive打包压缩文件夹后进行传输
 */

const http = require("http");
let fs = require("fs");
const archiver = require("archiver");

const request = http.request(
	{
		hostname: "127.0.0.1",
		port: 8080,
		method: "POST",
		headers: {
			"Content-Type": "application/octet-stream",
		},
	},
	(response) => {
		console.log("response success");
	},
);

const archive = archiver("zip", {
	zlib: { level: 9 },
});

archive.directory("./sample");
archive.finalize();
archive.pipe(request); //将archive流输出pipe重定向到request流
