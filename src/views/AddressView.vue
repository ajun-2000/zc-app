<template>
  <div id="address-view">
    地址页面

    <van-area title="标题" :area-list="areaList" />

  </div>
</template>

<script>
  import { areaList } from '@vant/area-data';

  export default {
    data(){
      return {
        areaList : areaList
      }
    },

    created(){
      console.log(areaList)
    }
  }

</script>