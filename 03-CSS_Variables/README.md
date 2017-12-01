### 主要任务

1. 完成 js 对图片的 模糊度控制
2. 完成 js 对图片的 内边距控制
3. 完成 js 对图片的 背景颜色控制

### 思路

1. 给控制的 input `HTMLInputElement`一个监听事件，获取其 value 。这里的监听事件有点讲究，监听 `change` 可以满足鼠标和键盘改动值，但是无法监听其改动过程中同步改变。所以还需要监听 `mousemove` 事件
2. 元素的属性值可以直接使用 `element[属性名]` 来获得，但 [`data-*`](http://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) 类型需要使用 `element.dataset[*]` 来获取
3. css 模糊是使用滤镜 [`filter`](http://developer.mozilla.org/en-US/docs/Web/CSS/filter-function) 的 `blur` 方法，记忆中 filter 在 IE 的[兼容性](https://caniuse.com/#search=filter)极差，解决方法可以查看 [张鑫旭老师的博文](http://www.zhangxinxu.com/wordpress/2013/11/css-svg-image-blur/)
4. 页面加载时会发现，input 本身是存在 默认值，但是在首次加载时他不会自动添加到图片上，这里使用了 `call` 方法。关于 `call/apply/bind` 方法的具体使用可以[点击查看](http://tsingwong.cn/2016/10/12/js-%E4%B8%AD%E7%9A%84-call-%E4%B8%8E-apply-%E5%8C%BA%E5%88%AB/)

### 补充

- 可以使用 [`:root`](http://developer.mozilla.org/en-US/docs/Web/CSS/:root) 选择器 声明全局的 [CSS 变量](http://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)，需要注意 CSS 变量的兼容性较差，IE Safari 9.1 之前，安卓5之前全军覆没。

语法：
```css
:root {
    /* --variableName: variableValue;*/
    --myColor: red;
}

.text {
    /* cssPropertyName: var(--variableName [, declarationValue]); */
    color: var(myColor, yellow);
}
```

关于 CSS变量 需要注意的是，应该在定义时就加载单位，否则 `var(...)` 后面会自动增加空格，所以设置的单位可能会出现问题。
CSS变量 可以与 `calc()` 函数一同使用

检测浏览器是否支持 CSS变量 ，可以使用以下方法

```
/* 1. CSS 方法 @supports */
@supports ( (--size: 0)) {

  /* 支持 */

}

@supports ( not (--size: 0)) {

 /* 不支持 */

}

/* 2. JS 方法 */

if(window.CSS && window.CSS.supports && window.CSS.supports('--size', 0)) {

  /* 支持 */

}else{

  /* 不支持 */

}
```

另外可以使用 JS 去操作 CSS变量

```javascript
// 获取，只读对象，后者表示伪元素的字符串
let style = window.getComputedStyle(element, [pseudoElt]);

// 获取某个元素中定义的属性变量
let value = element.style.getPropertyValue('--variableName');

// 修改
element.style.setProperty('--variableName', value);
// 修改全局变量
document.documentElement.style.setProperty('--variableName', value);

// 当然类似功能还有，DOM对象简单设置CSS属性值
style.cssPropertyName = 'value';

```

[Window.getComputedStyle()](http://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) 方法给出应用活动样式表后的元素的所有CSS属性的值，并解析这些值可能包含的任何基本计算。`window.getComputedStyle(element, [pseudoElt])`

[CSSStyleDeclaration.setProperty()](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty) 方法可以用来新增或修改css 属性。`style.setProperty(propertyName, value, priority);`
