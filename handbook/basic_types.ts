// 布尔值
let isDone: boolean = false;
console.log(isDone); // false

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
console.log(`dec: ${decLiteral} hex: ${hexLiteral} binary: ${binaryLiteral} octal: ${octalLiteral}`); // dec: 6 hex: 61453 binary: 10 octal: 484

// 字符串
let str1: string = "hello";
let str2: string = 'world';
let str3: string = str1 + ' ' + str2;
let str4: string = `${str1} ${str2}`;
console.log(str1); // hello
console.log(str2); // world
console.log(str3); // hello world
console.log(str4); // hello world

// 数组
let arr1: number[] = [1, 2, 3];
console.log(JSON.stringify(arr1));

let arr2: Array<number> = [4, 5, 6];
console.log(JSON.stringify(arr2));

let arr3 = arr1.concat(arr2);
console.log(JSON.stringify(arr3));

// let arr4: number[] = [7, '8' ,9]; // Type 'string' is not assignable to type 'number'
// console.log(JSON.stringify(arr4));

let arr5 = [7, '8', 9];
console.log(JSON.stringify(arr5));

let arr6 = arr5.concat(arr1);
console.log(JSON.stringify(arr6)); // [7,"8",9,1,2,3]

// let arr7 = arr1.concat(arr5); // No overload matches this call
// console.log(JSON.stringify(arr7));

// 元组 Tuple 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let tupleX: [number, string] = [10, '10'];
console.log(JSON.stringify(tupleX));
// tupleX[2] = 'hello'; // Tuple type '[number, string]' of length '2' has no element at index '2'
// console.log(JSON.stringify(tupleX[4].toString())); // Tuple type '[number, string]' of length '2' has no element at index '4'

// 枚举
enum Color {Red, Green, Blue};
enum Color1 {Red = 1, Green, Blud};
enum Color2 {Red = 2, Green = 5, Blud = 10};;
console.log(`Color: ${JSON.stringify(Color)}`); // Color: {"0":"Red","1":"Green","2":"Blue","Red":0,"Green":1,"Blue":2}
console.log(`Color: ${JSON.stringify(Color1)}`); // Color: {"1":"Red","2":"Green","3":"Blud","Red":1,"Green":2,"Blud":3}
console.log(`Color: ${JSON.stringify(Color2)}`); // Color: {"2":"Red","5":"Green","10":"Blud","Red":2,"Green":5,"Blud":10}

let c: Color = Color.Red;
console.log(`c: ${c}`); // c: 0
let colorName: string = Color[1];
console.log(`colorName: ${colorName}`); // colorName: Green
let colorName1: string = Color[4];
console.log(`colorName1: ${colorName1}`); // colorName1: undefined

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// notSure.ifItExists(); // okay, ifItExists might exist at runtime，运行时报错
// notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

// // Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法
// let prettySure: Object = 4;
// prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'

let list: any[] = [1, true, "free"];
list[1] = 100;
console.log(`any list: ${JSON.stringify(list)}`);

// Void
function warnUser(): void { // 函数没有返回值
    console.log("This is my warning message");
}
warnUser();

// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
let unusable: void = null;
// let unusable: void = undefined;
// let unusable: void = 0; // Type '0' is not assignable to type 'void'

// Null 和 Undefined
// 默认情况下null和undefined是所有类型的子类型
// 当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
let n: number = null;
n = 10;

// Never
// never类型表示的是那些永不存在的值的类型。 
// 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 
// 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
// never类型是任何类型的子类型，也可以赋值给任何类型；
// 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 
// 即使 any也不可以赋值给never。

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// Object
// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
// 使用object类型，就可以更好的表示像Object.create这样的API
// declare function create(o: object | null): void;

// create({ prop: 0 }); // OK
// create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error

// 类型断言
// 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 
// 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
// 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 
// 它没有运行时的影响，只是在编译阶段起作用。 
// TypeScript会假设你，程序员，已经进行了必须的检查。

// “尖括号”语法 “as”语法
// 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的
// let someValue: any = 'this is a string';
let someValue: any = 5;
let len1 = someValue.length;
let len2: number = (<string>someValue).length;
let len3: number = (someValue as string).length;
console.log(`len1: ${len1} len2: ${len2} len3: ${len3}`); // len1: 16 len2: 16 len3: 16 / len1: undefined len2: undefined len3: undefined

