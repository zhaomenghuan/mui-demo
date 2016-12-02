function browser (options) {

	if(typeof options !== 'object'){
		throw 'this is not a Object!'
	}

	var setting = {
		bounce: true,
		style: { // 浏览器样式
			top: '44px',
      		bottom: '0px'
		}
	}

	plusReady(function(){
		var self = plus.webview.currentWebview();
		
		// 地址
		var _url;
		if(typeof options.url === 'string'){
			_url = options.url
		} else if (typeof options.url === 'function') {
			_url = options.url();
		}

		// 设置样式
		var _style = setting.style;
		if(options.style){
			_style = options.style;
		}

		// 创建webview
		var _browserWv = plus.webview.create(_url, '_browser', _style);
		self.append(_browserWv);

		// 设置回弹
		if(options.bounce === true || (options.bounce === undefined && setting.bounce)){
			_browserWv.setBounce({position:{top:"150px"},changeoffset:{top:"0px"}});
		}

		// 设置标题
		if(options.title){
			_browserWv.addEventListener('titleUpdate', function(e){
				if(typeof options.title === 'function'){
					options.title(e.title);
				} else if (typeof options.title === 'string') {
					document.querySelector(options.title).innerHTML = e.title;
				}
			}, false);
		}

		// 加载中
		if(options.loading){
			_browserWv.addEventListener('loading', function(){
				options.loading();
			});
		}

		// 加载完成
		if(options.loaded){
			_browserWv.addEventListener('loaded', function(){
				options.loaded();
			});
		}

    	// 监听关闭
    	if(options.close){
			self.addEventListener('close', function(){
				options.close();
			});
		}

		// 监听返回键
		back(function(){
      		if(options.back){
        		options.back();
      		}
			historyBack(_browserWv);
		});
	});
}

/**
 * [plusReady]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
var plusReady = function(fn) {
	if (window.plus) {
		setTimeout(fn, 0);
	} else {
		document.addEventListener("plusready", fn, false);
	}
	return this;
};

/**
* 查询Webview窗口是否可后退
*/
var historyBack = function (WVObj) {
	// 查询Webview窗口是否可后退
	WVObj.canBack(function(e){
	  	var canback=e.canBack;
	    if(canback){
	      	WVObj.back();
	    }else{
	      	plus.webview.currentWebview().close();
	    }
	});
}

/**
* 返回逻辑
* @param {Object} callback
*/
var back = function (callback) {
	var actionBack = document.querySelector('.mui-action-back');
	var listenerType = window.mui ? 'tap' : 'click';
	actionBack.addEventListener(listenerType,function () {
  		typeof callback === 'function' && callback();
	});
	plus.key.addEventListener("backbutton", function() {
	    typeof callback === 'function' && callback();
	});
}