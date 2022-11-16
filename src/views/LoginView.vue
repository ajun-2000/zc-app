<template>
	<div id="login-view">
		<!-- 登录里面调用 -->
		<lij-navbar title="登录" left-text="首页"></lij-navbar>

		<div class="login-content">
		<!-- 表单 -->
			<van-form ref="vanForm">
				<van-cell-group inset>
					<!-- 用户名 -->
					<van-field
					v-model="username"
					name="username"
					label="用户名"
					placeholder="请输入用户名"
					colon
					clearable
					show-error
					label-width="60"
					:rules="ruleUser"
					/>	
					
					<!-- 密码 -->
					<van-field
					type="password"
					name="password"
					v-model="pwd"
					label="密　码"
					placeholder="请输入密码"
					colon
					clearable
					show-error
					label-width="60"
					:rules="rulePwd"
					/>
				</van-cell-group>

				<div style="margin: 16px;">
					<van-button @click="clickLoginBtnH" color="#24272F" round block type="primary">
						登录
					</van-button>
				</div>

			</van-form>
		</div>
		<div class="agreement">登录即表示您同意
			<span>良仓用户协议</span>
			和 <span>隐私政策</span>
			</div>
		<div class="bSty" > 
			<a href="JavaScript:;"><img src="../assets/img/qq-icon40_36.png" alt=""></a>
			<a href="JavaScript:;"><img src="../assets/img/sina-icon40_36.png" alt=""></a>
			<a href="JavaScript:;"><img src="../assets/img/douban-icon40_36.png" alt=""></a>
			<span @click="toRegisterH">没有账号,快速注册</span> 
		</div>

	</div>
</template>

<script>
	// import Ref from '../components/ref.vue'

	export default {
		created(){

		},
		data(){
			return {
				username : '',
				ruleUser : [
					{required : true, message: '用户名不能为空', trigger : 'onBlur'},

				],
				pwd : '',
				rulePwd : [
				{required : true, message: '密码不能为空', trigger : 'onBlur'},
				]

			}
		},

		methods : {

			clickLoginBtnH(){
				// 调用组件实例方法
				this.$refs.vanForm.validate().then(async res => {
					// 添加交互登录中
					this.$toast.loading({
						message: '正在登录...',
						position : 'top',
						duration : 0,
						forbidClick : true
					});

					// 校验成功，去请求后台登录
					let result = await this.api.getUserData({
						status : 'login',
						username : this.username,
						password : this.pwd
					});

					this.$toast.clear();

					// console.log(result);
					if(result.code != 0){
						this.$toast.fail({
							message: '密码或用户名错误',
							position : 'top',
							duration : 2000,
							forbidClick : true
						});
						return;
					};

					this.$toast.success({
						message: '登录成功',
						position : 'top',
						duration : 1000,
						forbidClick : true
					});
					// 登录状态持有
					window.localStorage.setItem('token', result.user_id);
					window.localStorage.setItem('username', result.username);
					// 路由返回
					this.$router.back();

				}).catch(err => {
					console.log(err)
				});

			},

			toRegisterH(){
				this.$router.push('/register');
			}
		}
	}
</script>

<style lang="less" scoped>
	.agreement{
		color:#666;
		font-size: 12px;
		text-align: center;
		span{color: rgb(77, 77, 244);}
	}
	.login-content{
		padding-top: 50px;
	}
	.bSty{
		padding:10px 30px; 
		color: rgb(244 111 77);
		font-size: 14px;
		img{
			width:20px;
			height: 20px;
			padding:5px;
		}
		span{
			float:right;
		}
	}

</style> 