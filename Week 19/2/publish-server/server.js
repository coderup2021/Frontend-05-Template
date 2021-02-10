const http = require("http");
const fs = require("fs");

http
	.createServer((request, response) => {
		console.log(request.headers);

		let outFile = fs.createWriteStream("../../server/public/index.html");

		request.on("data", (chunk) => {
			console.log(chunk.toString());
			outFile.write(chunk);
		});

		request.on("end", () => {
			outFile.end();
			response.end("success");
		});
	})
	.listen(8080);
