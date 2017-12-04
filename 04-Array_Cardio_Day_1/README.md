### 主要任务
第四课的主要任务可以看做的是熟悉 数组 的 API

`Array` 是 JavaScript 中的全局对象。

创建时可以使用以下两种方法：

```js
let aArr = [1, 2];
let bArr = new Array(1, 2);
aArr.__proto__ === bArr.__proto__; // true
```

```js
Object.getPrototypeOf([])
// concat()
// constructor: Array()
// copyWithin()
// entries()
// every()
// fill()
// filter()
// find()
// findIndex()
// forEach()
// includes()
// indexOf()
// join()
// keys()
// lastIndexOf()
// length: 0
// map()
// pop()
// push()
// reduce()
// reduceRight()
// reverse()
// shift()
// slice()
// some()
// sort()
// splice()
// toLocaleString()
// toString()
// unshift()
// Symbol(Symbol.iterator): values()
// Symbol(Symbol.unscopables):{copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}
```

下面就来分类介绍下：

所有的数组实例都是继承自 `Array.prototype`。

其下面有这样两个属性：

- `Array.prototype.constructor`：该值指向 `Array`，表示数组都是由 `Array` 构造出来的，也就对应上面提到的创建数组的第二种方法。

```js
Object.getPrototypeOf([]).constructor === Array;// true
``` 

- `Array.prototype.length`：顾名思义，该属性表示当前数组的长度，可以随意修改。当 `length` 属性设置为 **小于** 当前 `length` 时，其多余部分会被删除，即使之后恢复到最初值。当 `length` 属性设置为 **大于** 当前 `length` 时，其不足部分以 `empty` 补充。

```js
let arr = [1, 2, 3];
arr.length = 1;
console.log(arr); // [1]
arr.length = 4;
console.log(arr); // [1, empty * 3]
```


