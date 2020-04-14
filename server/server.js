var fs=require('fs');
var path = require('path'); //系统路径模块
console.log(__dirname+"\test.json")
var file = "./test.json"
// var result=JSON.parse(fs.readFileSync(file));
// console.log(result)


const express = require('express');
const app = express();
var allowCrossDomain = function(req, res, next) {//设置response头部的中间件
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');//8089是vue项目的端口，这里相当于白名单
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  };
app.use(allowCrossDomain);
app.get('/',(req,res) => res.send('hello word!'));
app.get('/p',(req,res) => {
    fs.readFile(file,function(err,data){
        if(err){
            res.send(err);
        }
        console.log(file)
        res.json(JSON.parse(data.toString()));
    })
})
var port = 5500
app.listen(port,() => console.log('listening on port '+port))
