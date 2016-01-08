/**
 * 自动消失提示框
 */
(function($, document) {
	$.toast = function(_message, callback) {
		if ($.os.plus) {
			//默认显示在底部；
			$.plusReady(function() {
				plus.nativeUI.toast(_message, {
					verticalAlign: 'middle'
				});
			});
		} else {
			var toast = document.createElement('div');
			toast.classList.add('mui-toast-container');
			toast.innerHTML = '<div class="' + 'mui-toast-message' + '">' + _message + '</div>';
			document.body.appendChild(toast);
			setTimeout(function() {
				document.body.removeChild(toast);
				if (mui.isFunction(callback)) {
					callback()
				}
			}, 2000);
		}
	}
})(mui, document)

//格式话时间日期
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

//var a ={"a":"1","b":"2"}
//var b ={"c":"3","d":"4","e":"5"}
//var c = extend({}, [a,b]);
function extend(des, src, override) {
	if (src instanceof Array) {
		for (var i = 0, len = src.length; i < len; i++)
			extend(des, src[i], override);
	}
	for (var i in src) {
		if (override || !(i in des)) {
			des[i] = src[i];
		}
	}
	return des;
}