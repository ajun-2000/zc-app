<template>
  <div id="classify-list">

    <!-- 分类列表里面 调用导航栏 -->
    <lij-navbar title="商品列表" left-text="返回" :show-icon-cart="showIconCart" :cart-number="cartNumber"></lij-navbar>
    <van-sticky offset-top="46">
    <div style="text-align: center; font-size :24px ; background:#fff ; padding:10px;">{{title}}</div>
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
    <van-tabs 
    class="sortord"
		 v-model:active="index"
     color="#313334"
		 title-inactive-color="#666"
		 line-width="30"
     @click-tab="sortH(index)"
     
		 >
			<van-tab
			 v-for="(item,index) in list"
			 :key="index"
			 :title="item.name"
			 >
			</van-tab>
		</van-tabs>
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
      isUp : false,
      index : 0,
      pagesize : 10,
      goodsList : [],
      active : parseInt(this.$route.query.index),
      activeClassify : [],
      classifyListMax : [],
      showIconCart : false,
      cartNumber : 0,
      catId : this.$route.query.cat_id,
      title : this.$route.query.title,
      list:[
            {name : '推荐'},
            {name : '价格'},
            {name : '新品'},
            ]
    }
  },


  methods : {
    async sortH(i){
      
      this.pagesize = 10;
      this.goodsList = await this.api.getGoodsData({catId : this.catId, pagesize : this.pagesize ,page : this.active + i+1});
      this.list[1].name = '价格';
      if(i == 1){
        this.goodsList = await this.api.getGoodsData({catId : this.catId, pagesize : this.pagesize ,page : this.active + i});
        this.isUp = !this.isUp;
        if(this.isUp){
          this.list[i].name = '价格▼';
          this.goodsList.sort((a,b)=>{ return b.price-a.price});//降序
        }else{
          this.list[i].name = '价格▲';
          this.goodsList.sort((a,b)=>{ return a.price-b.price});//升序
        };
        
        
      }
    },
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
.sortord{
  margin-bottom:10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background:#eee;
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