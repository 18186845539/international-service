// 配置反向代理
const ip = 'http://172.14.10.55:7140'; // 李天琦本机

module.exports = {
    // 开发环境的反向代理及服务器的端口号
    proxyList: {
        port: 7140,
        list: [
            {
                api: '/addCateGory',
                url: `${ip}/gjkfApi`
            }
        ]
    }
};
