### 主要任务

- 事件的原理
- JSON的方法
- localStorage 的方法

### 知识补充

##### 事件

事件是文档或浏览器窗口中发生的特定交互瞬间。JavaScript 与 HTML 的交互是通过**事件**来实现的。

事件流是描述从页面中接收事件的顺序，IE 与 Netscape 团队提出了截然不同的事件流概念，分别是事件冒泡流和事件捕获流。

事件冒泡（Event bubbling），即事件开始时由最具体的元素（文档中嵌套层数最深的节点）接收，然后逐级向上传播至最不具体的节点。现代浏览器都支持事件冒泡，一般事件冒泡的终点是 `window` 对象。

事件捕获（Event Capturing），即事件从最不具体的节点开始接收，然后逐级向下，直到最具体的节点为止。事件捕获的用意在于在**事件到达预定目标之前捕获它**。

DOM 事件流（一般来说是 DOM2级事件流）规定事件流有三个阶段，事件捕获阶段、处于目标阶段、事件冒泡阶段。

事件对象，在触发事件时，会产生一个事件对象 event，这个对象中包含着所有与事件相关的信息。



DOM 中的事件对象有如下属性和方法

| 属性/方法                  | 类型         | 说明                                                         |
| -------------------------- | ------------ | ------------------------------------------------------------ |
| bubbles                    | Boolean      | 只读，事件是否冒泡                                           |
| cancelable                 | Boolean      | 只读，是否可以取消事件的默认行为                             |
| currentTarget              | Element      | 只读，事件处理程序当前所处理事件的那个元素                   |
| defaultPrevented           | Boolean      | 只读，为 true 表示已经调用 preventDefault()方法              |
| detail                     | Integer      | 只读，与事件相关的细节信息                                   |
| eventPhase                 | Integer      | 只读，调用事件处理程序的阶段，1捕获，2处于目标，3冒泡        |
| preventDefault()           | Function     | 只读，取消事件的默认行为，当 `cancelable` 为 true ，才可用   |
| stopImmediatePropagation() | Function     | 只读，取消事件的进一步冒泡或捕获，同时阻止任何事件处理程序被调用 |
| stopPropagation            | Function     | 只读取消事件的进一步捕获或冒泡，当 `bubbles`是 true，才可用  |
| target                     | Element      | 只读，事件的目标                                             |
| trusted                    | Boolean      | 只读，为 true 时表示事件是浏览器生成的，false 表示是事件时有开发人员通过js创建的 |
| type                       | String       | 只读，被触发的事件类型                                       |
| view                       | AbstractView | 只读，与事件关联的抽象视图，等同于发生事件的 window 对象     |



在事件处理程序的内部，对象中的 `this` 始终指向 `currentTarget`。



IE 中的事件对象有如下属性和方法

| 属性/方法    | 类型    | 说明                                                  |
| ------------ | ------- | ----------------------------------------------------- |
| cancelBubble | Boolean | 读写，默认为 false，设置为 true 时可取消事件冒泡      |
| returnValue  | Boolean | 读写，默认为true，设置为 false 时可以取消事件默认行为 |
| srcElement   | Element | 只读，事件的目标                                      |
| type         | String  | 只读，被触发的事件类型                                |



事件类型有以下几类：

1.  UI事件，当用户与页面的元素交互时触发
2.  焦点事件，当元素获取或失去焦点时触发
3.  鼠标事件，当用户通过鼠标在页面上执行操作时触发
4.  滚轮事件，当使用鼠标或其他设备滚轮时触发
5.  文本事件，当在文档中输入文本时触发
6.  键盘事件，当用户通过键盘在页面上执行操作时触发
7.  合成事件，当 IME(Input Method Editor，输入法编辑器)输入字符时触发
8.  变动事件，当底层 DOM 结构发生变化时触发
9.  ~~变动名称事件，当元素或属性名变动时触发~~（已废弃）



##### 事件委托

对于 **事件处理程序过多** 问题的最佳实践就是事件委托。

事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。



```html
<ul id="myList">
    <li id="goSomeWhere">Go Some Where</li>
    <li id="doSomeThing">Do Some Thing</li>
    <li id="sayHi">Say Hi</li>
</ul>
```



传统做法中会使用3个事件处理程序，使用事件委托只需要在 DOM 输中尽量高的层级上添加一个事件处理程序即可：

```js
let list = document.querySelectorAll('#myList');

list.addElementListener('click', (event) => {
    let target = event.target;
    
    switch(target.id) {
        case 'doSomeWhere':
            location.href = 'https://tsingwong.cn';
            break;
        case 'doSomeThing':
            document.title = 'I change the document\'s title';
            break;
        case 'sayHi':
            alert('Hi');
            break;
    }
})
```

##### 对象解构赋值

解构赋值是 ES6 中新增的特性。

