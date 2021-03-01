/**
 * archive压缩文件夹 简单demo
 */

const archiver = require("archiver");
const fs = require("fs");

const archive = archiver("zip", {
	zlib: { level: 9 },
});

archive.directory("./sample");
archive.finalize();
archive.pipe(fs.createWriteStream("./tmp.zip"));
