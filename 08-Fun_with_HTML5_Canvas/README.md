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
- `context.globalAlpha`：全局透明度设置，取值范围为 0 ~ 1.0（即完全透明到完全不透明），浏览器会将每个像素的 alpha 与该值相乘，得到该像素点最后的透明度。
- `context.globalCompsiteOperation `：该值决定浏览器将某个物体绘制在另一个物体上，所采用的绘制方式。
- `context.lineCap`：浏览器如何绘制线段的端点。可选值为`butt`、`round`、`square`，默认值是 `butt`。
- `context.lineWidth`：浏览器如何绘制线段的屏幕像素宽度。必须是非负、非无穷的数。默认值为 1.0。
- `context.lineJoin`：浏览器在两条线段相交时如何绘制焦点。可选值为 `bevel`、`round`、`miter`，默认为 `miter`。
- `context.miterLimit`：浏览器如何绘制 miter 形式的线段焦点。
- `context.shadowBlur`：浏览器如何延伸阴影效果。值越高，阴影效果延伸越远。该值不是指阴影的像素长度，而是代表高丽模糊方程式中的参数值，必须是非负、非无穷的数，默认值是 0。
- `context.shadowColor`：浏览器使用何种颜色来描绘阴影。通常采用半透明色作为该属性的值，以便让后面的背景能显示出来。
- `context.shadowOffsetX`：以像素为单位，制定了阴影效果的水平方向偏移量。
- `context.shadowOffsetY`：以像素为单位，指定了阴影效果的垂直方向偏移量。
- `context.strokeStyle`：对路径进行描边时所使用的绘制风格，该值可以被设置为某个颜色（关键词，rgb/rgba，hsl/hsla）、渐变色或图案等。
- `context.textAlign`：以 `fillText()` 或 `strokeText()` 方式绘制时，所画的文字的水平对其方式。
- `context.textBaseline`：以 `fillText()` 或 `strokeText()` 方式绘制时，所画的文字的垂直对其方式。

绘制矩形：

- `context.clearRect(x, y, width, height)`：擦除指定矩形区域之前绘制的内容，并将其所有像素都变为透明。
- `context.fillRect(x, y, width, height)`：绘制填充矩形，`context.fillStyle` 属性决定矩形的样式。
- `context.strokeRect(x, y, width, height)`：绘制描边矩形，`context.strokeStyle` 属性决定矩形的样式。

绘制文本：

- `context.fillText(text, x, y [, maxWidth])`：使用当前的 font, textAlign, textBaseline 和 direction 值对文本进行渲染，在该位置绘制填充文字。如果选项的第四个参数提供了最大宽度，文本会进行缩放以适应最大宽度。
- `context.strokeText(text, x, y [, maxWidth])`：使用当前 font，textAlign，textBaseline和direction 的值对文本进行渲染，在该位置绘制描边文字。如果选项的第四个参数提供了最大宽度，文本会进行缩放以适应最大宽度。
- `context.measureText(text)`：返回一个 `TextMetrics` 对象，包含关于文本尺寸的信息。

线型：

- `context.lineWidth`：设置线段的宽度。默认是 1.0。当给属性赋值时， 0、 负数、 `Infinity` 和 `NaN` 都会被忽略；除此之外，都会被赋予一个新值。
- `context.lineCap`：设置线段末端的属性。默认值是 butt，可选值：butt（方形）, round （圆形）和 square （方形 + 1 / 2 宽度值的高度）。
- `context.lineJoin`：设置线段相交的属性。默认值是 miter，可选值为：round（通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度）, bevel（在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角） 和 miter（通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域）。
- `context.miterLimit`：设置斜接面限制比例的属性。默认值是 10.0。当给属性赋值时， 0、负数、 Infinity 和 NaN 都会被忽略；除此之外都会被赋予一个新值。
- `context.setLineDash(segments)`：设置虚线样式，segments 是一个数组，一组描述交替绘制线段和间距（坐标空间单位）长度的数字，如果数组元素的数量是奇数， 数组的元素会被复制并重复。其表现就是按照数组中的顺序来控制线段的长度和空白的长度。
- `context.getLineDash()`：获取当前虚线样式，返回一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。如果数组元素的数量是奇数，数组元素会被复制并重复。 
- `context.lineDashOffset`：设置虚线的偏移量属性。默认值为 0.0。可以用于实现跑马灯效果。

文本样式：
- `context.font`：设置当前字体样式的属性。与 css font 规范相同。默认为 `10 px sans-serif`。
- `context.textAlign`：设置当前文本对齐方式的属性。默认值是 `start`。注意，该对齐是基于 `context.fillText` 方法的x的值。所以如果 textAlign="center"，那么该文本将画在 x-50%*width。可选值为 `left | right | start | end | center`。
- `context.textBaseline`：设置当前文本基线的属性，即决定文字垂直方向上的对其方式。默认为 `alphabetic`。可选值为： `top | hanging | middle | alphabetic | ideographic | bottom`。
- `context.direction`：设置当前文字方向的属性。默认为 `inherit`。可选值为： `ltr | rtl | inherit`。

