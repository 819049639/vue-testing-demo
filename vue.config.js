/*
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 11:43:47
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-20 14:08:20
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/vue-testing-demo',
  devServer: {
    historyApiFallback: true
  }
})
