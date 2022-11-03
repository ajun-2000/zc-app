<template>
	<div id="login-view">
		<!-- 登录里面调用 -->
		<lij-navbar title="良仓" left-text="首页"></lij-navbar>

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

		<div @click="toRegisterH">没有帐号，请注册</div>

	</div>
</template>

<script>
	// import Ref from '../components/ref.vue'

	export default {

		data(){
			return {
				username : '',
				ruleUser : [
					{required : true, message: '用户名不能为空', trigger : 'onBlur'},
					// {pattern : /^[0-9a-z_]{3,12}$/g, message: '用户名必须为3-12位数字字母组成', trigger : 'onBlur'},
					// {validator : this.validatorUser, message : '不能为空' }

				],
				pwd : '',
				rulePwd : [
				{required : true, message: '密码不能为空', trigger : 'onBlur'},
				]

			}
		},

		methods : {
			// 校验函数
			validatorUser(val){
				if(val == ''){
				  console.log('校验函数' + val)
					return false;
				};

				if(!(/^[0-9a-z]{3,12}$/g.test(val))){
					return false;
				}

				// console.log('校验函数' + val)
				// 返回boolean值来确定
				return true
			},

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

	.login-content{
		padding-top: 50px;
	}

</style>