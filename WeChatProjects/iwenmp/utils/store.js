// 存储数据:
//       Storage信息存储

module.exports={
  /**
   * 
   * 设置值
   * key:value
   * {
   *    userinfo:{
   *      key:value
   * }
   * }
   */
  setItem(key,value,module_name){
      if(module_name){ //判断module_name内是否有数据
        let module_name_info=this.getItem(module_name); //创建中继变量 module_name_info 
        module_name_info[key]=value; //不懂
        wx.setStorageSync(module_name, module_name_info)//将中继变量存入实际使用变量中
      }else{
        wx.setStorageSync(key, value)//存入
      }
  },
  getItem(key,module_name){ //getItem函数
    if(module_name){//如歌module_name有值的话
      let val=this.getItem(module_name); //val=module_name
      if(val)return val[key];  //val如果有值 返回val[key]
      return ""; //返回一个空 防止不返回导致调用失败
    }else{
      return wx.getStorageSync(key); //如果没有值返回将key写进缓存的操作
    }
  },
  clear(key){
    key?wx.removeStorageSync(key):wx.clearStorageSync();
  },
  getSystemInfo(){
    return wx.getSystemInfoSync();
  }
}