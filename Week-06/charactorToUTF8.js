// 获取字符后者汉字的 UTF8 2进制编码
function getUTF8Code(char){
    if(!char) return ''
    let charCode = char.charCodeAt(0)
    if(charCode > 255){  //汉字
        let bin = charCode.toString(2)
        bin = bin.padStart(16, 0)
        console.log('bin:', bin)
        let firstPre = "1110" //第一个字节控制位
        let otherPre = "10"  //第二，三个字节控制位
        let first = firstPre + bin.substr(0,4); //第一个字节： bin的前4位拼接在控制位后面
        let second = otherPre + bin.substr(4,6); //第二个字节： bin的4-9位拼接在控制位后面
        let third = (otherPre + bin.substr(10,bin.length-10)).padEnd(8,0); //第三个字节： bin的第10位及以后拼接在控制位后面
        return `${first} ${second} ${third}`
    }else{ //非汉字
        return charCode.toString(2).padStart(8,0)
    }
}

let c = getUTF8Code('a')
console.log(c)  //01100001

let m = getUTF8Code('我')
console.log(m) //11100110 10001000 10010001

let y = getUTF8Code('一')
console.log(y) //11100100 10111000 10000000


function UTF_Encoding(string){
    let result =[]
    
}