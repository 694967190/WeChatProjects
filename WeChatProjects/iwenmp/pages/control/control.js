// pages/control/control.js
const app = getApp()
let store = require("../../utils/store.js")
let router = require("../../utils/router.js")
let Api = app.Api
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.requestSubscribeMessage({
      tmplIds: ['ft3mC4zeJ3ARXSXHGhVuo7vMlLLvhv-QEh_abUrOvwM'],
      success (res) { 
          console.log("获取授权成功");
      }
    })
  },
  chufa(s){
    app.get(Api.fasong,{
      data:{
        openid:store.getItem('openId'),
        Children:"王家骏"
      }
    }).then(res=>{
      console.log("调用接口成功");
    }).catch(err=>{
      console.log(err.message)
    })
  }
})