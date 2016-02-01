angular.module('CTXReport', ['ui.router', 'ngTouch', 'CTXReportServices', 'CTXReportCtrl']).config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise('/home');
	//access访问权限,0未不限制，1为需登录
	$stateProvider.state('addreport', {
		url: '/addreport',
		templateUrl: 'partials/addreport.html',
		controller: 'addreportCtrl',
		access: 0,
		action: 'admin'
	}).state('404', {
		url: '/404',
		templateUrl: 'partials/404.html',
		controller: '',
		access: 0,
		action: 'home'
	});
}]).run(['$rootScope', '$state', '$stateParams', 'LocalStorageService', function($rootScope, $state, $stateParams, LocalStorageService) {
	$rootScope.HOST = window.location.protocol + '//' + window.location.host;
	$rootScope.PATH = $rootScope.HOST
	$rootScope.state = $state;
	$rootScope.stateParams = $stateParams;
	$rootScope.ACTION = 'home'
}])


angular.module("CTXReportCtrl", []).controller('addreportCtrl', ['$scope', '$rootScope', 'LocalStorageService', 'CarService', function($scope, $rootScope, LocalStorageService, CarService) {
	//获取车主的诚信数据
	//初始化页面默认显示数据
	$scope.ReportData = {}
	$scope.ReportData.version = "v1.0";
	$scope.ReportData.report = {};

	$scope.CarRate = "95";
	$scope.CarRateA = "A";

	//$scope.evr_data.AppraiserName = $rootScope.user.UserName;
	//$scope.evr_data.NowTime = Date;

	//选择基本问题项
	$scope.ARSelect = function(divid) {
			var dv = $("#report-" + divid).attr("data-value");
			switch (dv) {
				case "0": //0为正常
					$("#report-" + divid).removeClass("report-check-no");
					$("#report-" + divid).removeClass("report-check-wu");
					$("#report-" + divid).attr("data-value", "1");
					delete $scope.ReportData.report[divid];

					if (divid <= 18) {
						$("#accident-" + divid).removeClass("acc_" + divid);
						$("#accident-" + divid).removeClass("gcc_" + divid);
						$("#accident-" + divid).addClass("gcc_" + divid);
					}
					break;
				case "1": //1为异常
					if (divid <= 18) {
						$("#accident-" + divid).removeClass("gcc_" + divid);
						$("#accident-" + divid).addClass("acc_" + divid);
					}
					if (divid < 64) {
						$("#report-" + divid).attr("data-value", "0");
					} else {
						$("#report-" + divid).attr("data-value", "2");
					}
					$("#report-" + divid).addClass("report-check-no");
					$scope.ReportData.report[divid] = {
						"AbnormalColumn": divid,
						"Flag": 1,
						"Description": "缺陷"
					};
					break;
				case "2": //2为无
					$("#report-" + divid).removeClass("report-check-no");
					$("#report-" + divid).addClass("report-check-wu");
					$("#report-" + divid).attr("data-value", "0");

					$scope.ReportData.report[divid] = {
						"AbnormalColumn": divid,
						"Flag": 0,
						"Description": "无"
					};
					break;
				default:
					break;
			}
		}
		//选择外观内饰
	$scope.changeAI = function(divid) {
		var dvAI = $("#AIcheck_" + divid).attr("data-value");

		switch (dvAI) {
			case "0": //0为正常
				$("#AIcheck_" + divid).removeClass("carAIGH_" + divid);
				$("#AIcheck_" + divid).removeClass("carAIblue_" + divid);
				$("#AIcheck_" + divid).attr("data-value", "1");
				delete $scope.ReportData.report[divid];
				break;
			case "1": //1为修复
				$("#AIcheck_" + divid).removeClass("carAIGH_" + divid);
				$("#AIcheck_" + divid).addClass("carAIblue_" + divid);
				$("#AIcheck_" + divid).attr("data-value", "2");
				$scope.ReportData.report[divid] = {
					"AbnormalColumn": divid,
					"Flag": "1",
					"Param1": "1",
					"Description": "修复"
				};
				break;
			case "2": //2为更换
				$("#AIcheck_" + divid).removeClass("carAIblue_" + divid);
				$("#AIcheck_" + divid).addClass("carAIGH_" + divid);
				$("#AIcheck_" + divid).attr("data-value", "0");
				$scope.ReportData.report[divid] = {
					"AbnormalColumn": divid,
					"Flag": "1",
					"Param1": "2",
					"Description": "更换"
				};
				break;
			default:
				break;
		}

	}

	//加载车辆安全数据
	$scope.treeclick = function(divid) {
		var did, dn, Desc = '',
			dh;
		for (var k = 32; k <= 44; k++) {
			did = $("#tree-" + k);
			dn = did.attr("data-name");
			Desc = '';
			dh = Math.round(did.attr("data-value"));

			if (dh >= 100 || dh < 0) {
				dh = 0;
				delete $scope.ReportData.report[dn];
			} else {
				//dh = dh + 5;
				if (dh >= 45) {
					Desc = '正常';
				} else {
					Desc = '不正常';
				}
				$scope.ReportData.report[dn] = {
					"AbnormalColumn": dn,
					"Param1": dh,
					"Description": Desc
				};
			}
		}
	}

	$scope.ARSubmit = function(cardata) {
		//读取胎压相关检测数据
		$scope.treeclick();

		//获取有问题的检测数据
		var testcode = [];
		var linshi = $scope.ReportData.report;
		for (var k in linshi) {
			testcode.push(linshi[k]);
		}

		var flowdata = LocalStorageService.getStorage("flowdata");
		if (!flowdata) {
			mui.toast('无车源数据！请重新选择要检测的车辆！',function() {
				window.location.href = '.index.html#/cargather';
			})
			return false;
		}

		//设置检测报告标记类型
		var flowFlag = flowdata.flowFlag || "";
		var EventFlag = "0";
		switch (flowFlag) {
			case "weituo":
				//委托检测  检测+评估
				EventFlag = "1";
				break;
			case "buyA":
				//交易车辆检测A  只检测不做评估
				EventFlag = "2";
				break;
			case "buyB":
				//交易车辆检测B  只检测不做评估
				EventFlag = "3";
				break;
			case "xianxia":
				//线下检测
				EventFlag = "4";
				break;
			default:
				//默认检测    只检测不做评估
				EventFlag = "0";
		}

		var nowdate = new Date().Format("yyyy-MM-dd hh:mm:ss");

		//重组要提交的相关检测报告数据
		var obj = {
			"CarNo": flowdata.cardata.CarNo,
			"CarRate": String($scope.CarRate) + $scope.CarRateA,
			"TestDescription": $("#TestDescription").val(),
			"TestTime": nowdate,
			"EventFlag": EventFlag,
			"AccidentCheckMemo": $("#TextAccidentCheckMemo").val(),
			"SecurityCheckMemo": $("#TextSecurityCheckMemo").val(),
			"ControlCheckMemo": $("#TextControlCheckMemo").val(),
			"AICheckMemo": $("#TextAICheckMemo").val(),
			"DeviceCheckMemo": $("#TextDeviceCheckMemo").val(),
			"Test_ReportCarSurfaceCase_Test_Report_TestReportCode": [],
			"Test_ReportDetail_Test_Report_TestReportCode": testcode || []
		};


		if (flowdata.isPingGu || EventFlag == "1") {
			mui.toast('委托评估暂不支持填写评估报告！', function() {
				//$rootScope.state.go('home');
				flowdata.TestReport = obj;
				LocalStorageService.setStorage("flowdata", flowdata);
				return false;
			})
		}

		if (EventFlag == "0") {
			CarService.WriteTestReport(obj).success(function(d) {
				if (d.status == 1) {
					mui.toast('填写检测报告成功！',function() {
						window.location.href = './index.html#/' + flowdata.backurl || './index.html#/home';
					})
				} else {
					mui.toast(d.message || '提交检测报告失败！');
				}
			})
		}

		if (EventFlag == "2" || EventFlag == "3") {
			var optr = {
				"report": obj,
				"orderCode": flowdata.cardata.OrderCode
			}

			CarService.OrderPostTestReport(optr).success(function(d) {
				if (d.status == 1) {
					mui.toast('填写检测报告成功！',function() {
						window.location.href = './index.html#/' + flowdata.backurl || './index.html#/home';
					})
					
				} else {
					mui.toast(d.message || '提交检测报告失败！');
				}
			})
		}
	}
	
	
	mui.init();
	mui.toast = function(_message, callback) {
		_message = (_message == undefined ? '访问出错了' : _message)
		if (mui.os.plus) {
			//默认显示在底部；
			mui.plusReady(function() {
				plus.nativeUI.toast(_message, {
					verticalAlign: 'middle'
				});
			});
		} else {
			var toast = document.createElement('div');
			toast.classList.add('mui-toast-container');
			toast.innerHTML = '<div class="' + 'mui-toast-message animated bounceInDown ' + '"><h6>提示</h6>' + _message + '</div>';
			document.body.appendChild(toast);
			setTimeout(function() {
				toast.querySelector('.mui-toast-message').classList.add('fadeOutDown')
				document.body.removeChild(toast);
				if (mui.isFunction(callback)) {
					callback()
				}
			}, 2000);
		}
	}

}])


angular.module('CTXReportServices', []).factory('CarService', ['$http', '$rootScope', function($http, $rootScope) {
	return {
		release: function(data) {
			return $http.post($rootScope.HOST + '/common/car/Publish', data)
		},
		edit: function(data) {
			return $http.post($rootScope.HOST + '/common/car/updatecar', data)
		},
		carsellcount: function() {
			return $http.get($rootScope.HOST + '/Common/car/GetSellingCount')
		},
		WriteTestReport: function(data) {
			return $http.post($rootScope.HOST + '/Alliance/TestReport/WriteTestReport', data)
		},
		OrderPostTestReport: function(data) {
			return $http.post($rootScope.HOST + '/Order/OrderPostTestReport', data)
		}
	}

}]).factory('LocalStorageService', function() {
	return {
		setStorage: function(name, val) {
			localStorage.setItem(name, JSON.stringify(val))
		},
		getStorage: function(name) {
			return JSON.parse(localStorage.getItem(name));
		},
		removeStorage: function(name) {
			localStorage.removeItem(name)
		}
	}
});


//格式话时间日期
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}