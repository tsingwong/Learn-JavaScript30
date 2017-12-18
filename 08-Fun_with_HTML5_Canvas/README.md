### 主要任务

- 实现绘图板
    - 使用鼠标绘画
    - 颜色彩虹色渐变
    - 画笔大小渐变

### 补充

#### Canvas

`canvas` 最早是由 Apple 引入 Webkit 中，后来被 Safari 和 Chrome 广泛实现。

`<canvas>` 是一个可以使用脚本（`JavaScript`）在页面中绘制图形的 HTML 元素。

##### 简单介绍

`canvas` （译为：画布），是 HTML5 元素中功能极为强大的一个。其具体的能力是通过 `Canvas` 的 `content` 对象实现。

下面来简单介绍下：

`<canvas>` 标签仅有 `width` 和 `height` 属性，同样可以利用 DOM 的 `property` 来设置。其默认的宽高为 300/150 px。该元素同样可以使用 CSS 来定义大小，但绘制时图像会伸缩以适应它的框架尺寸：如果 CSS 的尺寸与初始画布比例不一致，画布会出线扭曲现象。

注：在设置 `<canvas>` 标签的 width 和 height 属性时，不要使用 `px` 或其他后缀，规范中这两属性只能是非负整数。

`canvas` 元素实际上是有两套尺寸。一个是元素本身的大小，另一个是元素绘图表面（drawing suface）的大小。当设置标签的 width 和 height 属性时，实际上是同时修改了元素本身大小和绘图表面的大小。但是如果修改 CSS 中的 `canvas` 元素，那么只会修改元素本身的大小，而不会影响到绘图表面的大小。

举个🌰：

当我们使用 CSS 将 canvas 元素的宽高改为 600 * 300 且不设置其标签内的宽高属性即默认的 300 * 150。所以这时候 canvas 元素的大小不符合其绘图表面的大小，所以浏览器会对绘图表面进行缩放，使其符合元素的大小。即浏览器会将绘图表面从 300 * 150 拉伸到 600 * 300。

##### canvas 元素的 API

`canvas` 元素仅提供了两个属性及三个方法。

属性：

- `width`：绘图表面的宽度，默认浏览器会将 canvas 元素的大小设定与绘图表达大小一致。然而如果元素 css 覆盖了元素大小，那么浏览器则会将灰土表面进行缩放，使之符合元素尺寸。取值为非负整数，前缀可以添加 `+` 和 空格，但是规则规定不能给数值加 `px` 后缀。
- `height`：绘图表面的高度，其余信息同上面的 `width`。

方法： 

- `Canvas.getContext()`：返回与该 canvas 元素相关的绘图环境对象。每个 canvas 元素与每个环境都是唯一对应的。
- `Canvas.toDataURL(type, quality)`：返回一个数据地址（data URL），可以将它设定为 img 元素的 src 属性值。第一个参数指定图像的类型，如 `image/jpeg` 或 `image/png`，默认值是后者。第二个参数必须是 0 ~ 1.0 之间的 double 值，表示 JPEG 图像的显示质量，默认值为 0.92。
- `Canvas.toBlob(callback, type, args...)`：创建一个用于表示此 canvas 元素图像文件的 Blob。第一个参数是一个回调函数，浏览器会以新创建的 blob 对象为参数，去调用该回调函数。第二个参数是以 `image/png` 这样的形式来指定图像类型，默认为 `image/png`。最后一个参数为介于 0 ~ 1.0 之间的值，表示 JPEG 图像的质量。

##### 2d 绘图环境

在 JavaScript 代码中，一般很少会使用 canvas 元素本身，除了偶尔通过 canvas 元素获取其 宽高或数据地址等操作。大多数操作都是基于 `context` 对象（这里介绍的以 2D为主）。

```js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
```

`CanvasRenderingContext2D` 的属性：

- `context.canvas`：指回该绘图环境所述的 canvas 对象。常用语通过它来获取 canvas 的宽高，如`context.canvas.width/height`。
- `context.fillstyle`：指定绘图环境在后续的图形填充操作中所使用的颜色、渐变色或图案。
- `context.font`：指定在调用绘图环境对象的 fillText() 或 strokeText() 方法时，使用的字体
- `context.globalAlpha`：全局透明度设置
