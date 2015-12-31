angular.module('CTXApp',['ui.router','ngTouch','ngResource','ngAnimate','CTXAppServices','CTXAppControllers','CTXAppFilters','CTXAppDirective']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
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
        }).state('sellcar',{
            url:'/sellcar',
            templateUrl:'',
            controller:''
        }).state('admin',{
            url:'/admin',
            templateUrl:'',
            controller:''
        }).state('searchcar',{
            url:'/searchcar',
            templateUrl:'partials/searchcar.html',
            controller:'SerachCarController'
        })
 }]).run(['$rootScope','$state','$stateParams',function($rootScope,$state,$stateParams) {
    $rootScope.HOST="http://192.168.0.218";
    $rootScope.state = $state;
    $rootScope.stateParams = $stateParams;

}]);