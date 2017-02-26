(function($){
	var modal = document.querySelector('.mui-cropper-modal');
	var container = document.getElementById('image');
	var cropper, croppable;
	
	$.cropper = {
		$el: container,
		show: function(path, callback, isClose){
			container.src = path;
			modal.classList.add('mui-active');
			// 初始化cropper插件
			cropper = new Cropper(container, {
				dragMode: 'move',
		    	aspectRatio: 1 / 1,
		    	autoCropArea: 0.65,
		    	restore: false,
		    	guides: false,
		    	center: false,
		    	highlight: false,
		    	cropBoxMovable: false,
		    	cropBoxResizable: false,
		    	ready: function(){
		    		croppable = true;
		    	}
			});
			document.querySelector('.cropper-ok').addEventListener('tap',function () {
				if (!croppable) return;
				var croppedCanvas = cropper.getCroppedCanvas(); 
				var data = croppedCanvas.toDataURL('image/png', 0.6);
				callback && callback(data);
				
				if(isClose !== false){
					$.cropper.hide();
				}
			})
		},
		hide: function(){
			modal.classList.remove('mui-active');
		
			// 重置裁剪工具
			container.src = '';
			croppable = false;
			cropper.destroy();
		}
	};
	
	document.querySelector('.cropper-cancel').addEventListener('tap',function () {
		$.cropper.hide();
	})
	
	/**
	 * 拍照
	 * @param {Object} callback
	 */
	$.captureImage = function(callback){
		var cmr = plus.camera.getCamera();
		cmr.captureImage(function(path){
			callback && callback(path); 
		},function(error) {
			mui.toast('取消拍照');
		},{
			filename: "_doc/image/"
		});
	}
	
	/**
	 * 选择相册
	 * @param {Object} callback
	 */
	$.pickGallery = function(callback){
		plus.gallery.pick(function(path) {
			callback && callback(path);
		}, function(e) {
			mui.toast("取消选择图片");
		}, {
			filter: "image"
		});
	}
	
	/**
	 * 获取本地文件路径
	 * @param {Object} path
	 */
	$.getLocalFileURL = function(path){
		return plus.io.convertLocalFileSystemURL(path);
	}
	
	/**
	 * 获取文件对象
	 * @param {Object} callback
	 */
	$.getFile = function(path, callback){
		plus.io.resolveLocalFileSystemURL(path, function(entry) {
			entry.file(function(file) {
				callback && callback(file);
			})
		}, function(e) {
			console.log(e.message);
		});
		
	}
		
	/**
	 * 读取文件为dataURL
	 * @param {Object} response
	 * @param {Object} callback
	 */
	$.fileReadAsDataURL = function(response, callback){
		var reader = new plus.io.FileReader();
		reader.onload = function() {
			callback && callback(reader.result);
		}
		reader.readAsDataURL(response);
	}
	
	/**
	 * dataURI 转 blob
	 * @param {Object} dataURI
	 */
	$.dataURItoBlob = function(dataURI) {
	    var arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new Blob([u8arr], {type:mime});
	}
	
	/**
	 * 保存为图片
	 * @param {Object} base64Str
	 * @param {Object} path
	 * @param {Object} callback
	 * @param {Object} options
	 */
	$.saveImage = function(base64Str, path, callback, options){
		options = options || {};
		var bitmap = new plus.nativeObj.Bitmap("__cropper_drawImg__");
		bitmap.loadBase64Data(base64Str, function(){
			bitmap.save(path, options, function(e){
				callback && callback(e.target);
			},function(e){
				console.log('保存图片失败：'+JSON.stringify(e));
			});
		}, function(){
			console.log('加载Base64图片数据失败：'+JSON.stringify(e));
		});
	}
})(mui);