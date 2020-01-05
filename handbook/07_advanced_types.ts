// 映射类型
type Proxy<T> = {
    get(): T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {
    let result: Proxify<T> = {} as Proxify<T>;

    for (let k in o) {
        let v = {
            val: o[k],
            get() {
                return this.val;
            },
            set(val): void {
                this.val = val;
            }
        }

        result[k] = v;
    }

    return result;
}

let props = {
    'key1': 'val1',
    'key2': 10
};

let proxyProps = proxify(props);
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}

let originalProps = unproxify(proxyProps);
console.log(`result is ${JSON.stringify(originalProps)}`);
