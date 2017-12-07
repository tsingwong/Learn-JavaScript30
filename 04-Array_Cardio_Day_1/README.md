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

注：

**Mutator Function**

使用下面方法会改变调用对象本身。

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

- `Array.prototype.sort(compareFn)`：该方法用于在适当的位置对数组的元素进行排序，并返回修改后的数组。默认排序顺序是根据字符串 `Unicode` 码。注：该方法在不同的浏览器内实现是不同的，所以该方法的排序 **不一定是稳定** 的。

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

这些明天再来补充吧~~~ 哇我发现这个地方要深挖能写很多，对于初级前端的我太高深了，还是过几天整理下思路在写哈。嘿嘿~~~

- `Array.prototype.splice(start[, deleteCount[, ...items]])`：该方法用于删除现有元素和添加新元素来改变数组的内容，返回由被删除元素组成的数组。`start` 如果超过了数组长度，即从数组末尾开始接下来的操作。`deleteCount`必须是整数，表示要移除的元素个数。如果是0，为不移除元素。如果 `deleteCount` 大于 `start` 之后元素的总和，则移除从 `start` 起到最后的元素。默认值为`arr.length - start` 同前一个表现。后面为参数列表，即要添加进数组的元素，从 `start` 位置开始，按照后面的顺序不变得插入到数组中。如果不指定，则该方法只删除数组元素。


```js
const arr = [0 ,1 ,2 ,3, 4, 5];

let removed = arr.splice(); // []

console.log(arr); // [0 ,1 ,2 ,3, 4, 5]

removed = arr.splice(5, 1); // [5]

console.log(arr); // [0, 1 ,2 ,3, 4]

removed = arr.splice(3, 10); // [3, 4]

console.log(arr); // [0, 1, 2]

removed = arr.splice(0, 0 ,-2, -1); // []

console.log(arr); // [-2, -1, 0, 1, 2]

removed = arr.splice(1); // [-1, 0, 1, 2]

console.log(arr); // [-2]
```

- `Array.prototype.unshift(...items)`：该方法用于将一个或多个数组添加到数组的开头，并返回修改后数组的长度。该方法同样可以 `call()` 或 `apply()` 方法作用于类似数组对象上。

```js
const arr = [3, 4, 5];

let result = arr.unshift(); // 3

console.log(arr); // [3, 4, 5]

result = arr.unshift(2); // 4

console.log(arr); // [2, 3, 4, 5]

result = arr.unshift(0, 1); // 6

console.log(arr); // [0, 1, 2, 3, 4, 5]

const addArr = [-2, -1];

Array.prototype.unshift.apply(arr, addArr); // 8

console.log(arr); // [-2, -1, 0, 1, 2, 3, 4, 5]
```

**Accessor Function**

下面的方法使用 **绝对** 不会改变调用他们的对象，只会返回一个新数组或其他期望值。

- `Array.prototype.concat(...arguments)`：用户合并多个数组，返回一个合并后的新数组。同样它也是执行的浅拷贝，也就是说引用类型和基本数据类型的拷贝后表现仍然不同。

```js
const arr1 = [-1, [0, 1]];
const arr2 = [3, 4];

const arrs = arr1.concat(2, arr2);

console.log(arrs); // [-1, [0, 1], 2, 3, 4]

arr1[1].push(1.5);

console.log(arrs); // [-1, [0, 1, 1.5], 2, 3, 4]
```

- `Array.prototype.includes(searchElement[, fromIndex])`：该方法用于判断一个数组中是否包含指定值，返回布尔值。`searchElement` 表示需要查找元素的值。`fromIndex` 表示从该索引处开始查找 `searchElement`，可以为负值，默认是 0，当 `fromIndex` 大于 `arr.length` 时，直接回返回 `false`，当 `fromIndex` 为负数时，如果 `fromIndex + arr.length` >= 0 时，按照其位置开始，否则整个数组都会被搜索。同样也可以使用 `call()` 或 `apply()` 作用于非数组对象上。

