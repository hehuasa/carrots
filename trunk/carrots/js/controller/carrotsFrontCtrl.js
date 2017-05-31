/**
 * Created by Administrator on 2017/5/13.
 */

carrotsFront.controller('homepageCtrl',function(ajax){
//var ctrl=this;
//  ctrl.bannerItem=['a','a','a']
});
//最新职位控制器
carrotsFront.controller('jobNewestCtrl',function($stateParams,$state,ajax,con,getData,saveData) {
  var ctrl = this;
  //定义常量数据
  ctrl.city=[{type:null,name:'不限'},{type:1,name:'北京'}];
  ctrl.industry = con.industry;
  ctrl.education = con.education;
  ctrl.experience = con.experience;
  ctrl.compensation = con.compensation;
  ctrl.updateAt = con.updateAt;
  //获取传参
  if ($stateParams.data==null){
  //定义双向绑定数据
  ctrl.professionCity=[];
  ctrl.professionIndustry=[];
  ctrl.professionEducation=[];
  ctrl.professionExperience=[];
  ctrl.professionCompensation=[];
  ctrl.professionUpdateAt=[];
  }else {
    console.log($stateParams.data);
    ctrl.professionName=$stateParams.data.name;
    ctrl.professionCity=$stateParams.data.city;
    ctrl.professionIndustry=$stateParams.data.industry;
    ctrl.professionEducation=$stateParams.data.education;
    ctrl.professionExperience=$stateParams.data.experience;
    ctrl.professionCompensation=$stateParams.data.compensation;
    ctrl.professionUpdateAt=$stateParams.data.updateAt;
  }
  //获取表格输入框的及时更新并存储
  ctrl.getName=function(){
    var jsonProfessionParam;
    ctrl.professionParam.name=ctrl.professionName;
    saveData.saveData('professionData',ctrl.professionParam,jsonProfessionParam)
  };
  //取出存储数据
  if(sessionStorage.getItem('professionData')){
      ctrl.professionParam=JSON.parse(sessionStorage.getItem('professionData'));
      ctrl.professionName=ctrl.professionParam.name;
      ctrl.professionCity=ctrl.professionParam.city;
      ctrl.professionIndustry=ctrl.professionParam.industry;  
      ctrl.professionEducation=ctrl.professionParam.education;
      ctrl.professionExperience=ctrl.professionParam.experience;
      ctrl.professionCompensation=ctrl.professionParam.compensation;
      ctrl.professionUpdateAt=ctrl.professionParam.updateAt;
  }
//定义传输的数据
  function Param() {
    return ctrl.professionParam = {
      name: ctrl.professionName,
      city: ctrl.professionCity,
      recommend: 0,
      industry: ctrl.professionIndustry,
      education: ctrl.professionEducation,
      experience: ctrl.professionExperience,
      compensation: ctrl.professionCompensation,
      updateAt: ctrl.professionUpdateAt,
      page: ctrl.page,
      size: ctrl.pageSize
    }
  }
  //请求数据
  ctrl.getProfession=function(){
    Param();
    ajax.getProfession(ctrl.professionParam,function(response){
      ctrl.data1=response.data;
      ctrl.items = ctrl.data1.length;
    })
  };
  ctrl.getProfessionByPage = function() {
    ctrl.pageSize = 2;
    Param();
    ajax.getProfession(ctrl.professionParam,function(response){
      ctrl.data=response.data;
      if (response.total==0){
        $state.go('pageTab.searchJobs.jobNoResult')
      }
    }) 
  }
  // 点击分页
  ctrl.pageChange = function() {
    Param();
    ctrl.getProfessionByPage();
  }
  ctrl.getProfession();
  ctrl.getProfessionByPage();
  //复选框class效果
  ctrl.checkbox=function(a,b,c){
    return getData.checkbox(a,b,c)
  };
  //复选框点击函数
  ctrl.getParameter=function(array,index,dataArray){
    console.log(ctrl.professionName);
    var jsonProfessionParam;
      return getData.getDataType(array,index,dataArray,'professionData',ctrl.professionParam,jsonProfessionParam)
  };
  //清空
  ctrl.clear=function(){
    ctrl.professionName='';
    ctrl.professionCity=[];
    ctrl.professionIndustry=[];
    ctrl.professionEducation=[];
    ctrl.professionExperience=[];
    ctrl.professionCompensation=[];
    ctrl.professionUpdateAt=[];
    Param();
    var jsonProfessionParam;
    saveData.saveData('professionData',ctrl.professionParam,jsonProfessionParam);

  };
  //搜索
  ctrl.search=function(){
    $state.go('pageTab.jobNewest',{data:ctrl.professionParam});
  }
});
//推荐职位控制器
carrotsFront.controller('jobRecommendCtrl',function($stateParams,$state,ajax,con,getData,saveData,$log) {
  var ctrl = this;
  //定义常量数据
  ctrl.city=[{type:null,name:'不限'},{type:1,name:'北京'}];
  ctrl.industry = con.industry;
  ctrl.education = con.education;
  ctrl.experience = con.experience;
  ctrl.compensation = con.compensation;
  ctrl.updateAt = con.updateAt;
  //获取传参
  if ($stateParams.data==null){
    //定义双向绑定数据
    ctrl.professionCity=[];
    ctrl.professionIndustry=[];
    ctrl.professionEducation=[];
    ctrl.professionExperience=[];
    ctrl.professionCompensation=[];
    ctrl.professionUpdateAt=[];
  }else {
    console.log($stateParams.data);
    ctrl.professionName=$stateParams.data.name;
    ctrl.professionCity=$stateParams.data.city;
    ctrl.professionIndustry=$stateParams.data.industry;
    ctrl.professionEducation=$stateParams.data.education;
    ctrl.professionExperience=$stateParams.data.experience;
    ctrl.professionCompensation=$stateParams.data.compensation;
    ctrl.professionUpdateAt=$stateParams.data.updateAt;
  }
  //获取表格输入框的及时更新并存储
  ctrl.getName=function(){
    var jsonProfessionParam;
    ctrl.professionParam.name=ctrl.professionName;
    saveData.saveData('jobRecommendData',ctrl.professionParam,jsonProfessionParam)
  };
  //取出存储数据
  if(sessionStorage.getItem('jobRecommendData')){
    ctrl.professionParam=JSON.parse(sessionStorage.getItem('jobRecommendData'));
    ctrl.professionName=ctrl.professionParam.name;
    ctrl.professionCity=ctrl.professionParam.city;
    ctrl.professionIndustry=ctrl.professionParam.industry;
    ctrl.professionEducation=ctrl.professionParam.education;
    ctrl.professionExperience=ctrl.professionParam.experience;
    ctrl.professionCompensation=ctrl.professionParam.compensation;
    ctrl.professionUpdateAt=ctrl.professionParam.updateAt;
  }
//定义传输的数据
  function Param() {
    return ctrl.professionParam = {
      name: ctrl.professionName,
      city: ctrl.professionCity,
      recommend: 1,
      industry: ctrl.professionIndustry,
      education: ctrl.professionEducation,
      experience: ctrl.professionExperience,
      compensation: ctrl.professionCompensation,
      updateAt: ctrl.professionUpdateAt,
      page: ctrl.page,
      size: ctrl.pageSize
    }
  }
  //请求数据
  ctrl.getProfession=function(){
    Param();
    ajax.getProfession(ctrl.professionParam,function(response){
      ctrl.data1=response.data;
      ctrl.items = ctrl.data1.length;
    })
  };
  ctrl.getProfessionBypage=function(){
    ctrl.pageSize = 2;
    Param();
    ajax.getProfession(ctrl.professionParam,function(response){
      ctrl.data=response.data;
      if (response.total==0){
        $state.go('pageTab.jobRecommend.jobNoResult')
      }
    })
  };
  ctrl.pageChange = function() {
    ctrl.getProfessionBypage();
  }
  ctrl.getProfession();
  ctrl.getProfessionBypage();
  //复选框class效果
  ctrl.checkbox=function(a,b,c){
    return getData.checkbox(a,b,c)
  };
  //复选框点击函数
  ctrl.getParameter=function(array,index,dataArray){
    console.log(ctrl.professionName);
    var jsonProfessionParam;
    return getData.getDataType(array,index,dataArray,'jobRecommendData',ctrl.professionParam,jsonProfessionParam)
  };
  //清空
  ctrl.clear=function(){
    ctrl.professionName='';
    ctrl.professionCity=[];
    ctrl.professionIndustry=[];
    ctrl.professionEducation=[];
    ctrl.professionExperience=[];
    ctrl.professionCompensation=[];
    ctrl.professionUpdateAt=[];
    Param();
    var jsonProfessionParam;
    saveData.saveData('jobRecommendData',ctrl.professionParam,jsonProfessionParam);

  };
  //搜索
  ctrl.search=function(){
    $state.go('pageTab.jobRecommend',{data:ctrl.professionParam});
  }
});

