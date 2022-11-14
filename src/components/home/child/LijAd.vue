
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