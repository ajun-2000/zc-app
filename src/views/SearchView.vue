<template>
  
  <div id="search-view">
    <van-sticky>
    <lij-search 
     show-innerleft 
     show-left 
     show-right 
     @clickright="clickRightHandler"
     @clickleft="clickLeftHandler"
    ></lij-search>
  </van-sticky>
  <div style="margin: 15px;color:#666;font-size: 12px;"><van-icon name="hot-o" />大家都在搜</div> 
  <van-row style="margin:0px 15px;" justify="space-around">
  <van-col span="6" v-for="item in hotSearch" :key="item.name"><van-button  @click="clickRightHandler(item.name)">{{item.name}}</van-button></van-col>
</van-row>
<!--搜索结果-->
    <div v-if="searchData ? true : false">
    <div  style="margin:30px; text-align: center; font-weight: bold;">搜索商品列表</div> 
    <div class="lij-home-goods">
			<div class="goods-content">
				<lij-goods v-for="item in searchData" :key="item.goods_id" :goods="item"></lij-goods>
			</div>
			<div class="more van-hairline--bottom">
			<span>暂无更多哦<van-icon name="smile-o" /></span>
			</div>
		</div>
  </div>
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



  </div>

</template>

<script>
  import LijSearch from '../components/LijSearch.vue'

  export default {
    components : {
      LijSearch
    },
    async created(){
			this.goodsList = await this.api.getGoodsData({catId : '0077', pagesize : 4 ,page : 5});
		},

    data(){
      return {
        hotSearch : [{name : '书包'},{name : '手表'},
                     {name : '钢笔'},{name : '儿童'},
                     {name : '鞋子'},{name : '网红'},
                     {name : '冬天'},{name : '潮流'},
                    ],
        goodsList : [],
        pagesize : 4 ,
        searchData : null,

      }
    },

    methods : {
      async moreH(){
     			 this.pagesize = this.pagesize + 4 ; 
     			 this.goodsList = await this.api.getGoodsData({catId : '0077', pagesize : this.pagesize ,page : 5});
    		},
        async clickRightHandler(val){
        this.searchData = await this.api.getSearchData({keywords : val});
      },

      clickLeftHandler(){
        // 返回上一级路由
        this.$router.back();
      }
    }
  }

</script>

<style lang="less" scoped>
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