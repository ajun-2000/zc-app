<template>
  <div class="other-content">
    <!-- {{name}}--{{id}} -->
    <lij-banner :banner-list="bannerList"></lij-banner>
    <!-- 专题 -->
    <div class="special-content">
      <h1>专题</h1>
      <ul>
        <li v-for="item in goodsList" :key="item.goods_id" >
          <img :src="item.goods_thumb">
        </li>
      </ul>

      <!-- 下面小分类商吕 -->
      <lij-home-goods v-for="item in classifyList" :key="item.id" :goods-list="item"></lij-home-goods>

      
    </div> 

  </div>
  
</template>

<script>
  import LijBanner from '../base/LijBanner.vue'
  import LijHomeGoods from './child/LijHomeGoods.vue'

  export default {
    props : ['name', 'id'],
    
    data(){
      return {
        bannerList : [],
        goodsList : [],
        classifyList : []
      }
    },

    async created(){
     this.bannerList = await this.api.getBannerData();
     this.goodsList = await this.api.getGoodsData({catId : this.id, pagesize : 6});
     this.getClassify();
    },

    methods : {
      async getClassify(){
        // 获取所有大分类下面的小分类
        let result = await this.api.getClassifyData();
        // 获取当前分类中的小分类
        let miniClassify = [];
        result.forEach(item => {
          if(item.cat_id == this.id){
            miniClassify = item.data;
            return;
          }
        });

        let goods = await this.api.getGoodsData({catId : this.id, page:2, pagesize : 70});
        
        //从70个当前大分类商品中，每个小分类去截取四个商品
        miniClassify.forEach((item, index) => {
          this.classifyList.push({
            cat_id : index + 1,
            cat_name : item.product_content,
            data : goods.splice(0, 4)
          })
        });
        console.log(this.classifyList)

      }
    },

    components : {
      LijBanner,
      LijHomeGoods
    },
  }
</script>

<style lang="less" scoped>
  .special-content{
    width: 100%;
    padding: 0px 10px;
    box-sizing: border-box;
    h1{
      font-size: 22px;
      line-height: 50px;
    }

    ul{
      white-space: nowrap;
      overflow-x: scroll;
      li{
        // 把此元素设置为行内块元素, 设置大小站成一排，white-space: nowrap; 会起作用
        display: inline-block;
        margin-right: 6px;
        width: 40%;
        img{width:100%; border-radius: 8px;}
      }
    }
    
  }

</style> 