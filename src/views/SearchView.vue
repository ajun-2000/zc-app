<template>
  
  <div id="search-view">

    <lij-search 
     show-innerleft 
     show-left 
     show-right 
     @clickright="clickRightHandler"
     @clickleft="clickLeftHandler"
    ></lij-search>




  </div>

</template>

<script>
  import LijSearch from '../components/LijSearch.vue'

  export default {
    components : {
      LijSearch
    },

    data(){
      return {
       
      }
    },

    methods : {
      clickRightHandler(val){
        console.log(1111);
        console.log(val);
      },

      clickLeftHandler(){
        // 返回上一级路由
        // console.log(this.$router)
        this.$router.back();
      }
    }
  }

</script>

<style lang="less" scoped>


</style>