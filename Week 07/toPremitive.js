var o = {
    valueOf(){return 1},
    toString(){return 2},
    // [Symbol.toPrimitive](){return 3}
}

// console.log("x" + o)

var x = {}
x[o] = 1;
console.log("x" + o)
console.log(x)