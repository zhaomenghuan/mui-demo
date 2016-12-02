(function($){
	var progress = 0;
    var maxProgress = 60;
    var progressTimer = 0;
	var progressbarElem = document.querySelector('.progressbar');
	var spanStyle = progressbarElem.querySelector('span').style;
	
	$.loading = function(progress) {
		document.body.className = 'loading';
        progress = progress || 0;
        if (!progress) { //初始化为10
            spanStyle.webkitTransform = 'translate3d(-90%,0,0)';
        }
        progressTimer = setTimeout(function() {
            progress += Math.random() * 20;
            spanStyle.webkitTransform = 'translate3d(' + (-100 + progress) + '%,0,0)';
            if (progress < maxProgress) {
                $.loading(progress);
            } else {
                progressTimer = setTimeout(function() {
                    $.loaded();
                }, 2000);
            }
        }, Math.random() * 200 + 200);
	}
	
	$.loaded = function() {
		progressTimer && clearTimeout(progressTimer);
        spanStyle.webkitTransform = 'translate3d(0,0,0)';
        setTimeout(function() {
            spanStyle.webkitTransform = 'translate3d(-100%,0,0)';
            document.body.className = 'loaded';
        }, 100);
	}
})(window.progressbar = {});
