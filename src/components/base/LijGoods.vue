<template>
  <div @click="clickHandler" class="goods">
    <img :src="goods.goods_thumb" alt="">
    <p class="van-multi-ellipsis--l2">{{goods.goods_name}}</p>
    <p class="van-multi-ellipsis--l2">{{goods.goods_desc}}</p>
    <p>￥{{goods.price}}</p>
  </div>
</template>

<script>
export default {
  props : ['goods'],
  methods : {
    clickHandler(){
      //跳转到详情
      this.$router.push({path : '/product', query : {goodsId : this.goods.goods_id}})
    }
  }

}
</script>

<style lang="less" scoped>
  .goods{
    width:49%;
    background-color: #fff;
    border-radius: 6px 6px 0px 0px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    img{
      width:100%;
      border-radius: 6px 6px 0px 0px;
      margin-bottom: 20px;
    }
    p{
      padding: 0px 10px;
      line-height: 22px;
    }
    &>p:nth-of-type(1){
      font-size: 15px;
      color: #111;
      margin-bottom: 8px;
    }
    &>p:nth-of-type(2){
     font-size: 13px;
     color: #666;
    }
    &>p:nth-of-type(3){
     font-size: 20px;
    //  font-family: Arial, Helvetica, sans-serif;
     color: #fe2f44;
     font-weight: bold;
     line-height: 30px; 
    }
  }
</style>