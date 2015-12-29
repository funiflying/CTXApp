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
            mui('.tui-filter-type[data-role=priceFilter]').on('tap','li.tui-filter-item',function(){
                var val=$(this).attr('data-filter-value');
                var text=$(this).attr('data-text');
                scope.filter.PriceID=val;
                $(this).addClass('active').siblings('li.tui-filter-item').removeClass('active')
                $('.tui-mask').removeClass('active')
                $('.tui-filter-type[data-role=priceFilter]').toggleClass('active');
                $('.tui-nav-item[data-for=priceFilter]').toggleClass('active');
                $('.tui-filter-result').addClass('active').find('i.tui-filter-priceTxt').text(text)
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
                    pageNum: 24
                }
                $rootScope.state.go('carlist');
                scope.getList()
            })
        },
        templateUrl:'../partials/filtercar.html',
        replace: false


    }

}])