// 找职位控制器
carrotsFront.controller('findJobs', function($scope,$resource,ajax,con,$state){
  var findJob = this;
  findJob.reconmmendOrNew = 0;
  ajax.getBanner(function(response){
    findJob.data = response.data.articleList;
    console.log(findJob.data)
  });
  // 最新职位，推荐职位
   ajax.getProfession(function(response){
     findJob.jobs=response.data;
     console.log(findJob.jobs);
   });
  ajax.getCompany(function(response){
    findJob.companies = response.data;
    console.log(findJob.companies);
  });
  findJob.reconmmend = function() {
    findJob.reconmmendOrNew = 0;
  };
  findJob.newest = function() {
    findJob.reconmmendOrNew = 1;
  };
  findJob.goToJobList = function(id) {
    $state.go('pageTab.jobDetails',{id: id});
  };
  findJob.goToJobRecomOrnew = function() {
    //跳转最新职位or推荐职位
    if(findJob.reconmmendOrNew === 0) {
      $state.go('pageTab.jobRecommend')
    }
    else {
      $state.go('pageTab.jobNewest')
    }
  }
  findJob.goToCompanyDetail = function(id) {
    $state.go('pageTab.companyDetails',{id:id})
  }
})

// 搜索职位
carrotsFront.controller('searchJobs', function($stateParams,$state,ajax,con,getData,saveData,$log){
  var ctrl = this;
  //定义常量数据
  ctrl.city=[{type:null,name:'不限'},{type:1,name:'北京'}];
  ctrl.category = con.compPoList;
  ctrl.industry = con.industry;
  ctrl.categoryData=con.categoryData;
  ctrl.education = con.education;
  ctrl.experience = con.experience;
  ctrl.compensation = con.compensation;
  ctrl.updateAt = con.updateAt;
  ctrl.subCategory='';
  ctrl.getSubCategory=function() {
     if (ctrl.professionCategory.length == 1) {
      ctrl.subCategory = ctrl.categoryData[ctrl.professionCategory[0] - 1].subCategory;
    } else {
      ctrl.subCategory = '';
    }
    return ctrl.subCategory
  };
  //获取传参
  if ($stateParams.data==null){
    //定义双向绑定数据
    console.log($stateParams);
    ctrl.professionCity=[];
    ctrl.professionIndustry=[];
    ctrl.professionEducation=[];
    ctrl.professionExperience=[];
    ctrl.professionCompensation=[];
    ctrl.professionUpdateAt=[];
    if ($stateParams.category!=null){
      ctrl.professionCategory=[$stateParams.category]
    }else {
      ctrl.professionCategory=[];
    }
    if ($stateParams.subCategory!=null){
      ctrl.professionSubCategory=[$stateParams.subCategory]
    }else {
      ctrl.professionSubCategory=[];
    }
  }
  else {
    console.log($stateParams.data);
    ctrl.professionName=$stateParams.data.name;
    ctrl.professionCity=$stateParams.data.city;
    ctrl.professionIndustry=$stateParams.data.industry;
    ctrl.professionEducation=$stateParams.data.education;
    ctrl.professionExperience=$stateParams.data.experience;
    ctrl.professionCompensation=$stateParams.data.compensation;
    ctrl.professionUpdateAt=$stateParams.data.updateAt;
    ctrl.professionSubCategory=$stateParams.data.subCategory;
    ctrl.professionCategory=$stateParams.data.category;
  }
  ctrl.subCategoryJudge=function(){
    return (ctrl.professionCategory.length==1)
  };
  //获取表格输入框的及时更新并存储
  ctrl.getName=function(){
    var jsonProfessionParam;
    ctrl.professionParam.name=ctrl.professionName;
    saveData.saveData('jobData2',ctrl.professionParam,jsonProfessionParam)
  };
  //取出存储数据
  if(sessionStorage.getItem('jobData2')){
    ctrl.professionParam=JSON.parse(sessionStorage.getItem('jobData2'));
    ctrl.professionName=ctrl.professionParam.name;
    ctrl.professionCity=ctrl.professionParam.city;
    ctrl.professionIndustry=ctrl.professionParam.industry;
    ctrl.professionEducation=ctrl.professionParam.education;
    ctrl.professionExperience=ctrl.professionParam.experience;
    ctrl.professionCompensation=ctrl.professionParam.compensation;
    ctrl.professionUpdateAt=ctrl.professionParam.updateAt;
    ctrl.professionSubCategory=ctrl.professionParam.subCategory;
    ctrl.professionCategory=ctrl.professionParam.category;
  }
  ctrl.getSubCategory();
//定义传输的数据
  function Param() {
    return ctrl.professionParam = {
      name: ctrl.professionName,
      city: ctrl.professionCity,
      industry: ctrl.professionIndustry,
      education: ctrl.professionEducation,
      experience: ctrl.professionExperience,
      compensation: ctrl.professionCompensation,
      updateAt: ctrl.professionUpdateAt,
      subCategory:ctrl.professionSubCategory,
      category:ctrl.professionCategory,
      page: ctrl.page,
      size: ctrl.pageSize
    }
  }
  //请求数据
  ctrl.getProfession=function(){
    ajax.getProfession(ctrl.professionParam,function(response){
      ctrl.data1=response.data;
      ctrl.items = ctrl.data1.length;
    })
  };
  ctrl.getProfessionByPage = function() {
    ctrl.pageSize = 2;
    Param();
    ajax.getProfession(ctrl.professionParam,function(response){
      ctrl.data=response.data;
      if (response.total==0){
        $state.go('pageTab.searchJobs.jobNoResult')
      }
    }) 
  }
  // 点击分页
  ctrl.pageChange = function() {
    Param();
    ctrl.getProfessionByPage();
  }
 
  ctrl.getProfession();
  ctrl.getProfessionByPage();  
  //复选框class效果
  ctrl.checkbox=function(a,b,c){
    return getData.checkbox(a,b,c)
  };
  //复选框点击函数
  ctrl.getParameter=function(array,index,dataArray){
    var jsonProfessionParam;
    getData.getDataType(array,index,dataArray,'jobData2',ctrl.professionParam,jsonProfessionParam);
    ctrl.getSubCategory();
    console.log(ctrl.subCategory);
    saveData.saveData('jobData2',ctrl.professionParam,jsonProfessionParam);
    console.log(ctrl.subCategory);
  };
  //清空
  ctrl.clear=function(){
    ctrl.professionName='';
    ctrl.professionCity=[];
    ctrl.professionIndustry=[];
    ctrl.professionEducation=[];
    ctrl.professionExperience=[];
    ctrl.professionCompensation=[];
    ctrl.professionUpdateAt=[];
    ctrl.professionCategory=[];
    ctrl.professionSubCategory=[];
    Param();
    var jsonProfessionParam;
    saveData.saveData('jobData2',ctrl.professionParam,jsonProfessionParam);

  };
});

