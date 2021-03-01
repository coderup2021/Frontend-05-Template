const http = require("http");
let fs = require("fs");

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

let file = fs.createReadStream("./package.json");
file.on("data", (chunk) => {
	console.log(chunk.toString());
	request.write(chunk);
});
file.on("end", () => {
	console.log("read finished");
	request.end();
});
