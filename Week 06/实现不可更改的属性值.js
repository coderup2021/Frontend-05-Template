var o = {
    a: 1,
    b: 2,
}
Object.defineProperty(o, 'a' , {
    writable: false,
    configurable: false
})
o.a = 10
console.log(o.a)

Object.defineProperty(o, 'a', { // TypeError: Cannot redefine property: a
    writable: true
})

o.a = 10
console.log(o.a)