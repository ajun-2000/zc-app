<!--
 * @Author: 李俊 958269209@qq.com
 * @Date: 2022-11-03 09:38:38
 * @LastEditors: 李俊 958269209@qq.com
 * @LastEditTime: 2022-11-03 09:44:22
 * @FilePath: \vue-lcapp\src\components\home\child\lijAd.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>

  <div class="lij-ad">
    <div class="ad-l">
      <img :src="adList[0].src" alt="">
      <img :src="adList[1].src" alt="">

    </div>
    <div class="ad-r">
      <img :src="adList[2].src" alt="">
      <img :src="adList[3].src" alt="">

    </div>
  </div>

</template>

<script>
  export default {
    props : ['adList'],
    created(){
      
    }
 
  }

</script>

<style lang="less" scoped>
  .lij-ad{
    margin-top:10px;
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    &>div{
      width:49%;
      img{
        width:100%;
        border-radius: 10px;
      }
    }
    &>div img:first-child{
      margin-bottom: 6px;
    }
  }

</style>