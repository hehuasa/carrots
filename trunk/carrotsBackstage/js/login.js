/**
 * Created by Administrator on 2017/4/14.
 */


var app =angular.module("myapp",[]);
app.controller("myctrl",function($scope,$http,$state){
    $scope.id_="";
    $scope.pwd_="";
    $scope.res="";
    $scope.login=function(){

        $http({
            method: "POST",
            url: "/carrots-admin-ajax/a/login",
            data:"name="+ $scope.id_+"&pwd="+$scope.pwd_,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(response) {
          var a = response.data;
         if(a.message =="success"){
            $state.go('pageTab.homepage')
         }
            else {
             $scope.res=response.data.message;
         }
            // 请求成功执行代码
        }, function errorCallback(response) {
            $scope.res=response.data.message;
            // 请求失败执行代码
        });
    }
});
