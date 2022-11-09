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
		
		<van-swipe-cell v-for="item in cartList" :key="item.goods_id" stop-propagation>
			
			<div class="box">
				<div class="checkbox-content">
					<van-checkbox v-model="item.isChecked" checked-color="#f95018" />
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
				<van-button @click="clickCellH(item.goods_id)" square text="删除" color="#72b2f2" class="delete-button" />
			</template>

		</van-swipe-cell>
		<!--猜你喜欢-->
		<van-divider :style="{ borderColor: '#1989fa', padding: '0 16px' }" >
			<van-icon name="like-o"></van-icon>
			猜你喜欢
		</van-divider>
		<div class="lij-home-goods">
			<div class="goods-content">
				<lij-goods v-for="item in goodsList" :key="item.goods_id" :goods="item"></lij-goods>
			</div>
			<div class="more van-hairline--bottom">
			<span @click="moreH">查看更多<van-icon name="arrow"></van-icon></span>
			</div>
		</div>

		<!-- 提交 -->
		<van-submit-bar
		 class="lij-submit-bar"
		 :price="priceAll" 
		 button-text="提交订单" 
		 @submit="onSubmitHandler"
		 button-color="#f95018"
		>
			<van-checkbox @change="changeAllH" v-model="checkedAll" checked-color="#f95018">全选</van-checkbox>
			<template #tip>
				<span style="color: #666;">你的收货地址不支持配送, </span>
				<span style="color:#72b2f2" @click="onClickLinkH">修改地址</span>
			</template>
		</van-submit-bar>

	</div>
</template>

<script>
	import LijNavbar from '../components/LijNavbar.vue'
	import qs from 'qs'

	export default {
		
		data(){
			return {
				pagesize : 4,
				goodsList : [],
				cartList : [],
				checkedAll : true,
				beforNumber : '',
			}
		},

		computed : {
			priceAll(){
				let all = 0;
				this.cartList.forEach(item => {
					if(item.isChecked){
						all += item.goods_number * item.price;
					}
				})
				return all * 100 * 0.88;
			}
		},

		methods : {
			clickThumbH(id){
				// 跳转到详情
				this.$router.push({path : '/product', query : {goodsId : id}});
			},
			async moreH(){
     			 this.pagesize = this.pagesize + 4 ; 
     			 this.goodsList = await this.api.getGoodsData({catId : '0077', pagesize : this.pagesize ,page : 5});
    		},
			//点击商品数量
			async changeNumberH(num, id){

				// 修改后台数据
				let res = await this.api.getCartAddData({
					status : 'addcart',
					userId : window.localStorage.getItem('token'),
					goodsId : id.name,
					goodsNumber : num
				});

				if(res.code != 0){
					//回头
				};
			},

			//点击全选按钮
			changeAllH(val){
				// console.log(val)
				this.cartList.forEach(item => {
					item.isChecked = val;
				})
			},

			//点击删除按钮
			async clickCellH(id){
				this.$toast.loading('删除中...');
				let res = await this.api.getCartDelData({
					status : 'delcart',
					userId : window.localStorage.getItem('token'),
					goodsId : id
				});

				if(res){

					this.$toast.success('删除成功');
					this.cartList.forEach((item, index) => {
						if(item.goods_id == id){
							this.cartList.splice(index, 1);
							return;
						};
					})

				}else{
					this.$toast.fail('后台繁忙~~~');
				}
			},

			// 点击提交按钮
			onSubmitHandler(v){
				//选中的
				let arr = [];
				// 验证
				this.cartList.forEach(item => {
					if(item.isChecked){
						// arr.push(qs.stringify(item));
						arr.push(item.goods_id)
					};
				});
				

				if(arr.length != 0){
					this.$router.push({path : '/order', query : {goodsId : arr}});
				}else{
					this.$toast.fail('请勾择商品');
				}
			},

			// 点击修改地址
			onClickLinkH(){
				this.$router.push('/address');
			}
		},

		async created(){
			this.goodsList = await this.api.getGoodsData({catId : '0077', pagesize : 4 ,page : 5});
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
	.van-card__title{
		max-height: 40px;
	}
	#cart-view{
		background-color: #eee;
		padding-bottom: 134px;
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

	// 提交条样式
	.lij-submit-bar{
		bottom: 49px;
	}
	.lij-home-goods{
    padding: 0px 10px;
    h2{
      font-size: 20px;
      line-height: 60px;
    }
    .goods-content{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .more{
      text-align: center;
      color: #666;
      line-height: 50px;
    }
  }
</style>