/*
 * @author:dekent
 * @date:2015-12-28
 * @version:1.0.0
 */
angular.module("CTXAppCtrl", []).controller('CarInfoCtrl', ['$scope', '$rootScope','$location', '$anchorScroll','ResourceService', '$filter', function($scope, $rootScope,$location,$anchorScroll, ResourceService, $filter) {

	if($rootScope.stateParams.Scroll){
		$location.hash($rootScope.stateParams.Scroll);
		$anchorScroll()
	}
	var obj = {
		CarNo: $rootScope.stateParams.CarNo
	};
	$scope.CarNo = $rootScope.stateParams.CarNo;

	angular.element(document).ready(function() {
		var slider = mui("#carslider");
		slider.slider();
	});

	ResourceService.getFunServer('GetCardata', obj, 'get').then(function(d) {
		var ReportDetail, SurfaceCase;
		for (var i = 0, ln = d.data.length; i < ln; i++) {
			var tabname = d.data[i].name;
			switch (tabname) {
				case "Car":
					$scope.carinfodata = d.data[i].value[0];
					break;
				case "CarPic":
					$scope.carinfoimg = d.data[i].value;
					break;
				case "TestReportList":
					ReportPageList = d.data[i].value;
					break;
				case "Test_Report":
					$scope.treportdata = d.data[i].value[0];
					break;
				case "Test_ReportDetail":
					$scope.ReportDetail = d.data[i].value;
					ReportDetail = d.data[i].value;
					break;
				case "Test_ReportCarSurfaceCase":
					SurfaceCase = d.data[i].value;
					break;
				default:
					break;
			}
		}

		if ($scope.carinfodata.AllianceCode == null || $scope.carinfodata.AllianceCode == "") {
			$scope.carinfodata.role = "个人";
		} else {
			$scope.carinfodata.role = "商家";
		}

		if ($scope.carinfoimg == undefined) {
			$scope.carinfoimg = [{
				CarNo: $scope.carinfodata.CarNo,
				CarPicID: "",
				IsDeleted: "False",
				PicAddr: $scope.carinfodata.HomePicID,
			}, {
				CarNo: $scope.carinfodata.CarNo,
				CarPicID: "",
				IsDeleted: "False",
				PicAddr: $scope.carinfodata.HomePicID,
			}];
		}

		$scope.carimglist = [];
		if ($scope.carinfoimg != undefined) {
			var thumbhtml = "";
			var count = 0;
			//			thumbhtml += "<div class=\"mui-slider-item mui-slider-item-duplicate\">";
			//			thumbhtml += "<a href=\"javascript:;\"><img data-img=\"http://192.168.0.218/" + $filter('bigimg')($scope.carinfodata.HomePicID) + "\" src='http://192.168.0.218/" + $scope.carinfodata.HomePicID + "'></a>";
			//			thumbhtml += "</div>";
			//			thumbhtml += "<div class=\"mui-slider-item\">";
			//			thumbhtml += "<a href=\"javascript:;\"><img data-img=\"http://192.168.0.218/" + $filter('bigimg')($scope.carinfodata.HomePicID) + "\" src='http://192.168.0.218/" + $scope.carinfodata.HomePicID + "'></a>";
			//			thumbhtml += "</div>";
			for (var i = 0, ln = $scope.carinfoimg.length - 1; i <= ln; i++) {
				//				thumbhtml += "<div class=\"mui-slider-item\">";
				//				thumbhtml += "<a href=\"javascript:;\"><img data-img=\"http://192.168.0.218/" + $filter('bigimg')($scope.carinfoimg[i].PicAddr) + "\" src='http://192.168.0.218/" + $scope.carinfoimg[i].PicAddr + "'></a>";
				//				thumbhtml += "</div>";
				if (i < 6) {
					$scope.carimglist[i] = $scope.carinfoimg[i];
				}
				count++;
			}
			//			thumbhtml += "<div class=\"mui-slider-item mui-slider-item-duplicate\">";
			//			thumbhtml += "<a href=\"javascript:;\"><img data-img=\"http://192.168.0.218/" + $filter('bigimg')($scope.carinfodata.HomePicID) + "\" src='http://192.168.0.218/" + $scope.carinfodata.HomePicID + "'></a>";
			//			thumbhtml += "</div>";
			$scope.imgcount = count;
			//$("#data-info-thumb").html(thumbhtml);
		}

		if (SurfaceCase != undefined) {

			for (var k in SurfaceCase) {
				if (SurfaceCase[k].ProblemFlag == 1 && SurfaceCase[k].X != undefined) {
					$("#guacha").append("<div class='e_guacha' style=\"left:" + (SurfaceCase[k].X / 1.65) + "px; top:" + (SurfaceCase[k].Y / 1.65) + "px;\"></div>");
				}
				if (SurfaceCase[k].ProblemFlag == 2 && SurfaceCase[k].X != undefined) {
					$("#guacha").append("<div class='e_pengzhuang' style=\"left:" + (SurfaceCase[k].X / 1.65) + "px; top:" + (SurfaceCase[k].Y / 1.65) + "px;\"></div>");
				}
			}
		}

		var tj = {
			//排除重大碰撞
			zdpzt: 18,
			zdpzzc: 18,
			zdpzwt: 0,
			//排除泡水
			pst: 8,
			pszc: 8,
			pswt: 0,
			//排除火烧
			hst: 3,
			hszc: 3,
			hswt: 0,
			//外观修复检查
			xht: 51,
			xhzc: 51,
			xhwt: 0,
			//外观缺陷检查
			wgqxt: 34,
			wgqxzc: 34,
			wgqxwt: 0,
			//内饰缺陷检查
			nsqxt: 29,
			nsqxzc: 29,
			nsqxwt: 0,

			//安全胎纹深度
			aqtwt: 4,
			aqtwzc: 4, //正常项
			aqtwwt: 0, //问题项
			//刹车片
			aqscpt: 4,
			aqscpzc: 4, //正常项
			aqscpwt: 0, //问题项
			//液位
			aqywt: 5,
			aqywzc: 5, //正常项
			aqywwt: 0, //问题项

			//安全系统检测
			aqt: 7,
			aqzc: 7, //正常项
			aqwt: 0, //问题项
			//电子设备检测
			dzt: 17,
			dzzc: 17, //正常项
			dzwt: 0, //问题项
			//发动机舱
			fdt: 8,
			fdzc: 8, //正常项
			fdwt: 0, //问题项

			//设备检测统计
			sbt: 27,
			sbzc: 27, //正常项
			sbwt: 0, //问题项

			//驾驶检测统计
			jsjct: 17,
			jsjczc: 17,
			jsjcwt: 0

		}

		if (ReportDetail != undefined) {

			var rd = "";

			for (var k in ReportDetail) {

				rd = parseInt(ReportDetail[k].AbnormalColumn);
				if (ReportDetail[k].Description != "无") {
					if (rd <= 18) {
						$("#accident-" + rd).removeClass("gcc_" + rd);
						$("#accident-" + rd).addClass("acc_" + rd);
						tj.zdpzwt++;
					} else if (19 <= rd && rd <= 28) {
						//排除泡水
						tj.pswt++;
					} else if (29 <= rd && rd <= 31) {
						tj.hswt++;
					} else if (32 <= rd && rd <= 44) {
						$("#report-" + rd).css("height", parseInt(100 - ReportDetail[k].Param1) + "%");
					} else if (47 <= rd && rd <= 63) {
						tj.jsjcwt++;
					} else if (64 <= rd && rd <= 88) {
						if (parseInt(ReportDetail[k].Param1) == 2) {
							tj.wgqxwt++;
						} else {
							tj.xhwt++;
						}
					} else if (89 <= rd && rd <= 90) {
						tj.nsqxwt++;
					} else if (90 < rd && rd < 98) {
						tj.aqwt++;
						tj.sbwt++;
					} else if (97 < rd && rd < 115) {
						tj.dzwt++;
						tj.sbwt++;
					} else if (114 < rd && rd < 123) {
						tj.fdwt++;
						tj.sbwt++;
					}
				}

				if (rd < 32 || rd > 46) {

					if (64 <= rd && rd <= 88) {
						if (parseInt(ReportDetail[k].Param1) == 2) {
							$("#AIcheck_" + rd).addClass("carAIGH_" + rd);
						} else {
							$("#AIcheck_" + rd).addClass("carAIblue_" + rd);
						}
					} else {
						if (parseInt(ReportDetail[k].Flag) == "0" && ReportDetail[k].Description == "无") {
							$("#report-" + rd).addClass("report-check-wu");
						} else {
							$("#report-" + rd).addClass("report-check-no");
						}
					}
				}

			}
			tj.zdpzzc = tj.zdpzt - tj.zdpzwt;
			tj.pszc = tj.pst - tj.pswt;
			tj.hszc = tj.hst - tj.hswt;
			tj.xhzc = tj.xht - tj.xhwt;
			tj.wgqxzc = tj.wgqxt - tj.wgqxwt;
			tj.nsqxzc = tj.nsqxt - tj.nsqxwt;

			tj.aqzc = tj.aqt - tj.aqwt;
			tj.dzzc = tj.dzt - tj.dzwt;
			tj.fdzc = tj.fdt - tj.fdwt;

			//驾驶检测统计
			tj.jsjczc = tj.jsjct - tj.jsjcwt;

		}

		$scope.report_tj = tj;
		$scope.AppraiserFlag_1 = {
			backgroundImage: 'url(./images/shangjia-1.png)'
		}
		$scope.AppraiserFlag_2 = {
			backgroundImage: 'url(./images/pinggushi-1.png)'
		}
		$scope.AppraiserFlag_3 = {
			backgroundImage: 'url(./images/chetongxiang-1.png)'
		}
		switch (parseInt($scope.carinfodata.AppraiserFlag)) {
			case 1:
				$scope.AppraiserFlag_1 = {
					backgroundImage: 'url(./images/shangjia-2.png)',
					color: '#ff6a00'
				}
				break;
			case 2:
				$scope.AppraiserFlag_2 = {
					backgroundImage: 'url(./images/pinggushi-2.png)',
					color: '#ff6a00'
				}
				break;
			case 3:
				$scope.AppraiserFlag_3 = {
					backgroundImage: 'url(./images/chetongxiang-2.png)',
					color: '#ff6a00'
				}
				break;
			default:
				break;
		}


	});

	$scope.buy = function() {
		if (!$rootScope.user) {
			$rootScope.LOGIN();
		} else {
			var btnArray = ['是', '否'];

			mui.confirm('你确认购买该车吗？', '购车确认', btnArray, function(e) {
				if (e.index == 0) {
					var data = {
						CarNo: $scope.CarNo
					}
					ResourceService.getFunServer('submitorder', data, 'post').then(function(data) {
						if (data.status == 1) {
							mui.toast('订单提交成功', function() {
								$rootScope.state.go('buyorder')
							})
						} else {
							mui.toast(data.message)
						}
					})
				}
			})

		}
	}
}])

