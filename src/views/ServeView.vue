<template>
    <div id="wish-list">
      <lij-navbar title="服务" left-text="返回"></lij-navbar>
      <van-cell-group>
  		<van-cell 
		  is-link
		v-for="item in list" 
		:key="item.name"
		:title="item.name" 
		:icon="item.icon"
		:to="item.address"
		size="large"
		@click="clickH(item.address)"
		/>
	</van-cell-group>
    </div>
          
  </template>
  
  <script>
  export default {
    data(){
      return{
        list : [{ name : '用户协议', icon : 'orders-o' , address : ''},
                { name : '隐私政策', icon : 'orders-o' , address : ''},
					   ],
      }
    }
  
  }
  </script>
  
  <style>
  
  </style> 