//搜索公司
carrotsFront.controller('searchCompany',function($stateParams,$state,ajax,con,getData,saveData){
  var ctrl=this;
  //定义常量数据
  ctrl.city=[{type:null,name:'不限'},{type:1,name:'北京'}];
  ctrl.industry = con.industry;
  ctrl.financing = con.financing;
  //获取传参
  if ($stateParams.data==null){
    //定义双向绑定数据
    ctrl.companyCity=[];
    ctrl.companyIndustry=[];
    ctrl.companyFinancing=[];
  }else {
    console.log($stateParams.data);
    ctrl.companyName=$stateParams.data.name;
    ctrl.companyCity=$stateParams.data.city;
    ctrl.companyIndustry=$stateParams.data.industry;
    ctrl.companyFinancing=$stateParams.data.financing;
  }
  //获取表格输入框的及时更新并存储
  ctrl.getName=function(){
    var jsonCompanyParam;
    ctrl.companyParam.name=ctrl.companyName;
    saveData.saveData('companyData',ctrl.companyParam,jsonCompanyParam)
  };
  //取出存储数据
  if(sessionStorage.getItem('companyData')){
    ctrl.companyParam=JSON.parse(sessionStorage.getItem('companyData'));
    ctrl.companyName=ctrl.companyParam.name;
    ctrl.companyCity=ctrl.companyParam.city;
    ctrl.companyIndustry=ctrl.companyParam.industry;
    ctrl.companyFinancing=ctrl.companyParam.financing;
  }
//定义传输的数据
  function Param() {
    return ctrl.companyParam = {
      name: ctrl.companyName,
      city: ctrl.companyCity,
      industry: ctrl.companyIndustry,
      financing: ctrl.companyFinancing,
      page: ctrl.page,
      size: ctrl.pageSize
  }
  }
  //请求数据
  ctrl.getCompany=function(){
    Param();
    ajax.getCompany(ctrl.companyParam,(function(response){
      ctrl.data1=response.data;
      ctrl.items = ctrl.data1.length;
    }))
  };
  ctrl.getCompanyByPage = function(){
    ctrl.pageSize = 2;
    Param();
    ajax.getCompany(ctrl.companyParam,(function(response){
      ctrl.data=response.data;
      if (ctrl.data.length==0){
        $state.go('pageTab.searchCompany.companyNoResult');
      }
    }))
  };
  ctrl.pageChange = function() {
    Param();
    ctrl.getCompanyByPage();
  }
  ctrl.getCompany();
  ctrl.getCompanyByPage();
  //复选框class效果
  ctrl.checkbox=function(a,b,c){
    return getData.checkbox(a,b,c)
  };
  //复选框点击函数
  ctrl.getParameter=function(array,index,dataArray){
    var jsonCompanyParam;
    return getData.getDataType(array,index,dataArray,'companyData',ctrl.companyParam,jsonCompanyParam)
  };
  //清空
  ctrl.clear=function(){
    ctrl.professionName='';
    ctrl.professionCity=[];
    ctrl.professionIndustry=[];
    ctrl.professionEducation=[];
    ctrl.professionFinancing=[];
    Param();
    var jsonCompanyParam;
    saveData.saveData('companyData',ctrl.companyParam,jsonCompanyParam);

  };
  //搜索
  ctrl.search=function(){
    $state.go('pageTab.searchCompany',{data:ctrl.companyParam});
  }
});

