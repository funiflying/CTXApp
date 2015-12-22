angular.module('CTXApp',['ui.router','ngTouch','ngResource','CTXAppServices','CTXAppControllers']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
       $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home',{
            url:'/home',
            templateUrl:'partials/home.html',
            controller:'HomeController'
        }).state('carlist',{
            url:'/carlist',
            templateUrl:'partials/carlist.html'
        })
 }]).run(['$rootScope','$state','$stateParams',function($rootScope,$state,$stateParams) {
    $rootScope.HOST="http://192.168.0.218";
    $rootScope.state = $state;
    $rootScope.stateParams = $stateParams;
}])