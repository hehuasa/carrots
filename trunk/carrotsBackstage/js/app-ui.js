/**
 * Created by Administrator on 2017/4/15.
 */
//主模块
angular.module('test', ['ui.router', 'ng.ueditor', 'ui.date'])
    //路由
    .config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when("", "/homepage/wel");
        $stateProvider
        //首页
            .state("homepage", {
                url: '/homepage',
                templateUrl: "../task8/js-task8-tab.html",
                controller: "mytab"

            })
            //欢迎页
            .state("homepage.wel", {
                url: '/wel',
                templateUrl: "../task8/js-task8-wel.html"

            })

            //列表页
            .state("homepage.list", {
                url: "/list",
                templateUrl: '../task8/js-task8-list.html',
                controller: "myctrl"

            })
            //编辑或新增页
            .state("homepage.add", {
                url: "/add/?id",
                params: {data: null},
                templateUrl: " ../task8/js-task8-addArticle.html",
                controller: "upload"
            });
    })

    .controller("mytab", function ($scope, $http) {
        //获取权限
        $http({
            method: "POST",
            url: "/carrots-admin-ajax/a/login",
            data: "name=" + "admin" + "&pwd=" + "123456",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(function successCallback(response) {
                console.log(response.data);
                $scope.account = response.data.data.manager.name;
                $scope.role = response.data.data.role.name;
            });
        //退出登录
        $scope.loginout = function () {
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/logout'
            }).then(function () {
                if (confirm("确认退出吗？")) {
                    window.location = "../task3/js-task3.html"
                }

            })
        };


        //为下拉菜单绑定的事件，用于小箭头的效果切换
        $scope.show = function () {
            var a = event.target;
            var left = a.getElementsByClassName("glyphicon-chevron-left")[0];
            var right = a.getElementsByClassName("glyphicon-chevron-down")[0];
            console.log($scope.left);
            if (a.nextElementSibling.style.display === "") {
                a.nextElementSibling.style.display = "block";
                left.style.display = "none";
                right.style.display = "block";
            }
            else {
                a.nextElementSibling.style.display = "";
                left.style.display = "block";
                right.style.display = "none";
            }
        }
    })

    .controller("myctrl", function ($scope, $http, $state) {


        $scope.page = "1";
        $scope.size = "10";
        $scope.startTime = "";
        $scope.endTime = "";
        $scope.state = "全部";
        $scope.states = ["全部", "上线", "草稿"];
        $scope.type = "全部";
        $scope.types = ["全部", "首页banner", "寻找精英banner", "寻找职位banner", "行业大图"];


        //input 时间插件
        $.extend($.datepicker.regional, {
            'zh-CN': {
                closeText: '关闭',
                prevText: '<上月',
                nextText: '下月>',
                currentText: '今天',
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
                dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                weekHeader: '周',
                dateFormat: 'yy-mm-dd',
                firstDay: 0,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: '年'
            }
        });
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);


        //将搜索用的双向绑定值进行转换,同时避免直接修改双向绑定的默认值
        var state_;
        var type_;
        $scope.switch_state = function () {
            state_ = $scope.state;
            switch (state_) {
                case "全部":
                    state_ = "";
                    break;
                case "草稿":
                    state_ = 1;
                    break;
                case "上线":
                    state_ = 2;
                    break
            }

        };
        $scope.switch_type = function () {
            type_ = $scope.type;
            switch (type_) {
                case "全部":
                    type_ = "";
                    break;
                case "首页banner":
                    type_ = 0;
                    break;
                case "寻找精英banner":
                    type_ = 1;
                    break;
                case "寻找职位banner":
                    type_ = 2;
                    break;
                case "行业大图":
                    type_ = 3;
                    break;
            }

        };

        //获取服务器的企业列表
        $scope.http = function () {
            var time1;
            var time2;
            if ($scope.startTime == "") {
                time1 = $scope.startTime
            } else {
                time1 = new Date($scope.startTime).valueOf();
            }

            if ($scope.endTime == "") {
                time2 = $scope.endTime
            } else {
                time2 = new Date($scope.endTime).valueOf();
            }
            if(time2<time1){
                alert("开始时间不应大于结束时间");
                return
            }

            $http({
                method: "GET",
                url: '/carrots-admin-ajax/a/article/search?page=' + $scope.page + '&size=' + $scope.size + '&status=' + state_
                + '&type=' + type_ + '&startAt=' + time1 + '&endAt=' + time2
            }).then(function successCallback(response) {
                $scope.a = response.data.data.articleList;
                for (var z = 0; z < $scope.a.length; z++) {
                    if ($scope.a[z].status == 1) {
                        $scope.a[z].a = "上线";
                    } else if ($scope.a[z].status == 2) {
                        $scope.a[z].a = "下线";
                    }
                    $scope.a[z].b = "编辑";
                    $scope.a[z].c = "删除";
                }

                //计算总体页数,自动进行分页

                $scope.num = response.data.data.total;
                $scope.total_page = Math.ceil($scope.num / $scope.size);
                $scope.pages = new Array([$scope.total_page]);
                $scope.page_num = 1;
                for (var num = 0; num < $scope.total_page; num++) {
                    $scope.pages[num] = $scope.page_num;
                    $scope.page_num++
                }


            });
        };

        //默认加载一次获取企业列表的函数
        $scope.switch_state();
        $scope.switch_type();
        $scope.http();

        //数字按钮的页面跳转
        $scope.page_turn = function () {
            $scope.page = Number(event.target.innerText);
            $scope.switch_state();
            $scope.switch_type();
            $scope.http();
        };

        //企业列表中跳转首页
        $scope.page_first = function () {
            $scope.page = $scope.pages[0];
            $scope.switch_state();
            $scope.switch_type();
            $scope.http();
        };

        //企业列表中跳转末页
        $scope.page_final = function () {
            $scope.page = $scope.pages[$scope.total_page - 1];
            $scope.switch_state();
            $scope.switch_type();
            $scope.http();
        };

        //企业列表中跳转前一页
        $scope.page_last = function () {
            if ($scope.page == 1) {
                $scope.page = 1
            } else {
                $scope.page = $scope.page - 1;
            }
            $scope.switch_state();
            $scope.switch_type();
            $scope.http();
        };

        //企业列表中跳转后一页
        $scope.page_next = function () {
            if ($scope.page == $scope.pages[$scope.pages.length - 1]) {
                $scope.page = $scope.pages[$scope.pages.length - 1]
            } else {
                $scope.page = $scope.page + 1;
            }
            $scope.switch_state();
            $scope.switch_type();
            $scope.http();
        };

        //清除按钮
        $scope.clear = function () {
            $scope.page = "1";
            $scope.startTime = "";
            $scope.endTime = "";
            $scope.state = "全部";
            $scope.type = "全部";
            $scope.switch_state();
            $scope.switch_type();
            $scope.http()
        };

        //搜索按钮
        $scope.search = function () {
            $scope.page = "1";
            $scope.switch_state();
            $scope.switch_type();
            $scope.http()
        };


        //编辑article
        $scope.edit = function (id) {
            $http({
                method: "GET",
                url: '/carrots-admin-ajax/a/article/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8'
                }
            }).then(function success(response) {
                if (confirm("请确认操作")) {
                    $state.go('homepage.add', {data: response.data.data.article})
                }
            })

        };

        //上下线功能
        $scope.offline = function (id, status, index) {
            if (status === 1) {
                status = 2
            } else if (status === 2) {
                status = 1
            }
            console.log(status);
            $http({
                method: "PUT",
                url: '/carrots-admin-ajax/a/u/article/status',
                data: $.param({id: id, status: status}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8'
                }
            }).then(function () {
                $scope.switch_state();
                $scope.switch_type();
                if (confirm("请确认操作")) {
                    $scope.http();


                }
            });


        };

        //删除article
        $scope.delete = function (id) {
            $http({
                method: "delete",
                url: '/carrots-admin-ajax/a/u/article/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8'
                }
            }).then(function () {
                $scope.switch_state();
                $scope.switch_type();
                if (confirm("请确认操作")) {
                    $scope.http()
                }

            })

        }

    })

    .filter('type', function () {//过滤器
        return function (type) {
            if (type == "0") {
                type = "首页banner"
            } else if (type == "1") {
                type = "寻找精英banner"
            }
            else if (type == "2") {
                type = "寻找职位banner"
            }
            else if (type == "3") {
                type = "行业大图"
            }
            return type;
        }
    })

    .filter('state', function () {//过滤器
        return function (state) {
            if (state == 1) {
                state = "草稿"
            } else if (state == 2) {
                state = "上线"
            }
            return state
        }
    })

    .controller("upload", function ($scope, $http, $state, $stateParams) {
            console.log($stateParams.id);
            $scope.types = ["请选择", "首页banner", "寻找精英banner", "寻找职位banner", "行业大图"];
            $scope.types_child = ["请选择", "移动互联", "电子商务", "企业服务",  "O2O","教育", "金融", "游戏"];
            var file_input = document.getElementById("file_");//选择dom
            var img_view = document.getElementsByClassName("img-view");
            var disabled_div = document.getElementsByClassName("disabled");
            var progress_file = document.getElementById("progress_");
            var save_ = document.getElementById("save");
            var btn_upload = document.getElementById("btn_upload");
            var btn_del = document.getElementById("btn_del");
            var btn_online = document.getElementById("btn_online");


            $scope.img_load = function () {//判定预览图是否出现的表单验证
                return (img_view[0].style.display != "inline-block" &&
                disabled_div[0].style.display != "inline-block")

            };

function FirstPut(){
    if ($stateParams.id == null) {//判断接收的参数是否为null，并赋值
        $scope.form_tittle = "";
        $scope.from_url = "";
        $scope.form_type = "请选择";
        $scope.form_type_child = "请选择";
    } else {
        $http({
            method: "GET",
            url: '/carrots-admin-ajax/a/article/' + $stateParams.id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8'
            }}).then(function(e){
            $scope.uiData = e.data.data.article;
            console.log( $scope.uiData)
        }).then(function(){
            $scope.form_tittle = $scope.uiData.title;
            $scope.status = $scope.uiData.status;
            $scope.from_url =$scope.uiData.url;
            $scope.form_type = $scope.types[$scope.uiData.type + 1];
            $scope.form_type_child = $scope.types_child[$scope.uiData.industry + 1];
            if ($scope.form_type_child == undefined){
                $scope.form_type_child = "请选择";
            }

            $scope.form_text = $scope.uiData.content;
            $scope.imgsrc = $scope.uiData.img;
            img_view[0].style.display = "inline-block";
            disabled_div[0].style.display = "inline-block";
            $scope.img_load();
            console.log($scope.img_load())
        })



    }

}
        FirstPut();


            //设置二级联动菜单


            $scope.industry = function () {
                return (($scope.form_type == "行业大图"))
            };


            $scope.type = function () {
                return ( $scope.form_type == "请选择" || ($scope.form_type == "行业大图") && $scope.form_type_child == "请选择")
            };
            console.log($scope.type());


            function visible() {//上传图片后，相应元素设置为可见
                progress_file.style.display = "inline-block";
                save_.style.display = "inline-block";
                btn_upload.style.display = "inline-block";
                btn_del.style.display = "inline-block";
            }

            file_input.onchange = function () {
                $scope.file_list = file_input.files[0];// 提取所上传的文件信息用于显示
                $scope.file_size = Math.ceil(($scope.file_list.size) / 1024);

                var reader = new FileReader();
                for (var i = 0; i < this.files.length; i++) {
                    var file = this.files[i];
                    reader.readAsDataURL(file);
                }
                reader.onload = function (event) {

                        $scope.imgsrc = event.target.result;

                };


                reader.onprogress = function (pro) {
                    visible();
                };
                $scope.upload_ = function () {
                    img_view[0].style.display = "inline-block";
                    disabled_div[0].style.display = "inline-block";
                    $scope.img_load();

                    $scope.img_data = new FormData();//将图片的值传入formdata
                    $scope.img_data.append('file', $scope.file_list);
                    console.log(file);
                    if (btn_online.style.cursor == "not-allowed") {
                        return btn_online;
                    } else {
                        console.log(progress_file.value);

                        $http({//用angularhttp方法上传
                            method: "post",
                            url: '/carrots-admin-ajax/a/u/img/test',
                            data: $scope.img_data,
                            cache: false,
                            headers: {
                                'Content-Type': undefined
                            },
                            uploadEventHandlers: {
                                progress: function (e) {
                                    progress_file.value = e.loaded
                                }
                            }
                        }).then(function successCallback(response) {
                            console.log(progress_file.value);
                            $scope.responsecode = response.data.data.url;
                            console.log($scope.responsecode)
                        });

                        //var xhr; //原生xhr方法上传
                        //if (window.XMLHttpRequest){//判断浏览器是否支持
                        //    xhr=new XMLHttpRequest()
                        //}
                        //else {
                        //    xhr=new ActiveXObject("Microsoft.XMLHTTP");
                        //}
                        //xhr.open('post','/carrots-admin-ajax/a/u/img/test',true);
                        //xhr.send( $scope.img_data);
                        //
                        ////j检测POST状态
                        //xhr.onreadystatechange=function(){
                        //    if (xhr.readyState == 4){
                        //        if (xhr.status == 200){
                        //            var response=xhr.response;
                        //            console.log(response);
                        //
                        //        }
                        //    }
                        //};

                    }


                };
                $scope.del_ = function () {
                    var file = file_input.files;
                    reader.abort(file);
                    $scope.img_load = true;
                    img_view[0].style.display = "none";
                    disabled_div[0].style.display = "none";
                };
                $scope.$apply();//将非angular函数进行绑定
            };
            var type_;
            $scope.switch_type = function () {//将搜索用的双向绑定值进行转换,同时避免直接修改双向绑定的默认值

                type_ = $scope.form_type;
                switch (type_) {
                    case "首页banner":
                        type_ = 0;
                        break;
                    case "寻找精英banner":
                        type_ = 1;
                        break;
                    case "寻找职位banner":
                        type_ = 2;
                        break;
                    case "行业大图":
                        type_ = 3;
                        break;

                }
                return type_;
            };
            var child;
            $scope.type_child = function () {

                child = $scope.form_type_child;
                if ($scope.form_type == "行业大图") {
                    switch (child) {
                        case "移动互联":
                            child = 0;
                            break;
                        case "电子商务":
                            child = 1;
                            break;
                        case "企业服务":
                            child = 2;
                            break;
                        case "O2O":
                            child = 3;
                            break;
                        case "教育":
                            child = 4;
                            break;
                        case "金融":
                            child = 5;
                            break;
                        case "游戏":
                            child = 6;
                            break;
                    }
                } else {
                    child = ""
                }
                return child;
            };

        //put数据
        function put(){
            //设置编辑的图片地址
            var img;
            if ($scope.responsecode == undefined) {
                img = $scope.imgsrc
            }
            else {
                img = $scope.responsecode
            }
            $http({
                method: "PUT",
                url: '/carrots-admin-ajax/a/u/article/' + $scope.uiData.id,
                data: $.param({
                    id: $scope.uiData.id,
                    author: $scope.uiData.author,
                    title: $scope.form_tittle,
                    type: type_,
                    status: $scope.status,
                    img: img,
                    content: $scope.form_text,
                    url: $scope.from_url,
                    industry: child,
                    createBy: $scope.uiData.createBy,
                    updateBy: $scope.uiData.updateBy,
                    publishat: $scope.uiData.publishat,
                    updateAt: $scope.uiData.updateAt,
                    createAt: $scope.uiData.createAt
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8'
                }

            }) .then(function successCallback(response) {
                $scope.a = response.data.message;
                console.log($scope.a);
                $state.go('homepage.list')
            })
        }
        function http(){
            $http({
                method: "POST",
                url: '/carrots-admin-ajax/a/u/article',
                data: $.param({
                    title: $scope.form_tittle, type: type_, status: $scope.status, img: $scope.responsecode,
                    content: $scope.form_text, url: $scope.from_url, industry: child
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8'
                },
                uploadEventHandlers: {
                    progress: function (e) {
                        progress_file.value = e.loaded
                    }
                }

            }).then(function successCallback(response) {
                    $scope.a = response.data.message;
                    console.log($scope.a);
                    $state.go('homepage.list')
                }
            )
        }
            $scope.http = function () {
                if ($stateParams.id== null) {
                  http()

                }
                else {
                    put()

                }
            };
            $scope.save = function () {
                $scope.switch_type();
                $scope.type_child();
                $scope.status = 2;
                $scope.http()
            };
            $scope.draft = function () {
                $scope.switch_type();
                $scope.type_child();
                $scope.status = 1;
                $scope.http()
            };

        })

    .directive("turnPage",function(){
    return {
        restrict:"EA",
        replace:true,
        transclude:true,
        //scope:{
        //    pages:"=",
        //    size:"=",
        //    page:"=",
        //    page_first:"&",
        //    page_last:"&",
        //    page_turn:"&",
        //    page_next:"&",
        //    page_final:"&",
        //    http:"&"
        //
        //
        //
        //
        //},
        template:' <div class="page font-s"><form>每页显示 <input type="text" class="page-input" ng-model="size" > 条' +
        '</form><button type="button" ng-click="page_first()">首页</button><button type="button" ng-click="page_last()"><</button>' +
        '<button type="button"  ng-repeat="c in pages" ng-click="page_turn()">{{c}}</button>' +
        '<button type="button"ng-click="page_next()" >></button>' +
        '<button type="button"ng-click="page_final()">末页</button>' +
        '<form>去第 <input type="text"ng-model="page"> 页</form>' +
        '<button type="button" ng-click="http()">确定</button></div>'


    }
});
//    .directive("pageWarp",function(){
//       return{
//           restrict:'AE',
//           resplace:true,
//           transclude:true,
//           scope:{
//               pages:"=",
//               size:"=",
//               page:"=",
//               page_first:"&",
//               page_last:"&",
//               page_turn:"&",
//               page_next:"&",
//               page_final:"&",
//               http:"&"
//           },
//           template:'<div class="page font-s"></div>',
//
//           controller:function(){
//
//           }
//       }
//    });
