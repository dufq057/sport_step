module.exports = {
    devServer: {
        proxy: {
            '/v1': {
                // target: "http://api.520e.com.cn",
                target: "http://127.0.0.1:81",
                //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
                changOrigin: true,
            }
        },
        port: 8081,
        disableHostCheck:true
    },
}
