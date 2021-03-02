//--------------------sql模块类 SqlSever.js-----------------
var mysql  = require('mysql');
let config = require('../util/config');
module.exports.Ins = function(sql,user) {
       var connection = mysql.createConnection({
           host     : 'localhost',
           user     : 'root',
           password : 'root',
           port: '3306',
           database: 'scancode'
       });
       connection.connect();
       connection.query(sql,user,function (err,result){
           if(err) {
               return console.log('[执行出错]', err.message,user);
           }else{
               return console.log("执行成功",user);
               connection.end();
           }
       })

  }
module.exports.Select = function(sql,user,callback) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port: '3306',
        database: 'scancode'
    });
    connection.connect();
    connection.query(sql,user, function(err,result){
        if(err) {
            return console.log('[查询出错]', err.message);
        }else{
           // console.log('The solution is: ', result[0].number);
            //callback(result[0].number);
            return callback(result);
        }
    })

}

