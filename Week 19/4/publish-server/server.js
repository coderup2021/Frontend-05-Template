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
		});
	})
	.listen(8080);
