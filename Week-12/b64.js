#!/usr/bin/node
// 获取图片的data uri
const fs = require("fs");
const path = require("path");

const argv = process.argv;
const filepath = argv[2];
const extname = path.extname(filepath).substr(1);
if (!filepath) {
	console.log(`Usage: node ${argv[1]} imagePath`);
}

if (!fs.existsSync(filepath)) {
	console.error(`file is not exist: ${filepath}`);
}

let bitmap = fs.readFileSync(filepath);

let base64code = Buffer.from(bitmap, "binary").toString("base64");

const dataUri = `[p ]:data:image/${extname};base64,${base64code}`;

console.log(dataUri);