.controller('ViewReportCtrl', ['$scope', '$rootScope','$anchorScroll', 'ResourceService', function($scope, $rootScope,$anchorScroll, ResourceService) {
	var ReportCode = $rootScope.stateParams.ReportCode;
	if (ReportCode == "" || ReportCode == undefined || ReportCode == null) {
		console.log("无传递检测报告编号");
		return false;
	};

	var obj = {
		'TestReportCode': ReportCode
	};


	ResourceService.getFunServer('GetTestReportWithCode', obj, 'get').then(function(d) {
		var ReportDetail;
		var SurfaceCase;

		if (d.data == undefined || d.data == "") {
			return "";
		}

		for (var i = 0, ln = d.data.length; i < ln; i++) {
			var tabname = d.data[i].name;
			switch (tabname) {
				case "Car":
					$scope.carinfodata = d.data[i].value[0];
					break;
				case "TestReportList":
					ReportPageList = d.data[i].value;
					break;
				case "Test_Report":
					$scope.treportdata = d.data[i].value[0];
					break;
				case "Test_ReportDetail":
					ReportDetail = d.data[i].value;
					break;
				case "Test_ReportCarSurfaceCase":
					SurfaceCase = d.data[i].value;
					break;
				default:
					break;

			}
		}

		if (SurfaceCase != undefined) {
			for (var k in SurfaceCase) {
				if (SurfaceCase[k].ProblemFlag == 1 && SurfaceCase[k].X != undefined) {
					$("#guacha").append("<div class='e_guacha' style=\"left:" + (SurfaceCase[k].X / 1.65) + "px; top:" + (SurfaceCase[k].Y / 1.65) + "px;\"></div>");
				}
				if (SurfaceCase[k].ProblemFlag == 2 && SurfaceCase[k].X != undefined) {
					$("#guacha").append("<div class='e_pengzhuang' style=\"left:" + (SurfaceCase[k].X / 1.65) + "px; top:" + (SurfaceCase[k].Y / 1.65) + "px;\"></div>");
				}
			}
		}

		var tj = {
			//排除重大碰撞
			zdpzt: 18,
			zdpzzc: 18,
			zdpzwt: 0,
			//排除泡水
			pst: 8,
			pszc: 8,
			pswt: 0,
			//排除火烧
			hst: 3,
			hszc: 3,
			hswt: 0,
			//外观修复检查
			xht: 51,
			xhzc: 51,
			xhwt: 0,
			//外观缺陷检查
			wgqxt: 34,
			wgqxzc: 34,
			wgqxwt: 0,
			//内饰缺陷检查
			nsqxt: 29,
			nsqxzc: 29,
			nsqxwt: 0,

			//安全系统检测
			aqt: 7,
			aqzc: 7, //正常项
			aqwt: 0, //问题项
			//电子设备检测
			dzt: 17,
			dzzc: 17, //正常项
			dzwt: 0, //问题项
			//发动机舱
			fdt: 8,
			fdzc: 8, //正常项
			fdwt: 0, //问题项

			//设备检测统计
			sbt: 27,
			sbzc: 27, //正常项
			sbwt: 0, //问题项

			//驾驶检测统计
			jsjct: 17,
			jsjczc: 17,
			jsjcwt: 0

		};

		if (ReportDetail != undefined) {

			var rd = "";

			for (var k in ReportDetail) {

				rd = parseInt(ReportDetail[k].AbnormalColumn);
				if (rd <= 18) {
					$("#accident-" + rd).removeClass("gcc_" + rd);
					$("#accident-" + rd).addClass("acc_" + rd);
					tj.zdpzwt++;
				} else if (19 <= rd && rd <= 28) {
					//排除泡水
					tj.pswt++;
				} else if (29 <= rd && rd <= 31) {
					tj.hswt++;
				} else if (32 <= rd && rd <= 44) {
					$("#report-" + rd).css("height", parseInt(100 - ReportDetail[k].Param1) + "%");
				} else if (47 <= rd && rd <= 63) {
					tj.jsjcwt++;
				} else if (64 <= rd && rd <= 88) {
					if (parseInt(ReportDetail[k].Param1) == 2) {
						tj.wgqxwt++;
					} else {
						tj.xhwt++;
					}
				} else if (89 <= rd && rd <= 90) {
					tj.nsqxwt++;
				} else if (90 < rd && rd < 98) {
					tj.aqwt++;
					tj.sbwt++;
				} else if (97 < rd && rd < 115) {
					tj.dzwt++;
					tj.sbwt++;
				} else if (114 < rd && rd < 123) {
					tj.fdwt++;
					tj.sbwt++;
				}

				if (rd < 32 || rd > 46) {

					if (64 <= rd && rd <= 88) {
						if (parseInt(ReportDetail[k].Param1) == 2) {
							$("#AIcheck_" + rd).addClass("carAIGH_" + rd);
						} else {
							$("#AIcheck_" + rd).addClass("carAIblue_" + rd);
						}
					} else {
						$("#report-" + rd).addClass("report-check-no");
					}
				}

			}
			tj.zdpzzc = tj.zdpzt - tj.zdpzwt;
			tj.pszc = tj.pst - tj.pswt;
			tj.hszc = tj.hst - tj.hswt;
			tj.xhzc = tj.xht - tj.xhwt;
			tj.wgqxzc = tj.wgqxt - tj.wgqxwt;
			tj.nsqxzc = tj.nsqxt - tj.nsqxwt;

			tj.aqzc = tj.aqt - tj.aqwt;
			tj.dzzc = tj.dzt - tj.dzwt;
			tj.fdzc = tj.fdt - tj.fdwt;

			//驾驶检测统计
			tj.jsjczc = tj.jsjct - tj.jsjcwt;

		}

		$scope.report_tj = tj;

	});



}])


