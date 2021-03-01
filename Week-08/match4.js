//匹配abcde

function match(string){
    let state = start
    for(let c of string){
        state = state(c)
    }

    if(state === end)
        return true
    else
        return false
}

function start(c){
    if(c === 'a'){
        return foundA
    }else{
        return start
    }
}

function foundA(c){
    if(c === 'b')
        return foundB           //这里匹配有自重复的字符串时会有问题
    else
        return start
}

function foundB(c){
    if(c === 'c')
        return foundC
    else
        return start            //这里匹配有自重复的字符串时会有问题
}

function foundC(c){
    if(c === 'd')
        return foundD
    else
        return start           //这里匹配有自重复的字符串时会有问题
}

function foundD(c){
    if(c === 'e')
        return end
    else
        return start            //这里匹配有自重复的字符串时会有问题
}

function end(c){
    return end
}

console.log(match('abcdefgh'))