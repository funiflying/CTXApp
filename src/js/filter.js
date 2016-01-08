/**
 * @author:吴添祥
 * @date:2015-12-22
 * @version:1.0.0
 */
angular.module("CTXAppFilters",[]).filter("DateTimeFormat",function(){
    return function (date,format){
        if(date){
            var d=new Date(date);
		   return d.Format(format);
        }
        return "未知"
    }
}).filter('FilterBrandByPy',function(){
    return function (data,PY){




    }
}).filter('bigimg', function() {
	return function(str) {
		var strdata;
		var ret;
		if (str == undefined || str == null) {
			return '';
		} else {
			strdata = str.split(".");
			ret = strdata[0] + "_Big." + strdata[1];
			return ret;
		}
	}
}).filter('FormatPrice', function() {
	return function(num) {
		var retdata = num / 10000;
		return retdata.toFixed(0);
	}
}).filter('FilterCarOutputVolume', function() {
	//车辆排量
	return function(status) {
		var flag = "";
		switch (status) {
			case "0":
				flag = "未知";
				break;
			case "1":
				flag = "1.0L以下";
				break;
			case "2":
				flag = "1.0-1.6L";
				break;
			case "3":
				flag = "1.6-2.0L";
				break;
			case "4":
				flag = "2.0-3.0L";
				break;
			case "5":
				flag = "3.0L以上"
				break;
			default:
				break;
				flag = "未知";
		}
		return flag;
	}
}).filter("CDateFormat", function() {
	return function(str, s, f) {
		if (str) {
			var tdate = new Date(str);
			var descr = "";
			if (f) {
				if (f >= 2) {
					tdate.setDate(tdate.getDate() + f);
				} else {
					descr = tdate.getFullYear() + "-" + (tdate.getMonth() + 1) + "-" + tdate.getDate();
					return descr;
				}
			}

			switch (s) {
				case 0:
					descr = tdate.getFullYear();
					break;
				case 1:
					descr = (tdate.getMonth() + 1);
					break;
				case 2:
					descr = tdate.getDate();
					break;
				default:
					descr = tdate.getFullYear() + "-" + (tdate.getMonth() + 1) + "-" + tdate.getDate();
					break;
			}

			return descr;
		}
	}
}).filter('FilterCarGearBox', function() {
	//车辆变速箱
	return function(status) {
		var flag = "";
		if (status > "8") {
			return '未知';
		}
		switch (status) {
			case "0":
				flag = "未知";
				break;
			case "1":
				flag = "手动";
				break;
			case "2":
				flag = "自动";
				break;
			default:
				break;
				flag = "未知";
		}
		return flag;
	}
}).filter('FilterCarDischargeStandard', function() {
		return function(status) {
			var flag = "";
			switch (status) {
				case "0":
					flag = "未知";
					break;
				case "1":
					flag = "国二及以上";
					break;
				case "2":
					flag = "国三及以上";
					break;
				case "3":
					flag = "国四及以上";
					break;
				case "4":
					flag = "国五";
					break;
				default:
					break;
					flag = "未知";
			}
			return flag;
		}
	}).filter('OrderStatus',function(){
	//订单状态
	   return function (status){
		   status = status + ""
		   var descr = "";
		   switch (status) {
			   case "0":
				   descr = "支付预付款";
				   break;
			   case "1":
				   descr = "预付款审核";
				   break;
			   case "2":
				   descr = "评估检测";
				   break;
			   case "3":
				   descr = "确定物流费";
				   break;
			   case "4":
				   descr = "支付购车款";
				   break;
			   case "5":
				   descr = "购车款审核";
				   break;
			   case "6":
				   descr = "物流发车";
				   break;
			   case "7":
				   descr = "确认到车";
				   break;
			   case "8":
				   descr = "评估检测";
				   break;
			   case "9":
				   descr = "客户提车";
				   break;
			   case "10":
				   descr = "已完成(未评价)";
				   break;
			   case "256":
				   descr = "已完成(买家已评)";
				   break;
			   case "257":
				   descr = "已完成(车主已评)";
				   break;
			   case "255":
				   descr = "已完成(双方已评)";
				   break;
			   default:
				   descr = "";
				   break;

		   }
		   return descr;

	   }

}).filter('RevokeStatus', function() {
	return function(status) {
		//撤单状态
		status = status + ""
		var descr = "";
		switch (status) {

			case "1":
				descr = "买方申请撤单";
				break;
			case "2":
				descr = "撤单审批通过";
				break;
			case "3":
				descr = "撤单审批不通过";
				break;
			case "11":
				descr = "车主申请撤单";
				break;
			case "12":
				descr = "撤单审批通过"
				break;
			case "13":
				descr = "撤单审批不通过"
				break;
			default:
				descr = ""
				break;

		}
		return descr;
	}
}).filter('CarStatus', function() {
	//
	return function(status) {
		status = status + ""
		var descr = "";
		switch (status) {
			case "0":
				descr = "显示中";
				break;
			case "1":
				descr = "交易中";
				break;
			case "254":
				descr = "已下架";
				break;
			case "255":
				descr = "交易完成";
				break;
			default:
				descr = "未知：" + status;
				break;

		}
		return descr;
	}
}).filter("CarCheck", function() {
	//车源审核状态
	return function(status) {
		status = status + ""
		var descr = "";
		switch (status) {
			case "0":
				descr = "认证中";
				break;
			case "1":
				descr = "初审不通过";
				break;
			case "2":
				descr = "已初审";
				break;
			case "3":
				descr = "终审不通过";
				break;
			case "4":
				descr = "已认证";
				break;
			case "5":
				descr = "已检测";
				break;
			default:
				descr = ""
				break;

		}
		return descr;
	}

})