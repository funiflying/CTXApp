/**
 * 自动消失提示框
 */
(function(mui, document) {
	mui.toast = function(_message,callback) {
		if (mui.os.plus) {
			//默认显示在底部；
			mui.plusReady(function() {
				plus.nativeUI.toast(_message, {
					verticalAlign: 'middle'
				});
			});
		} else {
			var toast = document.createElement('div');
			toast.classList.add('mui-toast-container');
			toast.innerHTML = '<div class="' + 'mui-toast-message animated bounceInDown ' + '"><h6>提示</h6>' + _message + '</div>';
			document.body.appendChild(toast);
			setTimeout(function() {
				toast.querySelector('.mui-toast-message').classList.add('fadeOutDown')
				document.body.removeChild(toast);
				if (mui.isFunction(callback)) {
					callback()
				}
			}, 2000);
		}
	}
	mui.loading=function(end){
		var loading=document.getElementsByClassName('mui-loading-container')
		if(loading.length>0){
			return
		}
		else {
			loading = document.createElement('div');
			loading.classList.add('mui-loading-container');
			loading.innerHTML = '<i class="mui-icon mui-spinner"></i>';
			document.body.appendChild(loading);
		}
			//loading.classList.add('fadeOutDown')
	}
	mui.onload=function(){
		var loading=$('.mui-loading-container');
		setTimeout(function(){
			loading.remove();
		},500)

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
Array.prototype.remove = function(index) {
	if (isNaN(index) || index > this.length) {
		return false;
	}
	for (var i = 0, n = 0; i < this.length; i++) {
		if (this[i] != this[index]) {
			this[n++] = this[i]
		}
	}
	this.length -= 1
}