//委托评估列表

.controller('evaluationlistCtrl', ['$scope', '$rootScope', 'ResourceService', 'LocalStorageService', function($scope, $rootScope, ResourceService, LocalStorageService) {

	//分页条数
	$scope.pagerConfig = {
		pageSize: 5,
		total: 0,
		callback: null
	}
	$scope.list = [];
	//评估师列表
	$scope.getList = function(pageNo) {
		pageNo = pageNo || 1;
		var obj = {
			CarNo: $rootScope.stateParams.CarNo,
			BrandID: $rootScope.stateParams.BrandID,
			SeriesID: '0',
			PageNo: pageNo
		};

		ResourceService.getFunServer('SearchAppraiserWithSkill', obj, 'POST').then(function(data, header) {
			var d = data.data;
			if (d.total) {
				$scope.list = d.rows.Appraiser;
				$scope.AppraiserSkill = d.rows.AppraiserSkill;
				$scope.getTeChang = function(AppraiserCode) {
					if ($scope.AppraiserSkill == undefined || $scope.AppraiserSkill == null) {
						return '';
					}

					var retdata = "";
					var k = 0;
					for (var j = 0, jln = $scope.AppraiserSkill.length; j < jln; j++) {
						if ($scope.AppraiserSkill[j].AppraiserCode == AppraiserCode) {
							if ($scope.AppraiserSkill[j].BrandName != null) {
								retdata += "" + $scope.AppraiserSkill[j].BrandName + "、";
							}
							k++;
							if (k > 10) {
								break;
							}
						}
					}
					return retdata;
				}
			}
			$scope.pagerConfig.total = d.total;
			$scope.pagerConfig.callback = $scope.getList;
			$scope.pager(pageNo);
		}, function(data, header) {

		})
	};

	//获取车源基本信息
	var g_obj = {
		CarNo: $rootScope.stateParams.CarNo
	};

	ResourceService.getFunServer('GetCar', g_obj, 'get').then(function(d) {
		if (d.status) {
			for (var i = 0, ln = d.data.length; i < ln; i++) {
				var tabname = d.data[i].name;
				switch (tabname) {
					case "Car":
						$scope.carinfodata = d.data[i].value[0];
						break;
					case "CarPic":
						$scope.CarPic = d.data[i].value;
						break;
					default:
						break;
				}
			}
		}
	});

	$scope.viewevaluation = function(obj) {
		$("#evalist").hide();
		$("#evainfo").show();
		//console.log(obj);
		$scope.evaluationdata = obj;
	}

	$scope.closeview = function() {
		$("#evalist").show();
		$("#evainfo").hide();
	}

	$scope.gotobuy = function(obj) {
		//console.log(obj);

		var eprice = $("#eva_price").val();
		if (eprice > 0) {
			//提交委托订单并跳微信支付页面
			if ($rootScope.stateParams.CarNo == "") {
				mui.toast('参数错误，将自动返回首页！');
				//window.location.href = '../';
				return false;
			}

			var postdata = {
				"CarNo": $rootScope.stateParams.CarNo,
				"AppraiserFee": eprice,
				"OrderDescription": "委托信息",
				"OrderFlag": 1,
				"AppraiserCode": obj.AppraiserCode
			};
			ResourceService.getFunServer('TestEntrust', postdata, 'post').then(function(d) {
				if (d.status == 1) {
					mui.toast('提交订单成功！正在跳转到微信支付！')
					window.location.href = '../WxPay/JsApiPayPage.aspx';
				} else {
					mui.toast(d.message || '提交订单失败了！')
				}
			});

		} else {
			mui.toast('请填写评估费用金额');
		}
	}

	$scope.toctx = function() {

		var btnArray = ['是', '否'];

		mui.confirm('你确认提交委托请求吗？', '委托请求', btnArray, function(e) {
			if (e.index == 0) {
				var data = {
					Carno: $rootScope.stateParams.CarNo
				};
				ResourceService.getFunServer('CarEvalutionRequest', data, 'post').then(function(d) {
					if (d.status == 1) {
						mui.toast('提交委托金牌评估师成功！请等待评估师和你联系！')
					} else {
						mui.toast(d.message || '访问出错了，请刷新试下吧！')
					}
				});
			}
		})
	}

}])

