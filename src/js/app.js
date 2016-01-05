angular.module('CTXApp',['ui.router','ngTouch','ngResource','ngAnimate','CTXAppServices','CTXAppControllers','CTXAppCtrl','CTXAppFilters','CTXAppDirective']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
       $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home',{
            url:'/home',
            templateUrl:'partials/home.html',
            controller:'HomeController'
        }).state('carlist',{
            url:'/carlist',
            templateUrl:'partials/carlist.html',
            controller:'CarListController'
        }).state('carlist.query',{
            url:'/carlist?BrandID&SeriesID&PriceID&Style&SearchValue&&Value',
            templateUrl:'partials/carlist.html',
            controller:'CarListController'
        }).state('car',{
            url:'/car',
            templateUrl:'',
            controller:''
        }).state('sell',{
            url:'/sell',
            templateUrl:'partials/sell.html',
            controller:''
        }).state('admin',{
            url:'/admin',
            templateUrl:'partials/admin.html',
            controller:'LoginController'
        }).state('searchcar',{
            url:'/searchcar',
            templateUrl:'partials/searchcar.html',
            controller:'SerachCarController'
        }).state('carinfo',{
            url:'/carinfo?CarNo',
            templateUrl:'partials/carinfo.html',
            controller:'CarInfoCtrl'
        }).state('viewreport',{
            url:'/viewreport?CarNo',
            templateUrl:'partials/viewreport.html',
            controller:'CarInfoCtrl'
        }).state('buyorder',{
            url:'/buyorder',
            templateUrl:'partials/buyorder.html',
            controller:'OrderController'
        }).state('prepay',{
            url:'/prepay?OrderCode',
            templateUrl:'partials/prepay.html',
            controller:'OrderController'
        }).state('fullpay',{
            url:'/fullpay?OrderCode',
            templateUrl:'partials/fullpay.html',
            controller:'OrderController'
        }).state('orderbackout',{
            url:'/orderbackout?OrderCode&BID',
            templateUrl:'partials/orderbackout.html',
            controller:'OrderController'
        })
 }]).run(['$rootScope','$state','$stateParams','LocalStorageService',function($rootScope,$state,$stateParams,LocalStorageService) {
    $rootScope.HOST="http://192.168.0.218";
    $rootScope.state = $state;
    $rootScope.stateParams = $stateParams;
    //用户
    $rootScope.user=LocalStorageService.getStorage('AUTH')||null;
}]);