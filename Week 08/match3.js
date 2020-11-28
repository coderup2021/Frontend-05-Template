
//字符串中查找 'abcdef' //自己实现
function findStr(string){
    let len = string.length
    for(let i=0; i<len-1; i++){
        if(string[i] == 'a' && string[i+1] == 'b' &&string[i+2] === 'c' && string[i+3] === 'd' && string[i+4] === 'e' && string[i+5] === 'f'){
            return true
        }
    }
    return false
}
//winter实现
function findStrByWinter(string){
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    for(let s of string ){
        if(s == 'a'){
            foundA = true
        }else if(foundA && s == 'b'){
            foundB=true
        }else if(foundB && s == 'c'){
            foundC=true
        }else if(foundC && s == 'd'){
            foundD=true
        }else if(foundD && s == 'e'){
            foundE=true
            return true
        }else{
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
        }
    }
    return false
}

console.log('findStrByWinter:',findStrByWinter('ababcde'))

