/*!
 * =====================================================
 * MJS v0.0.2 (https://github.com/zhaomenghuan/mjs)
 * =====================================================
 */
(function(w,undefined) {
	// 构造函数mjs
	var mjs = function(selector, context) {
		return new mjs.fn.init(selector, context);
	}	
	// 构造函数mjs的原型对象
	mjs.fn = mjs.prototype = {
		constructor: mjs,
		isArray: Array.isArray || function(object) {
			return object instanceof Array;
		},
		init: function (selector, context) {
			if(!selector) { 
				return this; 
			}
			else if(typeof selector === 'object'){
				var selector = [selector];
                for (var i = 0; i < selector.length; i++) {
                    this[i] = selector[i];
                }
                this.length = selector.length;
                return this;
			}else if(typeof selector === 'function'){
				return mjs.ready(selector);
			}
			else if(typeof selector === 'string'){
				var re = /<(.+?)>/g;
				var selector = selector.trim();
				var context = context || document;
				var dom = null;
				
				if((match = re.exec(selector))!==null){
					return document.createElement(match[1]);
				}else{
					var el = context.querySelectorAll(selector);
					var dom = Array.prototype.slice.call(el);
					var length = dom.length;
					for (var i = 0; i < length; i++) {
						this[i] = dom[i];
					}
					this.context = context;
					this.selector = selector;
					this.length = length;
					return this;
				}	
			}	
		},
		html: function (content) {
			if (content === undefined && this[0].nodeType === 1) {
        		return this[0].innerHTML.trim();
        	}else{
        		var len = this.length;
				for (var i = 0; i < len; i++) {
					this[i].innerHTML = content;
				}
				return this;
        	}
		},
		text: function (val) {
		    if (!arguments.length) {
		    	return this[0].textContent.trim();
		    } else {
		        for (var i = 0; i < this.length; i++) {
		            this[i].innerText = val;
		        }
		        return this;
		    }
		},
		attr: function (attr,val) {
			var len = this.length;
			for(var i = 0;i < len; i++) {
				if(arguments.length === 1){
					var obj = arguments[0];
					if(typeof obj === 'string'){
						return this[i].getAttribute(attr);
					}else if(typeof obj === 'object'){
				        for(var attr in obj){
				        	this[i].setAttribute(attr,obj[attr]);
						}  	
					}
				}else{
		            this[i].setAttribute(attr,val);
				}
			}		
		},
		prepend: function(str) {
			var len = this.length;
    		for (var i = 0; i < len; i++) {
		        this[i].insertAdjacentHTML('afterbegin', str);
		    }
		    return this;
		},
		append: function (str) {
		    var len = this.length;
    		for (var i = 0; i < len; i++) {
		        this[i].insertAdjacentHTML('beforeend', str);
		    }
		    return this;
		},
		before: function (str) {
		    var len = this.length;
    		for (var i = 0; i < len; i++) {
		    	this[i].insertAdjacentHTML('beforebegin', str);
		    }
		    return this;
		},
		after: function (str) {
		    var len = this.length;
    		for (var i = 0; i < len; i++) {
		        this[i].insertAdjacentHTML('afterend', str);
		    }
		    return this;
		},
		remove: function () {
			var len = this.length;
			for (var i = 0; i < len; i++) {
				this[i].parentNode.removeChild(this[i]);
			}
    		return this;
		},
		hasClass: function (cls) {
			return this[0].classList.contains(cls);
		},
		addClass: function (cls) {
			var len = this.length;
			for (var i = 0; i < len; i++) {
				if(!this[i].classList.contains(cls)){
					this[i].classList.add(cls);
				}
			}
			return this;
		},
		removeClass: function (cls) {
			var len = this.length;
			for (var i = 0; i < len; i++) {
				if(this[i].classList.contains(cls)){
					this[i].classList.remove(cls);
				}
			}
			return this;
		},
		toggleClass: function (cls) {
			return this[0].classList.toggle(cls);
		},
		css: function (attr,val) {
			var len = this.length;
			for(var i = 0;i < len; i++) {
				if(arguments.length === 1){
					var obj = arguments[0];
					if(typeof obj === 'string'){
						return getComputedStyle(this[i],null)[attr];
					}else if(typeof obj === 'object'){
				        for(var attr in obj){
							this[i].style[attr] = obj[attr];
						}  	
					}
				} else {	
					if(typeof val === 'function'){
						this[i].style[attr] = val();
					}else{
						this[i].style[attr] = val;
					}   
		        } 
	       	}
			return this;
		},
		find: function(selector){			
			return this.init(selector,this[0]);
		},
		first: function(){
			return this.init(this[0]);
		},
		last: function(){
			return this.init(this[this.length-1]);
		},
		eq: function(index){
			return this.init(this[index]);
		},
		parent: function(){
			return this.init(this[0].parentNode);
		}
	}
	
	/**
	 * DOM ready
	 * @param {Object} callback
	 */
	mjs.ready = function (callback) {
		var readyRE = /complete|loaded|interactive/;
		if (readyRE.test(document.readyState)) {
			callback();
		} else {
			document.addEventListener('DOMContentLoaded', function() {
				callback();
			}, false);
		}
		return this;
	};
	
    /**
     * javascript引擎
     * @param {Object} tpl
     * @param {Object} data
     */
    mjs.tpl = function(tpl, data) {
	    var re = /{{(.+?)}}/g, 
	    	cursor = 0
			reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,	
	        code = 'var r=[];\n';

		// 解析html
		function parsehtml(line) {
			// 单双引号转义，换行符替换为空格,去掉前后的空格
			line = line.replace(/('|")/g, '\\$1').replace(/\n/g, ' ').replace(/(^\s+)|(\s+$)/g,"");
			code +='r.push("' + line + '");\n';
		}
		
		// 解析js代码		
		function parsejs(line) {   
			// 去掉前后的空格
			line = line.replace(/(^\s+)|(\s+$)/g,"");
		    code += line.match(reExp)? line + '\n' : 'r.push(' + line + ');\n';
		}	
	    
	    while((match = re.exec(tpl))!== null) {
	    	// 开始标签  {{ 前的内容和结束标签 }} 后的内容
	    	parsehtml(tpl.slice(cursor, match.index))
	    	// 开始标签  {{ 和 结束标签 }} 之间的内容
	    	parsejs(match[1])
	    	// 每一次匹配完成移动指针
	        cursor = match.index + match[0].length;
	    }
	    // 最后一次匹配完的内容
	    parsehtml(tpl.substr(cursor, tpl.length - cursor));
	    code += 'return r.join("");';
	    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
	}
	
	mjs.fn.init.prototype = mjs.fn;	
	// 为window全局变量添加mjs对象
	w.mjs = w.m = mjs;
})(window);