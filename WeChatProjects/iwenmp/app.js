let Api = require("./http/api.js");
let request = require("./http/request.js");
let config = require("./env/index.js")
let router = require("./utils/router.js")
let env = "Test"; //设置公共文件的选择接口
App.version = "1.0.0";
App.config = config[env]; // 公共文件用的
App({
  config:config[env], //导入域名
  Api, //地址
  router, //路由
  get:request.fetch, //网络请求
  post:(url,data,option)=>{ //url 数据包 设置
    option.method="post"; //设置为post请求
    return request.fetch(url,data,option); //返回网络请求值
  },
  onLaunch:function(){
    
  }
})