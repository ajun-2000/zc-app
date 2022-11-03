<!--
 * @Author: 李俊 958269209@qq.com
 * @Date: 2022-11-03 09:38:38
 * @LastEditors: 李俊 958269209@qq.com
 * @LastEditTime: 2022-11-03 09:43:00
 * @FilePath: \vue-lcapp\src\components\base\lijGoods.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-swipe 
   class="lij-banner-swipe" 
   :autoplay="3000"
   loop
   :height="bannerHeight"
   indicator-color="#72b2f2"
  >
    <van-swipe-item @click="toProductHandler(item.goods_id)" class="lij-banner-item" v-for="item in bannerList" :key="item.goods_id">
      <van-image radius="16" lazy-load :src="item.goods_thumb">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </van-swipe-item>
  </van-swipe>
</template>

<script>

  export default {
    props : ['bannerList'],
     // 计算属性
     computed : {
      bannerHeight(){     
        return 475 / 1000 * (document.documentElement.clientWidth - 20);
      }
    },

    methods : {
      toProductHandler(id){
        this.$router.push({path : '/product', query : {goodsId : id}})
      }
    }

  }

</script>

<style lang="less" scoped>
 .lij-banner-swipe{
    text-align: center;
    line-height: 150px;
    margin-top:10px;

    .lij-banner-item{
      padding: 0px 10px;
      box-sizing: border-box;
    }
  }

</style>