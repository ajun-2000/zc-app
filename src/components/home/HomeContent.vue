<template>
  <!-- 轮播图 -->
  <lij-banner 
   :banner-list="bannerList"
   margin-top="10"
   padding-left="10"
   padding-right="10"
   :img-size="475/1000"
   radius="16"
  ></lij-banner>

  <!-- 广告位 -->
  <lij-ad :ad-list="adList1"></lij-ad>
  <lij-ad :ad-list="adList2"></lij-ad>

  <!-- 分类商吕 -->
  <lij-home-goods v-for="item in catHotList" :key="item.cat_id" :goods-list="item"></lij-home-goods>

</template>

<script>
  import LijBanner from '../base/LijBanner.vue'
  import LijAd from './child/LijAd.vue'
  import LijHomeGoods from './child/LijHomeGoods.vue'

  export default {

    props : ['name', 'id'],

    components : {
      LijBanner,
      LijAd,
      LijHomeGoods
    },

    data(){
      return {
        bannerList : [],
        adList1 : [
          // 对于本地静态资源要引入进来使用
          {id : 1, src : require('./../../assets/img/1.jpg')},
          {id : 2, src : require('./../../assets/img/2.jpg')},
          {id : 3, src : require('./../../assets/img/3.jpg')},
          {id : 4, src : require('./../../assets/img/4.jpg')},
        ],
        adList2 : [
          // 对于本地静态资源要引入进来使用
          {id : 1, src : require('./../../assets/img/5.jpg')},
          {id : 2, src : require('./../../assets/img/2.jpg')},
          {id : 3, src : require('./../../assets/img/3.jpg')},
          {id : 4, src : require('./../../assets/img/4.jpg')},
        ],
        catHotList : [],
      }
    },

    async created(){
     this.bannerList = await this.api.getBannerData();
     this.getCarAll();
    },

    methods : {
      async getCarAll(){
        let catAll = await this.api.getCatData();
        // console.log(catAll);
        catAll.forEach(async item => {
          
          // 发起单独分类数据请求 
          let catGoods = await this.api.getGoodsData({catId : item.cat_id, pagesize : 4});
          // console.log(catGoods);
          this.catHotList.push({
            cat_name : item.cat_name,
            cat_id : item.cat_id,
            data : catGoods,
            title : item.cat_name + '分类'
          })

        });
      }
    }

  }

</script>

<style lang="less" scoped>
 
</style>