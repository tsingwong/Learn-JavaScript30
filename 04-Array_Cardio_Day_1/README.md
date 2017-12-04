### 主要任务
第四课的主要任务可以看做的是熟悉 数组 的 API

`Array` 是 JavaScript 中的全局对象。

#### 创建数组

创建时可以使用以下两种方法：

```js
let aArr = [1, 2];
let bArr = new Array(1, 2);
aArr.__proto__ === bArr.__proto__; // true
```

##### 数组的方法

这里说的方法区别于数组原型的方法，可以这样理解一个是在 `Array.XXX()`，另一个是 `Array.prototype.XXX()`。

- `Array.isArray()`：用于判定变量是否是数组，返回布尔值

```js
Array.isArray([]); // true
function testArray() {
    console.log(Array.isArray(arguments));
}
testArray(1, 2, 3); // false

document.querySelectorAll('.webIconImg') // NodeList

Array.isArray(document.querySelectorAll('.webIconImg')) // false

document.getElementsByClassName('webIconImg') // HTMLCollection

Array.isArray(document.getElementsByClassName('webIconImg')) // false

[...document.querySelectorAll('.webIconImg')] // Array

[...document.getElementsByClassName('webIconImg')] // Array

```

- `Array.from()`：从类数组或迭代对象中创建一个新数组实例，比较典型的是，可以把函数参数列表 或 `NodeList` 转换为数组。

```js
function testArray() {
    console.log(Array.isArray(Array.from(arguments)));
}
testArray(1, 2, 3); //true
Array.isArray(Array.from(document.getElementsByClassName('webIconImg'))) // true
```

- `Array.of()`：用于创建具有可变数量的新数组实例，而不考虑参数的数量和类型。其主要区别于单个整数参数的处理。`Array(2)` 会创建 2 个 undefined 元素的数组，`Array.of(2)` 会创建单个元素 2 的数组

```js
Array.of(2); //[2]
Array(2); // [undefined, undefined]

Array.of(1, 2, [3]); // [1, 2, [3]]
Array(1, 2, [3]); // [1, 2, [3]]
```

#### 浅析数组

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

##### 数组原型的属性

其下面有这样两个属性：

- `Array.prototype.constructor`：该值指向 `Array`，表示数组都是由 `Array` 构造出来的，也就对应上面提到的创建数组的第二种方法。

```js
Object.getPrototypeOf([]).constructor === Array;// true
``` 

- `Array.prototype.length`：顾名思义，该属性表示当前数组的长度，可以随意修改。当 `length` 属性设置为 **小于** 当前 `length` 时，其多余部分会被删除，即使之后恢复到最初值。当 `length` 属性设置为 **大于** 当前 `length` 时，其不足部分以 `undefined` 补充。

```js
let arr = [1, 2, 3];
arr.length = 1;
console.log(arr); // [1]
arr.length = 4;
console.log(arr); // [1, empty * 3]
```

##### 数组原型的方法

其下面的方法可以大致分为几类：

- 改变自身值，MDN 上取名叫做 `Mutator Function`
- 不会改变自身值，只会返回一个新数组或其他期望结果， MDN 上取名叫做 `Accessor Function`
- 还有一些遍历方法，多数是指定回调函数作为参数，返回新数组或其他预期结果，MDN 上取名叫做 `Iteration Function`。

注：在遍历方法中，每个数组元素都分别执行完回调函数之前，数组的 length 属性会被缓存到内存中，所以如果在回调函数中，增加元素则新增元素不会被遍历。如果删除或改变某个元素可能会带来未知影响。所以，**尽可能不要再遍历过程中对原数组进行任何修改操作**。

**Mutator Function**

- `Array.prototype.copyWithin(targe[, start[, end]])`：该方法多用于 **浅复制** 数组的一部分到同一个数组的另一个位置，并返回修改后的数组，该方法无法修改长度。简单解释下，第一个参数时要被覆盖的位置，第二个参数为覆盖前者的开始位置，第三个参数为覆盖前面的结束位置。第二参数默认为 0，第三个参数默认为 `this.length`。

注：该方法不能修改数组长度，也就是说如果第一个参数或第二个参数大于 数组长度 - 1，便会返回原数组。其拷贝是浅拷贝，也就是说除基本类型（undefined, null, number, boolean, string 和 Symbol）之外，引用类型都是引用的地址，一个改变其余也会改变。

```js
const arr = [1, [2], {name: 3}, [[4], 5]];
const result = arr.copyWithin(1, 2, );

arr === result; // true [1, {name: 3}, [[4], 5], [[4], 5]]

arr[2].push(6); // 3

console.log(arr); // [1, {name: 3}, [[4], 5, 6], [[4], 5, 6]]
```

- `Array.prototype.fill(value[, start[, end]])`：用一个固定值填充一个数组中从起始索引到终止索引的全部元素。返回修改后的数组。第二个参数默认为 0，第三个参数默认为 `this.length`。

注：还是上面提到的引用类型的值传递的只是类似于 C 中指针的内存地址。

```js
const arr = [1, 2, 3];
const testArr = [4]
const result = arr.fill(testArr);
console.log(result); //[[4], [4], [4]]
testArr.push(5); // 2
console.log(result); //[[4, 5], [4, 5], [4, 5]]
```

