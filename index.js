const express = require("express");
const os = require("os");
const bodyParser = require("body-parser");

//2. 创建服务器
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options")
    res.sendStatus(200); //让options尝试请求快速结束
  else next();
});

//3. 启动服务器
app.listen(8085, () => {
  console.log("express-server is running on port 8085");
});

// 增加一个判断VM虚拟机的方法  
// 在上面方法的if中加上这个方法的返回判断就行了
function isVmNetwork (mac) {
  // 常见的虚拟网卡MAC地址和厂商
  let vmNetwork = [
      "00:05:69", //vmware1
      "00:0C:29", //vmware2
      "00:50:56", //vmware3
      "00:1C:42", //parallels1
      "00:03:FF", //microsoft virtual pc
      "00:0F:4B", //virtual iron 4
      "00:16:3E", //red hat xen , oracle vm , xen source, novell xen
      "08:00:27", //virtualbox
      "00:00:00", // VPN
  ]
  for (let i = 0; i < vmNetwork.length; i++) {
      let mac_per = vmNetwork[i];
      if (mac.startsWith(mac_per)) {
          return true
      }
  }
  return false;
}


function getIp() {
  let netDict = os.networkInterfaces();
  return netDict;
}

//4. 监听浏览器请求
//app.post()  来监听post请求
//app.get()  来监听get请求

app.get("/index", (req, res) => {
  //end方法也是http模块提供的方法
  console.log(new Date(), req.query);

  res.send(getIp());
});

app.post("/index", (req, res) => {
  //end方法也是http模块提供的方法
  console.log(new Date(), req.body);
  res.send(req.body);
});
