/**
 * Created by Administrator on 2017/5/13.
 */
carrotsBackstage.service('ajaxAddress',function(){
  // 登录
  this.login = '/carrots-admin-ajax/a/login';
  // 登出
  this.logOut = '/carrots-admin-ajax/a/logout';
  //获取banner图
  this.getBanner='/carrots-ajax/a/article/search';
  //获取职位信息
  this.getProfession='/carrots-admin-ajax/a/profession/search';
  //获取公司列表
  this.getCompany='/carrots-admin-ajax/a/company/search';
  //获取产品信息
  this.getProduct='/carrots-admin-ajax/a/company/product/search';
  //查询某一公司某一产品的某一职位的具体信息
  this.getCompanyProductProfession='/carrots-admin-ajax/a/company/product/profession/search';
  // 职位搜索
  this.searchProfession='/carrots-admin-ajax/a/profession';
  //单个公司搜索
  this.searchCompany='/carrots-admin-ajax/a/company/:id';
  //单个职位搜索
  this.getSingleProfession='/carrots-admin-jax/a/profession/:id';

  // 获取单个用户的详细信息
  this.getManager = '/carrots-admin-ajax/a/u/manager/:id';
  // 获取用户列表
  this.getManagerList ='/carrots-admin-ajax/a/u/manager/?';
  // 批量获取用户信息
  this.getManagers = '/carrots-admin-ajax/a/u/multi/manager/?';
  // 根据ID获取单个角色的角色及权限
  this.getRole='/carrots-admin-ajax/a/u/role/:id';
  // 查看角色列表
  this.getRoleList = '/carrots-admin-ajax/a/u/role/?';
  // 删除角色
  this.deleteRole = '/carrots-admin-ajax/a/u/role/:id';
  // 批量获取角色信息
  this.getRoles = '/carrots-admin-ajax/a/u/multi/role/?';
  this.getManagersByRole = '/carrots-admin-ajax/a/u/role/:id/manager';
  this.deleteManager = '/carrots-admin-ajax/a/u/manager/:id';
  this.NewManager ='/carrots-admin-ajax//a/u/manager';
  this.putManager ='/carrots-admin-ajax/a/u/manager/';
  // 获取单个模组信息
  this.getModule = '/carrots-admin-ajax/a/u/module/:id';
  // 获取模组列表
  this.moduleList = '/carrots-admin-ajax/a/u/module/?';
  // 批量获取模组权限
  this.modules = '/carrots-admin-ajax/a/u/multi/module/?';
  // 修改密码
  this.pwd = '/carrots-admin-ajax/a/u/pwd';
  // 删除模块
  this.deleteModule = '/carrots-admin-ajax/a/u/module/:id';
  // 修改模块
  this.putModule = '/carrots-admin-ajax/a/u/module/:id';
  // 新增模块
  this.newModule = '/carrots-admin-ajax/a/u/module/';

});