- `Array.prototype.pop()`：用于删除数组中最后一个元素，并返回该元素的值。此方法会改变数组的长度。当数组为空时，会返回 `undefined`。常与 `call()` 或 `apply()` 配合使用，应用于类数组对象上。

```js
const aArr = [1, 2, 3];
console.log(aArr.pop()); // 3
console.log(aArr.pop()); // 2
console.log(aArr.pop()); // 1
console.log(aArr.pop()); // undefined
console.log(aArr); // []

const bArr = new Array(3);
console.log(bArr.pop()); // undefined
console.log(bArr); // [, ,]
```
- `Array.prototype.push(items)`：该方法用于将一个或多个元素添加到当前数组末尾，并返回修改后数组的长度。常与 `call()` 或 `apply()` 配合使用，应用于类数组对象上。

注：唯一的原生类数组（array-like）对象是 `Strings`，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

```js
const aArr = [0, 1, 2];
const total = aArr.push(3, 4); // 5
console.log(aArr); // [0, 1, 2, 3, 4]

const bArr = [6, 7, 8, 9];
Array.prototype.push.apply(aArr, bArr); // 9
console.log(aArr); // [0, 1, 2, 3, 4, 6, 7, 8, 9]

const aObj = {
    add (elem) {
        Array.prototype.push.call(this, elem);
    }
};
const bObj = {
    name: 'tsingwong'
};

aObj.add(bObj);
console.log(aObj[0]); // {name: 'tsingwong'}
bObj.age = 25;
console.log(aObj[0]); // {name: 'tsingwong', age: 25}
```

- `Array.prototype.reverse()`：该方法用于将数组中的元素位置颠倒，返回修改后的数组。即第一个数组元素与最后一个数组元素交换位置，然后依次进行。

```js
const arr = [0, 1, 2];
const result = arr.reverse();

console.log(arr); // [2, 1, 0]
console.log(arr === result); // true
```

- `Array.prototype.shift()`：该方法用于从数组中删除第一个元素，并返回该元素的值。此方法会改变数组的长度。如果数组为空，则返回 `undefined`。

```js
const arr = [0, 1, 2];
const result = arr.shift(); // 2
console.log(arr); // [0, 1]
```

- `Array.prototype.sort(compareFn)`：该方法用于在适当的位置对数组的元素进行排序，并返回修改后的数组。默认排序顺序是根据字符串 `Unicode` 码。

在没有指定 `compareFn` 时，会按照 **转换为字符串** 后逐个字符的 `Unicode` 码排序。如 `[1, 2, 10, 20].sort() => [1, 10, 2, 20]`，因为'10' 比 '2' 靠前。

在指定了 `compareFn` 时，会按照调用该函数的返回值排序。即 a 和 b 是将要比较的元素:

    - 如果 `compareFn(a, b)` 返回结果大于 0，则 a、b 交换位置；
    - 如果 `compareFn(a, b)` 返回结果等于 0，则 a、b 相对位置不变；
    - 如果 `compareFn(a, b)` 返回结果小于 0，则 a、b 不会交换位置；
    - 注： `compareFn(a, b)` **必须** 总是对相同的输入返回相同的结果，否则排序的结果是不确定的。

标准的 `compareFn`可以如下：

```
function compare (a, b) {
    if (a is less than b) {
        return -1;
    } else if (a is more than b) {
        return 1;
    } else {
        return 0;
    }
}
```

如果比较的数字而非字符串，比较函数可以使用简单的 `a-b`：

```js
const arr = [2,13,5,67,0,3,-3];
// 升序
const ascendOrder = arr.sort((a, b) => a - b);
// 降序
const descendOrder = arr.sort((a, b) => b -a);
console.log(arr === ascendOrder); // true
// 引用类型都是对于地址的引用
console.log(ascendOrder === descendOrder); // true
```

下面来看一个我犯过的错误：

```js
const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry','Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert','Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert','Blair, Tony', 'Blake, William'];

people.sort((a, b)=> a > b);

console.log(people); // ["Benchley, Robert", "Beck, Glenn", "Biko, Steve", "Beckett, Samuel", "Becker, Carl", "Billings, Josh", "Beethoven, Ludwig", "Beddoes, Mick", "Beecher, Henry", "Begin, Menachem", "Belloc, Hilaire", "Bellow, Saul", "Biondo, Frank", "Birrell, Augustine", "Black, Elk", "Blair, Robert", "Blair, Tony", "Blake, William"]
```

`compareFn` 中我原意是根据 `a > b` 的结果来决定其顺序，但是我疏忽了 `a > b` 的结果只可能是 `true | false`， 而该两个值转换为 `Number` 时是 `1 | 0`，所以会出现不符合与其的结果。

```js
const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry','Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert','Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert','Blair, Tony', 'Blake, William'];

people.sort((a, b)=> a > b ? 1 : -1);

console.log(people); // ["Beck, Glenn", "Becker, Carl", "Beckett, Samuel", "Beddoes, Mick", "Beecher, Henry", "Beethoven, Ludwig", "Begin, Menachem", "Belloc, Hilaire", "Bellow, Saul", "Benchley, Robert", "Biko, Steve", "Billings, Josh", "Biondo, Frank", "Birrell, Augustine", "Black, Elk", "Blair, Robert", "Blair, Tony", "Blake, William"]
```

这样就正确了。另外在研究过程中，发现 `Array.prototype.sort()` 在数组长度 10 以下与 10 以上用的不同算法。

这些明天再来补充吧~~~
