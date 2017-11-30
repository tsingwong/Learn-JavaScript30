### 主要任务

1. 完成 js 对图片的 模糊度控制
2. 完成 js 对图片的 内边距控制
3. 完成 js 对图片的 背景颜色控制

### 思路

1. 给控制的 input `HTMLInputElement`一个监听事件，获取其 value 。这里的监听事件有点讲究，监听 `change` 可以满足鼠标和键盘改动值，但是无法监听其改动过程中同步改变。所以还需要监听 `mousemove` 事件
2. 元素的属性值可以直接使用 `element[属性名]` 来获得，但 [`data-*`](http://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) 类型需要使用 `element.dataset[*]` 来获取
3. css 模糊是使用滤镜 [`filter`](http://developer.mozilla.org/en-US/docs/Web/CSS/filter-function) 的 `blur` 方法，记忆中 filter 在 IE 的[兼容性](https://caniuse.com/#search=filter)极差，解决方法可以查看 [张鑫旭老师的博文](http://www.zhangxinxu.com/wordpress/2013/11/css-svg-image-blur/)
4. 页面加载时会发现，input 本身是存在 默认值，但是在首次加载时他不会自动添加到图片上，这里使用了 `call` 方法。关于 `call/apply/bind` 方法的具体使用可以[点击查看](http://tsingwong.cn/2016/10/12/js-%E4%B8%AD%E7%9A%84-call-%E4%B8%8E-apply-%E5%8C%BA%E5%88%AB/)
