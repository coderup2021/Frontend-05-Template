// 匹配 abcabx

function match(string){
    let state = start
    for(let c of string){
        state = state(c)
    }
    return state === end
}

function start(c){
    if(c==='a')
        return foundA
    else 
        return start
}

function end(c){
    return end
}

function foundA(c){
    if(c === 'b')
        return foundB
    else
        return start(c)
}

function foundB(c){
    if(c === 'c')
        return foundC
    else 
        return start(c)
}

function foundC(c){
    if(c=== 'a')
        return foundA2
    else
        return start
}

function foundA2(c){
    if(c === 'b')
        return foundB2
    else
        return start(c)
}

function foundB2(c){
    if(c === 'x')
        return end(c)
    else if(c === 'c')
        return foundB(c)  //核心 当第二次匹配到ab后，c变量不等于x, 把当前状态当作foundB，并传入当前参数c进行处理
    else 
        return start(c)
}

console.log(match('xs abcabcabxy'))