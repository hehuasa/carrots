/**
 * Created by Administrator on 2017/5/13.
 */
carrotsFront.service('ajaxAddress',function(){
  //获取banner图
  this.getBanner='/carrots-ajax/a/article/search';
  //获取职位信息
  this.getProfession='/carrots-ajax/a/profession/search';
  //获取公司信息
  this.getCompany='/carrots-ajax/a/company/search';
  //获取产品信息
  this.getProduct='/carrots-ajax/a/company/product/search';
  //查询某一公司某一产品的某一职位的具体信息
  this.getCompanyProductProfession='/carrots-ajax/a/company/product/profession/search';
  // 职位搜索
  this.searchProfession='/carrots-ajax/a/profession';
  //单个公司搜索
  this.searchCompany='/carrots-ajax/a/company/:id';
  //单个职位搜索
  this.getSingleProfession='/carrots-ajax/a/profession/:id';
});

carrotsFront.service('ajax',function($resource,ajaxAddress){

  var banner=$resource(ajaxAddress.getBanner);
  var profession=$resource(ajaxAddress.getProfession);
  var searchProfession=$resource(ajaxAddress.searchProfession);
  var company = $resource(ajaxAddress.getCompany);
  var getSingleProfession=$resource(ajaxAddress.getSingleProfession,{
    id:'@id'
  });
  var getSingleCompany=$resource(ajaxAddress.searchCompany,{
    id:'@id'
  });
  var getCompany=$resource(ajaxAddress.getCompany);
  return {
    //获取banner
    getBanner: banner.get,
    //获取职位列表（首页）
    getProfession: profession.get,
    //获取职位信息
    searchProfession: searchProfession.get,
    getCompany: company.get,
    searchProfession: searchProfession.get,
    //单个职位搜索
    getSingleProfession:getSingleProfession.get,
    //单个公司搜索
    getSingleCompany:getSingleCompany.get,
    //获取公司在招职位
    getCompany:getCompany.get
  }
});


carrotsFront.service('getData',function(saveData){
  //获取点击的参数 常量对象的键值名为type
  this.getDataType=function getData(array,index,dataArray,key,value,Json){
    if (index==0){
      dataArray.length=0;
    }else
    if (dataArray.length==0 || dataArray.indexOf(array[index].type)==-1){
      dataArray.push(array[index].type);
    }else{
        dataArray.splice($.inArray(array[index].type,dataArray), 1);//删除重复点击的参数
      }
    console.log(dataArray);
    saveData.saveData(key,value,Json)
  };
  //获取点击的参数 实现复选框效果
  this.checkbox=function(a,b,c){
    var i;
    c.forEach(function(item){
      if (item==a[b].type){
        i=true
      }
    });
    return i
  };
});

carrotsFront.service('saveData',function(){
  //将参数存本地
  this.saveData=function (key,value,Json){
    Json=JSON.stringify(value);
    sessionStorage.setItem(key,Json);
  }
});