//搜索公司无结果
carrotsFront.controller('companyNoResult',function(ajax){
  var ctrl=this;
  //请求数据
  ctrl.getCompany=function(){
    ajax.getCompany(ctrl.companyParam,(function(response){
      ctrl.data=response.data
    }))
  };
});
//搜索工作无结果
carrotsFront.controller('jobNoResult',function(ajax){
  var ctrl=this;
  //请求数据
  ctrl.getProfession=function(){
    ajax.getProfession(ctrl.professionParam,function(response){
      ctrl.data=response.data;
    })
  };
  ctrl.getProfession();
});

//职位详情
carrotsFront.controller('jobDetails',function($stateParams,ajax){
  var ctrl=this;
  ctrl.id=$stateParams.id;

  this.getData=function() {
    ajax.getSingleProfession({id:ctrl.id},function(response){
      ctrl.data=response.data;
      console.log(ctrl.data)
    })
  };
  this.getData()

});

//公司详情
carrotsFront.controller('companyDetails',function($stateParams,ajax,getData){
  var ctrl=this;
  ctrl.id=$stateParams.id;
  ctrl.category=[];
  ctrl.company=true;
  ctrl.jobs=false;
  //职位类别 category  0-产品 1-运营 2-技术 3-设计 4-测试
  ctrl.professionCategory=[
    {type:null,name:'全部'},
    {type:0,name:'产品'},
    {type:1,name:'运营'},
    {type:2,name:'技术'},
    {type:3,name:'设计'},
    {type:4,name:'测试'}
  ];
  //取出存储数据
  if(sessionStorage.getItem('categoryData')){
    ctrl.professionParam=JSON.parse(sessionStorage.getItem('categoryData'));
    ctrl.professionParam.companyId=ctrl.id;
    ctrl.professionParam.subCategory=ctrl.category;
  }
//定义传输的数据
  function Param() {
    return ctrl.professionParam={
      companyId:ctrl.id,
      subCategory:ctrl.category
    };
  }
  //请求数据
  Param();
  ctrl.getSingleCompany=function(){
    ajax.getSingleCompany({id:ctrl.id},function(response){
      ctrl.companyData=response.data;
      console.log(ctrl.companyData)
    })
  };
  ctrl.getSingleCompany();
  ctrl.getCompanyJobs=function(){
    ajax.getProfession(ctrl.professionParam,function(response){
      ctrl.professionData=response.data;
      console.log(ctrl.professionData)
    })
  };
  ctrl.getCompanyJobs();
  //判断是否认证
  ctrl.approved=function(approved){
    return (approved==1)
  };
  //职位类别复选框效果
  ctrl.checkbox=function(professionCategory,index,category){
    return getData.checkbox(professionCategory,index,category)
  };
  //请求职位类别数据
  ctrl.selectCategory=function(array,index,dataArray){
    var jsonProfessionParam;
     getData.getDataType(array,index,dataArray,'categoryData',ctrl.professionParam,jsonProfessionParam);
    ctrl.getCompanyJobs();
  };
  //切换ng-show
  ctrl.companyDetail=function(){
    ctrl.company=true;
    ctrl.jobs=false;
  };
  ctrl.companyJobs=function(){
    ctrl.company=false;
    ctrl.jobs=true;
  };
});
