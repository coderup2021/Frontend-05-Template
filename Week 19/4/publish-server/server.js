const http = require("http");
const fs = require("fs");
const unzipper = require("unzipper");
const childProcess = require("child_process");

http
	.createServer((request, response) => {
		console.log(request.headers);

		request.pipe(unzipper.Extract({ path: "../../server/public" }));

		request.on("end", () => {
			response.end();
			childProcess.execSync("mv ../../server/public/sample/* ../../server/public"); //将所有文件移动到public目录
			childProcess.execSync("rm -rf ../../server/public/sample"); //删除sample目录
		});
	})
	.listen(8080);
