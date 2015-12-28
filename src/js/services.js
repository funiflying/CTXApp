/*
 *@author:wutianxiang
 *@date:2015-12-21
 *@version:1.0.0
 */
angular.module('CTXAppServices',[]).factory('ResourceService',['$http','$rootScope','$resource',function($http,$rootScope,$resource){
    return{
      getHomeCarResource:function(){
          return  $resource($rootScope.HOST+'/Common/Car/RequestHomeData/', {}, {
              query: { method: 'post', params:{City:'@city',CarType:'@cartype'},isArray:false}
          })
      },
      getCarBrandResource:function(){
          return  $resource('../data/brandlist.json', {}, {
              query: { method: 'get',params:{},isArray:false}
          })
      },
       getCarBrandListResource:function(){
            return  $resource('../data/brandlist-new.json', {}, {
                query: { method: 'get',params:{},isArray:false}
            })
        },
        getCarListResource:function(data){
            return $resource($rootScope.HOST+'/common/car/SearchCar',{},{
                query:{method:'post',params:data,isArray:false}
            })
        }
    }
}]).factory('HomeService',['$q','ResourceService',function($q,ResourceService){
    return {
        getHomeCarList:function(data){
            var defer=$q.defer();
            ResourceService.getHomeCarResource().query(data,function(data,headers){
                defer.resolve(data);
            },function(data,headers){
                defer.reject(data);
            })
            return defer.promise;
        }
    }
}]).factory('SerachCarService',['$q','ResourceService',function($q,ResourceService){
    return{
        getCarBrandList:function(){
            var defer=$q.defer();
            ResourceService.getCarBrandResource().query(function(data,headers){
                defer.resolve(data);
            },function(data,header){
                defer.reject(data)
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
}).factory('CarListServcie',['$q','ResourceService',function($q,ResourceService){
    return{
        getCarBrandList:function(){
            var defer=$q.defer();
            ResourceService.getCarBrandListResource().query(function(data,headers){
                defer.resolve(data);
            },function(data,header){
                defer.reject(data)
            })
            return defer.promise;
        },
        getCarList:function(data){
            var defer=$q.defer();
            ResourceService.getCarListResource(data).query(function(data,headers){
                defer.resolve(data);
            },function(data,header){
                defer.reject(data)
            })
            return defer.promise;
        }
    }
}])