.controller('evalorderCtrl', ['$scope', '$rootScope', 'ResourceService', 'LocalStorageService', function($scope, $rootScope, ResourceService, LocalStorageService) {

	$scope.edata = LocalStorageService.getStorage("eval_order");

	if ($scope.edata.CarNo == "") {
		mui.toast('数据错误，请刷新页面，若无法继续请重新下单！');
		return false;
	}

	//获取车源基本信息
	var g_obj = {
		CarNo: $scope.edata.CarNo
	};

	ResourceService.getFunServer('GetCar', g_obj, 'get').then(function(d) {
		if (d.status) {
			for (var i = 0, ln = d.data.length; i < ln; i++) {
				var tabname = d.data[i].name;
				switch (tabname) {
					case "Car":
						$scope.carinfodata = d.data[i].value[0];
						break;
					default:
						break;
				}
			}
		}
	});

	//提交委托订单并跳微信支付页面
	$scope.ordersubmit = function() {
		if (!$scope.edata.eprice > 0) {
			return mui.toast('请输入金额')
		}
		var obj = {
			"CarNo": $scope.edata.CarNo,
			"AppraiserFee": $scope.edata.eprice,
			"OrderDescription": "委托信息",
			"OrderFlag": 1,
			"AppraiserCode": $scope.edata.AppraiserCode
		};
		ResourceService.getFunServer('TestEntrust', obj, 'post').then(function(d) {
			if (d.status == 1) {
				mui.toast('提交订单成功！请及时支付！', function() {
					window.location.href = '../WxPay/JsApiPayPage.aspx';
				})

			} else {
				mui.toast(d.message || '访问出错了，请刷新试下吧！')
			}
		});

	}
}])

