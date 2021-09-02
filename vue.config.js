const path = require('path');
module.exports = {
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://localhost:3000/',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
  runtimeCompiler: true
};
