## template(模板页面)

hello mui示例App中无等待窗体切换的实现是基于模板页面，点击一个链接，不显示雪花等待框，立即打开一个“正在加载...”的页面，之后真实内容快速填充“正在加载...”区域。这种模板页面适用了通用性较强的页面，我们不必要为每个页面创建父子webview，而是将公用的父页面提取出来作为模板页面，同时在页面为加载前可以显示个性化加载页面，可以极大的提升用户体验。模板父页面预加载，点击后立即显示，不用展示雪花等待框，也不会出现白屏现象；共用子页面，有效控制webview数量，避免切页时频繁创建、销毁webview。

### 实现思路

这里我们以列表到详情页的情况为例说明，详情页html结构：
```
<ul class="mui-table-view">
    <li class="mui-table-view-cell">
        <a class="mui-navigate-right" href="list1.html">
            Item 1
        </a>
    </li>
    <li class="mui-table-view-cell">
        <a class="mui-navigate-right" href="list2.html">
             Item 2
        </a>
    </li>
    <li class="mui-table-view-cell">
        <a class="mui-navigate-right" href="list3.html">
             Item 3
        </a>
    </li>
</ul>
```

1.预加载一个模板父页面，用以当页面还没有加载出来的时候展示加载动画，以及作为公用子页面的头部，原理相当于tabbar webview模式的父页面；预加载或者创建一个公用子页面，同时将这个子页面填充到模板父页面;
```
// 预加载模板父页面
var template = mui.preload({
    url:'template.html',
    id:'template',
    styles:{
        popGesture:"hide"
    }
});
// 预加载公用子页面
var subWebview = mui.preload({
    url:'',
    id:'sub_template',
    styles:{
        top: '45px',
    	bottom: '0px'
    }
});
// 将子页面填充到父页面
template.append(subWebview);
```
2.点击列表链接时，直接显示模板父页面，并动态修改模板父页面的标题；共用子页面通过loadURL方法加载对应目标页面；
```
mui('.mui-table-view').on('tap','li a',function(){	
	var self = this;
	// 修改共用父模板的标题
	mui.fire(template, 'updateHeader', {
		title: self.innerText,
		href: self.href
	});
	// 加载子页面地址
	if(subWebview.getURL()==self.href){
	    subWebview.show();
	}else{
	    subWebview.loadURL(self.href);
	    // 子页面加载完成显示
		subWebview.addEventListener('loaded', function() {
		    setTimeout(function(){
		        subWebview.show();  
		    },50);
		});	
	}
	// 显示模板父页面
	template.show('slide-in-right', 150);			
})
```
3.模板父页面接收参数和返回列表页的处理方法
```	
var titleElem = document.getElementById("title");
var contentWebview = null,self = null;

mui.plusReady(function () {
	self = plus.webview.currentWebview();
});

// 自定义事件接收参数修改模板父页面头部
window.addEventListener("updateHeader", function(e) {
	var title = e.detail.title;
	var href = e.detail.target;
	var aniShow = e.detail.aniShow;
	
	titleElem.innerHTML = title;
	titleElem.className = "mui-title mui-fadein";
	
	if(mui.os.android&&aniShow&&parseFloat(mui.os.version)>=4.4){
		if(contentWebview==null){
			contentWebview = self.children()[0];
		}
		if (contentWebview.getURL() != href) {
			contentWebview.loadURL(href);
		} else {
			contentWebview.show();
		}
		setTimeout(function () {
			self.show(aniShow);
		},10);
	}
});

// 返回事件（隐藏模板父页面，并在窗体动画结束后，隐藏共用子页面）
mui.back = function() {
	self.hide('auto');
	setTimeout(function() {
		titleElem.className = 'mui-title mui-fadeout';
		titleElem.innerText = '';
		if(contentWebview==null){
			contentWebview = self.children()[0];
		}
		contentWebview.hide("none");
	}, 350);
}
```

另外需要说明的是，我们这种方式是创建两个webview作为视图容器实现，在web环境下webview的方法不能执行，hello mui里面为每个详情页面创建一个头部，但是我们会发现在app环境下执行并没有出现这个头部，这是以为在hello mui演示demo中的app.css中有这么一段代码：
```
.mui-plus.mui-android header.mui-bar{
	display: none;
}
.mui-plus.mui-android .mui-bar-nav~.mui-content{
	padding: 0;
}
```
由于iOS系统性能已经足够好，转场切换不会白屏，hello mui演示demo中iOS没有使用模板页面。当我们引入mui.js文件，在5+环境执行，mui.js会自动将`.mui-plus`及`.mui-plus-android`类添加到body上，我们可以通过这个方法进行环境判断，是否显示某些内容。