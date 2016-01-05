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
                $('.tui-mask').toggleClass('active')
                $('.tui-filter-type[data-role='+role+']').toggleClass('active');
                $('.tui-filter-type:not([data-role='+role+'])').removeClass('active');
                $('.tui-nav-item:not([data-for='+role+'])').removeClass('active');
                $('.tui-filter-result').removeClass('active')

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
            //价格
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
                scope.filter={
                    Brand: null,
                    CarYear: null,
                    CityID: null,
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
        templateUrl:'/ctxWap/partials/filtercar.html',
        replace: false


    }

}]).directive('pager',['$rootScope',function($rootScope){
    return{
        restrict:'EA',
        transclude:true,
        link:function(scope,element,attr){
            scope.pager=function(pageNo){
                var config= $.extend({},scope.pagerConfig);
                pageNo=pageNo||1
                var pageLength = (config.total % config.pageSize == 0 ? config.total / config.pageSize : Math.ceil(config.total /config.pageSize));

                if(pageLength>1){
                    $('.tui-page').show()
                    var op="";
                    for (var i= 0;i<pageLength;i++){
                       op+='<option  value="'+parseInt(i+1)+'" >'+parseInt(i+1)+'</option>';
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
                }
                else {
                    $('.tui-page').hide()
                }
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
        },
        template:' <div class="tui-page">'+
        '<a class="page-up">'+
        '<span>上一页</span></a>'+
        '<a  class="page-select-a">'+
        '<span class="change-page">'+
        '<span class="select-con">'+
       '<span class="page-num"></span>'+
        '<span class="triangle page-triangle"></span></span>'+
       '<select name="" id="" class="tui-3g-page-btn">'+
        '</select></select>'+
        '</span></a><a class="page-down">'+
        '<span>下一页</span></a></div>',
        replace:false
    }
}]).directive('login',['$rootScope',function(){
    return{
        restrict:'EA',
        transclude:true,
        templateUrl:'/ctxWap/partials/login.html',
        replace:false,
        link:function(scope,element,attr){
            mui('.tui-filter-opt').on('tap','button',function(){
              $('login').hide();
            })
        }
    }
}]).directive('tuiLogin',['$rootScope',function(){
    return{
        restrict:'EA',
        replace:false,
        link:function(scope,element,attr){
            angular.element(element).on('tap',function(){
                $('login').show()
            })
        }
    }
}])