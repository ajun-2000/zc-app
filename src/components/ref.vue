<!--
 * @Author: 李俊 958269209@qq.com
 * @Date: 2022-11-03 09:38:38
 * @LastEditors: 李俊 958269209@qq.com
 * @LastEditTime: 2022-11-03 09:43:19
 * @FilePath: \vue-lcapp\src\components\ref.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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