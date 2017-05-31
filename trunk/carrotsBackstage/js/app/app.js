/**
 * Created by Administrator on 2017/5/13.
 */
var carrotsBackstage=angular.module('carrotsBackstage',['ngResource','ui.router','ngCookies','ui.bootstrap']);
carrotsBackstage.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.when('','/login');
  $stateProvider
  // 主路由
  .state('login',{
    url:'/login',
    templateUrl:'login.html',
    controller: 'login',
    controllerAs: 'ctrl',
  })
  .state('homepage',{
    url:'/homepage',
    templateUrl:'homepage.html',
    controller: 'homepage',
    controllerAs: 'ctrl',
  })
  .state('homepage.welcome',{
    url:'/welcome',
    templateUrl:'wel.html'
  })
  .state('homepage.company',{
    url:'/company',
    templateUrl: 'companyInfo.html',
    controller: 'companyInfo',
    controllerAs: 'ctrl',
  })
  .state('homepage.account',{
    url:'/account',
    templateUrl:'account.html',
    controller: 'account',
    controllerAs: 'ctrl',
  })
  .state('homepage.accountadd',{
    url:'/accountAdd/?:Id',
    templateUrl:'accountAdd.html',
    controller:'accountAdd',
    controllerAs: 'ctrl',
  })
  .state('homepage.role',{
    url:'/role',
    templateUrl:'role.html',
    controller: 'role',
    controllerAs: 'ctrl'
  })
  .state('homepage.roleAdd',{
    url:'/roleAdd/?:Id',
    templateUrl:'roleAdd.html',
    controller: 'roleAdd',
    controllerAs:'ctrl'
  })
  .state('homepage.pwd',{
    url:'/pwd',
    templateUrl:'pwd.html',
    controller:'pwd',
    controllerAs:'ctrl',
  })
  .state('homepage.module',{
    url:'/module',
    templateUrl:'module.html',
    controller:'module',
    controllerAs:'ctrl',
  })
  .state('homepage.moduleAdd',{
    url:'/moduleAdd/?:Id',
    templateUrl:'moduleAdd.html',
    controller:'moduleAdd',
    controllerAs:'ctrl'
  })
})