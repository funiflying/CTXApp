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
        pageSize:20,
        total:0,
        callback:null
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
}]).controller('OrderController',['$rootScope','$scope','$http','ResourceService',function($rootScope,$scope, $http,ResourceService){
    //分页条数
    $scope.pagerConfig={
        pageSize:5,
        total:0,
        callback:null
    }
    $scope.list=[];
    $scope.order={};
    var orderCode=$rootScope.stateParams.OrderCode;
    //买车订单
    $scope.getList=function(pageNo){
        ResourceService.getFunServer('buyorderlist',{pageNo:pageNo,pageNum:$scope.pagerConfig.pageSize},'post').then(function(data,header){
            if(data.total){
                $scope.list=data.rows
            }
            $scope.pagerConfig.total=data.total;
            $scope.pagerConfig.callback=$scope.getList;
            $scope.pager(pageNo)
        },function(data,header){

        })
    }
    //卖车订单
    $scope.getSellList=function(pageNo){
        ResourceService.getFunServer('sellorderlist',{pageNo:pageNo,pageNum:$scope.pagerConfig.pageSize},'post').then(function(data,header){
            if(data.total){
                $scope.list=data.rows;
            }
            $scope.pagerConfig.total=data.total;
            $scope.pagerConfig.callback=$scope.getSellList;
            $scope.pager(pageNo)
        },function(data,header){

        })
    }
    //订单详情
    $scope.getOrder=function(){
           ResourceService.getFunServer('order',{OrderCode:orderCode}).then(function(data){
               if(data.status==1&&data.data.rows[0]){
                   $http.post('/order/GetServiceFee',{OrderCode:orderCode}).then(function(d){
                       $scope.servicefees=d.data;
                       $scope.order=data.data.rows[0];
                       $scope.payall = parseFloat($scope.order.DealPrice) + parseFloat($scope.servicefees) + parseFloat($scope.order.WarrantyCost) + parseFloat($scope.order.ShippingFee);
                       $scope.pay = $scope.payall - parseFloat($scope.order.PrePayMoney);
                   })
               }
           })
    }
    //提交预付款
    $scope.prepay=function(){
        if($scope.orderForm.$valid){
          $scope.pre.OrderCode=orderCode;
            $scope.pre.PrepayOrder="";
          ResourceService.getFunServer('prepay',$scope.pre,'post').then(function(data){
              if(data.status==1){
                  mui.toast('提交成功',function(){
                      $rootScope.state.go('buyorder')
                  })
              }
          })
        }
        else{
            mui.toast('请填写相应内容')
        }
    }
    //服务费
    $scope.getServiceFees=function(){
        ResourceService.getFunServer('servicefees',{OrderCode:orderCode}).then(function(data){
            $scope.servicefees=data;
        })
    }
    //提交全款
    $scope.fullpay=function(){
        if($scope.orderForm.$valid){
            $scope.full.OrderCode=orderCode;
            $scope.full.AllMoneyOrder="";
            ResourceService.getFunServer('fullpay',$scope.full,'post').then(function(data){
                if(data.status==1){
                    mui.toast('提交成功',function(){
                        $rootScope.state.go('buyorder');
                    })
                }
            })
        }
        else{
            mui.toast('请填写相应内容')
        }
    }
    //撤单
    $scope.backout=function(){
        //0 为买家撤单，1为车主撤单
        var role=$rootScope.stateParams.BID;
        if(role==0){
            ResourceService.getFunServer('buyrevoke',{OrderCode:orderCode,RevokeMemo:$scope.RevokeMemo},'post').then(function(data){
                if(data.status==1){
                    mui.toast('撤单申请已提交',function(){
                        $rootScope.state.go('buyorder');
                    })
                }
            })
        }
       else if(role==1){
            ResourceService.getFunServer('sellrevoke',{OrderCode:orderCode,RevokeMemo:$scope.RevokeMemo},'post').then(function(data){
                if(data.status==1){
                    mui.toast('撤单申请已提交',function(){
                        $rootScope.state.go('sellorder');
                    })
                }
            })
        }
    }
    //买家评价
    $scope.buyevaluate=function(){
        var params = {
            OrderCode: orderCode,
            UserGiveScore:$scope.UserGiveScore||1,
            UserGiveShipping:$scope.UserGiveShipping||1,
            UserGiveTest:$scope.UserGiveTest||1,
            UserFeedback: $scope.UserFeedback
        }
        ResourceService.getFunServer('buyfeedback',params,'post').then(function(data){
            if(data.status==1){
                mui.toast('评价成功',function(){
                    $rootScope.state.go('buyorder');
                })
            }else {
                mui.toast(data.message);
            }
        })
    }
    //车主评价
    $scope.sellevaluate=function(){
        var params = {
            OrderCode: orderCode,
            CarOwnerGiveScore:$scope.CarOwnerGiveScore||1,
            CarOwnerMemo: $scope.CarOwnerMemo
        }
        ResourceService.getFunServer('sellfeedback',params,'post').then(function(data){
            if(data.status==1){
                mui.toast('评价成功',function(){
                    $rootScope.state.go('sellorder');
                })
            }else {
                mui.toast(data.message);
            }
        })
    }
   //修改成交价
    $scope.amount=function(){
        var data = {
            orderCode: $scope.order.OrderCode,
            dealPrice: $scope.DealPrice
        }
        ResourceService.getFunServer('amount',data,'post').then(function(data){
            if(data.status==1){
                mui.toast('修改成功',function(){
                    $rootScope.state.go('sellorder');
                })
            }else {
                mui.toast(data.message);
            }
        })
    }
}]).controller('LoginController',['$rootScope','$scope','ResourceService','LocalStorageService',function($rootScope,$scope,ResourceService,LocalStorageService){
    //登录
    $scope.login=function(){
       if($scope.loginForm.$valid){
           ResourceService.getFunServer('login',$scope.login,'post').then(function(data){
               if(data.status==1){
                   LocalStorageService.setStorage('AUTH',data.data);
                   $rootScope.user=data.data;
               }
               else{
                   mui.toast('登录失败');
               }
           })
       }
    }
    //退出
    $scope.loginout=function(){
            ResourceService.getFunServer('loginout').then(function(data){
                if(data.status==1){
                    LocalStorageService.removeStorage('AUTH');
                    $rootScope.user=null;
                }
                else{
                    mui.toast(data.message);
                }
            })
        LocalStorageService.removeStorage('AUTH');
    }
}]).controller('CarController',['$rootScope','$http','$scope','$filter','ResourceService',function($rootScope,$scope,$http,$filter,ResourceService){

    //var data={BaseCodes:[]};

    //Uploader.uploader(data)


    //分页条数
    $scope.pagerConfig={
        pageSize:5,
        total:0,
        callback:null
    }
    $scope.list=[];
    $scope.CarNo=$rootScope.stateParams.CarNo;
    //车源列表
    $scope.getList=function(pageNo){
      //联盟商车源
       if($rootScope.user.AppraiserCode){
           var params = {
               CarFlag: -1,
               PageNo: pageNo,
               PageNum:$scope.pagerConfig.pageSize
           }
           ResourceService.getFunServer('alliancecargather',params,'post').then(function(data){
               if(data.status==1){
                   $scope.list=data.data.rows;
                   $scope.pagerConfig.total=data.data.total;
               }
               $scope.pagerConfig.callback=$scope.getList;
               $scope.pager(pageNo);

           })
       }
       else {
           //个人车源
           var d = {
               CarFlag: -1,
               PageNo: pagegNo,
               PageNum:$scope.pagerConfig.pageSize
           }
           ResourceService.getFunServer('cargather',d,'post').then(function(data){
               if(data.status==1){
                   $scope.list=data.data.rows;
                   $scope.pagerConfig.total=data.data.total;
               }

               $scope.pagerConfig.callback=$scope.getList;
               $scope.pager(pageNo);

           })

       }
    }
    $scope.getList(1)
    //车辆基本信息
    $scope.getCar=function(){
        ResourceService.getFunServer('GetCar',{CarNo:$scope.CarNo}).then(function(data){
            if(data.status==1&&data.data[0]){
                var obj=data.data[0].value[0];
                obj.Mileage=parseInt(obj.Mileage);
                obj.TransferNo=parseInt(obj.TransferNo);
                obj.Price=parseInt(obj.Price);
                obj.WholesalePrice=parseInt(obj.WholesalePrice);
                obj.Buyyear =new Date($filter('DateTimeFormat')(obj.Buyyear,'yyyy/MM/dd'));
                obj.InitialDate =new Date($filter('DateTimeFormat')(obj.Buyyear,'yyyy/MM/dd'));
                obj.Annual_Inspect_Time =new Date($filter('DateTimeFormat')(obj.Buyyear,'yyyy/MM/dd'));
                obj.Compulsory_insurance_Time =new Date($filter('DateTimeFormat')(obj.Buyyear,'yyyy/MM/dd'));
                obj.Commercial_Insurance_Time =new Date($filter('DateTimeFormat')(obj.Buyyear,'yyyy/MM/dd'));
                obj.IsUrgent=obj.IsUrgent=='True'?true:false;
                obj.QuasiNewCar=obj.QuasiNewCar=='True'?true:false;
                obj.LearnerCa=obj.LearnerCa=='True'?true:false;
                obj.WomenCar=obj.WomenCar=='True'?true:false;
                obj.SevenSeat=obj.SevenSeat=='True'?true:false;
                obj.DrivingLicense=obj.DrivingLicense=='True'?true:false;
                obj.Registration=obj.Registration=='True'?true:false;
                obj.PurchaseInvoices=obj.PurchaseInvoices=='True'?true:false;
                obj.ViolationRecord=obj.ViolationRecord=='True'?true:false;
                $scope.car=obj;

            }
        })
    }
    //下架
    $scope.soldout=function(){
        if($scope.carForm.$valid){
            $scope.soldout.CarNo=$scope.CarNo;
            ResourceService.getFunServer('carsoldout',$scope.soldout,'post').then(function(data){
                if(data.status==1){
                    mui.toast('下架成功',function(){
                        $rootScope.state.go('cargather');
                    })
                }else {
                    mui.toast(data.message);
                }
            })
        }
    }


}])
