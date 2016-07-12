/**
 * 创建iframe
 * @param {Object} el
 * @param {Object} opt
 */
var createIframe =  function (el, opt) {
	var elContainer = document.querySelector(el);
	var wrapper = document.querySelector(".mui-iframe-wrapper");
	if(!wrapper){
		// 创建wrapper 和 iframe
		wrapper = document.createElement('div');
		wrapper.className = 'mui-iframe-wrapper';
		for(var i in opt.style){
			wrapper.style[i] = opt.style[i];
		}
		var iframe = document.createElement('iframe');
		iframe.src = opt.url;
		iframe.id = opt.id || opt.url;
		iframe.name = opt.id;
		wrapper.appendChild(iframe);
		elContainer.appendChild(wrapper);
	}else{
		var iframe = wrapper.querySelector('iframe');
		iframe.src = opt.url;
		iframe.id = opt.id || opt.url;
		iframe.name = iframe.id;
	}
}