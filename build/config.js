const path = require('path');

const getPath = pathStr => path.resolve(__dirname, pathStr);

const isTest = process.env.npm_lifecycle_event.includes(':test');

module.exports = {
  srcPath: getPath('../src'),
  distPath: getPath('../dist'),
  publicPath: isTest ?
    '//112.109.215.18:8101/test/vip-consumer-m/' :
    '//cdn.dreamhiway.com/v14/vip-consumer-m/',
  templatePath: getPath('../public/index.html'),
  proxyTarget: 'http://192.168.2.17:8098',
};
