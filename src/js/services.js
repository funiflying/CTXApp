/*
 *@author:wutianxiang
 *@date:2015-12-21
 *@version:1.0.0
 */
angular.module('CTXAppServices',[]).factory('ResourceService',['$http','$resource',function($http,$resource){
    return  $resource('http://192.168.0.218/Common/Car/RequestHomeData/', {}, {
        query: { method: 'Post', isArray: true,params:{City:'@city',CarType:'@cartype'},isArray:false}
    })
}]).factory('HomeService',['$q','ResourceService',function($q,ResourceService){
    return {
        getHomeCarList:function(data){
            var defer=$q.defer()
            ResourceService.query(data,function(data,headers){
                defer.resolve(data)
            },function(data,headers){
                defer.reject(data)
            })
            return defer.promise
        }
    }



}])