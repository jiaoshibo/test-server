const express = require('express');
const bodyParser = require('body-parser');

//2. 创建服务器
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.sendStatus(200);  //让options尝试请求快速结束
  else
    next();
})

//3. 启动服务器
app.listen(8085, () => {
    console.log('express-server is running on port 8085');
});

//4. 监听浏览器请求
//app.post()  来监听post请求
//app.get()  来监听get请求

app.get('/index', (req, res) => {
    //end方法也是http模块提供的方法
    console.log(new Date(),req.query);
    res.send(req.query);
})

app.post('/index',(req, res) => {
  //end方法也是http模块提供的方法
  console.log(new Date(),req.body);
  res.send(req.body)
})
