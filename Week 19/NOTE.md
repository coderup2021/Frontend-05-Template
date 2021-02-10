# 发布工具的基本组成部分
	1. 发布工具： 程序开发人员需要发布的时候，在客户端使用它将本地代码发布到线上的发布服务器
	2. 发布服务器： 接收发布工具发送上来的代码文件，放到指定目录
	3. 正式的线上服务器： 供正式用户访问的服务器

# node 流处理api
```
const fs = require('fs')
const r = fs.createReadStream()   //创建读流
const w = fs.createWriteStream()  //创建写流

r.on("data", chunk=>{console.log(chunk.toString)}) //流读取
r.on("end", ()=>{console.log("read finished")}) //流读取完毕

w.write("xxxx")  //向写流写数据

r.pipe(w) //将读流重定向到写流

```


# archive压缩文件夹 简单demo
```
const archiver = require("archiver");
const fs = require("fs");

const archive = archiver("zip", {
	zlib: { level: 9 },
});

archive.directory("./sample");
archive.finalize();
archive.pipe(fs.createWriteStream("./tmp.zip"));
```