填充和描边样式:

- `context.fillStyle`：设置填充颜色和样式的属性。默认值是 `#000`。可以是以下三种：color | gradient | pattern。
- `context.strokeStyle`：设置描边颜色和样式的属性。默认值是 `#000`。可以是以下三种：color | gradient | pattern。

渐变和图案：

- `context.createLinearGradient(x0, y0, x1, y1)`：创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性 `CanvasGradient` 对象。使用 `createLinearGradient()` 方法创建一个指定了开始和结束点的 `CanvasGradient` 对象。创建成功后，你就可以使用 `CanvasGradient.addColorStop()` 方法，根据指定的偏移和颜色定义一个新的终止。 如例子所示，渐变允许赋值给当前的 `fillStyle` ，使用 `fillRect()` 方法时，在 canvas 上绘制出效果。
- `context.createRadialGradient(x0, y0, r0, x1, y1, r1)`：根据参数确定两个圆的坐标，绘制放射性渐变的方法。该方法返回一个放射性 `CanvasGradient` 对象。使用 `createRadialGradient` 方法创建一个指定了开始和结束圆的 `CanvasGradient` 对象。 一旦创建，你可以使用 `CanvasGradient.addColorStop()` 方法根据指定的偏移和颜色定义一个新的终止。你可以将当前的 `fillStyle` 设置成此渐变， 当使用 `fillRect()` 方法时，会在 canvas 上绘制出效果。
- `context.createPattern(image, repetition)`：使用指定的图像创建模式的方法。 它通过 `repetition` 参数在指定的方向上重复元图像。此方法返回一个 `CanvasPattern` 对象。使用 `createPattern` 方法创建一个指定图像和重复的 `CanvasPattern` 对象。创建完成后，可以使用 `CanvasPattern.setTransform()` 方法对图案进行变形。如示例所示，你可以把此模式赋值给当前的 `fillStyle`，当你使用 `fillRect() `方法时，会在 canvas 上绘制出效果。

阴影：

- `context.shadowBlur`：设置阴影模糊效果程度的属性。它既不对应像素值也不受当前转换矩阵的影响。 默认值是 0。负数、 Infinity 或者 NaN 都会被忽略。
- `context.shadowColor`：设置阴影颜色的属性。默认值是 `fully-transparent black`。注意： `shadowColor` 属性设置成不透明的，并且 `shadowBlur`、 `shadowOffsetX` 或者 `shadowOffsetY` 属性不为0，阴影才会被绘制。
- `context.shadowOffsetX`：设置阴影水平偏移距离的属性。默认值是 0。Infinity 或者 NaN 都会被忽略。
- `context.shadowOffsetY`：设置阴影垂直偏移距离的属性。默认值是 0。Infinity 或者 NaN 都会被忽略。

路径：

- `context.beginPath()`：通过清空子路径列表开始一个新路径的方法。 当你想创建一个新的路径时，调用此方法。
- `context.closePath()`：将笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。 如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。所以 `fill()` 函数会将未闭合图形自动闭合但 `stroke()` 函数不会自动闭合。
- `context.moveTo(x, y)`：将一个新的子路径的起始点移动到 `(x，y)` 坐标的方法。
- `context.lineTo(x, y)`：使用直线连接子路径的终点到 `(x，y)` 坐标的方法（并不会真正地绘制）。
- `context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`：绘制三次贝赛尔曲线路径的方法。 该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 `moveTo()` 进行修改。
- `context.quadraticCurveTo(cpx, cpy, x, y)`：绘制二次贝塞尔曲线路径的方法。它需要2个点。 第一个点是控制点，第二个点是终点。 起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 `moveTo()` 方法进行改变。
- `context.arc(x, y, radius, startAngle, endAngle, anticlockwise)`：绘制圆弧路径的方法。 圆弧路径的圆心在 `(x, y)` 位置，半径为 r ，根据 `anticlockwise` （默认为顺时针，false）指定的方向从 `startAngle` 开始绘制，到 `endAngle` 结束。
- `context.arcTo(x1, y1, x2, y2, radius)`：根据控制点和半径绘制圆弧路径，使用当前的描点(前一个moveTo或lineTo等函数的止点)。根据当前描点与给定的控制点1连接的直线，和控制点1与控制点2连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径。
- `context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)`：添加椭圆路径的方法。椭圆的圆心在`(x,y)`位置，半径分别是 `radiusX` 和 `radiusY` ，`rotation` 是椭圆的旋转角度，以弧度表示(非角度度数)， 按照 `anticlockwise`（默认顺时针）指定的方向，从 startAngle  开始绘制，到 endAngle 结束。
- `context.rect(x, y, width, height)`：创建矩形路径的方法，矩形的起点位置是 `(x, y)` ，尺寸为 `width` 和 `height`。矩形的4个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。

绘制路径：

