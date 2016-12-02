/**
 * 自定义弹出层
 * @param {Object} opt
 */
var popover = function(opt) {
	var el;
	if(typeof opt === 'object'){
		el = document.querySelector(opt.el);
		if(opt.style) {
			el.setAttribute('style', opt.style);
		}
	}else{
		el = document.querySelector(opt);
	}

	var mask = mui.createMask(function() {
		el.classList.remove('mui-active');
	});

	this.open = function() {
		mask.show();
		el.classList.add('mui-active');
	}

	this.close = function() {
		mask.close();
		el.classList.remove('mui-active');
	}
}