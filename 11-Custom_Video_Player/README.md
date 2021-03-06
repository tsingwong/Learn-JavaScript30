### 主要任务

- 视频播放
    - 调节音量
    - 快进快退
    - 调节进度
    - 开始和暂停

### 补充

##### <video>

使用 `<video>` 标签可以在文档中插入视频内容。


##### 属性

除了传统的 HTML element 的属性外，`video` 标签还有以下属性：

- `autoplay`：布尔属性。指定视频是否自动播放，存在该属性即自动播放。注：`autoplay = false` 并不会符合预期，去掉 `autoplay` 即停止自动播放
- `buffered`：可以读取到哪段时间范围内的媒体被缓存。该属性包含了一个 `TimeRanges` 对象
- `controls`：该属性可以增加用户控制，主要有播放暂停，进度调节，音量调节
- `crossorigin`：指定抓取相关图片时是否用到 CORS （跨域资源共享）。支持 CORS 的资源可以在 `<canvas>` 元素中被重用而不会被污染。允许的值有以下：
    - `anonymous`：跨域请求（即，使用 `Origin:` 的 HTTP 头）会被执行，但是不会发送凭证（即，不发送 cookie 等证书或授权）。如果服务器不提供证书给原网站（不设置 `Access-Control-Allow-Origin:` HTTP 头），图片会被污染且它的使用会受限。
    - `use-credentials`：跨域请求会被执行，且凭证会被发送。如果服务器不提供证书给原网站（不设置 `Access-Control-Allow-Origin:` HTTP 头），图片会被污染且它的使用会受限。
注：不加该属性，抓取资源就不会走 CORS 请求（即，不会发送 `Origin:` HTTP 头），保证在 `<canvas>` 元素中使用时不会被污染。如果指定为无效值，会被默认改为 `anonymous`。
- `height`：视频展示区域的高度，单位是 px
- `loop`：布尔属性。在视频结束后，自动返回视频开始的地方
- `muted`：布尔属性。设置后，视频的音频的默认设置为静音
- `played`：一个 `TimeRanges` 对象，指明了视频已经播放的所有范围
- `preload`：枚举属性。最佳用户体验的方式：
    - `none`：提示开发者用户不需要查看该视频，服务器也想要最小化访问浏览。即提示浏览器该视频不需要缓存
    - `metadata`：尽管开发者认为用户不需要查看此视频，但是抓取元数据还是合理的
    - `auto`：开发者需要这个视频优先加载，非法值的时候也会被默认到该值。
注：`autoplay` 属性优先于 `preload`，即如果开发者想要自动播放该视频，就是需要浏览器下载该视频咯。
- `poster`：一个海报帧的 URL，用于在用户播放或跳帧之前展示。如果该属性未指定，那么在第一帧之前什么都不会展示
- `src`：要嵌到页面的视频的 URL。也可以使用内嵌的 `<source>` 元素来指定视频 URL
- `width`：视频展示区域的宽度，单位是 px
- `playsinline`：布尔属性。表示该视频将播放“内联”，即在元素的回放区域内。请注意，该属性的缺失并不意味着总是会在全屏视频。

##### 媒体事件

在处理用 `<audio>` 和 `<video>` 标签嵌入到 文档中的媒体时，可能会触发多种事件。

|事件名称|描述|
|-|-|
|`abort`|在播放被终止时触发。如视频播放完，然后自动回到开头，这时候触发该事件|
|`canplay`|在媒体数据已经足够的数据（至少播放帧数）可供播放时触发。对应 `CAN_PLAY` 的 `readyState`|
|`canplaythrough`|在媒体的 `readyState` 变为 `CAN_PLAY_THROUGH` 时触发，表明媒体可以在保持当前的下载速度的情况下不被中断地播放完毕。|
|`durationchange`|元信息已载入或已改变，表明媒体的长度发生改变。例如，在媒体已被加载足够的长度从而得到总长度时会触发这个事件|
|`emptied`|媒体被清空或初始化时触发|
|`ended`|播放结束时触发|
|`error`|在发声错误时触发|
|`loadeddata`|媒体的第一帧已经加载完毕|
|`loadedmetadata`|媒体的元数据已经加载完毕，现在所有的属性包含了它们应有的有效数据|
|`loadstart`|在媒体开始加载时触发|
|`mozaudioavailable`|当音频数据缓存并交给音频层处理时|
|`pause`|播放暂停时触发|
|`play`|在媒体回放被暂停后再次开始时触发。即，在一次暂停事件后恢复媒体回放|
|`playing`|在媒体开始播放时触发（不论是初次播放、在暂停后恢复、或是在结束后重新开始）|
|`progress`|告知媒体相关部分的下载进度时周期性地触发|
|`ratechange`|在回放速率变化时触发|
|`seeked`|在跳跃操作完成时触发|
|`seeking`|在跳跃操作开始时触发|
|`stalled`|在尝试获取媒体数据，但数据不可用时触发|
|`suspend`|在媒体资源加载终止时触发，这可能是因为下载已完成或因为其他原因暂停|
|`timeupdate`|元素的currentTime属性表示的时间已经改变|
|`volumechange`|在音频音量改变时触发|
|`waiting`|在一个待执行的操作（如回放）因等待另一个操作（如跳跃或下载）被延迟时触发|

##### 使用注意

`<video>` 标签可以包含一个或多个视频来源。为了指定使用的视频来源，可以使用 `src` 属性或 `source` 标签。

##### HTMLVideoElement

`HTMLVideoElement` 继承自 `HTMLMediaElement` 节点。简单介绍下本次课程中用到的属性和方法。

- `HTMLMediaElement.currentTIme`：返回表示当前播放时间的`double` 秒数。改变这个数字可以改变当前播放的进度。
- `HTMLMediaElement.duration`：返回表示当前媒体长度的 `double` 秒数。
- `HTMLMediaElement.muted`：返回表示当前是否静音的布尔值。
- `HTMLMediaElement.paused`：返回表示当前是否暂停的布尔值。
- `HTMLMediaElement.volume`：返回表示当前媒体声音的 `double` 数，从 0.0 - 1.0（从小到大）。

- `HTMLMediaElement.pause()`：暂停当前媒体的播放。
- `HTMLMediaElement.play()`：播放当前媒体的播放。

