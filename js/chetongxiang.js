var  URL_HOST="http://"+window.location.host;

mui.ready(function(){
		mui('#pullrefresh').scroll();
	var gallery = mui(".mui-slider");
			gallery.slider({
				interval: 3000
			})
	var  offCanvasWrapper=mui("#offCanvasWrapper");
	//主界面容器
	var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
	//菜单容器
	var offCanvasSide = document.getElementById("offCanvasSide");
	//侧滑菜单
	document.getElementById('offCanvasShow').addEventListener('tap', function() {
		offCanvasWrapper.offCanvas('show');
	});
	
	
	
	
})




