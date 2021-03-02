// pages/iwenblog/iwenblog.js
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


  gotobindinglog(){
    router.push("bindinglog")
  }
})