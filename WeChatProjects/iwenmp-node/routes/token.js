let express = require('express');
let router = express.Router();
let request = require('request');
let config = require('../util/config');
let Sqlsever=require('../routes/Sqlsever');
var mysql  = require('mysql');
var schedule = require('node-schedule');
var sd = require('silly-datetime');

config = Object.assign({}, config.mp);
module.exports.GetAccessToken = function(callback) {
    var self = this
    let option = {
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        qs: {
            grant_type: 'client_credential',
            appid: config.appId,
            secret: config.appSecret
        },
        method: 'GET',
        headers: {
            "content-type": "application/json"
        }
    }
    return new Promise((resolve, reject) => {
        request(option, function(error, response, body) {
            //console.log("错误是:",error,"token是:", body)
            var data = JSON.parse(body)
            if (error) {
                reject(error)
                switch(data.errcode) {
                    case 45009:
                        console.log('token调用上限')
                        reject(data)
                        break
                }
            } else {
                        self.accessToken = {
                            access_token: data.access_token,
                            expires_in: data.expires_in
                        }
                        console.log('当前access_token', JSON.stringify(self.accessToken))
                        // 定时重新获取access_token
                        clearTimeout(this.getAccessTokenTimer)
                        this.getAccessTokenTimer = setTimeout(() => {
                            self.GetAccessToken(callback)
                            var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
                            console.log("重刷新token成功,当前token为",data,"刷新时间为:",time)
                        }, (data.expires_in - 60) * 1000 || 60000)
                        resolve(data.access_token)
                        return callback(data);

            }
        })
    })
}