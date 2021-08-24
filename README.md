# test-server

在与安卓的项目交互中，遇到了一个问题：就是安卓端调用我本地的web页面进行交互，我需要抓取安卓给web页发来的数据以便开发和调试，于是利用node写了一个服务器，通过调用node服务器的地址，获取安卓发来的数据，以便根据数据结果编写后续的代码逻辑。

## 使用

提供了两种请求方式：`get`和 `post`；请求成功打印传入的数据

``` js

// 将方法暴露至window，供安卓调用
window.exchangeToAndroid = exchangeToAndroid;

function exchangeToAndroid(data){
  axios.post('http://localhost:8085/index',data);

  // node 服务器控制台会打印 data
}

```