
<template> 
  <div>我是子组件</div> 
</template> 
<script> 
 
  export default { 
    data(){ 
      return { 
        msg : '哈哈' 
      } 
    }, 
    methods : { 
      hello(){ 
        console.log('hello'); 
      } 
    } 
  }  
 
</script> 