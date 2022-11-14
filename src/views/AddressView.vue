<template>
  <div id="address-view">
    <!-- 调用头部导航栏 -->
    <lij-navbar title="地址管理" left-text="返回"></lij-navbar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="toEdit"
      @select="selectH"
/>

  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const chosenAddressId = ref('1');
    return {
      chosenAddressId,
    };
  },
  async created() {
    this.addressList = await this.api.getAddressData({status : 'getAddress', userId : window.localStorage.getItem('token')});
    console.log(this.addressList.data);
    this.addressList.data.forEach((item,index) => {
      let str = '';
      str = item.province + item.city + item.district + item.streetname;
      this.list.push({
        id : item.isDefault ? '1' : index + 2 +'',
        address_id : item.address_id,
        name : item.takename,
        tel : item.tel,
        address : str,
        isDefault: item.isDefault,
      })
    });
    console.log(this.list);
  },
  methods : {
    //切换地址
    selectH(val){
      console.log(val.address_id);
      window.localStorage.setItem('address_id', val.address_id);
    },
    //添加地址
    onAdd(){
      this.$router.push({path : '/addressedit',query : { isAdd : true}});
    },
    //编辑地址
    toEdit(item){
      this.$router.push({path : '/addressedit',query : {address_id : item.address_id , isAdd : false}});
    },
  },
  data(){
    return{
      addressList : [],
      disabledList : [
      {
        id: '3', 
        name: '王五',
        tel: '1320000000',
        address: '浙江省杭州市滨江区江南大道 15 号',
      },
      ],
      list : [
    ],
    }
  }
  
};

</script>
<style lang="less" scoped>
  .van-address-list__bottom{
    background-color: ''!important;
  }
</style>