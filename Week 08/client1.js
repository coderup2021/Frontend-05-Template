class Request{   //构造请求类
    constructor(p){
        this.method = p.method || 'get'
        this.host = p.host
        this.port = p.port || 80
        this.path = p.path
        this.body = p.data
        this.headers = p.headers || Object.create(null)
        if(!this.headers['Content-Type'])
            this.headers['Content-Type'] = "application/x-www-form-urlencoded"

        if(this.headers['Content-Type'] === "application/json")
            this.bodyText = JSON.stringify(this.body)
        else if(this.headers['Content-Type'] === "application/x-www-form-urlencoded")
            this.bodyText = Object.keys(this.body).map(k=>`${k}=${encodeURIComponent(this.body[k])}`).join("&")
        
        this.headers['Content-Length'] = this.bodyText.length
    }

    send(){ //将数据发送到服务器·
        return new Promise((resovle, reject)=>{
            resovle()
        })
    }
}

void async function(){  //因为里面使用了await，所以需要用async function的IIFE包裹一下
    let request = new Request({
        address: '127.0.0.1',
        port: '80',
        path: '/',
        headers: {
            "X-Foo": "123456"
        },
        data: {
            "username":"jason",
            "password":"123456"
        }
    })

    let res = await request.send()
}()
