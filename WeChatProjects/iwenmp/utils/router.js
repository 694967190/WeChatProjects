/**
 * 路由跳转
 */
//创建一个映射关系
 const routePath={
   "index":"/pages/index/index",
   "iwenblog":"/pages/iwenblog/iwenblog",
   "bindinglog":"/pages/bindinglog/bindinglog",
   "control":"/pages/control/control",
   "state":"/pages/state/state"
 }

 module.exports={
   //this.$router.push("",{})
   push(path,option={}){ //path为前台跳转传过来的数值
      if(typeof path==='string'){ //判断path是否为字符串类型
        option.path=path;
      }else{
        option=path;
      }
      //获取url: "index"
      let url=routePath[option.path]; //url=字典内的[path path为返回值是数据option保存的就是path]
      let{query={},openType}=option; //query字典
      let params=this.parse(query);
      if(params){
        url+='?'+params;
      }
      this.to(openType,url);
   },
   to(openType,url){
     let obj={url};
     if(openType==='redirect'){
       wx.redirectTO(obj);
       
     }else if(openType==='reLaunch'){
        wx.reLaunch(obj);
     }else if(openType==='back'){
       wx.navigateBakc({
         delta:1  
       })
     }else{
       wx.navigateTo(obj);
     }
   },
   parse(data){ //data="index":"/pages/index/index" 
     let arr=[];//列表
     for(let key in data){ //key=data 从key字符串
       arr.push(key+'='+data[key])  //index======="/pages/index/index
     }
     return arr.join("&");
     
   }
 }