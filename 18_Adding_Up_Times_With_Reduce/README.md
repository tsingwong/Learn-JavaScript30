

类数组对象转换成数组


- `Array.from(NodeList)`
- `[...NodeList]`


然后又犯了之前提到的一个错误，黏贴过来记录

```js
// 下面是一个错误的案例：
["1", "2", "3"].map(parseInt); // [1, NaN, NaN]
// 是这样的 map 的回调函数中有三个参数 currentValue Index Array
// 相应的 parseInt 方法需要两个参数 string radix
// 所以第一次执行时也就是 parseInt('1', 0)
// 第二次执行时 parseInt('2', 1)
// 第三次执行时 parseInt('3', 2)

['1', '2', '3'].map( str => parseInt(str, 10)) ; // [1, 2, 3]

['1', '2', '3'].map(Number); // [1, 2, 3]
```
