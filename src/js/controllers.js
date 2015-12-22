/*
 * @author:wutianxiang
 * @date:2015-12-21
 * @version:1.0.0
 */
angular.module("CTXAppControllers",[]).controller('HomeController',['$scope','CarService',function($scope,CarService){
    mui('#pullrefresh').scroll();
    var gallery = mui(".mui-slider");
    gallery.slider({
        interval: 3000
    })
    console.log(CarService.query({City:'2015 ',CarType:0}))
}])
