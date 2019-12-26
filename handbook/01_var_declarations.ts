// var
function f() {
    var a = 1;

    a = 2;
    var b = g();
    a = 3;

    return b;

    function g() {
        return a;
    }
}

console.log(f()); // 2

function f1 (shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

console.log(f1(true));  // 10
console.log(f1(false)); // undefined

function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
console.log(`sumMatrix: ${sumMatrix([[1, 2], [3, 4]])}`); // 3

for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i); // 10 10 10 ... 10

    (function (i) {
        setTimeout(function () { console.log(i); }, 100 * i); // 0 1 2 ... 9
    })(i);
}

// let
// a++;
// var a;
// b++; // Block-scoped variable 'b' used before its declaration
// let b;

// function ff1 (shouldInitialize: boolean) {
//     if (shouldInitialize) {
//         let x = 10;
//     }

//     return x; // Cannot find name 'x'
// }

function foo() {
    return fooA;
}

// 编译为js时，let转var输出结果为：undefined 10
console.log(`foo: ${foo()}`);
let fooA = 10;
console.log(`foo: ${foo()}`);

function fc(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }

    return x;
}

console.log(`fc: ${fc(false, 0)}`); // 0
console.log(`fc: ${fc(true, 0)}`); // 100

function sumMatrix2(matrix: number[][]) {
    var sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
console.log(`sumMatrix2: ${sumMatrix2([[1, 2], [3, 4]])}`); // 10

// const
const ca = 10;
// ca = 11; // Cannot assign to 'ca' because it is a constant
const co = {
    'k1': 'v1'
};
// co = {}; // Cannot assign to 'co' because it is a constant
// co.k1 = '10'; // ok
// co.k2 = 5; // Property 'k2' does not exist on type '{ 'k1': string; }'

// 属性重命名
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a: newName1, b: newName2 } = o;
// 指定类型
let {a, b}: {a: string, b: number} = o;

// 默认值
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
    console.log(`keepWholeObject: a=${a} b=${b}`);
}
keepWholeObject(o);
keepWholeObject({a:'hello'});

// 函数声明
type C = { a: string, b?: number }
function keepWholeObject2({ a, b }: C): void {
    console.log(`keepWholeObject2: a=${a} b=${b}`);
}
keepWholeObject2({a:'hello', b:10});

function keepWholeObject3({ a='', b=0 } = {}): void {
    console.log(`keepWholeObject3: a=${a} b=${b}`);
}
keepWholeObject3();
keepWholeObject3({});
keepWholeObject3({a:'world'});
keepWholeObject3({b:20});

// function keepWholeObject4({ a, b = 0 } = { a: "" }): void {
//     console.log(`keepWholeObject4: a=${a} b=${b}`);
// }
// keepWholeObject4();
// keepWholeObject4({}); // Property 'a' is missing in type '{}' but required in type '{ a: string; b?: number; }
// keepWholeObject4({a:'world'});
// keepWholeObject4({b:20}); // Property 'a' is missing in type '{ b: number; }' but required in type '{ a: string; b?: number; }