<template>

    <van-nav-bar 
     :title="title"
     :left-arrow="leftArrow"
     :left-text="leftText"
     placeholder
     fixed
     safe-area-inset-top
     @click-left="clickLeftHandler"
    >

      <template v-if="title == '商品列表' ||title == '商品详情'" #right>
        <span @click="$router.push('/login')" v-if="!showIconCart" style="color: #fff;">登录</span>
        <van-icon @click="$router.push('/navbar/cart')" v-if="showIconCart" size="24" name="cart-o" :badge="cartNumber"></van-icon>
      </template>

    </van-nav-bar>

</template>

<script>
  export default {
    props : {
      title : String,
      cartNumber : [String, Number],
      showIconCart : Boolean,
      leftText : String,
      leftArrow : {
        type : Boolean,
        default : true
      }
    },

    methods : {
      clickLeftHandler(){
        if(this.title != '登录'){
          this.$router.back();
        }else{
          this.$router.push('/');
        }
      }
    }

  }
</script>

<style lang="less" scoped>

</style>