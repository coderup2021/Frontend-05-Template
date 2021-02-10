const http = require("http");
let fs = require("fs");

//fs.stat("./sample/sample.html", (err, stats) => {
const request = http.request(
	{
		hostname: "127.0.0.1",
		port: 8080,
		method: "POST",
		headers: {
			"Content-Type": "application/octet-stream",
			//				"Content-Length": stats.size,
		},
	},
	(response) => {
		console.log("response success");
	},
);

let file = fs.createReadStream("./sample/sample.html");
file.pipe(request);
file.on("end", () => {
	console.log("file read end");
	request.end();
});
// });
