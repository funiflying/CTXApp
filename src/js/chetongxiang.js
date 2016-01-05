
/**
 * 自动消失提示框
 */
(function($,document){
    $.toast = function(_message,callback) {
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
            toast.innerHTML = '<div class="' + 'mui-toast-message' + '">' + _message +'</div>';
            document.body.appendChild(toast);
            setTimeout(function() {
                document.body.removeChild(toast);
                if(mui.isFunction(callback)){
                    callback()
                }
            }, 2000);
        }
    }
})(mui,document)


