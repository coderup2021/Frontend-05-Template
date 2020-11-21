// let num = 0x61;
// let a = num.toString(2);
// console.log(a)

/**
 *  
 * @param {*} str  支持0x开头的16进制，0b开头的2进制，以及数字开头的8进制
 * @param {*} format int 支持任意进制
 */
function stringToNumber(str, radix){
    let num = 0;
    if(/^0b[01]+$/.test(str)){
        let arr = str.split("").splice(2)
        num = parseInt(arr.join(""), 2)
    }else if(/^0x[0-9a-fA-F]+$/.test(str)){
        let arr = str.split("").splice(2)
        num = parseInt(arr.join(""), 16)
    }else if(/^\d+$/.test(str)){
        num = parseInt(str, 10)
    }else{
        throw new Error("str is not a valid format")
    }
    return num.toString(radix)
}

console.log(stringToNumber('0b11', 16))
console.log(stringToNumber('0x0f', 16))
console.log(stringToNumber('1234', 16))

function numberToString(){
    
}