```js
const arr = [0, 1, 2, 3];
console.log(arr.includes(2)); // true
console.log(arr.includes(4)); // false

console.log(arr.includes(2, 3)); // false

const anotherArr = [{name: 'tsingwong'}, [1, 2], '哈哈'];
console.log(anotherArr.includes({name: 'tsingwong'})); // false
console.log(anotherArr.includes([1, 2])); // false
console.log(anotherArr.includes('哈哈')); // true

const obj = {age: 25};
anotherArr.push(obj);

console.log(anotherArr.includes(obj)); // true

(function (){
    console.log(Array.prototype.includes.call(arguments, 'a')); // true
    console.log(Array.prototype.includes.call(arguments, 'd')); // false
}('a', 'b', 'c'));
```

- `Array.prototype.join(separator)`：该方法用于将数组中的所有元素连接到一个字符串中。`separator` 是指定用于分隔数组元素的字符串，默认值为 `','`，如果设置为空字符串 `''`，则所有的元素之间都没有任何字符串。

注：数组中所有元素会先被转换成字符串（调用 `toString()`），然后再使用分隔符连接起来。如果元素是undefined 或者null， 则会转化成空字符串。

```js
const arr = [undefined, 1, '2', [3, 4], null, {name: 'tsingwong'}];

const result = arr.join(); 

console.log(result); // ",1,2,3,4,,[object Object]"
```

- `Array.prototype.slice(start, end)`：该方法用于将`start` 到 `end` 位置内的元素浅拷贝到一个新数组对象中，注意区间为前开后闭。`start` 参数默认为 0，负数表示 `arr.length + start` 的位置。`end` 参数默认或大于数组长度时，方法会浅拷贝到数组末尾，否则就是前开后闭的区间。

注： 如果向两个数组任一中添加了新元素，则另一个不会受到影响。

```js
const arr = [false, 1, '2', [3, 4], {name: 'tsingwong'}];

const result = arr.slice(1);

console.log(result); // [1, "2", [3, 4], {name: "tsingwong"}]

arr[3].push(5); 

console.log(result); // [1, "2", [3, 4, 5], {name: "tsingwong"}]

arr.shift(); // false

console.log(result); // [1, "2", [3, 4, 5], {name: "tsingwong"}]
```

- `Array.prototype.toString()`：该方法返回一个字符串，表示指定的数组及其元素。`Array` 对象覆盖了 `Object` 对象上的 `toString()` 方法。数组对象中 `toString()` 方法可以理解成将数组中每个元素的 `toString()` 返回值经过调用 `join()` 方法连接成由逗号隔开的字符串。

注： 当数组被作为文本值或进行字符串操作时，会默认调用 `toString()` 方法。

```js
const symbol = Symbol('5');
const arr = [false, 1, '2', [3, 4], {name: 'tsingwong'}, symbol];

// Uncaught TypeError: Cannot convert a Symbol value to a string
// Symbol值不能与其他类型的值进行运算。
console.log(arr.toString()); 

arr.pop(); // Symbol(5)

console.log(arr.toString()); // false,1,2,3,4,[object Object]

console.log(arr.join()); // false,1,2,3,4,[object Object]
```

- `Array.prototype.toLocaleString([reserved1[, reserved2]])`：该方法会返回一个字符串表示数组中的元素，数组中元素将使用各自的 `toLocaleString()` 方法转换成字符串。

```js
const number = 1337;
const date = new Date();
const arr = [number, date, 123, {name: 'tsingwong'}];

console.log(arr.toLocaleString()); // 1,337,12/6/2017, 4:48:08 PM,123,[object Object]
```

- `Array.prototype.indexOf(searchElement[, fromIndex])`：该方法用于在数组中查找 `searchElement` 元素，并返回查找到的 **第一个索引**，如果不存在就返回 -1。`fromIndex` 参数表示开始查找的位置，默认是 0。

```js
const symbol = Symbol('5');
const obj = {name: 'tsingwong'};
const arr = [false, 1, '2', [3, 4], obj, {age: 25}, symbol];

arr.indexOf(false); // 0
arr.indexOf(1, 3); // -1
arr.indexOf({name: 'tsingwong'}); // -1
arr.indexOf(obj); // 4
arr.indexOf(Symbol('5')); //-1
arr.indexOf(symbol); // 6
arr.indexOf('2'); // 3
```

