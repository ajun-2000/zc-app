<template>
  <van-swipe 
   class="lij-banner-swipe"
   :style="{'margin-top' : marginTop+'px'}"
   :autoplay="3000"
   loop
   :height="bannerHeight"
   indicator-color="#72b2f2"
  >
    <van-swipe-item 
     v-for="item in bannerList" 
     :key="item.goods_id"
     @click="toProductHandler(item.goods_id)" 
     class="lij-banner-item"
     :style="{'padding-left' : paddingLeft+'px', 'padding-right':paddingRight+'px'}"
    >
      <van-image :radius="radius" lazy-load :src="item.goods_thumb">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </van-swipe-item>
  </van-swipe>
</template>

<script>

  export default {
    props : {
      bannerList : Array,
      imgSize : Number,
      marginTop : {
        type : String,
        default : '0'
      },
      paddingLeft : {
        type : String,
        default : '0'
      },
      paddingRight : {
        type : String,
        default : '0'
      },
      radius : {
        type : String,
        default : '0'
      }
    },
     // 计算属性
     computed : {
      bannerHeight(){  
        let sum = parseFloat(this.paddingLeft) + parseFloat(this.paddingRight)
        return this.imgSize * (document.documentElement.clientWidth - sum);
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

    .lij-banner-item{
      box-sizing: border-box;
    }
  }

</style>