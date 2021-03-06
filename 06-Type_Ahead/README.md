### 主要任务

- 在输入框中输入字符，会匹配对应的城市并展示

### 个人思路

- 原生 js 完成一个 GET 方法，拿到返回结果（注：这里的返回结果是 JSON 字符串，需要调用 `JSON.parse()` 方法转换为 JSON 对象）
- 监听输入框的 `input` 事件，当输入框中有值时，调用 `seach()` 方法寻找匹配的结果（这里匹配时做了大小写忽略），最后呈现在页面上。

### 补充

#### Fetch

在之前的代码中，我使用的 AJAX 的 GET 来进行网络请求，其实际使用的是 `XMLHttpRequest` 对象。

随着技术的进步，产生出来一种新的类似 `XHR` 对象的 `Fetch`，它提供了许多与XMLHttpRequest相同的功能，但被设计成更具可扩展性和高效性。

[Fetch](https://fetch.spec.whatwg.org/)（拿取，拿来），其核心在于对 HTTP 接口的抽象，包括 `Request`、`Response`、`Headers`、`Body` 以及用于初始化异步请求的 `global fetch` 等等。

Fetch 的异步是使用的 `Promise` 的。

#### API

Fetch 提供 JavaScript 接口，用于访问和操作 HTTP ，同时也提供了一个全局的 `fetch()` 方法用简单，符合逻辑的方式来异步获取资源。

注：`fetch` 与 `jQuery.ajax()` 有以下两点区别：

1. 当接收到一个代表错误的 HTTP 状态码，从 `fetch` 返回的 `Promise` 对象不会被标记为 `reject`，即使状态码是 404 或 500 等。相反，`fetch` 会把 `Promise` 对象的状态标记为 `resolve`，只是将 `resolve` 的返回值的 `ok` 属性设置为 `false`。只有 **网络故障或请求受阻**时，`Promise` 对象才会被标记为 `reject`。
2. 默认情况下，`fetch` 不会从服务器发送或接受任何 `cookies`，如果站点依赖于用户 `session`，则会导致未经认证的请求。要发送 cookies，必须设置 `credentials` 选项。

##### 功能检测

对于 Fetch API 可以在 caniuse 看到其兼容性并不会那么好，所以我们在使用时应该先检测当前作用域是否具备该功能。

```js
if (self.fetch) {
    // run my fetch requset 
} else {
    // ...
}
```

如果当前作用域不支持 Fetch，这时候我们可以使用 [Fetch Polyfill](https://github.com/github/fetch)。

##### 简单的 fetch 请求

```js
const myImage = document.querySelector('img');

fetch('http://tsingwong.cn/favicon.gif')
.then(response => response.blob())
.then(myBlob => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
});
```

上面代码中，我们通过网络获取到一张图片，然后将其插入到一个 `<img>` 标签中。

`fetch()` 方法接受一个参数（请求地址），然后返回一个包含 `response` 对象的 `Promise` 对象。

当然这个过程只是个 HTTP 请求与相应的过程，并没有真正的图片。所以还需要使用 [`blob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Body/blob) 方法。

从 `Blob` 中获取到 `objectURL`，然后插入到 `img`中。

最好使用符合 [内容安全策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/CSP/CSP_policy_directives) 的连接，而不是使用直接指向资源地址的方式来进行 Fetch 请求。

##### 自定义请求参数

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

const myInit = { 
                method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' 
             };
               
fetch("http://tsingwong.cn", myInit)
.then(function(response){
    // do something...
})
```

##### 检测请求是否成功

上面提到当网络故障，`fetch()` 的 Promise 对象会返回 `reject` 并带上 `TypeError` 对象，但如果是 404 或 500 时，会返回 `reslove`，显然这不符合我们的逻辑。这时候我们需要在判断 `Response.ok` 属性是否等于 `true`

```js
const myImage = document.querySelector('img');

fetch('http://tsingwong.cn/favicon.gif')
.then(response => {
    if (response.ok) {
        response.blob().then(myBlob => {
            const objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
        });
    } else {
        console.log('NetWork response was not ok');
    }
})
.catch(error => console.log(`There has been a problem with your fetch operation: ${error.message}`));
```

##### Request

`fetch()` 方法除了可以接受资源地址，还可以接受 `Request` 对象作为参数。

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

const myInit = { 
                method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' 
             };

const myRequest = new Request("http://tsingwong.cn", myInit);
               
fetch(myRequest)
.then(function(response){
    // do something...
})
```

request 对象拥有以下属性，且所有属性都是 **只读属性**：

- `Request.method`: 返回当前 request 的方法。HTTP/1.0:GET, POST and HEAD, HTTP/1.1:OPTIONS, PUT, DELETE, TRACE and CONNECT
- `Request.url`：返回当前 request 的 URL
- `Request.headers`：返回当前 request 对应的 headers 对象
- `Request.referrer`：返回由 user agent 设置的当前 request 的来源，如 `about:client`、`''`、URL 等
- `Request.mode`：返回 request 的模式，如 `same-origin`、`no-cors`、`cors`、`navigate`，默认是 `cors`
- `Request.credentials`：返回 request 的凭证状况。与 XHR 的 `withCredentials` 标识类似，用来控制在 request 中是否携带 cookie 等证书。默认为 `omit`，从不发送。`same-origin`只有同源是才发送，`inculde` 一直发送。
- `Request.redirect`：返回 request 使用的重定向模式。默认为 `follow`，可选值为`error`、`manual`
- `Request.intergrity`：返回 request 的表示子资源完整性的值。默认为 `''`
- `Request.cache`：返回 request 的缓存模式，该模式控制着 HTTP 请求的缓存情况。默认为 `default`，可选为 `no-store`、`reload`、`no-cache`、`force-cache`、`only-if-cached`

注：由于 request 类实现了 Body 类，所以 Body 的属性，request 也可以使用，如 `body`、`bodyUsed`。


request 对象拥有以下方法：

- `Request.clone()`：返回一个克隆当前 request 对象的对象

注：由于 Request 类实现了 Body 类，所以 Body 的属性，request 也可以使用，如 `arrayBuffer()`、`blob()`、`formData()`、`json()`、`text()`。

举个简单的例子：

```js
const myRequest = new Request('http://localhost/flower.jpg');

const myURL = myRequest.url; // "http://localhost/flower.jpg"
const myMethod = myRequest.method; // "GET"
const myCred = myRequest.credentials; // "omit"

console.log(myRequest);
/*
{
    bodyUsed:false
    credentials:"omit"
    headers:Headers {}
    integrity:""
    method:"GET"
    mode:"cors"
    redirect:"follow"
    referrer:"about:client"
    referrerPolicy:""
    url:"http://localhost/flower.jpg"
}
*/

const myRequestNew = new Request('http://localhost/api', {
    method: 'POST',
    body: '{"foo": "bar"}'
});

const myURLNew = myRequestNew.url; // http://localhost/api
const myMethodNew = myRequestNew.method; // POST
const myCredNew = myRequestNew.credentials; // omit
const bodyUsedNew = myRequestNew.bodyUsed; // false

myRequestNew.text();
console.log(myRequestNew.bodyUsed); // true
```


##### Headers 对象

可以通过 `Headers()` 构造函数来创建一个 `headers` 对象。

```js
const content = "Hello World";
let myHeaders = new Headers();

//多个键值对
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

// 多维数组或者对象字面量
myHeaders = new Headers({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "ProcessThisImmediately",
});

// 内容可以被获取
console.log(myHeaders.has("Content-Type")); // true
console.log(myHeaders.has("Set-Cookie")); // false
myHeaders.set("Content-Type", "text/html");
myHeaders.append("X-Custom-Header", "AnotherValue");
 
console.log(myHeaders.get("Content-Length")); // 11
console.log(myHeaders.getAll("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]
 
myHeaders.delete("X-Custom-Header");
console.log(myHeaders.getAll("X-Custom-Header")); // [ ]
```

最佳实践是在使用之前检查 `content-type` 是否正确：
```js
fetch(myRequest)
.then(response => {
    if (response.headers.get('content-type') === 'application/json') {
        return response.json().then(json => {
            // do somthing...
        });
    } else {
        console.log('Oops, we haven\'t got JSON!');
    }
})
```

`Headers` 类定义了一下方法：

- `Headers.append()`：从 `Headers` 对象中，为现有 `header` 添加一个值，或添加一个未存在的 `header` 并赋值
- `Headers.delete()`：从 `Headers` 对象中删除指定 `header`
- `Headers.entries()`：以迭代器形式返回 `Headers` 对象中所有的键值对
- `Headers.get()`：从 `Headers` 对象中返回指定 `header` 的第一个值
- `Headers.has()`：以布尔值的形式从 `Headers` 对象中返回是否存在指定的 `header`
- `Headers.keys()`：以迭代器形式返回 `Headers` 对象中所有的键名
- `Headers.set()`：从 `Headers` 对象中，替换现有 `header` 值，或添加一个未存在的 `header` 并赋值
- `Headers.values()`：以迭代器形式返回 `Headers` 对象中所有存在的 `header` 值

##### Response 对象

`Response` 对象是在 `fetch()` 方法处理完 `promise` 后返回的。

该实例同样可以由 JavaScript 来创建，但是只有在 `ServiceWorkers` 中才真正有用。可以使用 `respondWith()` 方法并创建一个自定义的 `response` 来接受 `request`：

```js
const myBody = new Blob();

addEventListener('fetch', event => {
    event.respondWith(new Response(myBody), {
        headers: {'Content-Type': 'text/plain'}
    });
});
```

`Response()` 构造函数可以接受两个可选参数，数据体和初始化对象（与上面的 `request()` 方法的初始化参数类似）

`response` 对象有以下属性，且属性都是只读：

- `Response.headers`：返回 response 的 headers 对象。
- `Response.ok`：该属性用于检查 `response` 的状态码是否在 200-299 范围内，该属性返回一个布尔值。
- `Response.redirected`：返回一个布尔值，表示请求是否被重定向
- `Response.status`：整数（默认为 200），是 HTTP 的状态码
- `Response.statusText`：字符串（默认为 "OK"），该值与 `status` 对应
- `Response.type`：返回字符串，表示 response 的类型。默认值为 `basic`，可选为 `cors`、`error`、`opaque`
- `Response.url`：返回字符串，表示 response 的 URL

注：由于 Response 类实现了 Body 类，所以 Body Response 也可以使用，如 `body`、`bodyUsed`。

`response` 对象有以下方法：

- `Response.clone()`：返回一个克隆当前 request 对象的对象
- `Response.error()`：返回一个带有 网络错误的 新 response 对象
- `Response.redirect()`：返回由不一样 URL 创建的 response 对象


注：由于 Response 类实现了 Body 类，所以 Body 的属性，response 也可以使用，如 `arrayBuffer()`、`blob()`、`formData()`、`json()`、`text()`。
##### Body 对象

不管是请求还是相应都少不了 `body` 对象，body 也可以是下面任意类型的实例

- `Body.ArrayBuffer`
- `Body.ArrayBufferView`
- `Body.Blob/File`
- `Body.string`
- `Body.URLSearchParams`
- `Body.FormData`

`Body` 类定义以下属性（这些属性都被 Request 和Response 所实现）：

- `Body.body`：返回一个 getter 带 body 对象内容的字节流
- `Body.bodyUsed`：返回一个布尔值，表示 body 对象是否被读取过

`Body` 类定义了以下方法（这些方法都被 Request 和Response 所实现）用于获取 body 的内容，这些方法都会返回一个被解析后的 promise 对象和数据。

- `Body.arrayBuffer()`
- `Body.blob()`
- `Body.json()`
- `Body.text()`
- `Body.formData()`


非常重要的一点说明，那就是 `Request` 和 `Reponse` 的 `body` 只能被读取一次，有个属性叫 `bodyUsed`，读取一次后就被设置为 `true`。

```js
const response = new Response('one time use');
console.log(response.bodyUsed); // false
response.text().then(v => console.log(response.bodyUsed)); // true

console.log(response.bodyUsed); // ture
response.text().catch(e => console.log("Tried to read already consumed Response: ", e)); // Tried to read already consumed Response:  TypeError: Already read 
```

这样设计的目的是为了之后兼容基于流的 API，让应用一次消费 data，这样就允许 JavaScript 处理大文件（如视频，音频等），并支持实时压缩和编辑。

有些时候我们想要多次读取 body 的内容，我们就可以使用 `clone()` 方法。调用这个方法可以获得一个克隆的对象，不过要记得，`clone()` 方法也必须要在读取之前调用，即先 `clone()` 后读取。

```js
addEventListener('fetch', function(evt) {
    var sheep = new Response("Dolly");
    console.log(sheep.bodyUsed); // false
    var clone = sheep.clone();
    console.log(clone.bodyUsed); // false

    clone.text();
    console.log(sheep.bodyUsed); // false
    console.log(clone.bodyUsed); // true

    evt.respondWith(cache.add(sheep.clone()).then(function(e) {
        return sheep;
    });
});
```
