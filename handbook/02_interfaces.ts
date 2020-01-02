// 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
// let myObj = { size: 10, label:20 };
// printLabel(myObj); // Argument of type '{ size: number; label: number; }' is not assignable to parameter of type '{ label: string; }

interface LabelledValue {
    label: string
}

function printLabel1(labelledObj: LabelledValue) {
    console.log(`printLabel1: ${labelledObj.label}`);
}
let myObj1 = { size: 10, label: "Size 10 Object" };
printLabel1(myObj1);
// let myObj1 = { size: 10, label: 20 };
// printLabel(myObj1); // Argument of type '{ size: number; label: number; }' is not assignable to parameter of type '{ label: string; }

// 可选属性
// 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在
// 可选属性名字定义的后面加一个?符号
// 好处：1、可以对可能存在的属性进行预定义 2、可以捕获引用了不存在的属性时的错误
interface SquareConfig {
    color?: string,
    width?: number
}

function createSquare (config: SquareConfig): {color: string, area: number} {
    let square = {color: 'red', area: 100};
    
    config.color && (square.color = config.color);

    if (config.width) {
        square.area = config.width * config.width;
    }

    return square;
}

console.log(createSquare({}));
console.log(createSquare({color: 'Black'}));
console.log(createSquare({color: 'White', width: 20}));

// 只读属性
// 做为变量使用的话用 const，若做为属性则使用readonly
interface Point {
    readonly x: number,
    readonly y: number
}

let p: Point = {x:10, y:10};
// p.x = 5; // Cannot assign to 'x' because it is a read-only property

let a: number[] = [1, 2, 3];
let ro: ReadonlyArray<number> = a;
let ro1: ReadonlyArray<number> = [1,2,3];
a.push(4);
// ro[0] = 10; // Index signature in type 'readonly number[]' only permits reading 改变数组的操作均不可用
// ro.push(5); // Property 'push' does not exist on type 'readonly number[]' 改变数组的api均不可用
console.log(a);
console.log(ro);
// a = ro; // The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'
let b = ro as number[];
b.push(5);
let d = ro1 as number[];
d.push(4);
console.log(a);
console.log(ro);
console.log(b);
console.log(ro1);
console.log(d);

// 额外的属性检查

// 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误
// createSquare({clourr:'red', color:'White', width:10}); // Argument of type '{ clourr: string; color: string; width: number; }' is not assignable to parameter of type 'SquareConfig'
// 1、使用类型断言绕开检查
createSquare({clourr:'red'} as SquareConfig);

// 2、字符串索引签名
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
createSquare({cool:'heh'});

// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
console.log(`mySearch: ${mySearch('hello wolrd', 'hello')}`);

// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
let mySearch1: SearchFunc;
mySearch1 = function(src: string, sub: string) {
    let result = src.search(sub);
    return result > -1;
}
console.log(`mySearch: ${mySearch1('hello wolrd', 'hello')}`);

// 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 
// 如果你不想指定类型，TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc类型变量
let mySearch2: SearchFunc;
mySearch2 = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
    // return 10; // Type 'number' is not assignable to type 'boolean'
}
console.log(`mySearch: ${mySearch2('hello wolrd', 'hello')}`);

// 可索引的类型
// 与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]
interface StringArray {
    [index: number]: string;
}
let myArr: StringArray = ['1', '2'];

// 索引签名支持数字和字符串两种
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型
// 当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 
// 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}
// interface NotOkay {
//     [index: string]: Dog;
//     [index: number]: Animal; // Numeric index type 'Animal' is not assignable to string index type 'Dog'
// }
interface Okay {
    [index: string]: Animal;
    [index: number]: Dog;
}

// 字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配。 
// 因为字符串索引声明了 obj.property和obj["property"]两种形式都可以
interface NumberDic {
    [index: string]: number;
    length: number;
    // name: string; // Property 'name' of type 'string' is not assignable to string index type 'number'
}

// 将索引签名设置为只读
interface ReadOnlyNumberArr {
    readonly [index: number]: number;
}
let roNumArr: ReadOnlyNumberArr = [1, 2, 3];
// roNumArr[0] = 5; // Index signature in type 'ReadOnlyNumberArr' only permits reading

// 类类型-实现接口
// 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    // private currentTime: Date; // Property 'currentTime' is private in type 'Clock' but not in type 'ClockInterface'
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
