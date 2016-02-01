/**
 * Created by ������ on 2015/12/26.
 */
angular.module("CTXAppDirective",[]).directive('filtercar',['$rootScope',function($rootScope){
    return {
        restrict: 'EA',
        transclude: true,
        link: function(scope, elem, attrs) {
            var searchvalue=$rootScope.stateParams.SearchValue||$rootScope.stateParams.Value;
            var brand=$rootScope.stateParams.BrandID;
            var price=$rootScope.stateParams.PriceID;
            var style=$rootScope.stateParams.Style;
            var series=$rootScope.stateParams.SeriesID;
            if(brand||series){
                $('.tui-filter-result').addClass('active').find('i.tui-filter-brandTxt').text(searchvalue);
            }
            if(price){
                $('.tui-filter-result').addClass('active').find('i.tui-filter-priceTxt').text(searchvalue);
            }
            if(style){
                $('.tui-filter-result').addClass('active').find('i.tui-filter-moreTxt').text(searchvalue);
            }
            //筛选类别
            mui('.tui-filter-nav').on('tap','a.tui-nav-item',function(){
                var role=$(this).attr('data-for');
                $(this).toggleClass('active');
                var active=this.classList.contains('active');
                if(active){
                    $('.tui-mask').addClass('active')
                }
                else {
                    $('.tui-mask').removeClass('active')
                }
                $('.tui-filter-type[data-role='+role+']').toggleClass('active');
                $('.tui-filter-type:not([data-role='+role+'])').removeClass('active');
                $('.tui-nav-item:not([data-for='+role+'])').removeClass('active');
                $('.tui-filter-result').removeClass('active');

            })
            //排序
            mui('.tui-filter-type[data-role=orderFilter]').on('tap','li.tui-filter-item',function(){
                var target=$(this);
                var val=target.attr('data-filter-value');
                var name=target.attr('data-filter-name')
                switch(name){
                    case 'SortUpdate':
                        scope.filter.Sort=val;
                    break;
                    case 'SortPrice':
                        if(scope.filter.Sort==1||scope.filter.Sort==-1){
                            scope.filter.Sort=-scope.filter.Sort
                        }
                        else {
                            scope.filter.Sort=val;
                        }
                        break;
                    case 'SortAge':
                        if(scope.filter.Sort==2||scope.filter.Sort==-2){
                            scope.filter.Sort=-scope.filter.Sort
                        }
                        else {
                            scope.filter.Sort=val;
                        }
                        break;
                    case 'SortMileage':
                        if(scope.filter.Sort==3||scope.filter.Sort==-3){
                            scope.filter.Sort=-scope.filter.Sort
                        }
                        else {
                            scope.filter.Sort=val;
                        }
                        break;
                    default:
                        scope.filter.Sort=0;
                }
                target.addClass('active').siblings('li.tui-filter-item').removeClass('active')
                $('.tui-mask').removeClass('active')
                $('.tui-filter-type[data-role=orderFilter]').toggleClass('active');
                $('.tui-nav-item[data-for=orderFilter]').toggleClass('active');
                scope.getList()
            });
            //品牌
            mui('.tui-filter-type[data-role=brandFilter]').on('tap','li.tui-filter-item',function(){
                var target=$(this);
                var val=target.attr('data-filter-value');
                var text=target.attr('data-text');
                scope.filter.Brand=val;
                target.addClass('active').siblings('li.tui-filter-item').removeClass('active')
                $('.tui-mask').removeClass('active')
                $('.tui-filter-type[data-role=brandFilter]').toggleClass('active');
                $('.tui-nav-item[data-for=brandFilter]').toggleClass('active');
                $('.tui-filter-result').addClass('active').find('i.tui-filter-brandTxt').text(text)
                scope.getList()
            })
            //区域
            mui('.tui-filter-type[data-role=areaFilter]').on('tap','li.tui-filter-item',function(){
                var val=$(this).attr('data-filter-value');
                var text=$(this).attr('data-text');
                scope.filter.IncludeFlag=val;
                $(this).addClass('active').siblings('li.tui-filter-item').removeClass('active')
                $('.tui-mask').removeClass('active')
                $('.tui-filter-type[data-role=areaFilter]').toggleClass('active');
                $('.tui-nav-item[data-for=areaFilter]').toggleClass('active');
                $('.tui-filter-result').addClass('active').find('i.tui-filter-areaTxt').text(text)
                scope.getList()
            })
            //更多
            mui('.tui-filter-type[data-role=moreFilter]').on('tap','li.tui-filter-item',function(){

                $(this).toggleClass('active').siblings('li.tui-filter-item').removeClass('active')

            })
            mui('.tui-filter-type[data-role=moreFilter]').on('tap','li.tui-filter-item-multiple',function(){
                $(this).toggleClass('active')
            })
            //更多重置
            mui('.tui-filter-opt').on('tap','.tui-btn-default',function(){
                var target=$(this).parents('.tui-filter-type[data-role=moreFilter]').find('li.active')
                $.each(target,function(index,item){
                    var val=$(this).attr('data-filter-value');
                    var name=$(this).attr('data-filter-name');
                    scope.filter[name]=0;
                })
                $(this).parents('.tui-filter-type[data-role=moreFilter]').find('li').removeClass('active');
                scope.getList()
            })
            //确定
            mui('.tui-filter-opt').on('tap','.tui-btn-primary',function(){
                var target=$(this).parents('.tui-filter-type[data-role=moreFilter]').find('li.active')
                var c='';
                $.each(target,function(index,item){
                    var val=$(this).attr('data-filter-value');
                    var name=$(this).attr('data-filter-name');
                    var text=$(this).attr('data-text');
                    c+=text+' ';
                    scope.filter[name]=val||0;
                })
                $('.tui-mask').removeClass('active')
                $('.tui-filter-type[data-role=moreFilter]').toggleClass('active');
                $('.tui-nav-item[data-for=moreFilter]').toggleClass('active');
                $('.tui-filter-result').addClass('active').find('i.tui-filter-moreTxt').text(c)
                scope.getList()
            })
            //全部重置
            mui('.tui-filter-result').on('tap','.tui-filter-result-btn',function(){
                $('.tui-filter-result').removeClass('active').find('i').text('');
                $('.tui-filter .tui-filter-item').removeClass('active')
                scope.filter={
                    Brand: null,
                    CarYear: null,
                    Color: null,
                    Country: null,
                    DischargeStandard: null,
                    GearBox: null,
                    IsUrgent: null,
                    Mileage: null,
                    OutputVolume: null,
                    PageNo: 1,
                    PriceEnd: null,
                    PriceID: null,
                    PriceStart: null,
                    QuasiNewCar: null,
                    SearchWord: null,
                    Series: null,
                    SevenSeat: null,
                    Sort: null,
                    Style: null,
                    WomenCar: null,
                    pageNum: scope.pagerConfig.pageSize
                }
                $rootScope.state.go('carlist');
                scope.getList()
            })
        },
        templateUrl:$rootScope.PATH+'/partials/filtercar.html',
        replace: false

    }
}]).directive('brandlist',['$rootScope',function($rootScope){
    return {
        restrict: 'EA',
        transclude: true,
        link: function(scope, elem, attrs) {
            var list = document.getElementById('list');
            window.indexedList = new mui.IndexedList(list);
        },
        templateUrl:$rootScope.PATH+'/partials/brandlist.html',
        replace: false

    }
}]).directive('brandindex',['$rootScope',function($rootScope){
    return {
        restrict: 'EA',
        transclude: true,
        link: function(scope, element, attrs) {
            var elem=element[0].querySelector('.mui-bar-nav');
            mui(elem).on('tap','.mui-btn-nav',function(){
                $('.tui-mask').removeClass('active')
                $(this).parents('brandindex').removeClass('active');
            })
            var list = document.getElementById('list');
            window.indexedList = new mui.IndexedList(list);
        },
        templateUrl:$rootScope.PATH+'/partials/brandindex.html',
        replace: false

    }
}]).directive('hotbrand',['$rootScope',function($rootScope){
    return {
        restrict: 'EA',
        transclude: true,
        link: function(scope, elem, attrs) {

        },
        templateUrl:$rootScope.PATH+'/partials/hotbrand.html',
        replace: true

    }
}]).directive('pager',['$rootScope',function($rootScope){
    return{
        restrict:'EA',
        transclude:true,
        link:function(scope,element,attr){
            scope.pager=function(pageNo){
                var elem=element[0];
                $(elem).html('');
                var config= $.extend({},scope.pagerConfig);
                if(config.total==0&&document.querySelector('.tui-nolist')==null){
                    $(element[0]).before('<div class="tui-nolist"></div>')
                }
                else{
                   $('.tui-nolist').remove()
                }
                pageNo=pageNo||1
                var pageLength = (config.total % config.pageSize == 0 ? config.total / config.pageSize : Math.ceil(config.total /config.pageSize));
                if(pageLength>1){
                    var  page=  '<div class="tui-page">'+
                    '<a class="page-up">'+
                    '<span>上一页</span></a>'+
                    '<a  class="page-select-a">'+
                    '<span class="change-page">'+
                    '<span class="select-con">'+
                    '<span class="page-num"></span>'+
                    '<span class="triangle page-triangle"></span></span>'+
                    '<select name="" id="pager" class="tui-3g-page-btn">'+
                    '</select></select>'+
                    '</span></a><a class="page-down">'+
                    '<span>下一页</span></a></div>'
                     $(elem).html(page);
                     var op='';
                    for (var i= 0;i<pageLength;i++){
                        if((i+1)==pageNo){
                            op+='<option  selected value="'+parseInt(i+1)+'" >'+parseInt(i+1)+'</option>';
                        }
                        else {
                            op+='<option  value="'+parseInt(i+1)+'" >'+parseInt(i+1)+'</option>';
                        }

                    }
                    $('.tui-3g-page-btn').html(op)
                    $('.page-num').text(pageNo+'/'+pageLength);
                    if(pageLength==1){
                        $('.page-up').addClass('disable').find('span').data('page',1);
                        $('.page-down').addClass('disable').find('span').data('page',1);
                    }
                    else if (pageNo==pageLength) {
                        $('.page-down').addClass('disable');
                        $('.page-up').removeClass('disable').find('span').data('page',parseInt(pageNo)-1);
                    }
                    else if (pageNo==1) {
                        $('.page-up').addClass('disable');
                        $('.page-down').removeClass('disable').find('span').data('page',parseInt(pageNo)+1);
                    }
                    else {
                        $('.page-up').removeClass('disable').find('span').data('page',parseInt(pageNo)-1);
                        $('.page-down').removeClass('disable').find('span').data('page',parseInt(pageNo)+1);
                    }
                    mui('.tui-page').on('change','.tui-3g-page-btn',function(){
                        scope.pagerConfig.callback($(this).val())
                    });
                    mui('.page-up').on('tap','span',function(){
                        var p=$(this).data('page')||1;
                        scope.pagerConfig.callback(p)
                    });
                    mui('.page-down').on('tap','span',function(){
                        var p=$(this).data('page')||1;
                        scope.pagerConfig.callback(p)
                    });
                }
           }
          /* mui('.tui-page').on('change','.tui-3g-page-btn',function(){
               scope.pagerConfig.callback($(this).val())
           });
           mui('.page-up').on('tap','span',function(){
               var p=$(this).data('page')||1;
               scope.pagerConfig.callback(p)
           });
           mui('.page-down').on('tap','span',function(){
               var p=$(this).data('page')||1;
               scope.pagerConfig.callback(p)
           });*/
        },
        template:'',
        replace:false
    }
}]).directive('login',['$rootScope',function($rootScope){
    return{
        restrict:'EA',
        transclude:true,
        templateUrl:$rootScope.PATH+'/partials/login.html',
        replace:false,
        link:function(scope,element,attr){
            var elem=element[0].querySelector('.tui-filter-opt');
            mui(elem).on('tap','button.tui-btn-default',function(){
              $('.tui-login').removeClass('active');
              $('.tui-mask').removeClass('active');
            })
        }
    }
}]).directive('tuiLogin',['$rootScope',function(){
    return{
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            angular.element(element).on('tap',function(){
                $('.tui-login').addClass('active')
                $('.tui-mask').addClass('active');
            })
        }
    }
}]).directive('evaluate',['$rootScope',function(){
    return{
        restrict:'EA',
        replace:false,
        template:'<div class="pj-container"><span class="pj-star-icon active" val="1" >星星</span>'+
        '<span class="pj-star-icon" val="2">星星</span>'+
        '<span class="pj-star-icon" val="3">星星</span>'+
        '<span class="pj-star-icon" val="4">星星</span>'+
        '<span class="pj-star-icon" val="5">星星</span></div>',
        link:function(scope,element,attr){
            var elem=element[0].querySelector('.pj-container')
            mui(elem).on('tap','.pj-star-icon',function(){
                var val=$(this).attr('val')
                var arr= $(this).parent('.pj-container').find('.pj-star-icon');
                var name=$(this).parents('evaluate').attr('data-name');
                scope[name]=val;
                arr.each(function(index,obj){
                    var i=$(obj).attr('val');
                    if(i<val||i==val){
                        $(this).addClass('active')
                    }
                    else {
                        $(this).removeClass('active')
                    }
                })
            })
        }
    }
}]).directive('uploader',['UploaderService',function(UploaderService){
    return {
        restrict:'EA',
        template:'',
        replace:false,
        link:function(scope,element,attr){
            var ui = {
                imageList:angular.element(element)
            };
            ui.clearForm = function() {
                ui.imageList.innerHTML = '';
                ui.newPlaceholder();
            };
            ui.getFileInputArray = function() {
                return [].slice.call(ui.imageList.find('input[type="file"]'));
            };
            ui.newPlaceholder = function() {
                var fileInputArray = ui.getFileInputArray();
                if (fileInputArray &&
                    fileInputArray.length > 0 &&
                    fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
                   return;
                }
                var placeholder = document.createElement('div');
                placeholder.setAttribute('class', 'image-item-bar space');
                var fileInput = document.createElement('input');
                fileInput.setAttribute('type', 'file');
                fileInput.setAttribute('accept', 'image/*');
                if( ui.imageList.attr('multiple')) {
                    fileInput.setAttribute('multiple', 'true');
                }
                fileInput.addEventListener('change', function(event) {
                    var i=0
                    var getDataUrl=function(files){
                        var file = files[i];
                        if (file) {
                            var elem=ui.preView();
                            var flag=$(element[0]).attr('data-flag');
                            var url = webkitURL.createObjectURL(file);
                            var $img = new Image();
                            $img.onload = function() {

                            //生成比例
                            var width = $img.width,
                                    height = $img.height,
                                    scale = width / height;
                            width = parseInt(1280);
                            height = parseInt(width / scale);

                            //生成canvas
                            var $canvas = document.createElement('canvas');
                            var ctx = $canvas.getContext('2d');
                            $canvas.width=width;
                            $canvas.height=height;
                            ctx.drawImage($img, 0, 0, width, height);
                            var base64 = $canvas.toDataURL('image/jpeg',0.5);
                            elem.style.backgroundImage='url(' + base64 + ')';
                            var params={BaseCode:base64.substr(23)};
                            console.log('uploader');
                            UploaderService.uploader(params,flag).success(function(data){
                                    if(data.status==1) {
                                        $(elem).find('.mui-uploader-loading-container').remove()
                                        elem.setAttribute('data-path',data.data.replace('_Big',''))
                                    }
                            });
                             console.log('uploader');
                            i++
                            getDataUrl(files)

                        }
                        $img.src = url;
                
                        /* reader.onload = function(e) {
                                var base64 = reader.result.split(',')[1];
                                var dataUrl = 'data:image/jpg;base64,' + base64;
                                var params={BaseCode:base64};
                                elem.style.backgroundImage='url(' + dataUrl + ')';
                                UploaderService.uploader(params,flag).success(function(data){
                                    if(data.status==1) {
                                        $(elem).find('.mui-uploader-loading-container').remove()
                                        elem.setAttribute('data-path',data.data)
                                    }
                                });
                                i++
                                getDataUrl(files)
                        }
                        reader.readAsDataURL(file);*/
                        }
                    }
                    getDataUrl(this.files)
                }, false);
                placeholder.appendChild(fileInput);
                ui.imageList.append(placeholder);
            };
            ui.newPlaceholder();
            ui.preView = function() {
                var placeholder = document.createElement('div');
                placeholder.setAttribute('class', 'image-item');
                var closeButton = document.createElement('div');
                closeButton.setAttribute('class', 'image-close');
                closeButton.innerHTML = 'X';
                var loading = document.createElement('div');
                loading.classList.add('mui-uploader-loading-container');
                loading.innerHTML = '<div class="tui-uploader-rond"><div class="tui-uploader-loading"></div></div><div class="tui-uploader-load"><p>上传中</p></div>';
                closeButton.addEventListener('click', function(event) {

                    event.cancelBubble = true;
                    placeholder.remove();
                    event.stopPropagation();
                    return false;
                }, false);
                placeholder.appendChild(closeButton);
                placeholder.appendChild(loading)
                ui.imageList.append(placeholder);
                return placeholder;
            };
        }
    }
}]).directive('tuiSeries',function(){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            var elem=element[0].querySelector('ul.mui-table-view')
            mui(elem).on('tap','.tui-filter-item',function(){
                $('.tui-mask').addClass('active');
                scope.car.Brand=$(this).attr('data-filter-value');
                scope.BrandName=$(this).attr('data-text');
                $('.tui-car-text').text($(this).attr('data-text'))
                scope.getSeries();
                $(element[0]).removeClass('active');
                $('serieslist.tui-swipe-container').addClass('active  ').siblings('.tui-swipe-container').removeClass('active   fadeOutRightBig');
            })
        }
    }
}).directive('serieslist',function(){
    return {
        restrict:'EA',
        replace:false,
        template:'<header class="mui-bar mui-bar-nav tui-bar-nav">'+
        '<h1 class="mui-title">车系</h1>'+
        '<button class=" mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left"><span class="mui-icon mui-icon-left-nav"></span>返回</button>'+
        '</header><div  class="mui-indexed-list tui-filter-btnone"><div  class="mui-indexed-list-inner">'+
        '<ul class="mui-table-view">'+
        '<li class="mui-table-view-cell tui-filter-item mui-indexed-list-item" data-filter-value="{{obj.SeriesID}}"  data-text="{{obj.SeriesName}}" ng-repeat="obj in series" ><i ng-bind="obj.SeriesName"></i>'+
        '<span class="mui-navigate-right"></span></li></ul></div></div>',
        link:function(scope,element,attr){
            var elem=element[0].querySelector('.mui-bar-nav');
            mui(elem).on('tap','.mui-btn-nav',function(){
                $('.tui-mask').removeClass('active')
                $('.tui-swipe-container').removeClass('active');

            })
        }
    }
}).directive('tuiSpec',function(){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            var elem=element[0].querySelector('ul.mui-table-view')
            mui(elem).on('tap','li.tui-filter-item',function(){
                scope.car.SeriesID=$(this).attr('data-filter-value');
                scope.SeriesName=$(this).attr('data-text');
                var text=$('.tui-car-text').text()+$(this).attr('data-text');
                $('.tui-car-text').text(text);
                scope.getSpecName();
                $(element[0]).removeClass('active');
                $('speclist.tui-swipe-container').addClass('active').siblings('.tui-swipe-container').removeClass('active');
            })
        }
    }
}).directive('speclist',function(){
    return {
        restrict:'EA',
        replace:false,
        template:'<header class="mui-bar mui-bar-nav tui-bar-nav">'+
        '<h1 class="mui-title">车型</h1>'+
        '<button class=" mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left"><span class="mui-icon mui-icon-left-nav"></span>返回</button>'+
        '</header><div  class="mui-indexed-list tui-filter-btnone"><div  class="mui-indexed-list-inner">'+
        '<ul class="mui-table-view">'+
        '<li class="mui-table-view-cell tui-filter-item mui-indexed-list-item" data-filter-value="{{obj.CatalogID}}"  data-text="{{obj.SpecName}}" ng-repeat="obj in speclist" ng-bind="obj.SpecName">'+
        '</li></ul></div></div>',
        link:function(scope,element,attr){
            var elem=element[0].querySelector('ul.mui-table-view')
            var target=element[0].querySelector('.mui-bar-nav');
            mui(target).on('tap','.mui-btn-nav',function(){
                $('.tui-mask').removeClass('active');
                $('.tui-swipe-container').removeClass('active');

            })
            mui(elem).on('tap','li.tui-filter-item',function(){
                scope.car.CatalogID=$(this).attr('data-filter-value');
                scope.car.SpecName=$(this).attr('data-text');
                var text=$('.tui-car-text').text()+$(this).attr('data-text');
                $('.tui-car-text').text(text);
                $('.tui-mask').removeClass('active');
                $('.tui-swipe-container').removeClass('active');
            })
        }
    }
}).directive('selectSeries',function(){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            var elem=element[0];
            mui(elem).on('tap','.tui-car-text',function(){
                document.getElementsByTagName('body')[0].scrollTop=0;
                $('.tui-swipe-container').removeClass('fadeOutRightBig')
                $('brandindex.tui-swipe-container').addClass('active');
                $('.tui-mask').addClass('active');

            });
        }
    }
}).directive('colorlist',['$rootScope',function($rootScope){
    return {
        restrict:'EA',
        replace:false,
        templateUrl:$rootScope.PATH+'/partials/colorlist.html',
        link:function(scope,element,attr){
            var elem=element[0].querySelector('ul.mui-table-view');
            var target=element[0].querySelector('.mui-bar-nav');
            mui(target).on('tap','.mui-btn-nav',function(){
                $('.tui-mask').removeClass('active');
                $('.tui-swipe-container').removeClass('active');
            })
            mui(elem).on('tap','li.tui-filter-item',function(){
                scope.car.Color=$(this).attr('data-value');
                scope.ColorName=$(this).attr('data-text');
                $('.tui-color-text').text($(this).attr('data-text'))
                $('.tui-mask').removeClass('active');
                $('.tui-swipe-container').removeClass('active');
            })
        }
    }
}]).directive('selectColor',function(){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            document.getElementsByTagName('body')[0].scrollTop=0;
            var elem=element[0];
            mui(elem).on('tap','.tui-color-text',function(){
                $('colorlist.tui-swipe-container').addClass('active');
                $('.tui-mask').addClass('active');
            })
        }
    }
}).directive('wholesaleSwitch',['$rootScope','LocalStorageService',function($rootScope,LocalStorageService){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            var elem=element[0];
            var name=$(elem).attr('ng-model')
            mui(elem).on('tap','.mui-switch-handle',function(){
                $(elem).toggleClass('mui-active');
                scope[name]=!scope[name];
                LocalStorageService.setStorage('WholesalePrice',{WholesalePrice:scope[name]});
                $rootScope.WholesalePrice=scope[name];
            })
        }
    }
}]).directive('muiSwitch',function(LocalStorageService){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            var elem=element[0];
            var name=$(elem).attr('ng-model')
            mui(elem).on('tap','.mui-switch-handle',function(){
                $(elem).toggleClass('mui-active');
                scope[name]=!scope[name];
            })
        }
    }
}).directive('city',['$rootScope','LocalStorageService',function($rootScope,LocalStorageService){
    return{
        restrict:'E',
        replace:false,
        templateUrl:$rootScope.PATH+'/partials/city.html',
        link:function(scope,element,attr){
            var elem=element[0].querySelector('ul.mui-table-view');
            var target=element[0].querySelector('.mui-bar-nav');
            mui(target).on('tap','.mui-btn-nav',function(){
                $('.tui-mask').removeClass('active');
                $('.tui-swipe-container').removeClass('active');
            })
            mui(elem).on('tap','li.tui-filter-item',function(){
                $rootScope.CityID=$(this).attr('data-value');
                $rootScope.CityName=$(this).attr('data-text');
                LocalStorageService.setStorage('LOCALTION',{CityID:$rootScope.CityID,CityName:$rootScope.CityName});
                scope.getList();
                $('.tui-mask').removeClass('active');
                $('.tui-swipe-container').removeClass('active');
            })
        }
    }
}]).directive('selectCity',function(){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            document.getElementsByTagName('body')[0].scrollTop=0;
            var elem=element[0];
            mui(elem).on('tap','i',function(){
                $('city.tui-swipe-container').addClass('active');
                $('.tui-mask').addClass('active');
            })
        }
    }
}).directive('banklist',['$rootScope',function($rootScope){
    return {
        restrict:'EA',
        replace:false,
        templateUrl:$rootScope.PATH+'/partials/banklist.html',
        link:function(scope,element,attr){
            var elem=element[0].querySelector('ul.mui-table-view');
            var target=element[0].querySelector('.mui-bar-nav');
            mui(target).on('tap','.mui-btn-nav',function(){
                $('.tui-mask').removeClass('active');
                $('.tui-swipe-container').removeClass('active');
            })
            mui(elem).on('tap','li.tui-filter-item',function(){
                var bank=$(this).attr('data-text');
                scope.bank=bank
                $('.tui-bank-text').text(bank)
                $('.tui-mask').removeClass('active');
                $('.tui-swipe-container').removeClass('active');
            })
        }
    }
}]).directive('selectBank',function(){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            document.getElementsByTagName('body')[0].scrollTop=0;
            var elem=element[0];
            mui(elem).on('tap','.tui-bank-text',function(){
                $('banklist.tui-swipe-container').addClass('active');
                $('.tui-mask').addClass('active');

            });
        }
    }
}).directive('tuiMask',function(){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            document.getElementsByTagName('body')[0].scrollTop=0;
            var elem=element[0];
            elem.addEventListener('tap',function(e){
               $('.active').removeClass('active');
                e.stopPropagation()
            })
        }
    }
}).directive('tuiNav',function(){
    return {
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            var elem=element[0];
            elem.addEventListener('tap',function(e){
                elem.querySelector('a').classList.add('tui-active')
            })
        }
    }
}).directive('discount',['$rootScope','$filter',function($rootScope,$filter){
	return{
		restrict:'E',
		replace:false,
		templateUrl:$rootScope.PATH+'/partials/discountusage.html',
		link:function(scope,element,attr){
			var elem=element[0]//.querySelector('.tui-discount-item');
			var arr={
				PolicyCodes:[],
				Count:0
			}
			mui(elem).on('tap','.tui-discount-item',function(){
				$(this). toggleClass('active');
			});
			mui(elem).on('tap','button.mui-pull-right',function(){
				var  discount=$('.tui-discount-item.active');
				angular.forEach(discount,function(obj,index){
					var  value=$(obj).attr('data-value');
					var code=$(obj).attr('data-code');
					arr.PolicyCodes.push(code);
					arr.Count=parseFloat(arr.Count)+parseFloat(value);
				})
				$('#Count').text('-'+$filter('currency')(arr.Count,'￥'));
				if(parseFloat(scope.servicefees-arr.Count)>0)
				{
					var  fullpay=parseFloat(scope.order.PayTotal-(scope.servicefees-arr.Count));
					var  servicepay=parseFloat(scope.servicefees-arr.Count);
				}
				else{
					var  fullpay=parseFloat(scope.order.PayTotal-scope.servicefees);
					var  servicepay=0;
				}
                scope.order.PayTotal=fullpay;
				$('#needpay').text($filter('currency')(fullpay,'￥'));
				$('#needpayservice').text($filter('currency')(servicepay,'￥'));
                scope.discount.PolicyCodes=arr.PolicyCodes;
                scope.discount.Count=arr.Count;
				arr={PolicyCodes:[],Count:0};
				$('.tui-mask').removeClass('active');
				$('.tui-swipe-container').removeClass('active');
			});
			mui(elem).on('tap','button.mui-pull-left',function(){
				$('.tui-discount-item').removeClass('active');
				$('.tui-mask').removeClass('active');
				$('.tui-swipe-container').removeClass('active');
				document.querySelector('input[name=usediscount]').checked=false
				scope.discount.usage=false;
			})
		}
		
	}
}]).directive("cityPicker",function(){
    return{
		restrict:'A',
		replace:false,
		link:function(scope,element,attr){
			var elem=element[0]//.querySelector('.tui-discount-item');
			var cityPicker = new mui.PopPicker({
				layer: 3
            });
            cityPicker.setData(cityData3)
			mui(elem).on('tap','.tui-select-city',function(){
                cityPicker.show(function(items) {
                    $('.tui-city-result').text((items[1] || {}).text);
                    scope.USER.CityID=(items[2] || {}).value;
                    scope.USER.CityName=(items[1] || {}).text;
                    scope.updateUser(scope.USER)
                });
				
			});
			
		}
	}
}).directive("worryPicker",function(){
    return{
        restrict:'A',
        replace:false,
        link:function(scope,element,attr){
            var elem=element[0]//.querySelector('.tui-discount-item');
            var cityPicker = new mui.PopPicker({
                layer: 3
            });
            cityPicker.setData(cityData3)
            mui(elem).on('tap','.tui-select-city',function(){
                cityPicker.show(function(items) {
                    $('.tui-city-result').text((items[1] || {}).text);
                    scope.car.CityID=(items[2] || {}).value;
                    scope.car.CityName=(items[1] || {}).text;
                });

            });

        }
    }
}).directive('uploaerHead',['UploaderService',function(UploaderService){
    return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attr) {
           var fileInput=element[0];
            fileInput.addEventListener('change', function(event) {
                    var file = this.files[0];
                    if (file) {
                        var url = webkitURL.createObjectURL(file);
                        var $img = new Image();
                        $img.onload = function() {
                            //生成比例
                            var width = $img.width,
                                height = $img.height,
                                scale = width / height;
                            width = parseInt(2680);
                            height = parseInt(width / scale);

                            //生成canvas
                            var $canvas = document.createElement('canvas');
                            var ctx = $canvas.getContext('2d');
                            $canvas.width=width;
                            $canvas.height=height;
                            ctx.drawImage($img, 0, 0, width, height);
                            var base64 = $canvas.toDataURL('image/jpeg',0.5);
                            document.querySelector('.tui-resume-header').style.backgroundImage='url(' + base64 + ')';
                            var params={BaseCode:base64.substr(23)};
                            UploaderService.uploader(params,2).success(function(data){
                                if(data.status==1) {
                                    scope.USER.HeadImage=data.data;
                                    scope.updateUser(scope.USER)
                                }
                            });
                        }
                        $img.src = url;
                    }

            }, false);

        }
    }
}]).directive('preView',['$filter',function($filter){
    return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attr) {
            var elem=element[0];
            elem.addEventListener('focus',function(){
                var m=$filter('currency')(this.value/10000,'￥')+'万';
                var div=$('<p class="tui-preview"></p>');
                if(document.getElementsByClassName('tui-preview').length==0)
                {
                    $(this).parent().append(div);
                    div.text(m);
                }
                else{
                    console.log(document.getElementsByClassName('tui-preview'))
                    $('.tui-preview').text(m)
                }
            });
            elem.addEventListener('keyup',function(){
                var m=$filter('currency')(this.value/10000,'￥')+'万';
                var div=$('<p class="tui-preview"></p>');
                if(document.getElementsByClassName('tui-preview').length==0)
                {
                    $(this).parent().append(div);
                    div.text(m);
                }
                else{
                    console.log(document.getElementsByClassName('tui-preview'))
                    $('.tui-preview').text(m)
                }
            });
            elem.addEventListener('blur',function(){
                $(this).parent().find('.tui-preview').remove();
            })
        }
    }



}])


















