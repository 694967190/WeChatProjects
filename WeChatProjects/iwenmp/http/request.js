const store = require("../utils/store.js");
/**
 * 网络请求的公共方法
 * 1.基本请求
 * 2.为了后续获取数据方便 promise处理
 * 3.对获取数据的状态处理:loadding toast
 * 4.对请求头的处理!! 机型 大小 系统 屏幕
 */

let stroe=require("../utils/store.js")
let system=store.getSystemInfo();
//-----------对请求头的处理----------------------------------------
const clientInfo={
  'clientType':"mp",
  "appnm":"iwen",
  "model":system.model,
  "os":system.system,
  "screen":system.screenWidth+"*"+system.screenHeight,
  "version": App.version,
  "chennel":"miniprogram"
}
//----------------------------------------------------------------
module.exports={
  fetch:(url,data={},option={})=>{  //先接收url 再接收data里面的数据 option是设置
    let{ loading=true,toast=true,method='get'}=option;//这是嘛啊
   return new Promise((resolve,reject)=>{//返回
     if(loading){
       wx.showLoading({
         title: '加载中....',
         mask:true
       })
     }
    let env=App.config.baseApi; //if(env=Dev)= baseApi:"http://localhost:3000" 
    wx.request({
      url:env+url, //url
      data, //数据包json
      method, //请求方法
      header:{ //头部文件
        "clientInfo":JSON.stringify(clientInfo) //转化为JSOn格式
      },
      success:function(result){ //成功后执行
        let res=result.data;  //{code:0,data"",message:""} 
        if(res.code==0){ // res.code==0的话
          if(loading){ //loading不=空
            wx.hideLoading(); //隐藏
          }
          resolve(res.data);//成功后的回调
        }else{
          if(toast){
            wx.showToast({
              mask:true,
              title: res.message,
              icon:"none"
            })
          }else{
            wx.hideLoading();
          }

        }
      },
      fail:function(e={code:-1,msg:errMsg,errMsg}){
        let msg=e.errMsg;
        if(msg=="request:fail timeout"){
          msg='请求超时，请稍后处理'
        }
        wx.showToast({
          title: msg,
          icon:"none"
        })
        reject(e);
      }
    })
   })
  }
}
