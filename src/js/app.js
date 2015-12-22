angular.module('CTXApp',['ui.router','ngTouch','ngResource','CTXAppServices','CTXAppControllers','CTXAppFilters']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
       $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home',{
            url:'/home',
            templateUrl:'partials/home.html',
            controller:'HomeController'
        }).state('carlist',{
            url:'/carlist',
            templateUrl:'partials/carlist.html'
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
            controller:'HomeController'
        })
 }]).run(['$rootScope','$state','$stateParams',function($rootScope,$state,$stateParams) {
    $rootScope.HOST="http://192.168.0.218";
    $rootScope.state = $state;
    $rootScope.stateParams = $stateParams;
}])