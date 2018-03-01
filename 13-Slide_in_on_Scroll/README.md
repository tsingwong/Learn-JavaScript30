### 主要任务

- 当屏幕滚动到图片一半时，图片展示。
- 当屏幕滚动超过图片时，图片隐藏。

### 知识补充


#### window 对象

`window` 对象表示一个包含 DOM 文档的窗口。

##### 属性

- `Window.history`：只读属性，返回 `History` 对象，可以使用 `history.back()` 或 `history.go(-1)` 回退到上个页面。
- `Window.innerHeight`：只读属性，返回浏览器视口高度（单位：像素），会包括水平滚动条。
- `Window.innerWidth`：只读属性，返回浏览器视口宽度（单位：像素），会包括垂直滚动条。
- `Window.location`：只读属性，返回 `Location` 对象。
- `Window.name`：返回窗口名称，可以修改。
- `Window.navigator`：只读属性，返回 `Navigator` 对象，其中包含关于运行当前脚本的应用程序的相关信息。
- `Window.outerHeight`：只读属性，获取浏览器窗口外部的高度（单位：像素），包括侧边栏、窗口镶边和窗口调正边框。
- `Window.outerWidth`：只读属性，获取浏览器窗口外部的宽度（单位：像素），包括侧边栏、窗口镶边和窗口调正边框。
- `Window.screenX`：只读属性，返回浏览器左边界到操作系统桌面左边界的水平距离。
- `Window.screenY`：只读属性，返回浏览器顶部届到操作系统桌面上边界的垂直距离。
- `Window.scrollX`：只读属性，返回文档/页面水平方向滚动的像素值。
- `Window.scrollY`：只读属性，返回文档在垂直方向已滚动的像素值。