carrotsBackstage.service('ajax',function($resource,ajaxAddress){
  var logOut = $resource(ajaxAddress.logOut);
  var banner=$resource(ajaxAddress.getBanner);
  var profession=$resource(ajaxAddress.getProfession);
  var searchProfession=$resource(ajaxAddress.searchProfession);
  var getSingleProfession=$resource(ajaxAddress.getSingleProfession,{
    id:'@id'
  });
  var getSingleCompany=$resource(ajaxAddress.searchCompany,{
    id:'@id'
  });
  // 删除
  var deleteModule= $resource(ajaxAddress.deleteModule,{id:'@id'});
  //账户
  var getCompany=$resource(ajaxAddress.getCompany);
  var getManager = $resource(ajaxAddress.getManager,{id:'@id'});
  var getManagerList = $resource(ajaxAddress.getManagerList);
  var getManagers = $resource(ajaxAddress.getManagers);
  var deleteManager = $resource(ajaxAddress.deleteManager,{id:'@id'});
  var newManager = $resource(ajaxAddress.NewManager);
  // 角色
  var getRole = $resource(ajaxAddress.getRole,{id:'@id'});
  var getRoleList = $resource(ajaxAddress.getRoleList);
  var getRoles = $resource(ajaxAddress.getRoles);
  var deleteRole = $resource(ajaxAddress.deleteRole,{id:'@id'});
  var getManagersByRole = $resource(ajaxAddress.getManagersByRole,{id:'@id'});

  // 模组
  var getSModule = $resource(ajaxAddress.getModule,{id:'@id'});
  var getModule = $resource(ajaxAddress.moduleList);
  var getModules = $resource(ajaxAddress.modules);
  var newModule = $resource(ajaxAddress.newModule);
  return {
    // 登录
    login: 
      function(p){
        var a = $resource(ajaxAddress.login,p,
         {charge:{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}}});
      return a.charge
      },
    // 修改账户信息
    putManager: 
      function(d,p){
        var a = $resource(ajaxAddress.putManager+d,{},
          {put:{method:'PUT',params:p,headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}}});
        return a.put;
      },
    // 批量获取模组权限
    getModules: 
      function(p){
        var a = $resource(ajaxAddress.modules+p);
        return a.get;
      },
      // 修改密码
    modifyPwd:
      function(p){
        var a = $resource(ajaxAddress.pwd,{},
          {put:{method:'PUT',params:p,headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}}});
        return a.put;
      },
      // 修改模块
    putModule:
      function(d){
        var a = $resource(ajaxAddress.putModule,{id:d},
        {put:{method:'PUT',params:{},headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}}});
        return a.put;
      },
      // 增加模块
      newModule: function(){
        var a = $resource(ajaxAddress.newModule,{},
          {post:{method:'POST',params:{},headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}}});
        return a.post
      },
      // 修改角色信息
      putRole: function(d){
        var a = $resource(ajaxAddress.deleteRole,{id:d},
          {put:{method:'PUT'}});
        return a.put;
      },
    // 通过roleId获取账户信息
    getManagersByRole: getManagersByRole.get,
    // 注销
    logOut:logOut.save,
    // 删除管理
    deleteManager: deleteManager.delete,
    //获取banner
    getBanner: banner.get,
    //获取职位列表（首页）
    getProfession: profession.get,
    //获取职位信息
    searchProfession: searchProfession.get,
    //单个职位搜索
    getSingleProfession:getSingleProfession.get,
    //单个公司搜索
    getSingleCompany:getSingleCompany.get,
    //获取公司在招职位
    getCompany:getCompany.get,
    // 获取角色信息
    getRole:getRole.get,
    // 查看角色列表
    getRoleList: getRoleList.get,
    // 新增角色
    newRole: getRoleList.save,
    // 删除角色
    deleteRole: deleteRole.delete,
    // 批量获取角色信息
    getRoles: getRoles.get,
    // 获取单个用户的详细信息
    getManager: getManager.get,
    // 获取用户列表
    getManagerList: getManagerList.get,
    // 批量获取用户信息
    getManagers: getManagers.get,
    // 新增账户
    newManager: newManager.save,
    // 获取模组信息
    getModule:  getModule.get,
    // 删除模组
    deleteModule: deleteModule.delete,
    // 获取单个模组信息
    getSModule: getSModule.get,
  }
});
// 判断是否登录过
carrotsBackstage.factory('loginOrNot',function($cookieStore,$state){
  return{
    judge: function(){
      if(!!$cookieStore.get('person')){
        return person = $cookieStore.get('person');
      }
      else{
        alert('您还为登录，请先登录');
        $state.go('login')
      }
      return person
    },
  }
});
// 判断新增还是编辑
carrotsBackstage.factory('addOrEditor',['$q',function($q){
  return {
    judge:function(id,resource,a){
      var deferred = $q.defer();
      if(id){
        resource({id},function(res){
          deferred.resolve(res);         
        })
      }
      else{
        return $q.when(a);
      }
      return deferred.promise;
    }
  }
}]);
// 获取角色信息
// carrotsBackstage.factory('role',function(ajax){
//   return{
//     role: function(){
//     // 获取角色信息
//       ajax.getRoleList({page:1,size:100},function(res){
//         ctrl.roles = res.data;
//         ajax.getRoles(ctrl.roles,function(res){
//           ctrl.roleList = res.data.roleList;
//         });
//       });
//     }
//   }
// })


//carrotsFront.service('getData',function(saveData){
//  //获取点击的参数 常量对象的键值名为type
//  this.getDataType=function getData(array,index,dataArray,key,value,Json){
//    if (index==0){
//      dataArray.length=0;
//    }else
//    if (dataArray.length==0 || dataArray.indexOf(array[index].type)==-1){
//      dataArray.push(array[index].type);
//    }else{
//      dataArray.splice($.inArray(array[index].type,dataArray), 1);//删除重复点击的参数
//    }
//    console.log(dataArray);
//    saveData.saveData(key,value,Json)
//  };
//  //获取点击的参数 实现复选框效果
//  this.checkbox=function(a,b,c){
//    var i;
//    c.forEach(function(item){
//      if (item==a[b].type){
//        i=true
//      }
//    });
//    return i
//  };
//});
//
//carrotsFront.service('saveData',function(){
//  //将参数存本地
//  this.saveData=function (key,value,Json){
//    Json=JSON.stringify(value);
//    sessionStorage.setItem(key,Json);
//  }
//});