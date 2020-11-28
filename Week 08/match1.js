//字符串中查找字符‘a’
function findCh(string, ch){
    for(let s of string){
        if(s === ch){
            return true
        }
    }
    return false

}

console.log(findCh("hello world", 'd'))



