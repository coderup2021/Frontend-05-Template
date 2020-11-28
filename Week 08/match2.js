
//字符串中查找 'ab' //自己实现
function findStr(string){
    let len = string.length
    for(let i=0; i<len-1; i++){
        if(string[i] == 'a' && string[i+1] == 'b'){
            return true
        }
    }
    return false
}

console.log(findStr("ksdjfkabc"))

//winter实现
function findStrByWinter(string){
    let foundA = false;
    // let foundB = false;
    for(let s of string ){
        if(s == 'a'){
            foundA = true
        }else if(foundA && s == 'b'){
            return true
        }else{
            foundA= false
        }
    }
    return false
}

