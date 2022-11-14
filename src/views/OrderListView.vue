<template>
    <div id="wish-list">
      <lij-navbar title="我的订单" left-text="返回"></lij-navbar>
      <van-tabs 
		 v-model:active="active"
		 title-active-color="#72b2f2"
		 title-inactive-color="#666"
		 line-width="30"
        @click-tab="clickH"
     
		 >
			<van-tab
			 v-for="item in list"
			 :key="item.name"
			 :title="item.name"
			 >
			</van-tab>
		</van-tabs>
        <van-empty description="暂无订单" />
    </div>
          
  </template>
  
  <script>
  export default {
    data(){
        return{
            active : 0,
            list:[
                {name : '全部'},
                {name : '待付款'},
                {name : '待发货'},
                {name : '已发货'},
                {name : '待评价'},
                ]

        }
    },
    methods:{
        clickH(){

        }
    }
  
  }
  </script>
  
  <style>
  
  </style>