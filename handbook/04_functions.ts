// 完整函数类型
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };


// 可选参数和默认参数
// function buildName(firstName: string, lastName: string) {
//     return firstName + " " + lastName;
// }

// buildName('hello'); // Expected 2 arguments, but got 1
// buildName('hello', 'world');
// buildName('hello', 'world', '2020'); // Expected 2 arguments, but got 3

// 可选参数
// function buildName(firstName: string, lastName?: string) {
//     return firstName + " " + lastName;
// }

// buildName('hello');
// buildName('hello', 'world');
// buildName('hello', 'world', '2020'); // Expected 1-2 arguments, but got 3

// 在所有必须参数后面的带默认初始化的参数都是可选的
// function buildName(firstName: string, lastName: string = 'world') {
//     return firstName + " " + lastName;
// }

// buildName('hello');
// buildName('hello', 'world');
// buildName('hello', 'world', '2020'); // Expected 1-2 arguments, but got 3

// 与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面
// 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值
// function buildName(firstName = "Will", lastName: string) {
//     return firstName + " " + lastName;
// }

// buildName('hello'); // Expected 2 arguments, but got 1
// buildName('hello', 'world');
// buildName('hello', 'world', '2020'); // Expected 2 arguments, but got 3
// buildName(undefined, 'world');


// 重载
// 查找重载列表，尝试使用第一个重载定义。 
// 如果匹配的话就使用这个。 
// 因此，在定义重载的时候，一定要把最精确的定义放在最前面
function pickCard (x: {suit: string; card: number;}): number;
function pickCard (x: number): number;

// 并不是重载列表的一部分
function pickCard (x: any): any {

}
