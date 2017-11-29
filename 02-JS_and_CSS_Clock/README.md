### 主要任务

1. 旋转的动画效果
2. 每秒改变所有个指针

### 思路

1. 首先获取到[当前时间](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
2. 旋转指针，这时候需要使用 [`transition-origin`](http://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin) 属性来设置旋转的中心点，默认是 `50% 50% 0`，分别对应 x、y、z 轴，注意这里的 百分制 是相对于元素宽高而言的，所以 z 轴的只能使用 **具体值**
3. 我这里是监听 `transitionend` 事件，然后让指针运动 1s。所以我需要让元素从初始状态到开始运动状态。故先给了他们 `rotate(0deg)`，然后又获取元素的 `offsetWidth` 属性，强行触发 **重绘**。最后是运动到初始状态。
4. 之后我会监听 秒针 的 `transitionend` 事件，由于我设置的 `transition: all 1s`，所以在每次监听中，我都计算时、分、秒指针的下一个状态。如果秒针过了 360 度，即更新 分针。分针过了 360 度，即更新时针。



依稀记得之前看的一本书中的第一个 demo 就是画一个时钟，是使用的 `canvas` 来画的。等时间允许，就来补充一下。
