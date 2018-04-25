### 主要知识点

-   `text-shadow`
-   `event.offsetX/offsetY`



##### text-shadow

语法： ` offset-x | offset-y | blur-radius | color `

-   `offset-x`：X 轴位移，用于指定阴影的水平位移量，结果可以是正负数
-   `offset-y`：Y 轴位移，用于指定阴影的垂直位移量，结果可以是正负数
-   `blur-radius`：阴影模糊半径，可选参数，代表阴影向外模糊的模糊范围，值越大，阴影向外模糊的范围越大，阴影边缘越模糊，可只能是 0 和正数
-   `color`：阴影的颜色，可选参数，定义绘制阴影时所使用的颜色，可以是颜色关键词、十六进制颜色、RGB 颜色、RGBA透明色、HSL 和 HSLA。

同时可以指定多个阴影，多个阴影间使用逗号分隔。



##### event.offset



对于 event 的坐标有这样几个概念 ：

-   `event.client*`：客户区坐标位置，相对于浏览器窗口可视区域的 X、Y 坐标，可视区域不包含工具栏和滚动条（IE 和标准事件都定义了该属性）
-   `event.page*`：页面坐标位置，类似 `event.client*`，它使用的是文档坐标而并非窗口坐标（IE 中没有该属性），在页面没有滚动时与 `event.client*`相同
-   `event.offset*`：相对于事件目标元素（event.srcElement）的 X、Y 坐标，只有 IE 中有
-   `event.screen*`: 屏幕坐标位置，相对于显示器左上角的 X、Y 坐标，（IE 和 标准事件都支持该属性）



##### 随机颜色



```js
function getRandomColor() {
    return '#' + 
        (
            function (color) {
                return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                    && (color.length === 6) ? color : arguments.callee(color);
            }
        )('');
}
function getRandomRGBA() {
    return 'rgba('+
    (function(){
        let tmpArr = [];
        tmpArr.push(Math.floor(Math.random() * 256));
        tmpArr.push(Math.floor(Math.random() * 256));
        tmpArr.push(Math.floor(Math.random() * 256));
        tmpArr.push(Math.round(Math.random() * 10) / 10);
        return tmpArr;
    })().join(',')
    + ')'
}
```

