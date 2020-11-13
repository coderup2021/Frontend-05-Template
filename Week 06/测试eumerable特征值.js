var o = {
    a: 1,
    b: 2,
    c: 3
}
Object.defineProperty(o, 'a' , {enumerable: false})

// o.__proto__.px = 7
// Object.defineProperty(o.__proto__, 'px', {enumerable:false})

console.log(Object.keys(o)) // ['b', 'c']

for (var k in o){
    console.log(k)   // b c
}
console.log(JSON.stringify(o)) //{"b":2,"c":3}

