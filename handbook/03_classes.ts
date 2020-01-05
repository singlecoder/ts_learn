// 类
class T {
    private value: string;
    private value1: string;

    constructor (str: string, str1: string = '') {
        this.value = str;
        this.value1 = str1;
    }

    print () {
        console.log(`${this.value} ${this.value1}`);
    }
}

let t = new T('hello');
t.print();

// 继承
class Base {
    value: string;

    constructor (str: string) {
        this.value = str;
    }

    print () {
        console.log(`Base value = ${this.value}`);
    }
}

class Derive extends Base {
    constructor (str: string) {
        super(str);
    }

    print () {
        console.log(`Derive call`);
        super.print();
    }
}

let b: Base = new Base('hello');
let d: Base = new Derive('world');

b.print();
d.print();


// 参数属性
class Octopus {
    readonly numberOfLegs: number = 8;

    // 参数属性可以方便地让我们在一个地方定义并初始化一个成员
    // 参数属性通过给构造函数参数前面添加一个访问限定符来声明。 
    // 使用 private限定一个参数属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样
    constructor(readonly name: string) {
    }

    print () {
        console.log(`name: ${this.name} number: ${this.numberOfLegs}`);
    }
}

let o = new Octopus('hello');
o.print();


// 抽象类
// 抽象类做为其它派生类的基类使用。 
// 它们一般不会直接被实例化。 
// 不同于接口，抽象类可以包含成员的实现细节。 
// abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
abstract class Animal {
    abstract makeSound(): void; // 子类必须实现
    move(): void {
        console.log('roaming the earch...');
    }
}

