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

})