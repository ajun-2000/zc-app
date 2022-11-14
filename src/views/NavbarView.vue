<template>
	<div id="navbar-view">

		<!-- 路由内容 -->
		<router-view @changebadge="changebadgeH"></router-view>

		<!-- 选项卡切换按钮 -->
		<van-tabbar 
		 route 
		 active-color="#72b2f2" 
		 inactive-color="#666"
		>
		  <van-tabbar-item
				v-for="item in tabbarList"
				:key="item.id"
				:to="item.to"
				:badge="item.badge"	
			>
				<span>{{item.text}}</span>
				<template #icon="props">
					<van-icon :name="props.active ? item.iconAc : item.icon"></van-icon>
				</template>
			</van-tabbar-item>
		</van-tabbar>
		
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				cartNumber : '',
			}
		},

		computed : {
			tabbarList(){
				return [
					{id : 1, to : '/navbar/index', text : '首页', icon : 'wap-home-o', iconAc : 'wap-home', badge : ''},
					{id : 2, to : '/navbar/classify', text : '分类', icon : 'shop-o', iconAc : 'shop', badge : ''},
					{id : 3, to : '/navbar/cart', text : '购物车', icon : 'shopping-cart-o', iconAc : 'shopping-cart', badge : this.cartNumber},
					{id : 4, to : '/navbar/user', text : '我的', icon : 'manager-o', iconAc : 'manager', badge : ''},
				]
			} 
		},
		
		mounted(){
			this.getCartCount();
		},

		methods : {
			changeBadge(val){
				if(val.badge != 0){
					this.cartNumber = val.badge;
				};
				console.log('改变后数量');
				console.log(val);

			},
			changebadgeH(){
				this.getCartCount();
			},

			// 求购物车数量
			getCartCount(){
				let token = window.localStorage.getItem('token');
				if(!token){
					this.cartNumber = '';
					return
				};

				this.api.getCartViewData({
					status : 'viewcart',
					userId : token
				}).then(result => {
					this.cartNumber = result.length;
				})
			}
		}
	}
	
</script>

<style lang="less" scoped>

</style>