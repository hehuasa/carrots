/**
 * Created by Administrator on 2017-5-14.
 */

//将轮播需要复制的item进行缓存
carrotsFront.run(function($templateCache){
  $templateCache.put('banner1','<div ng-repeat="x in newData track by $index"  class="item" ng-class="{active:$first}">' +
    '<div class="col-md-3  col-xs-12" ng-repeat="z in x track by $index">' +
    '<div class="homepage-position-content">' +
    '<div class="homepage-position-content-logo">' +
    '<img ng-src={{z.logo}}>' +
    '</div>' +
    '<div class="homepage-position-content-text">' +
    '<div class="font-tittle" ><a class="ddark-blue" ng-bind="z.name" ui-sref="pageTab.jobDetails({id:z.id})"></a></div>' +
    '<div class="homepage-position-line"></div>' +
    '<div class="font-tags"><a class="ddark-blue" ng-bind="z.companyName" ui-sref="pageTab.companyDetails({id:z.companyId})"></a></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>');
});
//首页轮播的指令
carrotsFront.directive('carousel',function($templateCache,ajax){
  return{
    restrict:'AE',
    replace:'true',
    scope:{},
    template:$templateCache.get('banner1'),
    link:function(scope){
      //请求后台轮播的数据
      ajax.getProfession(function(response) {
        scope.data = response.data;
        //轮播图的item分组
        scope.bannerNum=Math.ceil(scope.data.length/4);
        if(scope.bannerNum==1){
          scope.bannerNum=2
        }
        scope.bannerItem=[scope.bannerNum];
        for (var a=0;a<scope.bannerNum;a++){
          scope.bannerItem[a]=a
        }
        //对轮播数据进行分组
        scope.newData=[];
        for (var i=0;i<scope.data.length;i+=4){
          if(i+4>scope.data.length){
            scope.newData.push(scope.data.slice(i,scope.data.length));
            for (var z=0;z<(i+4-scope.data.length);z++){
              scope.newData[scope.newData.length-1].push(scope.data[z])
            }
          }else {
            scope.newData.push(scope.data.slice(i,i+4));
          }
        }
        $("#positionCarousel").carousel('cycle');//初始化轮播图
      });
    }
  }
});
// 找职位导航指令
carrotsFront.directive('findjobmodule',function(con){
  return{
    restrict: 'E',
    scope: {},
    replace: true,
    template: '<div class="findjob-module">'+
    '<h4><span class="icon-findjob {{class}}"></span>'+
    '<i class="icon-rightarrow glyphicon glyphicon-menu-right"></i></h4>'+
    '<a ui-sref="pageTab.searchJobs({category:x.id,subCategory:null})" class="product-link col-xs-4" ng-repeat=" x in categoryData" ng-bind="x.name" ng-if="x.id <= max&&x.id >= min"></a>'+
    '<div class="findjob-module-hov">'+
    '<div ng-repeat="x in categoryData" ng-if="x.id <= max&&x.id >= min">'+
    '<div class="findjob-module-hov-tittle"><span ng-bind="x.name"></span></div>'+
    '<a ng-repeat="y in x.subCategory" ui-sref="pageTab.searchJobs({category:x.id,subCategory:y.type})" ng-bind="y.name"></a>'+
    '</div></div></div>',
    link: function(scope,element,attrs) {
      scope.categoryData = con.categoryData;
      scope.class = attrs.className;
      scope.min = attrs.min;
      scope.max = attrs.max;
    }
  }
});
// 复选框指令
carrotsFront.directive('checkbox',function(){
  return function (){

  }

});
//首页轮播的指令
// 找职位轮播图指令
carrotsFront.directive('findjobcarousel',function(){
  return{
    restrict:'AE',
    replace:'true',
    scope: true,
    link: function(s,ele,attr){
      s.id = ele[0].id;
      s.ids = "#"+s.id;
      $(s.ids).carousel('cycle');
    }
  }
})



























//console.log(scope.data);

////动态更改data数组（轮播数据源）
//if($('.item').removeClass('active') && scope.data.length>=4){
//  scope.data.push(scope.data[0],scope.data[1],scope.data[2],scope.data[3]);
//  scope.data.splice(0,4)
//}

//复制轮播需要的item
//for (var a= 0;a<Math.ceil(scope.data.length/4);a++){
//  $('#bannerPosition').after($templateCache.get('banner1'));
//  console.log(scope.data);
//  //scope.$apply()
//
//}
//$templateCache.put('bannerActive','<div id="bannerPosition" class="item active">' +
//'<div class="col-md-3  col-xs-12" ng-repeat="x in data">' +
//'<div class="homepage-position-content">' +
//'<div class="homepage-position-content-logo">' +
//'<img ng-src={{x.logo}}>' +
//'</div>' +
//'<div class="homepage-position-content-text">' +
//'<div class="font-tittle" ng-bind="x.name"></div>' +
//'<div class="homepage-position-line"></div>' +
//'<div class="font-tags" ng-bind="x.companyName"></div>' +
//'</div>' +
//'</div>' +
//'</div>' +
//'</div>');
//$templateCache.put('banner','<div class="item">' +
//'<div class="col-md-3  col-xs-12" ng-repeat="x in data">' +
//'<div class="homepage-position-content">' +
//'<div class="homepage-position-content-logo">' +
//'<img ng-src={{x.logo}}>' +
//'</div>' +
//'<div class="homepage-position-content-text">' +
//'<div class="font-tittle" ng-bind="x.name"></div>' +
//'<div class="homepage-position-line"></div>' +
//'<div class="font-tags" ng-bind="x.companyName"></div>' +
//'</div>' +
//'</div>' +
//'</div>' +
//'</div>');