.controller('creditfileCtrl', ['$scope', '$rootScope', 'ResourceService', 'LocalStorageService', function($scope, $rootScope, ResourceService, LocalStorageService) {
	//获取车主的诚信数据
	var g_obj = {
		CarNo: $rootScope.stateParams.CarNo || null
	};
	if (g_obj.CarNo == undefined || g_obj.CarNo == null) {
		mui.toast('参数错误');
		$rootScope.state.go('home');
	}
	ResourceService.getFunServer('GetCarCreditInfoByCarNo', g_obj, 'get').then(function(d) {
		if (d.status && d.data[0] != null) {
			$scope.datainfo = d.data[0];
		}
	});
}])

.controller('u_eval_listCtrl', ['$scope', '$rootScope', 'ResourceService', 'LocalStorageService', function($scope, $rootScope, ResourceService, LocalStorageService) {

	(function($) {
		$.ready(function() {
			//循环初始化所有下拉刷新，上拉加载。
			$.each(document.querySelectorAll('.dui-update-list'), function(index, pullRefreshEl) {
				$(pullRefreshEl).pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							setTimeout(function() {
								$scope.getList(1);
								self.endPullDownToRefresh();
							}, 1000);
						}
					}
				});
			});
		});
	})(mui, window, document);

	angular.element(document).ready(function() {
		var slider = mui("#slider");
		slider.slider();
	});


	var uid = $rootScope.user.Userid; //'20160112151806084238F254E9B124B6';

	if (!uid) {
		return '';
	}

	$scope.history = '0';

	//分页条数
	$scope.pagerConfig = {
		pageSize: 20,
		total: 0,
		callback: null
	}
	$scope.list = [];
	$scope.historylist = {};
	//获取会员委托订单
	$scope.getList = function(pageNo) {
		var obj = {};
		if ($scope.history == '1') {
			obj = {
				UserID: uid,
				pageNo: pageNo,
				pageNum: $scope.pagerConfig.pageSize,
				history: 1
			}
		} else {
			obj = {
				UserID: uid,
				pageNo: pageNo,
				pageNum: $scope.pagerConfig.pageSize
			}
		}

		ResourceService.getFunServer('UserGetOrderList', obj, 'post').then(function(data, header) {
			if (data.status) {
				if (data.data.total) {
					if ($scope.history == '1') {
						$scope.historylist = data.data.rows;
					} else {
						$scope.list = data.data.rows;
					}
				}
			}
			$scope.pagerConfig.total = data.total;
			$scope.pagerConfig.callback = $scope.getList;
			$scope.pager(pageNo);
		}, function(data, header) {

		})
	}

	$scope.ishistory = function(check) {
		//是否切换查询历史记录
		console.log(check);
		if (check == true) {
			$scope.history = '1';
		} else {
			$scope.history = '0';
		}

		$scope.getList(1);
	}

	$scope.delcomfirm = function(param) {
		var btnArray = ['是', '否'];
		if (param == undefined) {
			mui.toast('操作失败！');
			return false;
		}
		mui.confirm('你确认撤销该检测请求订单？', '申请撤销', btnArray, function(e) {
			if (e.index == 0) {
				ResourceService.getFunServer('UserRevoke', {
					AppraiserOrderCode: param.AppraiseOrderCode
				}, 'get').then(function(data, header) {
					if (data.status) {
						mui.toast('提交申请成功，请等待审核结果！');
						$scope.getList(1);
					}
				}, function(data, header) {

				})
			}
		})
	}

	$scope.goto_evaluate = function(params) {
		var obj = {
			title: '委托人评价',
			data: params,
			type: 2
		}
		LocalStorageService.setStorage("evaluatedata", obj);
		$rootScope.state.go('evaluate');
	}

}])

