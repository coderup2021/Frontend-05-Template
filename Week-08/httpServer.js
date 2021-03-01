const http = require('http')

http.createServer((request, response)=>{
    let body = []
    request.on("error", err=>{
       console.error(err) 
    }).on("data", chunk =>{
        console.log('chunk:',chunk)
        body.push(chunk)
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();
        // body = Buffer.concat(body);
        // console.log("body:", body)
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(' hello world')
    })
}).listen(8080)

console.log('server started')