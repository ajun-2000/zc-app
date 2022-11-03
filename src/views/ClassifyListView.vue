<template>
  <div id="classify-list">

    <!-- 分类列表里面 调用导航栏 -->
    <lij-navbar title="商品列表" left-text="返回" :show-icon-cart="showIconCart" :cart-number="cartNumber"></lij-navbar>


    <h1 v-for="item in 30">上{{item}}</h1>

  </div>
</template>

<script>

import LijNavbar from '../components/LijNavbar.vue'

export default {

  mounted(){
    this.showIconCart = window.localStorage.getItem('token') ? true : false;
    this.getCartCount();
  },

  data(){
    return {
      showIconCart : false,
      cartNumber : 0
    }
  },


  methods : {
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

<style>

</style>