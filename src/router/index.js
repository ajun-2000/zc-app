/*
 * @Author: 李俊 958269209@qq.com
 * @Date: 2022-11-03 09:38:38
 * @LastEditors: 李俊 958269209@qq.com
 * @LastEditTime: 2022-11-03 09:45:02
 * @FilePath: \vue-lcapp\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router' 
 
// 引入路由组件 
import NavbarView from '../views/NavbarView.vue' 
import LoginView from '../views/LoginView.vue' 
import IndexView from '../views/IndexView.vue' 
import ClassifyView from '../views/ClassifyView.vue' 
import CartView from '../views/CartView.vue' 
import UserView from '../views/UserView.vue' 
import SearchView from '../views/SearchView.vue' 
import ProductView from '../views/ProductView.vue' 
import ClassifyListView from '../views/ClassifyListView.vue' 
import RegisterView from '../views/RegisterView.vue' 
 
//配置路由 
let routes = [ 
	// 选项路由 
	{ 
		path : '/', 
		redirect : '/navbar/index' 
	}, 
	//商品详情路由页面 
	{ 
		path : '/product', 
		component : ProductView 
	}, 
	//商品分类列表路由页面 
	{ 
		path : '/classifylist', 
		component : ClassifyListView 
	}, 
	 
	{ 
		path : '/navbar', 
		component : NavbarView, 
		children : [ 
			{path : '/navbar/index', component : IndexView}, 
			{path : '/navbar/classify', component : ClassifyView}, 
			{path : '/navbar/cart', component : CartView}, 
			{path : '/navbar/user', component : UserView}, 
		] 
	}, 
	// 搜索路由页面 
	{ 
		path : '/search', 
		component : SearchView 
	}, 
	//登录路由页面 
	{ 
		path : '/login', 
		component : LoginView 
	},  
	//注册路由页面 
	{ 
		path : '/register', 
		component : RegisterView 
	}, 
] 
 
// 创建路由实例 
const router = createRouter({ 
	history : createWebHashHistory(),  
	routes, 
}) 
 
//设置一个路由挂载 
router.beforeEach((to, from, next) => { 
	//调用next方法，不传递参数，同之前路由  
	//next(); 
	let TOKEN = window.localStorage.getItem('token'); 
	//传递参数为：路由路径 
	if(!TOKEN && (to.path == '/navbar/cart' || to.path == '/navbar/user')){ 
		next('/login');	 
		return; 
	}; 
	 
	next(); 
}) 
 
// 导出 
export default router 
