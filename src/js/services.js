/*
 *@author:wutianxiang
 *@date:2015-12-21
 *@version:1.0.0
 */
angular.module('CTXAppServices',[]).factory('ResourceService',['$http','$resource',function($http,$resource){
    return{
      getHomeCarResource:function(){
          return  $resource('http://192.168.0.218/Common/Car/RequestHomeData/', {}, {
              query: { method: 'post', params:{City:'@city',CarType:'@cartype'},isArray:false}
          })
      },
      getCarBrandResource:function(){
          return  $resource('../data/brandlist.json', {}, {
              query: { method: 'get',params:{},isArray:false}
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
}])