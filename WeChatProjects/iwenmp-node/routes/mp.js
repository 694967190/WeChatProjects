//--------------------------路由 mp.js---------------------
let express = require('express');
let router = express.Router();
let request = require('request');
let config = require('../util/config');
let util = require('../util/util');
let Sqlsever=require('../routes/Sqlsever');
var mysql  = require('mysql');
var schedule = require('node-schedule');
var token=require('../routes/token');
var sd = require('silly-datetime');


config = Object.assign({}, config.mp);

router.get('/getSession', (req, res) => { //get方法
    let code = req.query.code; //code值保存 从req.query.code获取的
    if (!code) { //如果code为空
        res.json(util.handleFail('code不能为空', 10001));
    } else {
        let sessionUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`//接口的字符串拼接
        request(sessionUrl, (err, response, body) => { //网络传输请求
            let result = util.handleResponse(err, response, body);//
            res.json(result);//返回json包
        })
    }
})

router.get("/login", (req, res) => {
    let userInfo = JSON.parse(req.query.userInfo);
    let app=[userInfo.openid];
    var sql='SELECT number FROM LIST WHERE openid=?';
    //var sql='SELECT * FROM LIST';
    if (!userInfo) {
        res.json(util.handleFail('用户信息不能为空'), 10002);
    }else {
        let insert='INSERT INTO LIST (openid,UserName) values (?,?)';
        let add=[userInfo.openid,userInfo.nickName];
        Sqlsever.Ins(insert,add);
        Sqlsever.Select(sql,app,function (result){
            let data=result;console.log("这里是回调函数:",data);
            if(!data){
                res.json({
                    code: 0,
                    data: {
                        userId:null,
                    },
                    message: "登录失败"
                })
            }else if(data.length>0){
                res.json({
                    code: 0,
                    data: {
                        userId:data[0].number,
                        openid:userInfo.openid
                    },
                    message: "登录成功"
                })
            }else{
                res.json({
                    //code: 0,
                    data: {
                        //userId:0,//[0].number,
                        openid:userInfo.openid
                    },
                    message: "第一次登录,请再点击一次登录按钮"
                })
            }


        });

        //

    }
})
router.get("/binding",(req,res)=>{
    let setdata = JSON.parse(req.query.data);
    //传三个值 openid 家长值parent 学生值 Children
    var sql='UPDATE LIST SET parent=?,Children=? WHERE openid=?'
    var add=[setdata.parent,setdata.Children,setdata.openid];
    if(!req){
        res.json(util.handleFail('绑定信息不能为空'), 10002);
    }else{
        Sqlsever.Ins(sql,add);
        res.json({
            data: {
                parent:setdata.parent,
                Children:setdata.Children,
            },
            message: "绑定成功"
        });
    }
})
router.get("/fasong",(req,res)=>{
    let fasa = JSON.parse(req.query.data);
    console.log("fasa是:",fasa);
    token.GetAccessToken(function (data){
        var token=data;
        var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');

        let messages =
            {
                touser:fasa.openid,//req.query.openId,//给某用户推送的openid
                template_id: 'ft3mC4zeJ3ARXSXHGhVuo7vMlLLvhv-QEh_abUrOvwM',//订阅模板id（上面提到的）
                data: {
                    thing1: {
                        value:"学校"
                    },
                    phrase3: {
                        value: "学校"
                    },
                    time4: {
                        value:time
                    },
                    thing5:{
                        value:fasa.Children
                    }
                }
            }
        const url = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token="+data.access_token;
        console.log(url)
        const options = {
            method: 'post',
            url: url,
            json: messages
        }
        request(options, function (err, resa, body) {
            if (err) {
                console.log("出现错误",err)
            } else {
                console.log(body,err)
                if(body.errcode==0){
                    res.json({
                        data: {
                        },
                        message: "发送成功"
                    });
                }else{
                    res.json({
                        data: {
                        },
                        message: "发送失败"
                    });
                }
            }

        })

    });

})

module.exports = router;