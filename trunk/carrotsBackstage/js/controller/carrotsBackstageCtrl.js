
// 登录控制器
carrotsBackstage.controller('login',function($state,ajax,$cookieStore){
  var ctrl = this;
  ctrl.login = function() {
    params = {
      name: ctrl.name,
      pwd: ctrl.pwd
    }
    ajax.login(params)(function(res){
      ctrl.data = res.data;
      ctrl.message = res.message;
      if (res.code === 0){
        $state.go('homepage.welcome');
        $cookieStore.put('person',ctrl.data);

      }
    });
  }
});
// homepage控制器
carrotsBackstage.controller('homepage',function($state,ajax,loginOrNot,$cookieStore){
  var ctrl = this;
  // 获取cookie,验证是否登录
  ctrl.person = loginOrNot.judge();  
  // 注销登录
  ctrl.loginOut = function() {
    ajax.logOut();
    $cookieStore.remove('person');
    $state.go('login')
  }
});
// 公司信息控制器
carrotsBackstage.controller('companyInfo',function(con,CITY,PROVINCE,COUNTY,ajax){
  var ctrl=this;
  ctrl.companyIndustry='';
  ctrl.industry=con.industry;
  ctrl.city=CITY;
  ctrl.province=PROVINCE;
  ctrl.county=COUNTY;
  ctrl.financing=con.financing;
  ctrl.approved=con.approved;
  ctrl.freezed=con.freezed;
  //ctrl.getCompany=function(){
  //  ajax.getCompany()
  //};
  //ctrl.getCompany();
});
// //////////////账号管理控制器
carrotsBackstage.controller('account',function(ajax,$state){
  var ctrl=this;
  ctrl.judge = false;
  ctrl.getTotal = function(){
    ajax.getManagerList({page:1,size:1000},function(res){
      ctrl.items = res.data.total;
    });
    ajax.getManagerList({page:1,size:100},function(res){
      ctrl.managers = res.data;
      ajax.getManagers(ctrl.managers,function(res){
        ctrl.managerListAll = res.data.managerList;
      })
    })
  };
  // manager过滤器
  ctrl.managerFilter = function(){
    ajax.getManagers(ctrl.managers,function(res){
      ctrl.managerList = res.data.managerList;
      angular.forEach(ctrl.managerList,function(item){
        angular.forEach(ctrl.roleList,function(b){
          if(item.roleID === b.id){
            item.roleID = b.name;
          }
        });
        angular.forEach(ctrl.managerListAll,function(a){
          if(item.createBy === a.id){
            item.createBy = a.name
          };
          if(item.updateBy === a.id){
            item.updateBy = a.name
          };
        });
      });
    })
  };
  ctrl.getInfo = function(page,size,role) {
  // 获取角色信息
    ajax.getRoleList({page:1,size:100},function(res){
      ctrl.roles = res.data;
      ajax.getRoles(ctrl.roles,function(res){
        ctrl.roleList = res.data.roleList;
      });
    });
    // 获取用户信息
    if(!!role){
      ajax.getManagersByRole({id:role},function(res){
        ctrl.managers = res.data;
        ctrl.items = res.data.total;
        ctrl.managerFilter();
      })
    }
    else{
      ajax.getManagerList({page:page,size:size},function(res){
        ctrl.managers = res.data;
        ctrl.managerFilter();
      })
    }
  };
  // 获取用户数据总长
  ctrl.getTotal();
  // 初始化
  ctrl.getInfo(1,10);
  // 换页
  ctrl.pageChange = function() {
    ctrl.getInfo(ctrl.page,10,ctrl.role)
  };
  // 搜索
  ctrl.search = function(){
    ctrl.getInfo(1,10,ctrl.role)
  };
  // 清空
  ctrl.clear = function(){
    ctrl.role='';
    ctrl.page = 1;
    ctrl.getTotal();
    ctrl.getInfo(1,10)
  };
  // 删除
  ctrl.delete = function(id){
    // 模态框
    ajax.deleteManager({id});
    ctrl.getInfo(1,10);
  };
  // 新增
  ctrl.add = function(){
    $state.go('homepage.accountadd')
  };
  ctrl.editor = function(id){
    $state.go('homepage.accountadd',{Id:id})
  }
});
// ///////////////新增或编辑账户
carrotsBackstage.controller('accountAdd',function(ajax,$state,$stateParams,addOrEditor){
  var ctrl = this;
  // 获取传参信息
  var promise = addOrEditor.judge($stateParams.Id,ajax.getManager,{data:{manager:{}}});
  promise.then(function(res){
    ctrl.manager = res.data.manager;
    console.log(ctrl.manager);
  });
  // 获取角色信息
  ajax.getRoleList({page:1,size:100},function(res){
    ctrl.roles = res.data;
    ajax.getRoles(ctrl.roles,function(res){
      ctrl.roleList = res.data.roleList;
    });
  });
  // 判断是新增页面还是编辑
  ctrl.new = function(){
    if(!!$stateParams.Id){
      console.log('editor');
      ajax.putManager($stateParams.Id,ctrl.manager)(function(res){
        alert(res.message);
        $state.go('homepage.account');
      })
    }
    else{
      console.log('add');
      ajax.newManager(ctrl.manager,function(res){
        alert('新增成功');
        $state.go('homepage.account');
      })
    }
  }
});
// ／／／／／／／／角色管理
carrotsBackstage.controller('role',function(ajax,$state){
  var ctrl = this;
  // 获取初始值
  ctrl.getTotal = function(){
    ajax.getRoleList({page:1,size:1000},function(res){
      ctrl.items = res.data.ids.length;
    });
  };
  ctrl.getInfo = function(page,size){
  // 获取角色信息
    ajax.getRoleList({page:page,size:size},function(res){
      ctrl.roles = res.data;
      ajax.getRoles(ctrl.roles,function(res){
        ctrl.roleList = res.data.roleList;  
        ctrl.managerFilter();
        console.log(ctrl.roleList);
      });
    });
  };
  // creater过滤器
  ctrl.managerFilter = function(){
    ajax.getManagerList({page:1,size:100},function(res){
      ctrl.managers = res.data;
      ajax.getManagers(ctrl.managers,function(res){
        ctrl.managerListAll = res.data.managerList;
        angular.forEach(ctrl.roleList,function(item){
          angular.forEach(ctrl.managerListAll,function(a){
            if(item.createBy === a.id){
              item.createBy = a.name
            };
            if(item.updateBy === a.id){
              item.updateBy = a.name
            };
          });
        });
      })
    })
  };
  //换页
  ctrl.pageChange = function() {
    ctrl.getInfo(ctrl.page,10)
  };
  // 删除
  ctrl.delete = function(d){
    // 模态框！！！！！！
    ajax.deleteRole({id:d});
    ctrl.getInfo(ctrl.page,10)
  }
  //新增
  ctrl.add = function(){
    $state.go('homepage.roleAdd')
  };
  // 编辑
  ctrl.editor = function(id){
    $state.go('homepage.roleAdd',{Id:id})
  };
  ctrl.getTotal();
  ctrl.getInfo(1,10);
});
// 新增或者编辑角色
carrotsBackstage.controller('roleAdd', function(ajax,$state,$stateParams,loginOrNot,addOrEditor){
  var ctrl = this;
  {data:{manager:{}}}
  // 获取传参信息,获取当前角色权限
  var promise = addOrEditor.judge($stateParams.Id,ajax.getRole,{data:{role:{permissionsSet:{}}}});
  promise.then(function(res){
    ctrl.role = res.data.role;
    console.log(ctrl.role);
    console.log(ctrl.role.permissionsSet);
  });

  ctrl.getInfo = function(){
    // 获取所有模块
    ctrl.moduleP = [];
    ajax.getModule({page:1,size:1000},function(res){
      ctrl.modules = res.data.ids;
      ctrl.module = '';
      angular.forEach(ctrl.modules,function(item){
        ctrl.module = ctrl.module+'ids='+item+'&';
      });
      ajax.getModules(ctrl.module)(function(res){
        ctrl.moduleList = res.data.moduleList;
        console.log(ctrl.moduleList);
        angular.forEach(ctrl.moduleList,function(item){
          // 获取父模块id，name
          if(item.parentID === 0){
            ctrl.moduleP.push({id:item.id,name:item.name,c:[]})
          };
        });
        angular.forEach(ctrl.moduleList,function(item){
          // 获取子模块的id，name
          angular.forEach(ctrl.moduleP,function(p){
            if(item.parentID === p.id){
              p.c.push({id:item.id,name:item.name,c:[]});
            }
          });
        });
        console.log(ctrl.moduleP);
      })
    })
  };
  // 全选
  ctrl.chan = function(b){
    angular.forEach(ctrl.moduleP,function(items){
      angular.forEach(items.c,function(item){
        if(b){
          ctrl.role.permissionsSet[item.id] = ['create', 'update', 'delete', 'sort'];
        }
        else{
          ctrl.role.permissionsSet[item.id] = [];
        }
      });
    });
    console.log(ctrl.role.permissionsSet);

  };
  // 上一级选中之后全选权限
  ctrl.chang = function(id,b){
    angular.forEach(ctrl.moduleP,function(items){
      if(items.id === id){
        angular.forEach(items.c,function(item){
          if(b){
            ctrl.role.permissionsSet[item.id] = ['create', 'update', 'delete', 'sort'];
          }
          else{
            ctrl.role.permissionsSet[item.id] = [];
          }
        })
      }
    })
    console.log(ctrl.role.permissionsSet);
  };
  // 选中之后全选权限
  ctrl.change = function(id,b){
    if(b){
      ctrl.role.permissionsSet[id] = ['create', 'update', 'delete', 'sort'];
    }
    else{
      ctrl.role.permissionsSet[id] = [];
    }
    console.log(ctrl.role.permissionsSet);
  };
  ctrl.changes = function(a,b,id){
    var c = ['create','update','delete','sort'];
    if(b){
      ctrl.role.permissionsSet[id][a] = c[a];
    }
    else{
      ctrl.role.permissionsSet[id].splice([a],1);
    }
    console.log(ctrl.role.permissionsSet);
  };
  ctrl.new = function(){
    if(!!$stateParams.Id){
      console.log('editor');
      ajax.putRole($stateParams.Id)(ctrl.role,function(res){
        alert(res.message);
        if(res.code === 0){
          $state.go('homepage.role');
        }
        else{
          return false
        }
      })
    }
    else{
      ajax.newRole(ctrl.role,function(res){
        alert(res.message);
        if(res.code === 0){
          $state.go('homepage.role');
        }
        else{
          return false
        }
      })
    }
  }
  ctrl.getInfo();

});
// ///////////修改密码
carrotsBackstage.controller('pwd',function(ajax,$state,$cookieStore){
  var ctrl = this;
  ctrl.save = function(){
    ajax.modifyPwd(ctrl.manager)(function(res){
      alert(res.message+'请重新登录');
      $cookieStore.remove('person');
      $state.go('login');
    })
  }
});
carrotsBackstage.controller('module',function(ajax,$state){
  var ctrl = this;
  ctrl.getInfo = function(page){
    // 获取所有模块
    ctrl.moduleP = [];
    ajax.getModule({page:page,size:10},function(res){
      ctrl.modules = res.data.ids;
      ctrl.items = res.data.total;
      ctrl.module = '';
      angular.forEach(ctrl.modules,function(item){
        ctrl.module = ctrl.module+'ids='+item+'&';
      });
      ajax.getModules(ctrl.module)(function(res){
        ctrl.moduleList = res.data.moduleList;
      })
    })
  }
  ctrl.getInfo();
  // 分页
  ctrl.pageChange = function(){
    ctrl.getInfo(ctrl.page);
  };
  // 删除
  ctrl.delete = function(d){
    // 模态框！！！！！！
    ajax.deleteModule({id:d});
    ctrl.getInfo(ctrl.page,10)
  }
  //新增
  ctrl.add = function(){
    $state.go('homepage.moduleAdd')
  };
  // 编辑
  ctrl.editor = function(id){
    $state.go('homepage.moduleAdd',{Id:id})
  };
})
// ////////////////////新增模组
carrotsBackstage.controller('moduleAdd',function(ajax,$state,addOrEditor,$stateParams){
  var ctrl = this;
  // 获取传参信息,获取当前模块信息
  var promise = addOrEditor.judge($stateParams.Id,ajax.getSModule);
  promise.then(function(res){
    ctrl.module = res.data.module;
    console.log(ctrl.module);
  });
  ctrl.save = function(){
    if(!!$stateParams.Id){
      console.log('editor');
      // 序列化
      params = $.param(ctrl.module);
      ajax.putModule($stateParams.Id+'/')(params,function(res){
        alert(res.message);
        if(res.code === 0){
          $state.go('homepage.module');
        }
        else{
          return false
        }
      })
    }
    else{
      console.log('add');
      params = $.param(ctrl.module);
      ajax.newModule()(params,function(res){
        alert(res.message);
        if(res.code === 0){
          $state.go('homepage.module');
        }
        else{
          return false
        }
      })
    }
  }
})
// 获取登录角色的权限
// ctrl.person = loginOrNot.judge();
// console.log(ctrl.person.role.id);
// ajax.getRole({id:ctrl.person.role.id},function(res){
//   ctrl.role = res.data.role;
// });