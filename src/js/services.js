/*
 *@author:wutianxiang
 *@date:2015-12-21
 *@version:1.0.0
 */



angular.module('CTXAppServices', []).factory('ResourceService', ['$resource', '$rootScope','$q', function($resource, $rootScope,$q) {
    return {
        getFunServer: function(sname,params,method) {
            var surl = "",defer = $q.defer();;
            switch (sname) {
                case "RequestHomeData":
                    surl = "/Common/Car/RequestHomeData/";
                    break;
                case "brandlist":
                    surl = "/data/brandlist.json";
                    break;
                case "GetCardata":
                    surl = "/common/car/GetCardata";
                    break;
                case "GetTestReportWithCode":
                    surl = "/Alliance/TestReport/GetTestReportWithCode";
                    break;
                case "CarListServcie":
                    surl='/common/car/SearchCar';
                    break;
                case 'brandlist-search':
                    surl='/data/Brand.json';
                    break;
                case 'SendPhoneValCode':
                    surl='/common/message/SendValiadeCode';
                    break;
                default:
                    break;
            }
            if (surl == "") return '';
            $resource($rootScope.HOST + surl, {}, {
                query: {
                    method: method||'get',
                    params: params||'{}',
                    isArray: false
                }
            }).query(function(data, headers) {
                defer.resolve(data);
            }, function(data, headers) {
                defer.reject(data);
            })
            return defer.promise;
        }
    }
}]).factory('LocalStorageService',function(){
    return {
        setStorage:function(name,val){
            localStorage.setItem(name,JSON.stringify(val))
        },
        getStorage:function(name){
          return JSON.parse(localStorage.getItem(name));
        },
        removeStorage:function(name){
            localStorage.removeItem(name)
        },
        setSearchCarHistory:function(stateParams){
            if(!stateParams.SearchValue){
                return;
            }
            var SEARCH_CAR_HISTORY=this.getStorage('SEARCH_CAR_HISTORY')||{DATA:[]};
            var count=0;
            if(SEARCH_CAR_HISTORY.DATA.length==0){
                SEARCH_CAR_HISTORY.DATA.push(stateParams);
            }
            else{
                angular.forEach(SEARCH_CAR_HISTORY.DATA,function(obj,index){
                    if((stateParams.SeriesID&&obj.BrandID==stateParams.BrandID&&obj.SeriesID==stateParams.SeriesID)||(!stateParams.SeriesID&&obj.BrandID==stateParams.BrandID)){
                       count++;
                    }
                })
                if(count==0){
                    SEARCH_CAR_HISTORY.DATA.push(stateParams)
                }
            }
            this.setStorage('SEARCH_CAR_HISTORY',SEARCH_CAR_HISTORY);
        },
        getSearchCarHistory:function(){
             var SEARCH_CAR_HISTORY=this.getStorage('SEARCH_CAR_HISTORY')||{DATA:[]};
             return SEARCH_CAR_HISTORY.DATA
         },
        clearSearchCarHistory:function(){
            this.removeStorage('SEARCH_CAR_HISTORY')
        }
    }
}).factory('PagerService',['$rootScope',function($rootScope){
     return {
         getPageCount:function(){
             //console.log($rootScope.pageTotal)
         }
     }
}])