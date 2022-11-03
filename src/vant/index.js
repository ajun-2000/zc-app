/*
 * @Author: 李俊 958269209@qq.com
 * @Date: 2022-11-03 09:38:38
 * @LastEditors: 李俊 958269209@qq.com
 * @LastEditTime: 2022-11-03 09:45:12
 * @FilePath: \vue-lcapp\src\vant\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入vant
import { 
	Button, 
	Tabbar,  
	TabbarItem, 
	ConfigProvider, 
	Icon, 
	Search, 
	Tab,  
	Tabs, 
	Sticky, 
	Swipe,  
	SwipeItem, 
	Image as VanImage, 
	Lazyload, 
	Loading, 
	NavBar, 
	Form,  
	Field,  
	CellGroup, 
	Toast, 
	Empty, 
	SwipeCell, 
	Card, 
	Radio, 
	RadioGroup, 
	Checkbox, 
	Stepper  
 
} from 'vant' 
 
export default function(app){  
	app.use(Stepper) 
	app.use(Checkbox) 
	app.use(RadioGroup) 
	app.use(Radio) 
	app.use(Card) 
	app.use(SwipeCell) 
	app.use(Empty) 
	app.use(Toast) 
	app.use(Form) 
	app.use(Field) 
	app.use(CellGroup) 
	app.use(NavBar) 
	app.use(Loading) 
	app.use(Lazyload) 
	app.use(VanImage) 
	app.use(Swipe) 
	app.use(SwipeItem) 
	app.use(Sticky) 
	app.use(Tab) 
	app.use(Tabs) 
	app.use(Search) 
	app.use(Icon) 
	app.use(ConfigProvider) 
	app.use(Tabbar) 
	app.use(TabbarItem)  
	app.use(Button) 
} 