- `Array.prototype.lastIndexOf(searchElement[, fromIndex = arr.length - 1])`：该方法用于在数组中查找 `searchElement` 元素，并返回查找到的 **最后一个索引**，如果不存在就返回 -1，该方法与`indexOf()` 的不同在于，它是从后向前查找。`fromIndex` 参数表示开始查找的位置，默认是 `arr.length - 1`。

```js
const symbol = Symbol('5');
const obj = {name: 'tsingwong'};
const arr = [false, 1, '2', [3, 4], obj, {age: 25}, symbol,'2'];

arr.lastIndexOf(false); // 0
arr.lastIndexOf(1, 3); // 1
arr.lastIndexOf({name: 'tsingwong'}); // -1
arr.lastIndexOf(obj); // 4
arr.lastIndexOf(Symbol('5')); //-1
arr.lastIndexOf(symbol); // 6
arr.lastIndexOf('2'); // 7
```

**Iteration Function**

还有一些遍历方法，多数是指定回调函数作为参数，返回新数组或其他预期结果。

在遍历方法中，每个数组元素都分别执行完回调函数之前，数组的 length 属性会被缓存到内存中，所以如果在回调函数中，增加元素则新增元素不会被遍历。如果删除或改变某个元素可能会带来未知影响。所以，**尽可能不要再遍历过程中对原数组进行任何修改操作**。

- `Array.prototype.forEach(callbackfn(currentValue, index, array)[, thisArg])`：该方法用于对数组的每个元素执行一次提供的回调函数，无返回结果即返回 `undefined`。`callbackfn` 是为数组中每个元素执行的函数。`currentValue` 是数组中正在处理的当前元素，`index` 是数组中正在处理的当前元素的索引，`array`是当前正在操作的数组，`thisArg` 表示执行回调函数时指定的`this`值。

注：`forEach()` 为每个数组元素执行callback函数；不像 `map()` 或者 `reduce()` ，它总是返回 `undefined` 值，并且不可链式调用。典型用例是在一个链的最后执行副作用。

```js
const arr = [0, 1, 2, 3, 4];

arr.forEach((val, index, arr) => {
    console.log(`arr[${index}] = ${val}`);
});

const obj = {
    total: 0
};

arr.forEach((val, index, arr) => {
    console.log(this.total); // undefined， 由于是箭头函数的关系，所以指定 this 依然无效。
    this.total += val; // NaN
    console.log(`arr[${index}] = ${val}, total = ${this.total}`);
}, obj); 


arr.forEach(function (val, index, arr){
    console.log(this.total); // 0
    this.total += val; // 0
    console.log(`arr[${index}] = ${val}, total = ${this.total}`);
}, obj); 

//  下面是一个对象浅拷贝函数
function copyObj (obj) {
    // 返回指定对象的原型（内部[[Prototype]]属性的值）
    const copy = Object.create(Object.getPrototypeOf(obj));
    // 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
    const propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach((name) => {
        // 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
        const desc = Object.getOwnPropertyDescriptor(obj, name);
        // 会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
        Object.defineProperty(copy, name, desc);
    });
    
    return copy;
}

const obj1 = {name: 'tsingwong', age: '25'};
const obj2 = copyObj(obj1);
obj1.arr = [0, 1, 2, 3];

const obj3 = copyObj(obj1);
obj1.arr.push(4);
console.log(obj3); // [0, 1, 2, 3, 4]
```

- `Array.prototype.entries()`：该方法返回一个新的 `Array Iterator` 迭代器对象，该对象中包含数组中的每个索引的键值对。

```js
const arr = ['a' , 'b', 'c'];
const iterator = arr.entries();

console.log(iterator);

console.log(iterator.next().value,; // [0, "a"]， 此时的 itertor.next().done = false
console.log(iterator.next().value); // [1, "b"]
console.log(iterator.next().value); // [2, "c"]
console.log(iterator.next().value); // undefined， 此时的 itertor.next().done = true

const arrNew = ['a' , 'b', 'c'];
const iteratorNew = arr.entries();

// 这里提一下， for ... of 在可迭代对象上，创建一个迭代循环
for (let e of iteratorNew) {
    console.log(e);
}
// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```

- `Array.prototype.every(callbackfn(currentValue, index, array)[, thisArg])`：该方法用于测试数组的所有元素是否都通过了指定函数的测试，如果所有元素都通过了，返回 `true`，反之，只要有不通过的就返回 `false`。其参数同上面的 `forEach()` 方法。

