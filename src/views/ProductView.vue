<template>
  <div id="product-view">

    <lij-navbar left-text="返回" title="商品详情" :show-icon-cart="showIconCart" :cart-number=" cartNumber"></lij-navbar>
    
    <div v-if="isSoldOut">商品已下架</div>

    <div v-else>

      <!-- 调用轮播图 -->
      <lij-banner 
      :banner-list="bannerList"
      :img-size="1500/1500"
      ></lij-banner>
      <div class="goodsInfo">
        <p style="color:#333;font-size:26px;"><span>{{namestr[0]}}</span> 
          <span style="font-size: 18px; float: right; line-height: 50px;"><van-icon name="like-o">{{goods.star_number}}</van-icon></span> 
        </p>
        <p >{{namestr[1]}}</p>
        <p style="color:#fe2f44;font-size:26px">¥{{goods.price}}</p>
        <p> <span><img src="http://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29895.png" alt=""> 免运费 </span> 
          <span> <img src="http://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29893.png"  alt=""> 正品授权</span>
        </p>
        <p> <img src="http://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29894.png" alt=""> 现货商品3个工作日内发货</p>
      </div>
      <!-- 单元格 -->
      <van-cell @click="showPopup = !showPopup" title="选择颜色、尺码、数量" icon="certificate" is-link />
      <img v-for="item in goods.product_banner" :key="item" :src="item" alt="" style="width:100%">
      <!-- 弹出层 -->
      <van-action-sheet 
      v-model:show="showPopup"
      position="bottom"
      round
      closeable
      :close-on-click-overlay="false"
      title="请选择商品类型"
      >
      <div class="goodsInfo">
        <p style="color:#333;font-size:26px;">{{namestr[0]}}</p>
        <p >{{namestr[1]}}</p>
        <p style="color:#fe2f44;font-size:26px">¥{{goods.price}}</p>
        <div>
          <p>分类</p>
            <van-row>
              <van-col span="4" style="height:50px ; margin:20px 10px; text-align: center;" v-for="item in bannerList" :key="item">
                <img style="width:100%;height:100%" :src="item.goods_thumb" alt="">
                {{123}}
              </van-col>
            </van-row>
        </div>
        <p>数量</p>
        <van-stepper v-model="value" theme="round" button-size="28" disable-input style="padding:10px" min="1" max="10" />

      </div>

        <van-button @click="clickConfirmH" block round color="#72b2f2" type="default">确定</van-button>
      </van-action-sheet>


      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" />
        <van-action-bar-icon badge="4" icon="cart-o" text="购物车" />
        <van-action-bar-icon 
         @click="isStar = !isStar" 
         :icon="isStar ? 'star' : 'star-o'" 
         :text="isStar ? '已收藏' : '收藏'" 
         :color="isStar ? '#72b2f2' : '#666'"
        />
        <van-action-bar-button 
         color="linear-gradient(to right, #f99018,#ee430a)" @click="clickAddBuyH('加入购物车')" type="warning" text="加入购物车" />
        <van-action-bar-button
        color="linear-gradient(to right,#f95018, #fe2f44)"
        @click="clickAddBuyH('立即购买')" type="danger" text="立即购买" />
      </van-action-bar>


    </div>  

  </div>
</template>

<script>

  export default {

    data(){
      return {
        namestr : [],
        goods : [],
        bannerList : [],
        showIconCart : false,
        cartNumber : 0,
        isSoldOut : false,
        showPopup : false,
        isStar : false,
        isAddBuy : ''
      }
    },

    methods : {
      // 求购物车数量
      getCartCount(){
        let token = window.localStorage.getItem('token');
        if(!token){
          this.cartNumber = '';
          return
        };

        this.api.getCartViewData({
          status : 'viewcart',
          userId : token
        }).then(result => {
          this.cartNumber = result.length;
        })
      },
      
       // 点击加入购物车
      clickAddBuyH(val){
        // 打开弹出层
        this.showPopup = true;
        // 状态持有
        this.isAddBuy = val;
      },

      // 点击确定按钮
      clickConfirmH(){
        // 关闭弹出层
        this.showPopup = false;
        // 验证当前的商品选项（颜色 大小 数量）
        //验证，再是加入购物车，还是立即购买
        // console.log(this.isAddBuy)
        

      },

     
    },

    async created(){
      let res = await this.api.getGoodsData({goodsId : this.$route.query.goodsId});
      console.log(res);
      if(res.length == 0){
        this.isSoldOut = true;
        return;
      };

      this.isSoldOut = false;
      this.goods = res[0];
      this.namestr = this.goods.goods_name.split(/\|/);
      console.log(this.namestr);
      this.bannerList = res[0].banner.map(item => {
        return {
          goods_id : this.$route.query.goodsId,
          goods_thumb : item.replace("url('", '').replace("')", '')
        }
      });
      console.log(this.bannerList)
      // console.log(this.goods);

    },
    mounted(){
    this.showIconCart = window.localStorage.getItem('token') ? true : false;
    this.getCartCount();
  },

  }

</script>

<style lang="less" scoped>
  .van-cell{
		margin-bottom: 50px;
	}
  .van-action-sheet__content{
    padding: 20px;
  }
  .goodsInfo{
    p{
      padding:10px;
    }
    img{
        height:20px;
        width:20px;
    }
  }
</style>