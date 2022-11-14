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
          <span style="font-size: 18px; float: right; line-height: 50px;">
            <van-icon :name="iconName" color="#3a8ff4" @click="likeH">
              {{goods.star_number}}
            </van-icon>
          </span> 
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
      <van-row>
              <van-col span="12" style="text-align:center">
                <van-button color="#000" :plain="!isGoodInfo" size="large" @click="goodInfoH">商品详情</van-button>
              </van-col>
              <van-col span="12" style="text-align:center">
                <van-button color="#000" :plain="isGoodInfo" size="large" @click="shopInfoH">购物须知</van-button>
              </van-col>
      </van-row>
      <div class="shopInfo" style="padding-bottom:50px" v-show="!isGoodInfo">
        <p>— 所有商品均为正品保证。</p>
        <p>— 中国大陆地区免运费 （偏远地区、受疫情和自然灾害影响、受节假日特殊活动等影响时，需承担部分运费)。</p>
        <p>— 包邮默认商家合作快递，如指定快递请联系客服，并承担运费差额。</p>
        <p>— 蜡烛、液态品、手表等含电池产品无法空运，运输时间相较普通空运件会更久。</p>
        <p>— 如出现产品质量问题请在签收后72小时内联系客服。</p>
      </div>
      <div style="padding-bottom:50px" v-show="isGoodInfo">
        <img v-for="item in goods.product_banner" :key="item" :src="item" alt="" style="width:100%">
      </div>
      <!--猜你喜欢-->
		<van-divider :style="{ borderColor: '#1989fa', padding: '0 16px' }" >
        <van-icon name="like-o"></van-icon>
        猜你喜欢
      </van-divider>
      <div class="lij-home-goods">
        <div class="goods-content">
          <lij-goods v-for="item in goodsList" :key="item.goods_id" :goods="item"></lij-goods>
        </div>
        <div class="more van-hairline--bottom">
        <span @click="moreH">查看更多<van-icon name="arrow"></van-icon></span>
        </div>
		</div>
      
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
              <van-col 
              span="4" 
              style="height:50px ; margin:20px 10px; text-align: center;"
               v-for="(item,index) in bannerList" 
               :key="item"
               :class="{'activeSort': (activeIndex == index ? true :false)}"
               @click="activeH(index)"
               >
                <img style="width:100%;height:100%" :src="item.goods_thumb" alt="">
                类型 {{index+1}}
              </van-col>
            </van-row>
        </div>
        <p>数量</p>
        <van-stepper v-model="value" theme="round" button-size="28" disable-input style="padding:10px" min="1" max="10" />

      </div>
      <van-sticky position="bottom">
        <van-button @click="clickConfirmH" block round color="#72b2f2" type="default">确定</van-button>
      </van-sticky>
      </van-action-sheet>


      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" />
        <van-action-bar-icon 
        :badge="cartNumber" 
        icon="cart-o" 
        text="购物车" 
        @click="$router.push('/navbar/cart')"
        />
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
        islike : false,
        iconName : 'like-o',
        activeIndex : 0,
        value : 1,
        goodsList : [],
        isGoodInfo : true,
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
      likeH(){
        this.islike = !this.islike;
        if(this.islike){
          this.iconName ='like';
          this.goods.star_number++;
        }else{
          this.iconName ='like-o'
          this.goods.star_number--;
        };
        
        
      },
      activeH(i){
          this.activeIndex = i;
      },
      goodInfoH(){
        this.isGoodInfo = true;
      },
      shopInfoH(){
        this.isGoodInfo = false;
      },
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
        console.log(this.value);
      },

      // 点击确定按钮
      async  clickConfirmH(){
        let f = window.localStorage.getItem('token');
        if(!f){ 
          this.$toast.fail({
						message: '请先登录再操作',
						duration : 1000,
						forbidClick : true
					});
          this.$router.push('/login');
          return;
        };
        let res = await this.api.getCartAddData({
					status : 'addcart',
					userId : window.localStorage.getItem('token'),
					goodsId : this.$route.query.goodsId,
					goodsNumber : this.value
				});
        if(res && this.isAddBuy == '加入购物车'){
          this.$toast.success('加入购物车成功');
        };
        this.api.getCartViewData({
          status : 'viewcart',
          userId : window.localStorage.getItem('token'),
        }).then(result => {
          this.cartNumber = result.length;
          console.log(this.cartNumber);
        });
				if(res.code != 0){
					//回头
				};
        if(this.isAddBuy == '立即购买'){
          this.$router.push('/order');
          this.$router.push({
          path : '/order', 
          query : {
            goodsId : this.$route.query.goodsId
          }
        })
        }
        // 关闭弹出层
        this.showPopup = false;

        

      },

     
    },

    async created(){
      this.goodsList = await this.api.getGoodsData({catId : '0077', pagesize : 4 ,page : 5});
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
  .activeSort{
    border: 2px solid red;
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
  .shopInfo{
    p{
      line-height: 35px;font-size: 16px
    }
  }
  .lij-home-goods{
    padding: 0px 10px;
    h2{
      font-size: 20px;
      line-height: 60px;
    }
    .goods-content{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .more{
      text-align: center;
      color: #666;
      line-height: 50px;
    }
  }
</style>