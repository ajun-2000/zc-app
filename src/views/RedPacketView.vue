<template>
  <div id="red-packet">
    <lij-navbar title="我的红包" left-text="返回"></lij-navbar>
      <!-- 优惠券单元格 -->
    <van-coupon-cell
    title="红包"
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    />
    <van-coupon-list
    input-placeholder="请输入红包码"
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    :disabled-coupons="disabledCoupons"
    @change="onChange"
    @exchange="onExchange" 
    />
  </div>


</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const coupon = {
      available: 1,
      condition: '无门槛\n限时可用',
      reason: '',
      value: 2000,
      name: '20元红包',
      startAt: 1672204000,
      endAt: 1672604000,
      valueDesc: '20',
      unitDesc: '元',
    };
    

    const coupons = ref([coupon]);
    const chosenCoupon = ref(-1);

    const onChange = (index) => {
      chosenCoupon.value = index;
    };
    const onExchange = (code) => {
      coupons.value.push(coupon);
    };

    return {
      coupons,
      onChange,
      onExchange,
      chosenCoupon,
      disabledCoupons: [coupon],
    };
  },
  data(){
    return{
        text : '',
    }
  }
};


</script>

<style>

</style>