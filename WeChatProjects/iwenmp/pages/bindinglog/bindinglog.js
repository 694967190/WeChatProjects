// pages/bindinglog/bindinglog.js
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

  },
  Tieupone(e){
    this.setData({
      wx:wx.setStorageSync('parent', e.detail.value),
      UserName:e.detail.value
    })
  },
  Tieupto(e){
    this.setData({
      wx:wx.setStorageSync('Children', e.detail.value),
      UserName:e.detail.value
    })
  },
  handletap(s){
    let data=s.detail.data;
      app.get(Api.binding,{
          data:{
          openid:store.getItem('openId'),
          parent:store.getItem('parent'),
          Children:store.getItem('Children')
          }
      }).then(res=>{
        console.log("成功输出");
      }).catch(err=>{
        console.log(err.message)
      })
  }
})