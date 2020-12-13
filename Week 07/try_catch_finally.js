//关于return，正常情况下任何return语句都会打断程序的执行， 但是在try catch finally中，即使你在try中return了，finally里面的代码仍然会执行
function test1(){
    try{
        var a = 5
        return a
    }catch(e){
        console.log(e)
    }finally{
        console.log('finally')
        return 10
    }
}
let b = test1()
console.log(b) //10

//* try和catch后面的花括号不会产生作用域(除非使用let声明)
//* catch会产生一个作用域(即使使用var声明，对花括号外也不可见)， 括号里面的参数会被赋值为try里面抛出来的错误
function test2(){
    try{
        var a = 5
    }catch(e){
        var c=100
        console.log(e)
    }finally{
        var f = 100
    }
    console.log('a=',a) //5
    console.log('c=',c) //undefined
    console.log('f=',f) //100
}
test2()