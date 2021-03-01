const http = require("http");
const https = require("https");
const fs = require("fs");
const unzipper = require("unzipper");
const childProcess = require("child_process");
const queryString = require("querystring");

//2. auth路由： 接收code, 用code+client_id+client_secret换token
function auth(request, response) {
	let query = queryString.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
	getToken(query.code, function (info) {
		const content = `<a href="http://localhost:8088/?token=${info.access_token}">publish</a>`;
		response.write(content);
		response.end();
	});
}

function getToken(code, callback) {
	const request = https.request(
		{
			hostname: `github.com`,
			path: `/login/oauth/access_token?code=${code}&client_id=Iv1.a8d36ef3baf559b7&client_secret=d03781cfb957e6b1d25cd9013ec379fba8587ad8`,
			port: 443,
			method: "POST",
		},
		function (response) {
			let body = "";
			response.on("data", (chunk) => {
				body += chunk.toString();
			});
			response.on("end", () => {
				callback(queryString.parse(body));
			});
		},
	);

	request.end();
}
//4 .public路由：用token获取用户信息, 检查权限接收发布
function publish(request, response) {
	const query = queryString.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
	getUser(query.token, (user) => {
		if (user.login === "itgou") {
			request.pipe(unzipper.Extract({ path: "../../server/public" }));
			request.on("end", () => {
				response.end();
			});
		} else {
			console.error("您没有权限");
		}
	});
}

function getUser(token, callback) {
	const request = https.request(
		{
			hostname: "api.github.com",
			path: "/user",
			port: 443,
			method: "GET",
			headers: {
				Authorization: `token ${token}`,
				"User-Agent": `toy-publish`,
			},
		},
		(response) => {
			let body = "";
			response.on("data", (chunk) => {
				body += chunk.toString();
			});
			response.on("end", () => {
				callback(JSON.parse(body));
			});
		},
	);
	request.end();
}

http
	.createServer((request, response) => {
		if (request.url.match(/^\/auth\?/)) {
			return auth(request, response);
		}

		if (request.url.match(/^\/publish\?/)) {
			return publish(request, response);
		}
	})
	.listen(8080);