对象解构中属性没有次序，变量必须与属性同名，才能取到值。

```js
let {foo, bar} = {foo: 'aaa', bar: 'bbb'};
let {foo, bar, test} = {foo: 'aaa', bar: 'bbb'};// test  undefined
```

如果变量名和属性不一致，必须写成下面格式。

```js
let {foo: baz, bar: fob} = {foo: 'aaa', bar: 'bbb'}; // baz 'aaa' fob 'bbb'
```

##### Web 存储机制

Web Storage 的目的是克服由 cookie 带来的限制，当数据需要被严格控制在客户端时，无需持续地将数据发回服务器端。两个目标：

1.  提供一种在 cookie 之外存储会话数据的途径；
2.  提供一种存储大量可以跨平台存在的数据机制。

Storage 类型的实例方法：

-   `clear()`：删除所有值
-   `getItem(name)`：根据指定的名字 `name` 来获取对应的值
-   `key(index)`：获取 index 位置的值的名字
-   `remove(name)`：删除指定名字 `name` 对应的名值对
-   `setItem(name, value)`：为指定的 `name` 设置对应的值

**注：Storage 类型只能存储字符串，非字符串的数据在储存之前会被强制转换成字符串。**



sessionStorage 对象，存储特定某个会话的数据，即该数据只会保持到浏览器关闭。存储在 sessionStorage 中的数据可以跨越页面刷新而存在。



localStorage对象，作为持久保存客户端数据的 storage 对象。要访问同一个 localStorage 必须保证来自通过一个域名、同一种协议、同一个端口。

存储在 localStorage 对象中的数据保留到开发者通过 JavaScript 删除或者用户主动清除浏览器缓存。



storage 事件，对于 storage 对象进行修改，会在文档上触发 storage 事件。该 Event 对象有以下属性:

-   `domian`：发生变化的存储空间的域名
-   `key`：设置或删除的键名
-   `newValue`：设置新键值对时，是新值；删除时，为 null
-   `oldValue`： 键被更改之前的值



JSON 的语法有三种基本类型的值：

-   简单值：字符串、数值、布尔值、null，注并不支持 undefined；
-   对象：无序的键值对，值可以是简单值，也可以是复杂的数据数据类型的值；
-   数组：有序的值列表，值可以是简单值，也可以是复杂的数据数据类型的值。

除了这三种类型外，变量、函数、对象实例 JSON 一概不支持。

注：这里的不支持 undefined，并不是 JSON 中不能使用 undefined。

```js
let a = {name:'tsingwong', age:25};
let b = {test: undefined};
console.log(JSON.stringify(a)); // "{"name":"tsingwong","age":25}"
console.log(JSON.stringify(b)); // "{}"
```

JSON 对象，有两个方法：`stringify()` 和 `parse()`，其作用分别是将 JavaScript 对象序列化为 JSON 字符串和把 JSON 字符串解析为原生 JavaScript 值。

解析过程中会跳过值为 `undefined` 的属性。

注：两个方法常用于对象或数组的深拷贝。



`JSON.stringify()` 可接受三个参数，需要序列化的 JavaScript 对象、过滤器、缩进格式。

过滤器设置如果是数组，结果中将只包含数组中列出的属性。如果是是函数（常被成为replacer），函数接受两个参数分别是属性名和属性值，根据属性名可以知道该如何处理序列化之后的对象中的属性。

缩进格式是用于控制结果中的缩进和空白符，如果这个参数是一个数字，那么它表示的是每个级别的缩进空格数。如果是字符串，那么这个字符串将会出现在 JSON 字符串中被当做是缩进字符。需要注意的是最大缩进的长度是 10，所以最大缩进数字是 10，最长的缩进字符串也是10个字符、



另外在对象中存在一种 `toJSON()` 方法：

```js
let tsingwong = {
    name: 'tsingwong',
    age: 25,
    year: 1993,
    toJSON: function () {
        return `${this.name}.${this.age}`;
    }
};
console.log(JSON.stringify(tsingwong)); // "tsingwong.25"
```



序列化内部顺序，如将一个对象传入 `JSON.stringify()` ，序列化顺序如下：

1.  如果对象中存在 `toJSON()`方法且能通过它取得有效值，即调用方法并返回结果，否则返回对象本身；
2.  如果提供了第二个参数，应用函数过滤器。传入函数过滤器的值是第一步返回的值。
3.  对于第二步返回的每个值进行相应的序列化。
4.  如果提供第三个参数，执行相应的格式化。



与 `JSON.stringify()` 类似 `JSON.parse()` 同样也可以接受另一个参数，该参数为函数（与 replacer 相对应，常被称为 reviver），将在每个键值对上调用，实际上 replacer 与 reviver 两个函数的签名是相同的，他们都接受两个参数，一个键和一个值，且都会返回一个值。
