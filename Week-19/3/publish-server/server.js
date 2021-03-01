const http = require("http");
const fs = require("fs");

http
	.createServer((request, response) => {
		console.log(request.headers);

		let outFile = fs.createWriteStream("../../server/public/index.html");

		request.pipe(outFile);

		request.on("end", () => {
			response.end();
		});
	})
	.listen(8080);
