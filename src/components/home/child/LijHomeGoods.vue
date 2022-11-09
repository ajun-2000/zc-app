<!--
 * @Author: 李俊 958269209@qq.com
 * @Date: 2022-11-03 09:38:38
 * @LastEditors: 李俊 958269209@qq.com
 * @LastEditTime: 2022-11-03 09:44:32
 * @FilePath: \vue-lcapp\src\components\home\child\lijHomeGoods.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="lij-home-goods">
    <h2>{{goodsList.cat_name}}</h2>
    <!-- 调用商品组件 -->
    <div class="goods-content">
      <lij-goods v-for="item in goodsList.data" :key="item.goods_id" :goods="item"></lij-goods>
    </div>
    <div class="more van-hairline--bottom">
      <span @click="clickMoreHandler">查看更多<van-icon name="arrow"></van-icon></span>
    </div>
  </div>
</template>

<script>
  export default {
    props : ['goodsList'],
    methods : {
      clickMoreHandler(){
        // 跳转到当前分类列表页面
        this.$router.push({
          path : '/classifylist', 
          query : {
            cat_id : this.goodsList.cat_id, 
            catName : this.goodsList.cat_name
          }
        })
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