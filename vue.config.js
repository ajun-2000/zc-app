const { defineConfig } = require('@vue/cli-service')

// 引入vant 按需引入样式插件
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')

module.exports = defineConfig({
  transpileDependencies: true,
	
	// 服务
	devServer : {
		host : 'localhost',
		port : 8088,
		open : true
	},
	
	// 配置vant的样式
	configureWebpack: {
		plugins: [
			ComponentsPlugin({
				resolvers: [VantResolver()],
			}),
		],
	},
	//如果是开发环境启动项目要设置为默认的绝对路径
	//默认路径
	// publicPath : '/' 
	// 在打包时候设置为相对路径，
	// publicPath : '' 
	
	
	
	
})
