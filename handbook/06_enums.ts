// TypeScript支持数字的和基于字符串的枚举
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

// 每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化
enum DirectionStr {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

// 混合 不建议这么玩
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}


// const 枚举
// 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 
// 常量枚举成员在使用的地方会被内联进来。 
// 之所以可以这么做是因为，常量枚举不允许包含计算成员
const enum DirectionsConst {
    Up,
    Down,
    Left,
    Right
}
let directions = [DirectionsConst.Up, DirectionsConst.Down, DirectionsConst.Left, DirectionsConst.Right];
// 编译为js后为：var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

