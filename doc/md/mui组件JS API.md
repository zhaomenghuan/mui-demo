## mui组件JS API

#### 变量类型判断：mui.type()

```
var a = [];
var b = {};
var c = '{"name":"zhaomenghuan","age":22}';

console.log("a:" + mui.type(a)); // array
console.log("b:" + mui.type(b)); // string
console.log("c:" + mui.type(c)); // string 
```

#### 获取当前时间戳：mui.now()

```
mui.now();
```

#### 解析的JSON字符串：mui.parseJSON(String)

```
var jsonStr = '{"name":"mui","version":"3.3.0"}';
var obj = mui.parseJSON(jsonStr);
console.log("name:" + obj.name);
```

#### offcanvas侧滑导航监听事件

```
document.querySelector('.mui-off-canvas-wrap').addEventListener('shown', function () {
    console.log("show");
})		
document.querySelector('.mui-off-canvas-wrap').addEventListener('hidden', function () {
    console.log("hidden");
})
```