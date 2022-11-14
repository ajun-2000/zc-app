<template>
	<div id="index-view">
		<van-sticky>
			<!-- 搜索框 -->
			<lij-search show-innerleft disabled @click="toSearchHandler"></lij-search>
		</van-sticky>

		<!-- 导航分类 -->
		<van-tabs 
		 sticky offset-top="54" 
		 v-model:active="active"
		 title-active-color="#72b2f2"
		 title-inactive-color="#666"
		 line-width="30"
		 >
			<van-tab
			 v-for="item in catList"
			 :key="item.cat_id"
			 :title="item.cat_name"
			 :name="item.cat_id"
			 >
			  <!--动态切换组件 具体分类的内容 使用组件渲染 is属性值为组件名！-->
				<component 
				 :id="item.cat_id" 
				 :name="item.cat_name" 
				 :is="active == '0000' ? 'HomeContent' : 'OtherContent'"
				></component>
			</van-tab>
		</van-tabs>

	</div>
</template>

<script>
	// 引入组件
	import LijSearch from '../components/LijSearch.vue'
	import HomeContent from '../components/home/HomeContent.vue'
	import OtherContent from '../components/home/OtherContent.vue'

	export default {
		components : {
			LijSearch,
			HomeContent,
			OtherContent
		},

		data(){
			return {
				active : '0000',
				catList : []
			}
		},

		async created(){
			// window.localStorage.removeItem('address_id');
			this.catList = await this.api.getCatData();
			this.catList.unshift({cat_id : '0000', cat_name : '首页'});
		},

		methods : {
			toSearchHandler(){
				//跳转到搜索页面
				console.log(this.$router)
				this.$router.push('/search');
			}
		}
	}
</script>

<style lang="less" scoped>
	.logo{
    color: var(--baseColor);
    font-size: 12px;
    border-right: 1px solid #666;
    padding-right: 8px;
  }
</style> 