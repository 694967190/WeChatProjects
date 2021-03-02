##小程序介绍
1.api简介
2.演示功能
3.编写思维
  1.app.Js引入
  2.store.js 数据存储 实现
  3.router.js 路由
  4.request.js 网络请求
  5.app中引用
  ##小程序授权登录流程
    1.根据userId/或者openid判断当前用户是否登录
    2.调用wx.login获取到code
    3.调用服务器端根据code换取openid
    4.根据用户授权获取用户信息，存入后台数据库中 等待使用