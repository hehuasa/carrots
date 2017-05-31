// 角色id过滤


// 用户ID过滤
carrotsBackstage.filter('managers',function(ajax){
    var managers,manager;
    ajax.getManagerList({page:1,size:100},function(res){
      managers = res.data;
      ajax.getManagers(managers,function(res){
      manager = res.data.managerList;
        return function(mng){
          angular.forEach(manager, function(item){
            if (mng === item.id){
              return mng = item.name
            }
          })
        }
      })
    });
});