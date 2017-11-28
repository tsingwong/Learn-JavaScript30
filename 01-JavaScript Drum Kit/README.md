### 主要任务

1. 按键触发声音
2. 按键时的动画

### 个人思路

- 键盘按下事件 `keydown` 监听，`document.addEvent(type, hanlder[, boolean])`
- 使用上面事件的 `keyCode` 来获取相应的 `div` 和 `audio`。这里使用 `querySeletorAll()` 来获取多个，然后下面再区分
- 给 `div` 元素[增加 类名](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) `palying`，同时播放语音。`audio`获取到的是一个 `HTMLAudioElement` 元素，他的父类是 [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) 元素，在该元素的原生方法中存在 `play()` 为播放，相应的有 `pause()` 暂停
- 键盘有按下事件 `keydown` 必然会有抬起事件 `keyup`，所以会在 `keyup` 事件中，将 `div` 去掉上面增加的类 `playing`，但是这里不会调用 `pause()` 方法暂停音频，否则快速地按下键盘时声音有些问题。
- 然后没有然后了，我能想到这些
