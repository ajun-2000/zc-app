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
import AddressView from '../views/AddressView.vue'
import AddressEdit from '../views/AddressEdit.vue'
import OrderView from '../views/OrderView.vue'

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
	//地址路由页面
	{
		path : '/address',
		component : AddressView
	},
	
	{
		path : '/addressedit',
		component : AddressEdit
	},
	//订单路由页面
	{
		path : '/order',
		component : OrderView
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