注：`callbackfn` 的执行次数是由第 `callbackfn()` 方法的返回值决定的，如果找到这样一个使 `callbackfn()` 返回一个“假值”，那么 `every()` 方法会立即返回 `false`。

```js
const arr = [10, 20, 90, 50];

let result = arr.every((val, index, array) => {
    console.log(index); // 0 1 2 3
    return !(val % 10);
}); // true

const obj = {number: 3};

result = arr.every(function (val, index, array) {
    console.log(index); // 0
    return (val / 10) > this.number;
}, obj); // false
```

- `Array.prototype.some(callbackfn(currentValue, index, array)[, thisArg])`：该方法用于测试数组中的某些元素是否通过由提供的函数实现，如果没有任何通过，返回 `false`，反之，有一个通过即返回 `true`。其参数同上面的 `forEach()` 方法。

注：`callbackfn` 的执行次数是由第 `callbackfn()` 方法的返回值决定的，如果找到这样一个使 `callbackfn()` 返回一个“真值”，那么 `some()` 方法会立即返回 `true`。


```js
const arr = [10, 20, 90, 50];

let result = arr.some((val, index, array) => {
    console.log(index); // 0
    return !(val % 10);
}); // true

const obj = {number: 3};

result = arr.some(function (val, index, array) {
    console.log(index); // 0 1 2
    return (val / 10) > this.number;
}, obj); // true
```

- `Array.prototype.filter(callbackfn(currentValue, index, array)[, thisArg])`：该方法用于创建一个新数组，其中包含 `callbackfn()` 回调函数返回为 `true` 的所有元素。其参数同上面的 `forEach()` 方法。

```js
const arr = [10, 20, 90, 50];

let result = arr.filter((val, index, array) => {
    console.log(index); // 0 1 2 3
    return !(val % 10);
}); 
console.log(result); // [10, 20, 90, 50]

const obj = {number: 3};

result = arr.filter(function (val, index, array) {
    console.log(index); // 0 1 2 3
    return (val / 10) > this.number;
}, obj);
console.log(result); // [90. 50]
```

- `Array.prototype.find(predicate(currentValue, index, array)[, thisArg])`：该方法用于返回数组中 `predicate()` 回调函数返回为 `true` 的 **第一个值**，否则返回 `undefined`。其参数同上面的 `forEach()` 方法。

```js
const arr = [10, 20, 90, 50];

let result = arr.find((val, index, array) => {
    console.log(index); // 0
    return !(val % 10);
}); // 10

const obj = {number: 3};

result = arr.find(function (val, index, array) {
    console.log(index); // 0 1 2
    return (val / 10) > this.number;
}, obj); // 90


// 下面为寻找数组中的质数

function isPrime(val, index, array) {
    let start = 2;
    while (start <= Math.sqrt(val)) {
        if (val % start++ < 1) {
            return false;
        }
    }
    return val > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); // undefined
console.log([4, 5, 8, 12].find(isPrime)); // 5
```

- `Array.prototype.findIndex(predicate(currentValue, index, array)[, thisArg])`：该方法用于返回数组中 `predicate()` 回调函数返回为 `true` 的 **第一个键名**，否则返回 `-1`。其参数同上面的 `forEach()` 方法。

```js
const arr = [10, 20, 90, 50];

let result = arr.findIndex((val, index, array) => {
    console.log(index); // 0
    return !(val % 10);
}); // 0

const obj = {number: 3};

result = arr.findIndex(function (val, index, array) {
    console.log(index); // 0 1 2
    return (val / 10) > this.number;
}, obj); // 2
```

- `Array.prototype.keys()`：该方法返回一个新的 `Array Iterator` 迭代器对象，其中包含数组中的每个键值。

```js
const arr = ['a' , 'b', 'c'];
const iterator = arr.keys();

console.log(iterator);

console.log(iterator.next().value,; // 0， 此时的 itertor.next().done = false
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // undefined， 此时的 itertor.next().done = true

const arrNew = ['a' , 'b', 'c'];
const iteratorNew = arr.keys();

// 这里提一下， for ... of 在可迭代对象上，创建一个迭代循环
for (let e of iteratorNew) {
    console.log(e);
}
// 0
// 1 
// 2
```

