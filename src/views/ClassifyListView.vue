<template>
  <div id="classify-list">

    <!-- 分类列表里面 调用导航栏 -->
    <lij-navbar title="商品列表" left-text="返回" :show-icon-cart="showIconCart" :cart-number="cartNumber"></lij-navbar>
    <van-sticky offset-top="46">
    <div style="text-align: center; font-size :24px ; background:#fff ; padding:10px;">{{catName}}</div>
  </van-sticky>
    <van-sticky offset-top="96">
    <van-tabs 
		 v-model:active="active"
		 title-active-color="#72b2f2"
		 title-inactive-color="#666"
		 line-width="30"
     @click-tab="clickH"
     
		 >
			<van-tab
			 v-for="item in activeClassify.data"
			 :key="item.id"
			 :title="item.product_content"
			 >
			</van-tab>
		</van-tabs>
  
  <van-row>
    <van-col span="8" >推荐</van-col>
    <van-col span="8" >价格<van-icon name="sort"></van-icon></van-col>
    <van-col span="8">新品</van-col>
  </van-row>
</van-sticky>
  <div class="lij-home-goods">
  <div class="goods-content">
  <lij-goods v-for="item in goodsList" :key="item.goods_id" :goods="item"></lij-goods>
  </div>
  <div class="more van-hairline--bottom">
      <span @click="moreH">查看更多<van-icon name="arrow"></van-icon></span>
    </div>
  </div>
  </div>
</template>

<script>

import LijNavbar from '../components/LijNavbar.vue'

export default {
  async created(){
      this.goodsList = await this.api.getGoodsData({catId : this.catId, pagesize : this.pagesize ,page : 1});
			this.classifyListMax = await this.api.getClassifyData();
      this.classifyListMax.forEach(item => {
					if(item.cat_id == this.catId){
						this.activeClassify = item;
						return;
					}
				});
		},
  mounted(){
    this.showIconCart = window.localStorage.getItem('token') ? true : false;
    this.getCartCount();

    
  },

  data(){
    return {
      pagesize : 10,
      goodsList : [],
      active : 0,
      activeClassify : [],
      classifyListMax : [],
      showIconCart : false,
      cartNumber : 0,
      catId : this.$route.query.cat_id,
      catName : this.$route.query.catName,
    }
  },


  methods : {
    async moreH(){
      this.pagesize = this.pagesize + 4 ; 
      this.goodsList = await this.api.getGoodsData({catId : this.catId, pagesize : this.pagesize ,page : this.active + 1});
    },
    async clickH(){
      this.pagesize = 10;
      this.goodsList = await this.api.getGoodsData({catId : this.catId, pagesize : this.pagesize ,page : this.active + 1});
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
  },

  components : {
    LijNavbar,
  }
}

</script>

<style lang="less" scoped>
.van-row{
  margin-bottom:10px;
  border-top: 2px solid #666;
  border-bottom: 2px solid #666;
  background:#eee;
.van-col{
    text-align: center;
    padding:10px;
  }
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