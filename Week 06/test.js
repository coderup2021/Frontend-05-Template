let a = Buffer.from('我', 'utf8')
// console.log('Buffer.from("我")=', a)
const data = a.toJSON().data
// console.log('data:', a.toJSON().data)
console.log(data[0].toString(2), data[1].toString(2), data[2].toString(2))

console.log(String.fromCharCode(97))
console.log(String.fromCharCode(0x6211))
console.log('我'.charCodeAt(0))
console.log('a'.charCodeAt(0))
console.log(25105 .toString(2))
console.log("================================")
console.log(String.fromCharCode(97)) 
console.log(String.fromCharCode(25105))
console.log(String.fromCharCode(0x6211))
console.log(String.fromCharCode(0b110001000010001))
console.log(String.fromCharCode(0x4e00)) 
console.log("================================")

const icons = '☃★♲';
console.log(icons.charCodeAt(0));
console.log(icons.codePointAt(0));
console.log(icons.charCodeAt(1));
console.log(icons.codePointAt(1));

