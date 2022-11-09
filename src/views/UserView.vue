<template>
	<div id="user-view">
	<div class="top">个人中心
		<div><img src="../assets/img/tx.jpg" alt=""></div>
	</div>
	<van-cell-group>
  		<van-cell 
		  is-link
		v-for="item in list" 
		:key="item.name"
		:title="item.name" 
		:icon="item.icon"
		:to="item.address"
		size="large"
		@click="clickH(item.address)"
		/>
	</van-cell-group>
	
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list : [{ name : '我的订单', icon : 'orders-o' , address : '/order'},
						{ name : '地址管理' , icon : 'location-o' , address : '/address'},
						{ name : '心愿单' , icon : 'like-o' , address : '/address'},
						{ name : '我的红包' , icon : 'cash-on-deliver' , address : '/address'},
						{ name : '联系客服' , icon : 'service-o' , address : '/address'},
						{ name : '服务政策' , icon : 'description' , address : '/address'},
						{ name : '退出' , icon : 'info-o' , address : '/login'},

					   ],
			}
			},
		emits : ['changebadge'],
		methods : {
			clickH(address){
				if(address == "/login"){
					console.log('退出');
					window.localStorage.removeItem('token');
					window.localStorage.removeItem('username');
					this.$emit('changebadge');
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
 .top{
	height:40%;
	color: #333333;
	text-align: center;
	line-height: 88px;
	font-size: 28px;
	background-color: white;
	margin-bottom:20px;
	img{
		height:100px;
		width:100px;
		border-radius: 50%;
	}
 }
</style>