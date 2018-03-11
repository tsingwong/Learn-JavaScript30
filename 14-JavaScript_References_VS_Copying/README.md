### 主要任务

- 理解 引用 与 拷贝
- 基本类型的拷贝
- 数组的深拷贝与浅拷贝
- 对象的深拷贝与浅拷贝


### 知识补充

在 JavaScript 中，可以这样认为有两种不同的类型的值，基本类型和引用类型。基本类型有：Undefined、Null、Boolean、Number、String、Symbol（ES6 中新增）。引用类型有：对象、数组、函数、日期、正则等等。

#### 基本类型

简单来说，基本类型是按照值访问的，所以其复制操作是复制原地址的数据到新地址中，之后两个地址的数据虽然相同，但它们是互相独立，互不影响。

另外我们无法给基本类型添加属性，即使添加也是无效的~~

```js
let a = 5;
let b = a;

// 错误示范
a.test = 123;
console.log(a.test); // undefined
```

##### 检测基本类型

```js
typeof undefined;   // "undefined"
typeof true;        // "boolean"
typeof 42;          // "number"
typeof '42';        // "string"
typeof Symbol();    // "symbol"
// null 比较特殊
typeof null;        // "object"
typeof {};          // "object"

// 检测 null
var a = null;
(!a && typeof a === "object"); // true
```

#### 引用类型

引用类型的值是保存在内存中的对象，JavaScript 不允许直接访问内存中的位置，即不能直接操作对象的内存空间，其实操作的是对象的引用，所以说引用类型的值是按引用访问。

从一个变量向另一个变量复制引用类型值时，同样也会复制变量对象中的值到新变量分配空间中。只不过这两者都是指针，指向存储在堆内存中的对象。复制操作结束后，两个变量实际是指向同一个对象，因此改变其中一个变量内容，会影响另一个变量。

```js
let obj = {
    'name': 'tsingwong',
    'age': 24
};

let obj2 = obj;

obj2.age += 1;

console.log(obj.age); // 25
```

##### 检测引用类型

```js
var person = new Object();
var colors = ['red', 'blue', 'green'];
var pattern = /^\d$/;

console.log(person instanceof Object); // true
console.log(colors instanceof Array); // true
console.log(pattern instanceof RegExp); // ture
```

注：所有引用类型的值都是 Object 的实例。如果使用 instanceof 检测基本类型的值，会始终返回 false，因为基本类型的值根本不是对象。


#### 数组浅拷贝

数组的浅拷贝大致有以下几种方法：

```js
const arr1 = [0, 1, 2, 3];
const arr2 = arr1.slice();
const arr3 = arr1.concat();
const arr4 = [].concat(arr1);
// ES6
const arr5 = [...arr1];
// ES6
const arr6 = Array.from(arr1);
const arr7 = [];
Array.prototype.push.apply(arr7, arr1);
const arr8 = arr1.map((value) => {
    return value;
})
const arr9 = [];
for (let val of arr1.keys()) {
    arr9.push(val);
}
```

对象浅拷贝:

```js
const obj1 = {
    name: "Tsingwong",
    age: 25
};

function shallowClone(obj, output = {}) {
    // for...in 仅遍历其本身的可枚举属性
    for(let e in obj) {
        output[e] = obj[e];
    }
    return output;
}

const obj2 = shallowClone(obj1);
// ES6
const obj3 = Object.assign({}, obj1);
```


对象和数组的深拷贝

```js
// 1. 首先介绍网路上流传的黑科技
function deepClone1(obj, output) {
    output = JSON.parse(JSON.stringify(obj));
    return output;
}

// 2. 使用笨拙的方法来实现

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length !== 0;
}
function isArray(obj) {
    // return Array.isArray(obj) && obj.length !== 0;
    return Object.prototype.toString.call(obj) === '[object Array]' && obj.length !== 0;
    
}
function deepClone2 (obj, output) {
    if (!(obj instanceof Object)) {
        return '错误的参数';
    }
    if (isObject(obj)) {
        output = {}
    } else if (isArray(obj)) {
        output = [];
    }
    Object.entries(obj).forEach(([key, value]) => {
        if (isObject(value)) {
            output[key] = deepClone2(value, {});
        } else if (isArray(value)) {
            output[key] = deepClone2(value, []);
        } else {
            if (Array.isArray(output)) {
                output.push(value);
            } else {
                output[key] = value;
            }
        }
    })
    return output;
}

```
