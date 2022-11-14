<template>

  <!-- 加入搜索框 -->
  <van-search
    v-model="keywords"
    placeholder="搜索商品、品牌"
    :disabled="disabled"
    shape="round"
    clear-trigger="always"
    show-action
    @click.stop="$emit('click')"
    >
    <!-- 左侧内容 -->
    <template #left>
      <van-icon v-if="showLeft" @click="$emit('clickleft')" class="left-arrow" name="arrow-left"></van-icon>
    </template>

    <!-- 右侧内容 -->
    <template #action>
      <span v-if="showRight" @click="$emit('clickright', keywords)" class="search-btn">搜索</span>
    </template>

    <!-- 左侧搜索框内的图标 -->
    <template #left-icon>
      <van-icon v-if="showInnerleft" name="search"></van-icon>
    </template>

    <!-- 左侧label内容 -->
    <template #label>
      <span class="logo">zc</span>
    </template>

  </van-search>

</template>

<script>

  export default {
    props : {
      disabled : {
        type : Boolean,
        default : false
      },
      showLeft : {
        type : Boolean,
        default : false
      },
      showRight : {
        type : Boolean,
        default : false
      },
      showInnerleft : {
        type : Boolean,
        default : false
      }

    },
    emits : ['click', 'clickright', 'clickleft'],
    data(){
      return {
        keywords : ''
      }
    },
    methods : {}
  }


</script>

<style lang="less" scoped>
  .logo{
    color: var(--baseColor);
    font-size: 12px;
    border-right: 1px solid #666;
    padding-right: 8px;
    font-weight: bold;
  }

  .left-arrow{
    text-align: center;
    padding-right: 10px;
    font-size: 20px;
    color: #666;
  }

  .search-btn{
    padding: 0px 4px;
    font-size: 16px;
    color: #666;
  }
</style> 