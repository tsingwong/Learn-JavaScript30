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



传统做法中会使用3个事件处理程序，使用事件委托只需要

