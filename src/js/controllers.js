/*
 * @author:wutianxiang
 * @date:2015-12-21
 * @version:1.0.0
 */
angular.module("CTXAppControllers",[]).controller('RootController',['$scope','$rootScope','$swipe','ResourceService',function($scope,$rootScope,$swipe,ResourceService){

}]).controller('HomeController',['$scope','$rootScope','$swipe','ResourceService',function($scope,$rootScope,$swipe,ResourceService){
    mui('#pullrefresh').scroll();
    var gallery = mui(".mui-slider");
    gallery.slider({
        interval: 3000
    })
    var cars=ResourceService.getFunServer('RequestHomeData',{City:'',CarType:0}).then(function(data){
        $scope.carlist=data.data;
    });
}]).controller('SerachCarController',['$scope','$rootScope','$timeout','ResourceService','LocalStorageService',function($scope,$rootScope,$timeout,ResourceService,LocalStorageService){
    mui('#pullrefresh').scroll();
    $scope.searchhistory=LocalStorageService.getSearchCarHistory();
    ResourceService.getFunServer('brandlist-search').then(function(data){
        $scope.brandlist=data.data;
    });
    //��������
    $scope.$watch('brand',function(newValue,oldValue){
        $scope.searchlist=[];
        if(newValue){
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
}]).controller('CarListController',['$scope','$rootScope','LocalStorageService','ResourceService',function($scope,$rootScope,LocalStorageService,ResourceService){
    //分页条数
    $scope.pagerConfig={
        pageSize:10,
        total:0
    }
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
        PageNo:1,
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
        PageNum:$scope.pagerConfig.pageSize,
        IncludeFlag:0
    }

    ResourceService.getFunServer('brandlist-search').then(function(data){
        $scope.brandlist=data.data;
    });
    LocalStorageService.setSearchCarHistory($rootScope.stateParams);
    $scope.getList=function(pageNo){
        $scope.filter.PageNo=pageNo||1
        ResourceService.getFunServer('CarListServcie',$scope.filter,'post').then(function(data){
            if(data.data[0])
            {
                $scope.carlist=data.data[0].value;
                $scope.pagerConfig.total=data.count;
            }
            else
            {
                $scope.carlist=[];
                $scope.pagerConfig.total=0;
            }
            $scope.pagerConfig.callback=$scope.getList;
            $scope.pager(pageNo)
        })
    }
    $scope.getList(1)
}])
