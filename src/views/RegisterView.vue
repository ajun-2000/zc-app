<template>
  <body>
    <div style="height:100% ;background:rgba(0,0,0,.6)">
  <div id="register-view">
    <img src="../assets/img/tx.jpg" @click="clickH" style="width:30%;border-radius:50%;margin:5% 35%">
    <van-form @failed="onFailed" style="backgroud:red">
  <van-cell-group inset>
  
    <van-field
      v-model="username"
      required
      name="validator"
      label=" "
      left-icon="user-circle-o"
      placeholder="请输入用户名"
      :rules="[{validator : validatorUser}]"
    />

    <van-field
      v-model="password"
      required
      label=" "
      type="password"
      name="validator"
      left-icon="lock"
      placeholder="请输入密码"
      :rules="[{ validator : validatorPwd }]"
    />

    <van-field
      label=" "
      required
      v-model="againpwd"
      type="password"
      name="validator"
      left-icon="lock"
      placeholder="请确认密码"
      :rules="[{ validator : validatorAgPwd}]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit" @click="registerH">
      注册账号
    </van-button>
  </div>
</van-form>
      <div class="agreement">注册即表示您同意
			<span>良仓用户协议</span>
			和 <span>隐私政策</span>
			</div>

      <div style="color:#c22f00;padding:20px;" @click="loginHH">已有账号,去登录</div>

  </div>
</div>
</body>
</template>
<script>

export default {
  created(){

  },
  methods:{
    loginHH(){
      this.$router.push('/login');
    },
    clickH(){
      this.$router.push('/');
    },
    async registerH(){
      if(this.isPwdOk && this.isPwdOk){
        let a = await this.api.getUserData({
          status : 'register',
          username : this.username,
          password : this.password
        });
        if(a.code == 0){
          this.$toast.success({
						message: '注册成功',
						position : 'top',
						duration : 1000,
						forbidClick : true
					});
        }else{
          this.$toast.fail('数据有误');
          return;
        };
          this.$router.push('/login');
      }else{
        this.$toast.fail('数据有误');
        return;
      };
      
    },
    // 校验函数
			async validatorUser(val){
				if(val == ''){
          this.isUserOk = false;
					return '用户名不能为空';
				};

				if(!(/^[0-9a-z]{3,12}$/g.test(val))){
          this.isUserOk = false;
					return '用户名长度为3--12位';
				};
        let m = await this.api.getUserData({
          status : 'check',
          username : val
        });
        if(m.code != 0){
          this.isUserOk = false;
          return '用户名已经存在';
        }
        this.isUserOk = true;
				return true;
			},
      validatorPwd(val){
        if(val == ''){
          this.isPwdOk = false;
					return '密码不能为空';
				};
        if(!(/^[0-9a-z]{6,}$/g.test(val))){
          this.isPwdOk = false;
					return '密码长度至少6位';
				};
        return true;
      },
      validatorAgPwd(val){
        if(val == ''){
          this.isPwdOk = false;
					return '二次密码不能为空';
				};
        if(val != this.password){
          this.isPwdOk = false;
          return '请保证两次密码一致';
        };
        this.isPwdOk = true;
        return true;
      }
  },

  data(){
    return{
      isUserOk : false,
      isPwdOk : false,
      username : '',
      password  : '',
      againpwd  : '',
      onFailed : '',
    }
  }
};

</script>
<style lang="less" scoped>
.agreement{
		color:#fff;
		font-size: 12px;
		text-align: center;
		span{color: rgb(77, 77, 244);}
	}
body{
  background: url(../assets/img/tmp_bg1.jpg);
  background-size:120% 100%;
  
}
</style>
