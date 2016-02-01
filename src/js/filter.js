/**
 * @author:吴添祥
 * @date:2015-12-22
 * @version:1.0.0
 */
angular.module("CTXAppFilters", []).filter("DateTimeFormat", function () {
    return function (date, format) {
        if (date) {
            date = date.replace(/\-/g, "/");
            var d = new Date(date);
            return d.Format(format);
        }
        return "未知"
    }
}).filter('FilterBrandByPy', function () {
    return function (data, PY) {




    }
}).filter('bigimg', function () {
    return function (str) {
        var strdata;
        var ret;
        if (str == undefined || str == null) {
            return '';
        } else {
            //strdata = str.split(".");
            var pos = str.lastIndexOf(".");
            var iurl = str.substring(0, pos);
            var lastname = str.substring(pos, str.length);
            //console.log(iurl +  "----"+lastname);
            //ret = strdata[0]+"_Big."+strdata[1];
            ret = iurl + "_Big" + lastname;
            return ret;
        }
    }
}).filter('FormatPrice', function () {
    return function (num) {
        var retdata = num / 10000;
        return retdata.toFixed(0);
    }
}).filter('FilterCarOutputVolume', function () {
    //车辆排量
    return function (status) {
        var flag = "";
        status=status+""
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
}).filter("CDateFormat", function () {
    return function (str, s, f) {
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
}).filter('FilterCarGearBox', function () {
    //车辆变速箱
    return function (status) {
        var flag = "";

        if (status > 8) {
            return '未知';
        }
        status=status+"";
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
}).filter('FilterCarDischargeStandard', function () {
    return function (status) {
        var flag = "";
        status=status+""
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
}).filter('OrderStatus', function () {
    //订单状态
    return function (status) {
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

}).filter('RevokeStatus', function () {
    return function (status) {
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
}).filter('CarStatus', function () {
    //
    return function (status) {
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
}).filter("CarCheck", function () {
    //车源审核状态
    return function (status) {
        status = status + ""
        var descr = "";
        switch (status) {
            case "0":
                descr = "审核中";
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
                descr = "终审通过";
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

}).filter('ColorFilter', function () {
    //车辆颜色
    return function (status) {
        var flag = "";
        status = parseInt(status)
        switch (status) {
            case 0:
                flag = "未知";
                break;
            case 1:
                flag = "黑色";
                break;
            case 2:
                flag = "白色";
                break;
            case 3:
                flag = "银灰色";
                break;
            case 4:
                flag = "深灰色";
                break;
            case "5":
                flag = "红色"
                break;
            case 6:
                flag = "橙色"
                break;
            case 7:
                flag = "绿色"
                break;
            case 8:
                flag = "蓝色"
                break;
            case 9:
                flag = "咖啡色"
                break;
            case 10:
                flag = "紫色"
                break;
            case 11:
                flag = "香槟色"
                break;
            case 12:
                flag = "多彩色"
                break;
            case 3:
                flag = "黄色"
                break;
            case 14:
                flag = "其它"
                break;
            default:
                break;
                flag = "未知";
        }
        //console.log(flag);
        return flag;
    }
}).filter('ApprOrderStatus', function () {
    //评估检测状态
    return function (status) {
        status = status + ""
        var descr = "";
        switch (status) {
            case "0":
                descr = "未付款";
                break;
            case "1":
                descr = "已付款待接单";
                break;
            case "2":
                descr = "待评估";
                break;
            case "3":
                descr = "待评估师评价";
                break;
            case "4":
                descr = "待委托人评价";
                break;
            case "5":
                descr = "客户已评价";
                break;
            case "6":
                descr = "双方评价完成";
                break;
            case "255":
                descr = "订单完成";
                break;
            default:
                descr = "未知：" + status;
                break;

        }
        return descr;
    }
}).filter('PolicyRange', function () {
    //评估检测状态
    return function (status) {
        status = status + ""
        var descr = "";
        switch (status) {
            case "0":
                descr = "平台服务费";
                break;

            default:
                descr = "未知平台服务费"
                break;

        }
        return descr;
    }
}).filter('PolicyMutile', function () {

    return function (status) {
        status = status + ""
        var descr = "";
        switch (status) {
            case true || 'True':
                descr = "是";
                break;
            case false:
                descr = "否";
                break;
            default:
                descr = "是"
                break;
        }
        return descr;
    }
}).filter('Litimg', function () {
    return function (descr) {
        return descr.replace('_Big', '');
    }
}).filter('ClipPhone', function () {

    return function (phone) {
        if (phone) {
            return phone.substr(0, 3) + '****' + phone.substr(7, phone.length);
        }
    }

}).filter('FilterCarNo',function(){
    return function(data) {
        if (!data) {
            return '';
        }
        var str = new String;
        var sl = 0;
        str = data;
        sl = str.length;
        var rd = str.substring(0,1)+" "+str.substring(1,5)+" "+str.substring(5,9)+" "+str.substring(9,sl);
        return rd;
    }}).filter("WorryCarStatus", function() {
    return function(status) {
        status = status + ""
        var descr = "";
        switch (status) {
            case "0":
                descr = "在售";
                break;
            case "1":
                descr = "已售出";
                break;
            case "2":
                descr = "已下架";
                break;
            default:
                descr = "在售"
                break;

        }
        return descr;
    }
})