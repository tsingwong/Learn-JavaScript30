### 主要任务

    - 本节课程的目的是熟悉 `console` 用法

### 补充

`console` 实际上是 `window.console`。

主要有以下方法：

- `console.assert(assertion, obj/msg[, obj1/msg1 ...])`：参数 `assertion` 是断言的意思，是一个布尔表达式。如果断言为真，无任何操作。如果断言为假，调用 `console.error()` 方法输出后面的其余参数。
- `console.clear()`：清除控制台。值得注意的是如果 Chrome 浏览器开启了 `Preserve log` 功能，则该清除无效。
- `console.count([label])`：如果没设置 label 参数，那就是单纯的调用一次 `console.count()` 方法计数一次。如果设置 label 参数，那就是根据同样的参数来计数。
- `console.debug()`: 在 Chromium 58 之后才被加入到 Chrome 浏览器中，作为 `console.log()` 的别名。
- `console.dir(object)`：在控制台中显示指定JavaScript对象的属性，并通过类似文件树样式的交互列表显示。**非标准**
- `console.dirxml(object)`：显示一个明确的XML/HTML元素的包括所有后代元素的交互树。 如果无法作为一个element被显示，那么会以JavaScript对象的形式作为替代。 它的输出是一个继承的扩展的节点列表，可以让你看到子节点的内容。
- `console.error(obj1[ , obj2 ...]);`：向web控制台输出一条错误消息。
- `console.group([label])`：在 web console 中创建一个行内的组，且可以嵌套，直到 `console.groupEnd()` 方法的出现。
- `console.groupCollapsed([label])`： 与上面的 `console.group([label])` 方法一毛一样，唯一区别在于前者默认收起，后者默认展开。
- `console.groupEnd()`：结束当前对应的行内组。
- `console.info(msg/obj)`：在 web console 中发送通知信息。
- `console.log(msg/obj)`：在 web console 中发送信息。
- `console.profile([label])`：开始记录性能剖析。
- `console.profileEnd()`：结束性能剖析。
- `console.table(data[, columns])`：将数据以表格的形式显示
- `console.time(timerName)`：启动一个计时器，页面可同时启动 10000 个计时器，以毫秒作为单位，直到 `console.timeEnd()` 输出对应计时器所经过的时间。
- `console.timeEnd()`
- `console.timeStamp()`
- `console.trace()`
- `console.warn()`

