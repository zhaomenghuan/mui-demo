### input(输入表单)

#### 基本说明
mui输入表单包括单行输入框input和多行输入框textarea,当我们使用form表单时，想要得到类似列表的输入框组，
给form添加`.mui-input-group`类，每个输入框添加`.mui-input-row`。如果不添加`label`标签，输入框
默认宽度为100%；添加`label`标签后输入框宽度默认为65%。

##### 表单输入框
```
<form class="mui-input-group">
	<div class="mui-input-row">
		<label>Input</label>
		<input type="text" placeholder="普通输入框">
	</div>
	<div class="mui-input-row">
		<label>Input</label>
		<input type="text" class="mui-input-clear" placeholder="带清除按钮的输入框">
	</div>
	<div class="mui-input-row mui-plus-visible">
		<label>Input</label>
		<input type="text" class="mui-input-speech mui-input-clear" placeholder="语音输入">
	</div>
	<div class="mui-button-row">
		<button type="button" class="mui-btn mui-btn-primary" onclick="return false;">确认</button>&nbsp;&nbsp;
		<button type="button" class="mui-btn mui-btn-danger" onclick="return false;">取消</button>
	</div>
</form>
```
注：始终为button按钮添加type属性，若button按钮没有type属性，浏览器默认按照type=submit逻辑处理，
这样若将没有type的button放在form表单中，点击按钮就会执行form表单提交，页面就会刷新，用户体验极差。

##### 其他常用输入框

```
<h5>默认搜索框：</h5>
<div class="mui-input-row mui-search">
	<input id="search" type="search" class="mui-input-clear" placeholder="">
</div>
<h5 class="mui-plus-visible">语音输入搜索框：</h5>
<div class="mui-input-row mui-search mui-plus-visible">
	<input id="speech" type="search" class="mui-input-speech mui-input-clear" placeholder="带语音输入的搜索框">
</div>
<h5>密码框：</h5>
<div class="mui-input-row mui-password">
	<input type="password" class="mui-input-password">
</div>
```

#### 输入增强

mui目前提供的输入增强包括：快速删除和语音输入两项功能。要删除输入框中的内容，使用输入法键盘上的删除按键，
只能逐个删除字符，mui提供了快速删除能力，只需要在对应input控件上添加`.mui-input-clear`类，当input
控件中有内容时，右侧会有一个删除图标，点击会清空当前input的内容；

另外，为了方便快速输入，mui集成了HTML5+的语音输入，只需要在对应input控件上添加`.mui-input-speech`
类，就会在该控件右侧显示一个语音输入的图标，点击会启用科大讯飞语音输入界面，但是语音输入只能在5+环境
下使用，为了在web环境下不出错，我们可以使用`.mui-plus-visible`将只能在5+环境下正常使用的内容在web环境
下隐藏，反过来我们可以使用 `.mui-plus-hidden`将在web中正常显示的内容在5+环境下隐藏。
```
<div class="mui-input-row mui-plus-visible">
	<label>mui-plus-visible</label>
	<input type="text" class="mui-input-speech mui-input-clear" placeholder="我在web环境下隐藏5+环境下显示">
</div>
<div class="mui-input-row mui-plus-hidden">
	<label>mui-plus-hidden</label>
	<input type="text" class="mui-input-clear" placeholder="我在web环境下显示5+环境下隐藏">
</div>
```

#### 监听事件

##### 输入框的变化监听事件

通过监听输入框input事件，可以监听到输入框变化。
```
var search = document.getElementById('search');
search.addEventListener('input',function () {
    console.log(search.value);
})
```

##### 软键盘右下角按键监听事件

为了监听软键盘右下角按键事件，我们常采用下面的方法：
```
html：
<div class="mui-input-row mui-search">
	<input id="search" type="search" class="mui-input-clear" placeholder="">
</div>

javascript:
document.getElementById('search').addEventListener('keydown',function (e) {
    console.log(e.keyCode);
    if(e.keyCode == 13){
    	console.log("search");
    }
})
```

但是这种方法在部分手机软键盘兼容性不好，所以不妨采用绑定form表单提交事件：
```
html：
<form action="">
    <input type="text" name="username">
    <button type="submit" class="mui-btn mui-btn-block">保 存</button>
</form>

javascript:
document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault(); // 阻止默认事件
    console.log("go");
});
```
注:通过修改form 表单下input的type属性值为search可以改变软键盘右下角的文字为search。

##### 语音识别完成事件
```
document.getElementById("speech").addEventListener('recognized', function(e) {
	console.log(e.detail.value);
});
```


### 扩展阅读
[使用Native.js实现打开页面默认弹出软键盘](http://ask.dcloud.net.cn/article/513)

代码块激活字符: minput
