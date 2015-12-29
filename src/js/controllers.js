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
    //��������
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
    //清除搜素记录
    $scope.clear=function(){
        LocalStorageService.clearSearchCarHistory();
        $scope.searchhistory=null;
    }
}]).controller('CarListController',['$scope','$rootScope','LocalStorageService','CarListServcie',function($scope,$rootScope,LocalStorageService,CarListServcie){
    $scope.carlist=[];
    $scope.filter={
        Brand: $rootScope.stateParams.BrandID,
        CarYear: null,
        CityID: null,
        Color: null,
        Country: null,
        DischargeStandard: null,
        GearBox: null,
        IsUrgent: null,
        Mileage: null,
        OutputVolume: null,
        PageNo: 1,
        PriceEnd: null,
        PriceID: $rootScope.stateParams.PriceID||0,
        PriceStart: null,
        QuasiNewCar: null,
        SearchWord: null,
        Series: $rootScope.stateParams.SeriesID,
        SevenSeat: null,
        Sort: null,
        Style: $rootScope.stateParams.Style||0,
        WomenCar: null,
        pageNum: 24
    }

    CarListServcie.getCarBrandList().then(function(data){
        $scope.brandlist=data.data;
    });
    LocalStorageService.setSearchCarHistory($rootScope.stateParams);
    $scope.getList=function(){
        CarListServcie.getCarList($scope.filter).then(function(data){
            if(data.data[0])
            {
                $scope.carlist=data.data[0].value;
            }
            else
            {
                $scope.carlist=[];
            }
        })
    }
    $scope.getList()
}])
