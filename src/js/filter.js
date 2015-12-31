/**
 * @author:吴添祥
 * @date:2015-12-22
 * @version:1.0.0
 */
angular.module("CTXAppFilters",[]).filter("GetFullYear",function(){
    return function (date){
        if(date){
            var d=new Date(date);
            var _year= d.getFullYear();
            return _year
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
	})