- `Array.prototype.map(callbackfn[ ,thisArg])`：该方法创建一个新数组，其内容是原数组中的每个元素执行 `callbackfn()` 回调函数的返回结果，最后返回新建的数组。

`map()` 方法常用于格式化数组中的对象，同样可以使用 `call()` 或 `apply()` 方法作用于类数组对象上。


```js
const arr = [1, 2, 3];
let result = arr.map((val) => Math.sqrt(val));

console.log(result); // [1, 4, 9]

const kvArr = [
    {key: 1, value: 10}, 
    {key: 2, value: 20}, 
    {key: 3, value: 30}
];

result = kvArr.map((obj) => {
    const tempObj = {};
    tempObj[obj.key] = obj.value;
    return tempObj;
});

console.log(result); // [{1: 10}, {2: 20}, {3: 30}]

result = Array.prototype.map.call('Tsing Wong', (val) => val.charCodeAt(0));

console.log(result); // [84, 115, 105, 110, 103, 32, 87, 111, 110, 103]

// 下面是一个错误的案例：
["1", "2", "3"].map(parseInt); // [1, NaN, NaN]
// 是这样的 map 的回调函数中有三个参数 currentValue Index Array
// 相应的 parseInt 方法需要两个参数 string radix
// 所以第一次执行时也就是 parseInt('1', 0)
// 第二次执行时 parseInt('2', 1)
// 第三次执行时 parseInt('3', 2)

['1', '2', '3'].map( str => parseInt(str, 10)) ; // [1, 2, 3]

'1', '2', '3'].map(Number); // [1, 2, 3]
```

- `Array.prototype.reduce(callbackfn(accumulator, currentValue, currentIndex, array)[, initValue])`：该方法用于对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。`accumulator` 参数表示累加器累加回调的返回值，他是上一次调用回调是返回的累加值，如果设置了 `initValue` 参数，则首次调用回调时该值为 `initValue`。`initialValue`参数作为第一次调用 `callbackfn()` 的第一个参数值。如果没有提供初始值，则将使用数组中的第一个元素。

```js
const arr = [
    {
        x: 123
    },
    {
        x: 456
    }
];

let result = arr.reduce((pre, cur, val, arr) => {
    return Math.max(pre.x, cur.x);
}); 

console.log(result); // 456

result = arr.reduce((pre, cur, val, arr) => {
    return pre + cur. x;
}, 0);

console.log(result); // 579

// 下面为计算数组中每个元素出线的次数

const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
const countName = names.reduce((pre, cur, val, arr) => {
    cur in pre ? pre[cur]++ : (pre[cur] = 1);
    return pre;
}, {});

console.log(countName); // {Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
```

- `Array.prototype.reduceRight(callbackfn(accumulator, currentValue, currentIndex, array)[, initValue])`: 该方法用于对累加器和数组中的每个元素（从右到左）应用一个函数，将其减少为单个值。参数同 `reduce()` 方法。



- `Array.prototype.values()`：该方法返回一个新的 `Array Iterator` 迭代器对象，该对象中包含数组中的每个索引的值。

```js
const arr = ['a' , 'b', 'c'];
const iterator = arr.values();

console.log(iterator);

console.log(iterator.next().value,; // 'a'， 此时的 itertor.next().done = false
console.log(iterator.next().value); // 'b'
console.log(iterator.next().value); // 'c'
console.log(iterator.next().value); // undefined， 此时的 itertor.next().done = true

const arrNew = ['a' , 'b', 'c'];
const iteratorNew = arr.values();

// 这里提一下， for ... of 在可迭代对象上，创建一个迭代循环
for (let e of iteratorNew) {
    console.log(e);
}
// 'a'
// 'b' 
// 'c'
```

- `Array.prototype[@@iterator]()`：也就是数组的默认迭代方法，就是 `values()` 方法。

```js
const arr = ['a' , 'b', 'c'];
// 这里提一下， for ... of 在可迭代对象上，创建一个迭代循环
for (let e of arr) {
    console.log(e);
}
// 'a'
// 'b' 
// 'c'
```

至此，数组差不多所有的方法都介绍了，依稀记得第一次找实习时候的面试，面试官最后用一个问题来决定我是否能通过，说出 5个数组的方法。
