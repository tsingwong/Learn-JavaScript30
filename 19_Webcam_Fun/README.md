### 主要知识点

- `window.navigator`对象
- `canvas` 方法
- 三原色


### window.navigator

`navigator` 接口中包含着用户代理（User Agent）的状态和表示。

##### 属性

- `Navigator.activeVRDIsplays`：返回 `VRDisplay.ispresenting` 属性为 true 的对象组成的数组；
- `Navigator.appCodeName`：返回当前浏览器的内部“开发代码”名称；
- `Navigator.appName`：返当前浏览器的官方名称；
- `Navigator.appVersion`：返回当前浏览器的版本；
- `Navigator.battery`：返回电池充电状态的部分信息，`BatteryManager` 对象；
- `Navigator.connection`：返回设备的网络连接信息，`NetworkInformation`对象；
- `Navigator.cookieEnabled`：当忽略 cookie 时返回 false，否则返回 true；
- `Navigator.geolocation`：返回当前设备的地理信息，`geolocation`对象；
- `Navigator.language`：返回当前设备的语言类型；
- `Navigator.mimeTypes`：返回当前浏览器可识别的 `MimeType` 对象列表，`MimeTypeArray`对象；
- `Navigator.onLine`：返回表示当前浏览器是否联网的布尔值；
- `Navigator.platform`：返回表示当前浏览器所在的系统平台类型的字符串；
- `Navigator.plugins`：返回包含当前浏览器的所有插件的 `PluginArray` 类型的对象；
- `Navigator.product`：返回当前浏览器的产品名称；
- `Navigator.userAgent`：返回当前浏览器的用户代理字符串；
- `Navigator.serviceWorker`：返回关联文件的 `ServiceWorkerContainer` 对象，提供了对 ServiceWorker 的注册、删除、升级和通信的访问。


