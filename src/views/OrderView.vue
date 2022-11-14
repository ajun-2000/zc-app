<template>
  <div id="order-view">
    <!-- 调用头部导航栏 -->
    <lij-navbar title="确认订单" left-text="返回"></lij-navbar>
    <van-cell :title="nowAddress.takename" is-link 
    :value="nowAddress.tel" 
    size="large" 
    :label="nowAddress.province +nowAddress.city + nowAddress.district + nowAddress.streetname"
     to="address" />
    <van-card
      v-for="item in goodsData" 
      :key="item.goods_id"
      :num="item.goods_number"
      :price="item.price*0.88"
      :desc="item.goods_desc"
      :title="item.goods_name"
      :thumb="item.goods_thumb"
      :origin-price="item.price"
    />
    <van-cell style="margin:3px 0px" title="红包" is-link value="0个可用" size="large"  to="redpacket" />
    <van-cell is-link @click="showPopup" title="代金券">红包和代金券不能同时用</van-cell>
    <van-popup 
    v-model:show="show"
     closeable
     :close-on-click-overlay="false"
     >
     <div style="padding:20px;width:200px">
      请输入代金券码
      <van-field v-model="text" placeholder="代金券不能和红包同时使用" style="background:#eee;margin:10px 0px"/>
      <van-button color="#000" size="large" @click="useH">确认使用</van-button>
     </div>
      
    </van-popup>
    <van-field v-model="text" label="备注:" placeholder="请输入备注" />
    <div style="background:#fff ;padding:20px ;font-size: 12px;">
      <p>商品总金额 : <span style="float:right">{{priceAll}}</span></p>
      <p>实付金额 : <span style="float:right">{{priceAll*0.88}}</span></p>
    </div>
    <div style="padding:10px">选择支付方式</div>
    <div style="padding:20px;background:#fff;line-height: 30px;">
      <img style="width:30px" src="../assets/img/zfbicon.png"/> 支付宝支付
      <span style="float:right"><van-radio shape="square"></van-radio></span>
    </div>
    <div style="padding:20px;background:#fff;border-top: 1px solid #eee;">
      <van-button color="#000" style="float:right">确认支付</van-button>
      <p style="color:red;font-size: 24px;">良仓总价 : ￥{{priceAll*0.88}}</p>
      <p style="font-size:12px">已节省 : ￥{{priceAll*0.12}}</p>
     
    </div>
  </div>
</template>
<script>
 

  export default {
   
    async created(){
      let x = parseInt(window.localStorage.getItem('address_id'));
      console.log(x);
      if(typeof this.goodsList == 'string' ){
        let str = [];
         str.push(this.goodsList);
         this.goodsList = str;
      };
			this.addressList = await this.api.getAddressData({status : 'getAddress', userId : window.localStorage.getItem('token')});
      this.addressList.data.forEach( item =>{
        if(x && item.address_id == x){

          this.choseAddress = item;
        };
        if(item.isDefault == true){

            this.defaultAddress = item;
        };
          return;
      });
			let res = await this.api.getCartViewData({status : 'viewcart', userId : window.localStorage.getItem('token')});
      this.goodsList.forEach(item1 => {
        res.forEach(item2 =>{
          if(item1 == item2.goods_id){
            this.goodsData.push(item2);
          };
          return;
      });
			});
      if(x && this.choseAddress !=''){
        this.nowAddress = this.choseAddress;
      }else{
        this.nowAddress = this.defaultAddress;
      };
      if(this.nowAddress == ''){
        this.nowAddress.takename = '请选择一个地址'
      }
      console.log(this.nowAddress);
      
		},
    data(){
      return {
        nowAddress : [],
        choseAddress : [],
        defaultAddress : [],
        text : '',
        addressList : [],
        show : false,
        goodsList : this.$route.query.goodsId,
        goodsData : []
      }
    },
    methods:{
      useH(){
        this.show = false;
      },
      showPopup(){
        this.show = true;
      }
    },
    computed : {
			priceAll(){
				let all = 0;
				this.goodsData.forEach(item => {
						all += item.goods_number * item.price;
				})
				return all;
			}
		},
  }

</script>
<style lang="less" scoped>
    #order-view{
		background-color: #eee;
		padding-bottom: 134px;
	}
   .van-card{
		background: #fff; 
	}
</style>
