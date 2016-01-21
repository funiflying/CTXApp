/*
 * @author:wutianxiang
 * @date:2015-12-21
 * @version:1.0.0
 */
angular.module("CTXAppControllers",[]).controller('RootController',['$scope','$rootScope','$swipe','ResourceService','LocalStorageService',function($scope,$rootScope,$swipe,ResourceService,LocalStorageService){
    $rootScope.CityID=(LocalStorageService.getStorage('LOCALTION')&&LocalStorageService.getStorage('LOCALTION').CityID)||''
    $rootScope.CityName=(LocalStorageService.getStorage('LOCALTION')&&LocalStorageService.getStorage('LOCALTION').CityName)||'全国';
    //同行价
    $rootScope.WholesalePrice=(LocalStorageService.getStorage('WholesalePrice')&&LocalStorageService.getStorage('WholesalePrice').WholesalePrice)||false;
}]).controller('HomeController',['$scope','$rootScope','$swipe','ResourceService',function($scope,$rootScope,$swipe,ResourceService){

    var gallery = mui(".mui-slider");
    gallery.slider({
        interval: 3000
    })
    var city=ResourceService.getFunServer('servicecity',{}).then(function(data){
        if(data.status==1){
            $scope.city=data.data.rows;
        }
    })
    $scope.getList=function() {
        var params={
            City: $rootScope.CityID,
            CarType: 0
        }
        if($rootScope.CityID==''){
            params.City=null;
        }
        ResourceService.getFunServer('RequestHomeData', params).then(function (data) {
            $scope.carlist = data.data;
        });
    }
}]).controller('SerachCarController',['$scope','$rootScope','$timeout','ResourceService','LocalStorageService',function($scope,$rootScope,$timeout,ResourceService,LocalStorageService){
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
        CityID: $rootScope.CityID||-1,
        Color: null,
        Country: null,
        DischargeStandard: null,
        GearBox: null,
        IsUrgent: null,
        Mileage: null,
        OutputVolume: null,
        PageNo:1,
        PriceEnd: null,
        PriceID: $rootScope.stateParams.PriceID||null,
        PriceStart: null,
        QuasiNewCar: null,
        SearchWord: null,
        Series: $rootScope.stateParams.SeriesID,
        SevenSeat: null,
        Sort: null,
        Style: $rootScope.stateParams.Style||null,
        WomenCar: null,
        PageNum:$scope.pagerConfig.pageSize,
        IncludeFlag:0
    }
    var city=ResourceService.getFunServer('servicecity',{}).then(function(data){
        if(data.status==1){
            $scope.city=data.data.rows;
        }
    })
    ResourceService.getFunServer('brandlist-search').then(function(data){
        $scope.brandlist=data.data;
    });
    LocalStorageService.setSearchCarHistory($rootScope.stateParams);
    $scope.getList=function(pageNo){
        $scope.filter.PageNo=pageNo||1;
        $scope.filter.IncludeFlag>0?$scope.filter.CityID==-1:$scope.filter.CityID=$rootScope.CityID;
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
}]).controller('OrderController',['$rootScope','$scope','$http','$filter','ResourceService',function($rootScope,$scope, $http,$filter,ResourceService){
    //分页条数
    $scope.pagerConfig={
        pageSize:5,
        total:0,
        callback:null
    }
    $scope.list=[];
    $scope.order={};
    var orderCode=$rootScope.stateParams.OrderCode;
    $scope.PayTotal=0;
    //买车订单
    $scope.getList=function(pageNo){
        var params={
            pageNo:pageNo,
            pageNum:$scope.pagerConfig.pageSize,
            history:0
        }
        ResourceService.getFunServer('buyorderlist',params,'post').then(function(data,header){
            if(data.total){
                $scope.list=data.rows
            }
            $scope.pagerConfig.total=data.total;
            $scope.pagerConfig.callback=$scope.getList;
            $scope.pager(pageNo)
        },function(data,header){

        })
    }
    //历史记录
    $scope.getRecordList=function(pageNo){
        var params={
            pageNo:pageNo,
            pageNum:$scope.pagerConfig.pageSize,
            history:1
        }
        ResourceService.getFunServer('buyorderlist',params,'post').then(function(data,header){
            if(data.total){
                $scope.list=data.rows
            }
            $scope.pagerConfig.total=data.total;
            $scope.pagerConfig.callback=$scope.getRecordList;
            $scope.pager(pageNo)
        },function(data,header){

        })
    }
    //卖车订单
    $scope.getSellList=function(pageNo){
        ResourceService.getFunServer('sellorderlist',{pageNo:pageNo,pageNum:$scope.pagerConfig.pageSize,history:0},'post').then(function(data,header){
            if(data.total){
                $scope.list=data.rows;
            }
            $scope.pagerConfig.total=data.total;
            $scope.pagerConfig.callback=$scope.getSellList;
            $scope.pager(pageNo)
        },function(data,header){

        })
    }
    //历史记录
    $scope.getSellRecordList=function(pageNo){
        var params={ pageNo:pageNo, pageNum:$scope.pagerConfig.pageSize,history:1}
        ResourceService.getFunServer('sellorderlist',params,'post').then(function(data,header){
            if(data.total){
                $scope.list=data.rows;
            }
            $scope.pagerConfig.total=data.total;
            $scope.pagerConfig.callback=$scope.getSellRecordList;
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
                   })
               }
           })
    }
    //提交预付款
    $scope.prepay=function(){
        if($scope.orderForm.$valid){
          $scope.pre.OrderCode=orderCode;
            $scope.pre.PrepayOrder=" ";
            $scope.pre.PrePayBank=$scope.bank;
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
    
    //使用优惠券
	$scope.discount={
		PolicyCodes:[],
		Count:0,
		usage:false
	}
	$scope.$watch('discount',function(newValue){
		if(!$scope.discount.usage){
			$scope.discount={
				PolicyCodes:[],
				Count:0
			}
			$('#Count').text('');
			$('#needpay').text($filter('currency')($scope.order.PayTotal,'￥'));
			$('#needpayservice').text($filter('currency')($scope.servicefees,'￥'));
			$('.tui-discount-item').removeClass('active');
		}
	},true);
    $scope.payAll=function(){
    	$scope.full.OrderCode=orderCode;
        $scope.full.AllMoneyOrder="";
        $scope.full.AllMoneyBank=$scope.bank;
    	ResourceService.getFunServer('fullpay',$scope.full,'post').then(function(data){
                if(data.status==1){
                    mui.toast('提交成功',function(){
                        $rootScope.state.go('buyorder');
                    })
                }
			})
    }
    //提交全款
    $scope.fullpay=function(){
        if($scope.orderForm.$valid){
            if($scope.discount.usage){
				var params={
					OrderCode:orderCode,
					PolicyCodes:$scope.discount.PolicyCodes
				  }
				ResourceService.getFunServer('discountusage',params,'post').then(function(data){
					if(data.status==1){
						$scope.payAll();
					} else{
		            	mui.toast(data.message)
		        	}
			})
			}
			else{
				$scope.payAll();
			}
    }
 }
    //买家使用抵用券
    //优惠券列表
    $scope.getDiscountList=function(pageNo){
        ResourceService.getFunServer('discount',{}).then(function(data){
            if(data.status==1){
                $scope.discountlist=data.data;
            }
            else {
                $scope.discountlist=[];
            }
        })
    }
    //提交全款
    $scope.paytips=function(){

            if($scope.discount.usage){
				var params={
					OrderCode:orderCode,
					PolicyCodes:$scope.discount.PolicyCodes
				  }
				ResourceService.getFunServer('discountusage',params,'post').then(function(data){
					if(data.status==1){
						mui.toast('支付成功',function(){
							$rootScope.state.go('sellorder')
						})
					} else{
		            	mui.toast(data.message)
		        	}
			})
			}
			else{
				mui.toast('请选择抵用券')
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
            UserGiveTestTarget:$scope.UserGiveTestTarget||1,
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
     $rootScope.user&&$rootScope.user.HeadImage? $scope.HeadStyle={backgroundImage:'url('+$rootScope.user.HeadImage+')'}:$scope.HeadStyle={backgroundImage:'url(../images/detection-photo-default.gif)'};
    $scope.login={
        Contact:'',
        Code:''
    }
    var settime=function(){

        var el=$('.tui-btn-getcode');
        if ($rootScope.countdown == 0) {
            el.removeAttr("disabled");
            el.text("获取验证码");
            $rootScope.countdown = 60
        } else {
            el.attr("disabled",'disabled');
            el.text($rootScope.countdown + "s");
            $rootScope.countdown--;
            setTimeout(settime, 1000)
        }
    }
    //短信验证码
    $scope.getMCode=function(){
        if($scope.login.Contact){
            var params={
                phoneNum:$scope.login.Contact
            }
            ResourceService.getFunServer('SendPhoneValCode',params).then(function(data){
                if(data.status==1){
                    settime()
                }
            })
        }
    }
    //登录
    $scope.bind=function(){
       if($scope.loginForm.$valid){
           ResourceService.getFunServer('bindwechat',$scope.login,'post').then(function(data){
               if(data.status==1){
                   LocalStorageService.setStorage('AUTH',data.data);
                   $rootScope.user=data.data;
               }
               else{
                   mui.toast(data.message);
               }
           })
       }
    }
}]).controller('CarController',['$rootScope','$http','$scope','$filter','ResourceService','UploaderService','CarService',function($rootScope,$http,$scope,$filter,ResourceService,UploaderService,CarService){
    $scope.car={};

    //分页条数
    $scope.pagerConfig={
        pageSize:5,
        total:0,
        callback:null
    }
    $scope.list=[];

    var orderCode=$rootScope.stateParams.OrderCode;
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
               else {
                   $scope.list=[];
                   $scope.pagerConfig.total=0;
               }
               $scope.pagerConfig.callback=$scope.getList;
               $scope.pager(pageNo);

           })
       }
       else {
           //个人车源
           var d = {
               CarFlag: -1,
               PageNo: pageNo,
               PageNum:$scope.pagerConfig.pageSize
           }
           ResourceService.getFunServer('cargather',d,'post').then(function(data){
               if(data.status==1){
                   $scope.list=data.data.rows;
                   $scope.pagerConfig.total=data.data.total;
               }
               else {
                   $scope.list=[];
                   $scope.pagerConfig.total=0;
               }
               $scope.pagerConfig.callback=$scope.getList;
               $scope.pager(pageNo);
           })
       }
    }
    //车辆基本信息
    $scope.getCar=function(){
        if(!$scope.CarNo){
            return;
        }
        ResourceService.getFunServer('GetCardata',{CarNo:$scope.CarNo}).then(function(data){
            if(data.status==1){
                var val=data.data;
                var o=new Object();
                for(var i=0;i<val.length;i++){
                    var name=val[i].name;
                    switch (name){
                        case 'Car':
                            var  o= val[i].value[0]
                            o.CarNo=o.CarNo;
                            o.Mileage=parseInt(o.Mileage);
                            o.TransferNo=parseInt(o.TransferNo);
                            o.Price=parseFloat(o.Price/10000);
                            o.WholesalePrice=parseFloat(o.WholesalePrice/10000);
                            o.Buyyear =new Date($filter('DateTimeFormat')(o.Buyyear,'yyyy/MM/dd'));
                            o.InitialDate =new Date($filter('DateTimeFormat')(o.InitialDate,'yyyy/MM/dd'));
                            o.Annual_Inspect_Time =new Date($filter('DateTimeFormat')(o.Annual_Inspect_Time,'yyyy/MM/dd'));
                            o.Compulsory_insurance_Time =new Date($filter('DateTimeFormat')(o.Compulsory_insurance_Time,'yyyy/MM/dd'));
                            o.Commercial_Insurance_Time =new Date($filter('DateTimeFormat')(o.Commercial_Insurance_Time,'yyyy/MM/dd'));
                            o.IsUrgent=o.IsUrgent=='True'||true?true:false;
                            o.QuasiNewCar=o.QuasiNewCar=='True'||true?true:false;
                            o.LearnerCa=o.LearnerCa=='True'||true?true:false;
                            o.WomenCar=o.WomenCar=='True'||true?true:false;
                            o.SevenSeat=o.SevenSeat=='True'||true?true:false;
                            o.DrivingLicense=o.DrivingLicense=='True'||true?true:false;
                            o.Registration=o.Registration=='True'||true?true:false;
                            o.PurchaseInvoices=o.PurchaseInvoices=='True'||true?true:false;
                            o.IncludeTransferFee=o.IncludeTransferFee=='True'||true?true:false;
                            o.CarPic_Car_CarNo=[];
                            $scope.car=o;
                            $scope.EditPic([{PicAddr:$scope.car.HomePicID}],'car-homepic')
                            break;
                        case 'CarPic':
                            $scope.CarPic=val[i].value;
                            $scope.EditPic($scope.CarPic,'car-cover')
                            break;
                        default:
                            obj=val[i].value[0];
                            break;
                    }
                }
            }
        })
    }
    $scope.EditPic=function(images,id){
        angular.forEach(images,function(obj,index){
        	var img=obj.PicAddr//.replace('_Big','');
            var imageList=document.getElementById(id);
            var placeholder = document.createElement('div');
            placeholder.setAttribute('class', 'image-item');
            var closeButton = document.createElement('div');
            closeButton.setAttribute('class', 'image-close');
            closeButton.innerHTML = 'X';
            placeholder.style.backgroundImage = 'url(' + img + ')';
            placeholder.setAttribute('data-path',img);
            closeButton.addEventListener('click', function(event) {
                event.stopPropagation();
                event.cancelBubble = true;
                placeholder.remove();
                return false;
            }, false);
            placeholder.appendChild(closeButton);
            imageList.appendChild(placeholder);
        })
    }
    $scope.GetPicPath=function(){
                 var cover=$('#car-cover').find('.image-item:not(.space)');
                 var home=$('#car-homepic').find('.image-item:not(.space)');
                 $scope.car.CarPic_Car_CarNo=[];
                 $.each(cover,function(index,obj){
                     var o=new Object();
                     o.PicAddr=$(this).attr('data-path')
                     $scope.car.CarPic_Car_CarNo.push(o);
                 })
                 $scope.car.HomePicID=home.attr('data-path');
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
    //车系
    $scope.getSeries=function(){
        var params={
            BrandID:$scope.car.Brand
        }
        ResourceService.getFunServer('Series',params,'post').then(function(data){
            if(data.status==1){
                $scope.series=data.data
            }
            else {
                $scope.series=[];
            }
        })
    }
    //车型
    $scope.getSpecName=function(){
        var params={
            brandid:$scope.car.Brand,
            seriesid:$scope.car.SeriesID
        }
        ResourceService.getFunServer('SpecName',params,'post').then(function(data){
            if(data.status==1){
                $scope.speclist=data.data
            }
            else {
                $scope.speclist=[];
            }
        })
    }
    //发布
    $scope.release=function() {
        if ($scope.carForm.$valid) {
            $scope.GetPicPath()
            $scope.car.Price = parseFloat($scope.car.Price) * 10000;
            $scope.car.WholesalePrice = parseFloat($scope.car.WholesalePrice) * 10000;
            $scope.car.IncludeTransferFee = $scope.IncludeTransferFee;
            if ($scope.CarNo) {
                CarService.edit($scope.car).then(function (data) {
                    if (data.data.status ==1) {
                        mui.toast('编辑成功', function () {
                            $rootScope.state.go('cargather');
                        })
                    } else {
                        mui.toast(data.data.message);
                    }
                })
            }
            else {
                CarService.release( $scope.car).then(function (data) {
                    if (data.data.status ==1) {
                        mui.toast('发布成功', function () {
                            $rootScope.state.go('cargather');
                        })
                    } else {
                        mui.toast(data.data.message);
                    }
                })
            }
        }
    }
}]).controller('AccountController',['$rootScope','$scope','ResourceService','LocalStorageService',function($rootScope,$scope,ResourceService,LocalStorageService){

    $scope.USER=$rootScope.user;
    $scope.bankinfo={};

    //用户信息
    $scope.getUser=function(){
        ResourceService.getFunServer('user',{}).then(function(data){
            if(data.status==1){
                $scope.USER=data.data;
                $scope.bankinfo.RegisterBankCode= parseInt($scope.USER.RegisterBankCode);
                $scope.bankinfo.UserName=$scope.USER.UserName;
                $scope.bankinfo.RegisterBank=$scope.USER.RegisterBank
                if($scope.USER.IdentityTag==3){
                    $scope.getAlliance();
                }
            }
        })
    }
    //联盟商信息
    $scope.getAlliance=function(){
        ResourceService.getFunServer('alliance',{}).then(function(data){
            if(data.status==1){
               $scope.alliance=data.data[0]
            }
        })
    }
    $scope.getUser();
    //检测交易密码
    $scope.checkTradePwd=function(){
        ResourceService.getFunServer('checkTradePwd',{}).then(function(data){
            $scope.Trade=data.status;
        })
    }
    $scope.checkTradePwd();
    $scope.goTrade=function(){
        if($scope.Trade==0){
            $rootScope.state.go('traders')
        }
        else {
            $rootScope.state.go('retraders')
        }
    }
    $scope.goBank=function(){
        if($scope.USER.RegisterBankCode){
            $rootScope.state.go('bank')
        }
        else {
            $rootScope.state.go('addbank')
        }
    }
    //重置交易密码
    $scope.reTrade=function(){
        if($scope.settingsForm.$valid){
            if($scope.newTradePwd!=$scope.ConfigPwd) {
                $scope.errmsg='两次密码不一致';
                return ;
            }
            else {
                var params={
                    oldTradePwd:$scope.oldTradePwd,
                    newTradePwd:$scope.newTradePwd
                }
                ResourceService.getFunServer('resetTradePwd',params,'post').then(function(data){
                    if(data.status==1){
                        mui.toast('交易密码重置成功',function(){
                            $rootScope.state.go('account')
                        })
                    }else {
                        mui.toast(data.message)
                    }
                })

            }
        }
    }
    //设置交易密码
    $scope.modifyTrade=function(){
        if($scope.settingsForm.$valid){
            if($scope.PayPassword!=$scope.ConfigPwd) {
                $scope.errmsg='两次密码不一致';
                return ;
            }
            else {
                ResourceService.getFunServer('updateUser',{PayPassword:$scope.PayPassword}).then(function(data){
                    if(data.status==1){
                        mui.toast('设置成功',function(){
                            $rootScope.state.go('account')
                        })
                    }else {
                        mui.toast(data.message)
                    }
                })

            }
        }
    }
    //评估师认证
    $scope.appraiserAppy=function(){
        if($scope.settingsForm.$valid){
            $scope.appraiser.AppraiserPic=$('#AppraiserPic').attr('data-path');
            ResourceService.getFunServer('apprasiorApply',$scope.appraiser,'post').then(function(data){
                if(data.status==1){
                    mui.toast('已提交申请，请等待审核',function(){
                        $rootScope.state.go('account')
                    })
                }else {
                    mui.toast(data.message)
                }
            })
        }
    }
    //绑卡
    $scope.addBank=function(){
        if($scope.settingsForm.$valid){
            $scope.bankinfo.RegisterBank=$scope.bank;
            ResourceService.getFunServer('updateUser',$scope.bankinfo,'post').then(function(data){
                if(data.status==1){
                    mui.toast('银行卡绑定成功',function(){
                        $rootScope.state.go('account')
                    })
                }else {
                    mui.toast(data.message)
                }
            })
        }
    }
    //删除银行卡
    $scope.deleteBank=function(){
        $scope.bankinfo.RegisterBankCode='';
        $scope.bankinfo.RegisterBank=''
        ResourceService.getFunServer('updateUser',$scope.bankinfo,'post').then(function(data){
            if(data.status==1){
                mui.toast('删除成功',function(){
                    $rootScope.state.go('account')
                })
            }else {
                mui.toast(data.message)
            }
        })
    }
    //提现
    $scope.withdraw=function(){
        if($scope.settingsForm.$valid){
            $scope.alliance?$scope.account.BusinessFlag=1:$scope.account.BusinessFlag0;
            if(!parseInt($scope.account.PayMoney)>0){
                return;
            }
            ResourceService.getFunServer('withdraw',$scope.account,'post').then(function(data){
                if(data.status==1){
                    mui.toast('您的提现请求已经成功提交，将在2个工作日内到账，如有疑问请致电400-0732-777',function(){
                        $rootScope.state.go('account');
                    })
                } else{
                    $scope.errmsg=data.message;
                }
            })
        }
    }
}]).controller('SellController',['$rootScope','$scope','ResourceService','CarService',function($rootScope,$scope,ResourceService,CarService){
    $scope.getCarCount=function(){
        CarService.carsellcount().success(function(data){
            $scope.carcount=data;
        })
    }
    $scope.sell=function(){
        var param={
            ContactPhone:$scope.phone,
            EventFlag:0,
            Contact:'',
            CityID:'',
            CityName:''
        }
        if($scope.phone){
            ResourceService.getFunServer('sellcar',param,'post').then(function(data){
                if(data.status==1){
                    mui.toast('您的卖车邀请已提交，客服人员将与您联系',function(){
                        $scope.phone='';
                    })
                }else {
                    mui.toast(data.message)
                }
            })
       }
    }
}]).controller('DiscountController',['$rootScope','$scope','ResourceService',function($rootScope,$scope,ResourceService){
  
    //优惠券列表
    $scope.getList=function(pageNo){
        ResourceService.getFunServer('discount',{}).then(function(data){
            if(data.status==1){
                $scope.list=data.data;
            }
            else {
                $scope.list=[];
            }
        })
    }
   //优惠券详情
   $scope.getInfo=function(){
   		var params={
   			PolicyCode:$rootScope.stateParams.PolicyCode
   		}
   	    ResourceService.getFunServer('discountinfo',params).then(function(data){
   	    	if(data.status==1){
   	    		$scope.promotion=data.data;
   	    	}
   	    	
   	    })
  
   }




}])
