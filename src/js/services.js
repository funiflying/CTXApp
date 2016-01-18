/*
 *@author:wutianxiang
 *@date:2015-12-21
 *@version:1.0.0
 */



angular.module('CTXAppServices', []).factory('ResourceService', ['$resource', '$rootScope','$q', function($resource, $rootScope,$q) {
    return {
        getFunServer: function(sname,params,method) {
            var surl = "",defer = $q.defer();
            switch (sname) {
                case "RequestHomeData"://首页车源
                    surl = "/Common/Car/RequestHomeData/";
                    break;
                case "brandlist"://品牌列表
                    surl = "/data/brandlist.json";
                    break;
                case "GetCardata"://车辆基本信息
                    surl = "/common/car/GetCardata";
                    break;
                case "GetTestReportWithCode"://检测报告
                    surl = "/Alliance/TestReport/GetTestReportWithCode";
                    break;
                case "CarListServcie"://车辆筛选
                    surl='/common/car/SearchCar';
                    break;
                case 'brandlist-search':
                    surl='/data/Brand.json';
                    break;
                case 'SendPhoneValCode'://
                    surl='/common/message/SendValiadeCode';
                    break;
                case 'buyorderlist':
                    surl='/order/UserGetOrderList';
                    break;
                case 'sellorderlist':
                    surl='/order/CarOwnerGetOrderList';
                    break;
                case 'order':
                    surl='/order/GetOrderInfoWithCode';
                    break;
                case 'prepay':
                    surl='/Order/UserPrePay';
                    break;
                case 'fullpay':
                    surl='/Order/UserPayAll';
                    break;
                case 'servicefees':
                    surl='/order/GetServiceFee';
                    break;
                case 'buyfeedback':
                    surl='/order/UserFeedback';
                    break;
                case 'sellfeedback':
                    surl='/order/CarOwnerFeedback';
                    break;
                case 'buyrevoke':
                    surl='/order/UserRevokeRequest';
                    break;
                case 'sellrevoke':
                    surl='/order/CarOwnerRevokeRequest';
                    break;
                case 'sendpaycode':
                    surl='/order/SendBankInfoToBuyer';
                    break;
                case 'amount':
                    surl='/order/CarOwnerUpdateOrder';
                    break;
                case 'login':
                    surl='/account/OutAndAllanceLogin';
                    break;
                case 'loginout':
                    surl='/account/LoginOff';
                    break;
                case 'GetCar':
                	surl='/common/car/GetCar';   //获取车源基本信息
                	break;
                case 'SearchAppraiserWithSkill':
                	surl='/Alliance/Appraiser/SearchAppraiserWithSkill'; //获取评估师列表
                	break;
                case 'cargather':
                    surl='/common/car/GetCarsByUserID'; //个人车源
                    break;
                case 'alliancecargather':
                    surl='/common/car/GetAllianceCarList'; //联盟商车源
                    break;
                case 'carsoldout':
                    surl='/common/car/PostCarRevoke'; //车源下架
                    break;
                case 'GetCarCreditInfoByCarNo':  //获取诚信数据
                	surl='/common/car/GetCarCreditInfoByCarNo';
                    break;
                case 'Series':  //获取车系
                    surl='/Common/Carbrand/GetSeries';
                    break;
                case 'SpecName':  //获取车型号
                    surl='/carbrand/GetSpecByBrandSeries';
                    break;
                case 'release':  //获取车型号
                    surl='/common/car/Publish';
                    break;
                case 'editcar':  //编辑车源
                    surl='/common/car/updatecar';
                    break;
                case 'validwechat':  //微信登录状态
                    surl='/Account/WXLogin';
                    break;
                case 'bindwechat':  //绑定
                    surl='/Account/WXBinding';
                    break;
                case 'UserGetOrderList':
                	//UserID=""&PageNo=""&history=1
                	surl='/Alliance/AppraiserOrder/UserGetOrderList';
                    break;
                case 'AppraiserAccept':
                	surl='/Alliance/AppraiserOrder/AppraiserAccept';
                	break;
                case 'submitorder':
                    surl='/Order/userbuy';//提交买车订单
                    break;
                    surl='/Order/userbuy';//提交买车订单
                    break;
                case 'GetTestReportWithCode': //通过检测编号获取检测报告
                	surl='/Alliance/TestReport/GetTestReportWithCode';
                	break;
                case 'UserRevoke':  //我的委托评估－申请撤销
                	surl='/Alliance/AppraiserOrder/UserRevoke';  //AppraiserOrderCode
                	break;
                case 'AppraiserGetOrderList':  //评估师获取客户委托订单
                	surl='/Alliance/AppraiserOrder/AppraiserGetOrderList'; //AppraiserCode
                	break;
                case  'servicecity':
                    surl='/oa/direct/HomeGetAlldirectCity';//开通城市
                    break;
                case  'updateUser':
                    surl='/account/UpdatingUser';//更新用户信息
                    break;
                case  'resetTradePwd':
                    surl='/account/ChangeTradePwd';//重置Trade
                    break;
                case  'checkTradePwd':
                    surl='/account/CheckCurrentUserIfHasTradePwd';//检测Trade
                    break;
                case  'apprasiorApply':
                    surl='/account/UserUpgradeApprasior';//评估师认证
                    break;
                case  'user':
                    surl='/account/GetCurrentUserinfo';//用户信息
                    break;
                case  'sellcar':
                    surl='/JoinMessage/JoinMessage/AddJoinMessage';//买车请求
                    break;
                case  'sellcarcount':
                    surl='/Common/car/GetSellingCount';//在售车源
                    break;
                case  'alliance':
                    surl='/account/GetCurrentAllianceinfo';//联盟商
                    break;
                case  'withdraw':
                    surl='/Financial/FinanceNeedPay/PostExtraction';//提现
                    break;
                default:
                    break;
            }
            if (surl == "") return '';
            $resource($rootScope.HOST + surl, {}, {
                query: {
                    method: method||'get',
                    params: params||'{}',
                    isArray: false
                }
            }).query(function(data, headers) {
                defer.resolve(data);
            }, function(data, headers) {
                defer.reject(data);
            })
            return defer.promise;
        }
    }
}]).factory('LocalStorageService',function(){
    return {
        setStorage:function(name,val){
            localStorage.setItem(name,JSON.stringify(val))
        },
        getStorage:function(name){
          return JSON.parse(localStorage.getItem(name));
        },
        removeStorage:function(name){
            localStorage.removeItem(name)
        },
        setSearchCarHistory:function(stateParams){
            if(!stateParams.SearchValue){
                return;
            }
            var SEARCH_CAR_HISTORY=this.getStorage('SEARCH_CAR_HISTORY')||{DATA:[]};
            var count=0;
            if(SEARCH_CAR_HISTORY.DATA.length==0){
                SEARCH_CAR_HISTORY.DATA.push(stateParams);
            }
            else{
                angular.forEach(SEARCH_CAR_HISTORY.DATA,function(obj,index){
                    if((stateParams.SeriesID&&obj.BrandID==stateParams.BrandID&&obj.SeriesID==stateParams.SeriesID)||(!stateParams.SeriesID&&obj.BrandID==stateParams.BrandID)){
                       count++;
                    }
                })
                if(count==0){
                    SEARCH_CAR_HISTORY.DATA.push(stateParams)
                }
            }
            this.setStorage('SEARCH_CAR_HISTORY',SEARCH_CAR_HISTORY);
        },
        getSearchCarHistory:function(){
             var SEARCH_CAR_HISTORY=this.getStorage('SEARCH_CAR_HISTORY')||{DATA:[]};
             return SEARCH_CAR_HISTORY.DATA
         },
        clearSearchCarHistory:function(){
            this.removeStorage('SEARCH_CAR_HISTORY')
        }
    }
}).factory('UploaderService',['$http','$rootScope',function($http,$rootScope){
    return {
        uploader:function(data,flag){
            flag=parseInt(flag)
            switch (flag){
                case 1:
                    return $http.post($rootScope.HOST+'/common/file/UpLoadImgByBase64ForCar',data)
                    break;
                case 2:
                    return $http.post($rootScope.HOST+'/common/file/UpLoadImgByBase64ForUser',data)
                    break;
                case 3:
                    return $http.post($rootScope.HOST+'/common/file/UpLoadImgByBase64ForAppraiserSign',data)
                    break;
                case 4:
                    return $http.post($rootScope.HOST+'/common/file/UpLoadImgByBase64ForCertificateImg',data)
                    break;
                default:
            }
            return $http.post($rootScope.HOST+'/common/file/UpLoadImgByBase64',data)
        }
    }

}]).factory('CarService',['$http','$rootScope',function($http,$rootScope){
    return {
        release:function(data){
            return $http.post($rootScope.HOST+'/common/car/Publish',data)
        },
        edit:function(data){
            return $http.post($rootScope.HOST+'/common/car/updatecar',data)
        },
        carsellcount:function(){
            return $http.get($rootScope.HOST+'/Common/car/GetSellingCount')
        }
    }

}])