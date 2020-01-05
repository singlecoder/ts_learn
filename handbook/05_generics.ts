function identity<T>(arg: T): T {
    return arg;
}

// 两种调用方式
// 我们没必要使用尖括号（<>）来明确地传入类型；编译器可以查看myString的值，然后把T设置为它的类型
// 类型推论帮助我们保持代码精简和高可读性

// 传入所有的参数，包含类型参数
console.log(identity<string>('hello world'));
// 利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型
console.log(identity('hello'));


// 泛型接口
interface GenericIdentityFn1 {
    <T>(arg: T): T;
}

function identity1<T>(arg: T): T {
    return arg;
}

let myIdentity1: GenericIdentityFn1 = identity1;
console.log(myIdentity1(5));

interface GenericIdentityFn2<T> {
    (arg: T): T;
}

let myIdentity2: GenericIdentityFn2<string> = identity1;
console.log(myIdentity2('hello'));


// 泛型类
// 类有两部分：静态部分和实例部分。 
// 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
    
    static cnt: number;
    // static cnt1: T; // Static members cannot reference class type parameters
}

let g = new GenericNumber<number>();
g.zeroValue = 10;
g.add = function (x, y) { return x + y; };
console.log(g.add(10, 20));


// 泛型约束
// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length);  // Property 'length' does not exist on type 'T'
//     return arg;
// }

interface Lengthwise {
    length: number;
}

// 个泛型函数被定义了约束，因此它不再是适用于任意类型
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);

    return arg;
}

// loggingIdentity(5); // Argument of type '5' is not assignable to parameter of type 'Lengthwise'
loggingIdentity({length: 5});


// 在泛型里使用类类型

// 使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<T>(c: {new(): T; }): T {
    return new c();
}

class Test {

}

let t = create(Test);