.controller('appr_eval_listCtrl', ['$scope', '$rootScope', 'ResourceService', 'LocalStorageService', function($scope, $rootScope, ResourceService, LocalStorageService) {
	//下拉事件
	(function($) {
		$.ready(function() {
			//循环初始化所有下拉刷新，上拉加载。
			$.each(document.querySelectorAll('.dui-update-list'), function(index, pullRefreshEl) {
				$(pullRefreshEl).pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							setTimeout(function() {
								$scope.getList(1);
								self.endPullDownToRefresh();
							}, 1000);
						}
					}
				});
			});
		});
	})(mui, window, document);

	var AppraiserCode = $rootScope.user.AppraiserCode; //'PGS-QBO3144';

	if (!AppraiserCode) {
		return '';
	}

	$scope.history = '0';

	//分页条数
	$scope.pagerConfig = {
		pageSize: 20,
		total: 0,
		callback: null
	}
	$scope.list = [];
	$scope.historylist = {};
	//获取会员委托订单
	$scope.getList = function(pageNo) {
			var obj = {};
			if ($scope.history == '1') {
				obj = {
					AppraiserCode: AppraiserCode,
					pageNo: pageNo,
					pageNum: $scope.pagerConfig.pageSize,
					history: 1
				}
			} else {
				obj = {
					"AppraiserCode": AppraiserCode,
					pageNo: pageNo,
					pageNum: $scope.pagerConfig.pageSize
				}
			}

			ResourceService.getFunServer('AppraiserGetOrderList', obj, 'post').then(function(data, header) {
				if (data.status > 0) {
					for (var i = 0, ln = data.data.length; i < ln; i++) {
						var tabname = data.data[i].name;
						switch (tabname) {
							case "Car":
								$scope.carinfodata = data.data[i].value;
								break;
							case "AppraiserOrder":
								$scope.AppraiserOrder = data.data[i].value;
								break;
							default:
								break;
						}
					}

					var d = $scope.AppraiserOrder;
					var c = $scope.carinfodata;

					for (var i = 0, ln = d.rows.length; i < ln; i++) {
						for (var k = 0, kln = c.rows.length; k < kln; k++) {
							if (c.rows[k].CarNo == d.rows[i].CarNo) {
								d.rows[i].cardata = c.rows[k];
								break;
							}
						}

					}
					if ($scope.history == '1') {
						$scope.historylist = d.rows;
					} else {
						$scope.list = d.rows;
					}

					$scope.pagerConfig.total = d.total;
					$scope.pagerConfig.callback = $scope.getList;
					$scope.pager(pageNo);
				} else {
					//$scope.AppraiserOrder = {};
					//mui.toast(data.message);
				}

			}, function(data, header) {

			})
		}
		//切换历史记录
	$scope.ishistory = function(check) {
			//是否切换查询历史记录
			if (check == true) {
				$scope.history = '1';
			} else {
				$scope.history = '0';
			}

			$scope.getList(1);
		}
		//申请撤销
	$scope.delcomfirm = function(param) {
			var btnArray = ['是', '否'];
			if (param == undefined) {
				mui.toast('操作失败！');
				return false;
			}
			mui.confirm('你确认撤销该检测请求订单？', '申请撤销', btnArray, function(e) {
				if (e.index == 0) {
					ResourceService.getFunServer('UserRevoke', {
						AppraiserOrderCode: param.AppraiseOrderCode
					}, 'get').then(function(data, header) {
						if (data.status) {
							mui.toast('提交申请成功，请等待审核结果！');
							$scope.getList(1);
						}
					}, function(data, header) {

					})
				}
			})
		}
	//接单
	$scope.jiedansubmit = function(param) {
		var btnArray = ['是', '否'];
		if (param == undefined) {
			mui.toast('操作失败！');
			return false;
		}

		var obj = {
			"AppraiseOrderCode": param.AppraiseOrderCode,
			"AppraiserFee": param.AppraiserFee
		}
		mui.confirm('你确认接下此委托订单？', '接单', btnArray, function(e) {
			if (e.index == 0) {
				ResourceService.getFunServer('AppraiserAccept', obj, 'post').then(function(data, header) {
					if (data.status) {
						mui.toast('您已接单，请尽快安排检测！');
						$scope.getList(1);
					}
				}, function(data, header) {

				})
			}
		})
	}
	
	//评估师评价
	$scope.goto_evaluate = function(params) {
		var obj = {
			title: '评估师评价',
			data: params,
			type: 1
		}
		LocalStorageService.setStorage("evaluatedata", obj);

		$rootScope.state.go('evaluate');
	}
	
	
	//填写检测报告
    $scope.addreport = function(obj) {
		var flowdata = {
			"flowFlag": "weituo",
			"isPingGu": false,
			"backurl": "cargather",
			"cardata": obj,
			"TestReport":""
		};
		LocalStorageService.setStorage("flowdata",flowdata);
		window.location.href="./report.html#/addreport";
		//$rootScope.state.go('addreport');
	}

}])


