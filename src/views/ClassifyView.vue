<template>
	<div id="classify-view">
		<aside>
			<p 
			 :class="{'p-active': active == item.cat_id}" 
			 v-for="item in catList" 
			 :key="item.cat_id"
			 @click="clickActiveHandler(item.cat_id)"
			>
				{{item.cat_name}}
			</p>
		</aside>

		<article>
			<img :src="activeClassify.title_img" alt="">
			<h3>• {{activeClassify.title}} •</h3>
			<ul>
				<li @click="toClassifyListH(activeClassify.title,index)" v-for="(item,index) in activeClassify.data" :key="item.id">
					<img :src="item.product_img" alt="">
					<p>{{item.product_content}}</p>
				</li>
			</ul>
		</article>
	</div>
</template>

<script>
	export default {

		data(){
			return {
				active : '',
				catList : [],
				classifyListMax : [],
				activeClassify : {}
			}
		},

		methods : {

			clickActiveHandler(id){
				this.active = id;
				this.classifyListMax.forEach(item => {
					if(item.cat_id == this.active){
						this.activeClassify = item;
						return;
					}
				});
			},

			toClassifyListH(name,index){
				this.$router.push({path : '/classifylist', query : {cat_id : this.active, title : name , index : index}})
			}

		},

		async created(){
			this.catList = await this.api.getCatData();
			this.classifyListMax = await this.api.getClassifyData();
			this.active = this.classifyListMax[0].cat_id;
			this.activeClassify = this.classifyListMax[0];
		}

	}
</script>

<style lang="less" scoped>
	#classify-view{
		display: flex;

		aside{
			flex: 1.1;
			background-color: #d9d9d9;	
			p{
				line-height: 56px;
				text-align: center;
				color : #333
			}
			.p-active{
				color : #72b2f2;
				background: #eee;
			}
		}

		article{
			flex: 2.9;
			background-color: #eee;
			padding: 16px;
			box-sizing: border-box;

			&>img{
				width:100%;
			}
			&>h3{
				text-align: center;
				color: #666;
				font-size: 14px;
				line-height: 80px;
				font-weight: normal;
			}

			&>ul{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				text-align: center;
				li{
					width:28%;
					img{width: 100%;}
					margin-bottom: 20px;
					font-size: 14px;
					color: #333;
				}
			}

		}

		aside, article{
			overflow-y: scroll;
			overflow-x: hidden;
		}
	}
</style>