/**
 * Created by ������ on 2015/12/26.
 */
angular.module("CTXAppDirective",[]).directive('filtercar',function(){
    return {
        restrict: 'EA',
        transclude: true,
        link: function(scope, elem, attrs) {
            //筛选类别
            mui('.tui-filter-nav').on('tap','a.tui-nav-item',function(){
                var target=angular.element(this);
                var role=target.attr('data-for');
                target.toggleClass('active');
                angular.element(mui('.tui-mask')).addClass('active')
                angular.element(mui('.tui-filter-type[data-role='+role+']')).toggleClass('active');
                angular.element(mui('.tui-filter-type:not([data-role='+role+'])')).removeClass('active');
                angular.element(mui('.tui-nav-item:not([data-for='+role+'])')).removeClass('active');

            })
            //排序
            mui('.tui-filter-type[data-role=orderFilter]').on('tap','li.tui-filter-item',function(){
                var target=angular.element(this);
                var val=target.attr('data-filter-value');
                var name=target.attr('data-name')
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
                angular.element(mui('.tui-filter-type[data-role=orderFilter]')).find('li').removeClass('active')
                target.addClass('active')
                angular.element(mui('.tui-mask')).removeClass('active')
                angular.element(mui('.tui-filter-type[data-role=orderFilter]')).toggleClass('active');
                angular.element(mui('.tui-nav-item[data-for=orderFilter]')).toggleClass('active');
                scope.getList()
            });
            //品牌
            mui('.tui-filter-type[data-role=brandFilter]').on('tap','li.tui-filter-item',function(){
                var target=angular.element(this);
                var val=target.attr('data-filter-value');
                scope.filter.Brand=val;
                angular.element(mui('.tui-filter-type[data-role=brandFilter]')).find('li').removeClass('active')
                target.addClass('active')
               angular.element(mui('.tui-mask')).removeClass('active')
               angular.element(mui('.tui-filter-type[data-role=brandFilter]')).toggleClass('active');
                angular.element(mui('.tui-nav-item[data-for=brandFilter]')).toggleClass('active');
                scope.getList()
            })











        },
        templateUrl:'../partials/filtercar.html',
        replace: false


    }

})