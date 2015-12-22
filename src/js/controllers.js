/*
 * @author:wutianxiang
 * @date:2015-12-21
 * @version:1.0.0
 */
angular.module("CTXAppControllers",[]).controller('HomeController',['$scope','HomeService',function($scope,HomeService){
    mui('#pullrefresh').scroll();
    var gallery = mui(".mui-slider");
    gallery.slider({
        interval: 3000
    })
    var cars=HomeService.getHomeCarList({City:'',CarType:0}).then(function(data){
        $scope.carlist=data.data;
        console.log($scope.carlist)
    })

}])
