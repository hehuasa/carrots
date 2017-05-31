/**
 * Created by Administrator on 2017/5/13.
 */
carrotsFront.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.when('','pageTab/homepage');
  $stateProvider
	.state('pageTab',{
	  url:'/pageTab',
	  templateUrl:'header&footer.html'
	})
	.state('pageTab.homepage',{
	  url:'/homepage',
	  templateUrl:'homepage.html',
	  controller:'homepageCtrl',
	  controllerAs: 'ctrl'
	})
	.state('pageTab.jobs',{
	  url:'/jobs',
	  templateUrl:'jobs.html',
	  controller:'findJobs',
	  controllerAs: 'findJob'
	})
	.state('pageTab.elites',{
	  url:'/elites',
	  templateUrl:'elites.html'
	})
	.state('pageTab.aboutUs',{
	  url:'/aboutUs',
	  templateUrl:'aboutUs&contactUs.html'
	})
	.state('pageTab.aboutUs.aboutUs',{
	  url:'/aboutUs',
	  templateUrl:'aboutUs.html'
	})
	.state('pageTab.aboutUs.contactUs',{
	  url:'/contactUs',
	  templateUrl:'contactUs.html'
	})
	.state('pageTab.jobNewest',{
	  params:{data:null},
	  url:'/jobNewest',
	  templateUrl:'jobNewest.html',
	  controller:'jobNewestCtrl',
	  controllerAs:'ctrl'
	})
	.state('pageTab.jobRecommend',{
	  params:{data:null},
	  url:'/jobRecommend',
	  templateUrl:'jobRecommend.html',
	  controller:'jobRecommendCtrl',
	  controllerAs:'ctrl'
	})
	.state('pageTab.searchCompany',{
	  params:{data:null},
	  url:'/searchCompany',
	  templateUrl:'searchCompany.html',
	  controller:'searchCompany',
	  controllerAs:'ctrl'
	})
	.state('pageTab.searchJobs',{
		params:{category:null,subCategory:null},
		url:'/searchJobs',
		templateUrl:'searchJobs.html',
		controller:'searchJobs',
		controllerAs:'ctrl'
	  })
	.state('pageTab.jobDetails',{
	  params:{id:null},
	  url:'/jobDetails/?id',
	  templateUrl:'jobDetails.html',
	  controller:'jobDetails',
	  controllerAs: 'ctrl'
	})
	.state('pageTab.companyDetails',{
	  params:{id:null},
	  url:'/companyDetails/?id',
	  templateUrl:'companyDetails .html',
	  controller:'companyDetails',
	  controllerAs: 'ctrl'
	})
	.state('pageTab.searchCompany.companyNoResult',{
	  url:'/companyNoResult',
	  templateUrl:'companyNoResult.html',
	  controller:'companyNoResult',
	  controllerAs: 'ctrl'
	})
	.state('pageTab.jobNewest.jobNoResult',{
	  url:'/jobNoResult',
	  templateUrl:'jobNoResult.html',
	  controller:'jobNoResult',
	  controllerAs: 'ctrl'
	})
	.state('pageTab.jobRecommend.jobNoResult',{
	  url:'/jobNoResult',
	  templateUrl:'jobNoResult.html',
	  controller:'jobNoResult',
	  controllerAs: 'ctrl'
	})
	.state('pageTab.searchJobs.jobNoResult',{
	  url:'/jobNoResult',
	  templateUrl:'jobNoResult.html',
	  controller:'jobNoResult',
	  controllerAs: 'ctrl'
	})
});