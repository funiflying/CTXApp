/*
 * @author:dekent
 * @date:2015-12-28
 * @version:1.0.0
 */
angular.module("CTXAppCtrl", []).controller('CarInfoCtrl', ['$scope', '$rootScope', 'ResourceService', function($scope, $rootScope, ResourceService) {
	var obj = {
		CarNo:$rootScope.stateParams.CarNo
	};
	
	var cars = ResourceService.getFunServer('GetCardata',obj,'get').then(function(d) {
		var ReportDetail;
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
					$scope.SurfaceCase = d.data[i].value;
					break;
				default:
					break;
			}
		}

		if ($scope.carinfodata.DirectCode == null || $scope.carinfodata.AppraiserCode == null || $scope.carinfodata.AppraiserCode == null) {
			$scope.carinfodata.role = "个人";
		} else {
			$scope.carinfodata.role = "商家";
		}
		
		if (ReportDetail != undefined) {

					var rd = "";

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

						//刹车系统及轮胎
						//scltt:

						//启动与起步
						qdqbt: 5,
						qdqbzc: 5,
						qdqbwt: 0,

						//加速与行驶
						jsxst: 8,
						jsxszc: 8,
						jsxswt: 0,

						//减速与制动
						jszdt: 4,
						jszdzc: 4,
						jszdwt: 0

					}


					for (var k in ReportDetail) {

						rd = parseInt(ReportDetail[k].AbnormalColumn);
						if (rd <= 18) {
							//$("#accident-" + rd).addClass("acc_" + rd);
							tj.zdpzwt++;
						} else if (19 <= rd && rd <= 28) {
							//排除泡水
							tj.pswt++;
						} else if (29 <= rd && rd <= 31) {
							tj.hswt++;
						} else if (32 <= rd && rd <= 44) {
							//$("#report-" + rd).css("height", parseInt(100 - ReportDetail[k].Param1) + "%");
						} else if (47 <= rd && rd <= 51) {
							tj.qdqbwt++;
						} else if (52 <= rd && rd <= 59) {
							tj.jszdwt++;
						} else if (60 <= rd && rd <= 63) {
							tj.jsxswt++;
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
						} else if (97 < rd && rd < 115) {
							tj.dzwt++;
						} else if (114 < rd && rd < 123) {
							tj.fdwt++;
						}

//						if (rd < 32 || rd > 46) {
//
//							if (64 <= rd && rd <= 88) {
//								if (parseInt(ReportDetail[k].Param1) == 2) {
//									$("#AIcheck_" + rd).addClass("carAIGH_" + rd);
//								} else {
//									$("#AIcheck_" + rd).addClass("carAIblue_" + rd);
//								}
//							} else {
//								$("#report-" + rd).addClass("report-check-no");
//							}
//						}

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

					tj.qdqbzc = tj.qdqbt - tj.qdqbwt;
					tj.jsxszc = tj.jsxst - tj.jsxswt;
					tj.jszdzc = tj.jszdt - tj.jszdwt;

					var desc1 = "无火烧 ";
					var desc2 = "无泡水 ";
					var desc3 = "无事故";

					if (tj.zdpzwt > 0) {
						desc3 = "有事故";
					}
					if (tj.pswt > 0) {
						desc2 = "有泡水 ";
					}
					if (tj.hswt > 0) {
						desc1 = "有火烧 ";
					}

					tj.desc = desc1 + desc2 + desc3;

					$scope.report_tj = tj;

				}

		mui('#pullrefresh').scroll();
		var slider = mui("#slider");
		slider.slider();
	});

}]).controller('ViewReportCtrl', ['$scope', '$rootScope', 'ResourceService', function($scope, $rootScope, ResourceService) {
	
}])