- `context.fill([path, fillRule])`： 根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。`path` 是需要填充的路径，`fillRule` 是填充算法，`nonzero`: 非零环绕规则， 默认的规则。`evenodd`: 奇偶环绕规则。
- `context.stroke([path])`：使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法。
- `context.drawFocusIfNeeded([path, element])`： 用来给当前路径或特定路径绘制焦点的方法，如果给定的元素获取了焦点。
- `context.scrollPathIntoView([path])`：将当前或给定的路径滚动到窗口的方法。类似于 `Element.scrollIntoView()`。
- `context.clip([path, fillRule])`：将当前创建的路径设置为当前剪切路径的方法。参数属性同 `fill()`。
- `context.isPointInPath([path, ]x, y[, fillRule])`：用于判断在当前路径中是否包含检测点的方法，返回布尔值。参数属性同上。
- `context.isPointInStroke([path, ]x, y)`：用于检测某点是否在路径的描边线上的方法，返回布尔值。

变换，在 `CanvasRenderingContext2D` 渲染背景中的对象会有一个当前的变换矩阵，一些方法可以对其进行控制。当创建当前的默认路径，绘制文本、图形和Path2D对象的时候，会应用此变换矩阵。：

- `context.currentTransform`：设置当前变换的矩阵(SVGMatrix对象)。
- `context.rotate(angle)`：在变换矩阵中增加旋转的方法。角度变量表示一个顺时针旋转角度并且用弧度表示。
- `context.scale(x, y)`：根据 x 水平方向和 y 垂直方向，为 canvas 单位添加缩放变换的方法。参数 x、y 分别为水平和垂直方向上的缩放因子。
- `context.translate(x, y)`：通过在网格中移动 canvas 和 canvas 原点 x 水平方向、原点 y 垂直方向，添加平移变换的方法。参数 x、y 分别是水平和垂直方向上的移动距离。
- `context.transform(a, b, c, d, e, f)`：使用矩阵多次叠加当前变换的方法，矩阵由方法的参数进行描述。你可以缩放、旋转、移动和倾斜上下文。参数 a 是水平缩放，参数 b 是水平倾斜，参数 c 是垂直倾斜，参数 d 是垂直缩放，参数 e 是水平移动，参数 f 是 垂直移动。
- `context.setTransform()`：使用单位矩阵重新设置（覆盖）当前的变换并调用变换的方法，此变换由方法的变量进行描述。参数同上。

合成：

- `context.globalAlpha`：用来描述在 canvas 上绘图之前，设置图形和图片透明度的属性。 数值的范围从 0.0 （完全透明）到1.0 （完全不透明）。默认值是 1.0。 如果数值不在范围内，包括 Infinity 和 NaN ，无法赋值，并且 globalAlpha 会保持原有的数值。
- `context.globalCompositeOperation`：设置要在绘制新形状时应用的合成操作的类型，可以设置为是用于标识要使用的合成或混合模式操作的字符串。

绘制图像：

- `context.drawImage(image, [sx, sy, sWidth, sHeight, ]dx, dy[, dWidth, dHeight])`：提供了多种方式来在Canvas上绘制图像。参数 image 是绘制到上下文的元素；参数 dx 是目标画布的左上角在目标 canvas 上 X 轴的位置；参数 dy 是目标画布的左上角在目标 canvas 上 Y 轴的位置；参数 dWidth 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放，默认不会缩放；参数 dHeight 是在目标画布上绘制图像的高度，允许对绘制的图像进行缩放，默认不会缩放；参数 sx 是需要绘制到目标上下文中的，源图像的矩形选择框的左上角 X 坐标；参数 sy 是需要绘制到目标上下文中的，源图像的矩形选择框的左上角 Y 坐标；参数 sWidth 是需要绘制到目标上下文中的，源图像的矩形选择框的宽度，默认整个矩形从坐标的sx和sy开始，到图像的右下角结束；参数 sHeight 需要绘制到目标上下文中的，源图像的矩形选择框的高度，默认整个矩形从坐标的sx和sy开始，到图像的右下角结束。

像素控制：

- `context.createImageData([width, height]|imageData)`：创建一个 新的、空白的、指定大小的 ImageData 对象，并返回该 ImageData 对象。所有的像素在新对象中都是透明的。
- `context.getImageData(sx, sy, sw, sh)`：返回一个 ImageData 对象，用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
- `context.putImageData(imagedata, dx, dy[, dirtyX, dirtyY, dirtyWidth, dirtyHeight])`：将数据从已有的 ImageData 对象绘制到位图的方法。 如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。

图像平滑：

- `context.imageSmoothingEnabled`：用来设置图片是否平滑的属性，true 表示图片平滑（默认值），false 表示图片不平滑。当我们获取 imageSmoothingEnabled 属性值时， 它会返回最新设置的值。

canvas 状态：

- `context.save()`：通过将当前状态放入栈中，保存 canvas 全部状态的方法。
- `context.restore()`：通过在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。 如果没有保存状态，此方法不做任何改变。
- `context.canvas`：该属性是是只读的，是 HTMLCanvasElement 的反向引用。如果没有 <canvas> 元素与之对应，对象值为null 。
