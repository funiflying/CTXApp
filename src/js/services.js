/*
 *@author:wutianxiang
 *@date:2015-12-21
 *@version:1.0.0
 */
angular.module('CTXAppServices',[]).factory('CarService',['$http','$resource',function($http,$resource){
    return  $resource('http://192.168.0.218/Common/Car/RequestHomeData/:City/:CarType', {City:'@city',CarType:'@cartype'}, {
        query: { method: 'post', isArray: true,params:{City:'@city',CarType:'@cartype'} }
    })
}])