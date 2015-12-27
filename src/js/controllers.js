/*
 * @author:wutianxiang
 * @date:2015-12-21
 * @version:1.0.0
 */
angular.module("CTXAppControllers",[]).controller('HomeController',['$scope','$rootScope','$swipe','HomeService',function($scope,$rootScope,$swipe,HomeService){
    mui('#pullrefresh').scroll();
    var gallery = mui(".mui-slider");
    gallery.slider({
        interval: 3000
    })
    var cars=HomeService.getHomeCarList({City:'',CarType:0}).then(function(data){
        $scope.carlist=data.data;
    });
}]).controller('SerachCarController',['$scope','$rootScope','$timeout','SerachCarService','LocalStorageService',function($scope,$rootScope,$timeout,SerachCarService,LocalStorageService){
    mui('#pullrefresh').scroll();
    $scope.searchhistory=LocalStorageService.getSearchCarHistory();
    SerachCarService.getCarBrandList().then(function(data){
        $scope.brandlist=data.data;
    });
    //监视搜素
    $scope.$watch('brand',function(newValue,oldValue){
        $scope.searchlist=[];
        if(newValue){
            LocalStorageService.setStorage('searchHistory',{DATA:[
                {
                    name:newValue,
                    url:''
                }
            ]
            })
            $timeout(function(){
                angular.forEach($scope.brandlist,function(obj,index){
                    if(!obj.SeriesName&&obj.BrandName.search(newValue)>-1){
                        $scope.searchlist.push(obj)
                    }
                    if(obj.SeriesName&&obj.SeriesName.search(newValue)>-1){
                        $scope.searchlist.push(obj)
                    }
                })
            },350)
        }
    });
    //清除历史纪录
    $scope.clear=function(){
        LocalStorageService.clearSearchCarHistory();
        $scope.searchhistory=null;
    }
}]).controller('CarListController',['$scope','$rootScope','LocalStorageService','CarListServcie',function($scope,$rootScope,LocalStorageService,CarListServcie){
   mui('#pullrefresh').scroll();
    CarListServcie.getCarBrandList().then(function(data){
        $scope.brandlist=data.data;
    });
    LocalStorageService.setSearchCarHistory($rootScope.stateParams);
    $scope.go=function(){
        $scope.count=$scope.count+1
    }

}])
