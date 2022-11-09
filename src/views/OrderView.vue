<template>
  <div id="order-view">
    <!-- 调用头部导航栏 -->
    <lij-navbar title="确认订单" left-text="返回"></lij-navbar>
  </div>
</template>
<script>
  import qs from 'qs'

  export default {
    data(){
      return {
        orderList : []
      }
    },

    mounted(){
      console.log(this.$route.query);
      
      this.orderList = this.$route.query.goods.map(item => {
        return qs.parse(item)
      });

      console.log(this.orderList)
    }
  }

</script>