const proxyConfig = require('./proxyConfig');
let temp = proxyConfig.distList.list;
let express = require('express');
let proxyMiddleWare = require('http-proxy-middleware');
let app = express();
let newOpen = require('child_process');
let path = require('path')
app.use(express.static(path.resolve(__dirname, '../dist')));
if (temp.length > 0) {
    for (let i = 0;i < temp.length;i++) {
        let pt={};
        pt['^'+temp[i].api]="/";
        app.use(
            temp[i].api,
            proxyMiddleWare({ target: temp[i].url, changeOrigin: true,pathRewrite:pt})
        );
    }
}

app.listen(proxyConfig.distList.port);
newOpen.exec('start http://localhost:'+proxyConfig.distList.port);
console.log('Your application is running here: http://localhost:'+proxyConfig.distList.port);
