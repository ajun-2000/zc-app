<template>
	<div id="cart-view">
		<!-- 导航栏 -->
		<lij-navbar title="购物车" :left-arrow="false"></lij-navbar>

		<!-- 空状态 -->
		<van-empty
			v-if="cartList.length == 0"
			:image="require('../assets/img/empty.png')"
			image-size="80"
			description="购物车空空如也~"
		/>

		<!-- 购物车列表 -->
		
		<van-swipe-cell v-for="item in cartList" :key="item.goods_id">
			
			<div class="box">
				<div class="checkbox-content">
					<van-checkbox v-model="item.isChecked" checked-color="#72b2f2" />
				</div>

				<div class="goods-content">
					<van-card
						:price="item.price * 0.88 + '.00'"
						:origin-price="item.price"
						:desc="item.goods_desc"
						:title="item.goods_name"
						class="goods-card"
						:thumb="item.goods_thumb"
						@click-thumb="clickThumbH(item.goods_id)"
					>
						<template #num>
							<van-stepper
							 v-model="item.goods_number"
							 :name="item.goods_id"
							 min="1"
							 max="10"
							 input-width="22"
							 button-size="18px"
							 theme="round"
							 integer
							 disable-input
							 @change="changeNumberH"
							/>
						</template>
					</van-card>
				</div>
			</div>

			<!-- 右侧隐藏删除按钮 -->
			<template #right>
				<van-button square text="删除" color="#72b2f2" class="delete-button" />
			</template>

		</van-swipe-cell>

	</div>
</template>

<script>
	import LijNavbar from '../components/LijNavbar.vue'
	export default {
		
		data(){
			return {
				goodsId : '',
				cartList : []
			}
		},

		methods : {
			clickThumbH(id){
				// 跳转到详情
				this.$router.push({path : '/product', query : {goodsId : id}});
			},

			//点击商品数量
			changeNumberH(v, d){
				console.log(v)
				console.log(d)
			}
		},

		async created(){
			let res = await this.api.getCartViewData({status : 'viewcart', userId : window.localStorage.getItem('token')});
			this.cartList = res.map(item => {
				item.isChecked = true;
				return item;
			})
			console.log(this.cartList)
		},

		components : {
			LijNavbar
		}
		
	}
</script>

<style lang="less" scoped>
	#cart-view{
		background-color: #eee;
	}

	.box{
		display: flex;

		.checkbox-content{
			width: 10%;
			display: flex;
			justify-content: center;
		}
		.goods-content{
			width:90%;
		}
	}

	.van-swipe-cell{
		margin-top:10px;
	}
	.goods-card, .van-swipe-cell{
		background: #fff;
	}
	.goods-card{
		padding-left: 0px;
	}
	.delete-button{
		height: 100%;
	}

</style>