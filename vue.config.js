const { defineConfig } = require('@vue/cli-service')
// vant
const { VantResolver } = require('@vant/auto-import-resolver');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
// 引入插件
const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin");


 
 

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [ 
      new NodePolyfillWebpackPlugin(),
      //ComponentsPlugin({ resolvers: [VantResolver()] }), // 当 unplugin-vue-components 版本小于 0.26.0
      ComponentsPlugin.default({ resolvers: [VantResolver()] }), //当 unplugin-vue-components 版本大于等于 0.26.0
    ],
  },
})
