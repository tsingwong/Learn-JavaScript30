### 主要任务

1. 旋转的动画效果
2. 每秒改变所有个指针

### 思路

1. 首先获取到[当前时间](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
2. 要先把指针置于零位。然后旋转指针，这时候需要使用 [`transition-origin`](http://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin) 属性来设置旋转的中心点，默认是 `50% 50% 0`，分别对应 x、y、z 轴，注意这里的 百分制 是相对于元素宽高而言的，所以 z 轴的只能使用 **具体值**
3. 先设置所有



依稀记得之前看的一本书中的第一个 demo 就是画一个时钟，是使用的 `canvas` 来画的。等时间允许，就来补充一下。