.controller('EvaluateCtrl', ['$scope', '$rootScope', 'ResourceService', 'LocalStorageService', function($scope, $rootScope, ResourceService, LocalStorageService) {
	//通用评价

	var ed = LocalStorageService.getStorage("evaluatedata");
	if (!ed) {
		return false;
	}
	$scope.evaluatetitle = ed.title;
	$scope.evaluatedata = ed.data;

	var type = ed.type;

	//给评估师评价
	$scope.evaluatesubmit = function() {
		var btnArray = ['是', '否'];
		mui.confirm('你确认提交评价？', '提交评价', btnArray, function(e) {
			if (e.index == 0) {
				if (type == 2) {
					//给评估师评价
					var params = {
						AppraiseOrderCode: ed.data.AppraiseOrderCode,
						AppraiserGiveScore: $scope.UserGiveScore || 5,
						UserFeedback: $scope.UserFeedback
					}

					ResourceService.getFunServer('AppraiserFeedBack', params, 'post').then(function(data) {
						if (data.status == 1) {
							mui.toast('评价成功', function() {
								$rootScope.state.go('u_eval_list');
							})
						} else {
							mui.toast(data.message);
						}
					})
				} else {
					//给委托人评价
					var params = {
						AppraiseOrderCode: ed.data.AppraiseOrderCode,
						UserGiveScore: $scope.UserGiveScore || 5,
						UserFeedback: $scope.UserFeedback
					}

					ResourceService.getFunServer('UserFeedBack', params, 'post').then(function(data) {
						if (data.status == 1) {
							mui.toast('评价成功', function() {
								$rootScope.state.go('appr_eval_list');
							})
						} else {
							mui.toast(data.message);
						}
					})
				}

				//console.log(params);
			}
		})


	}
}])

angular.element(document).ready(function() {
	var slider = mui("#slider");
	slider.slider();
});