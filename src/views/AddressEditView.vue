<template>
  <div>
    <!-- 调用头部导航栏 -->
    <lij-navbar title="地址编辑" left-text="返回"></lij-navbar>

    <van-address-edit
      :area-list="areaList"
      show-delete
      :show-set-default ="true"
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :address-info="{
            name: nowAddress.takename,
            tel: nowAddress.tel,
            addressDetail: nowAddress.streetname,
            isDefault : nowAddress.isDefault,
            areaCode,
          }"
      />


  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { ref } from 'vue';
import { Toast } from 'vant';

export default {
  setup() {
    const searchResult = ref([]);

    return {
      areaList,
      searchResult,
    };
  },
  async created() {
    this.addressList = await this.api.getAddressData({status : 'getAddress', userId : window.localStorage.getItem('token')});
    this.addressList.data.forEach(item => {
      if(item.address_id == this.nowAddressId){
        this.nowAddress = item;
      };
        return;
    });
    //获取地址码
    let provinceData = this.areaList.province_list;
    let districtData = this.areaList.city_list;
    let countyData = this.areaList.county_list;
    for (const [key, value] of Object.entries(provinceData)) { 
      if(value == this.nowAddress.province){
        // console.log(key,value);
        for (const [key, value] of Object.entries(districtData)) { 
          if(value == this.nowAddress.city){
            // console.log(key,value);
            for (const [key, value] of Object.entries(countyData)) { 
              if(value == this.nowAddress.district){
                // console.log(key,value);
                this.areaCode = key;
               };       
             };
          };       
         };
      };       
    };
    console.log(this.nowAddress);

   }, 
  methods:{
    async onSave(value){
      //判断编辑或添加
      if(this.isAdd == 'false'){
        let b = await this.api.delAddressData({
          status : 'deleteAddress',
          userId :window.localStorage.getItem('token'),
          addressId : this.nowAddressId
         });
         
         console.log(b.code);
         if(b.code != 0){
          Toast('系统繁忙!稍后重试');
         };
      };
      let a = await this.api.addAddressData({
        status : 'addAddress',
        userId : window.localStorage.getItem('token'),
        province : value.province,
        city : value.city,
        district : value.county,
        streetname : value.addressDetail,
        takename  : value.name,
        tel : value.tel,
       });
       if(value.isDefault){
          await this.api.setAddressData({
            status : 'defaultAddress',
            userId : window.localStorage.getItem('token'),
            addressId : a.data[0].address_id
          });
       };
       if(this.isAdd == 'false'){
        Toast.success('保存成功, 请返回地址列表');
       }else{
        Toast.success('添加地址成功');
       }
       this.nowAddress = '';

    },
    async onDelete(){
      if(this.isAdd == 'true'){
        Toast.fail('添加地址页面中无法删除')
        return;
      };
      let b = await this.api.delAddressData({
          status : 'deleteAddress',
          userId :window.localStorage.getItem('token'),
          addressId : this.nowAddressId
         });
         if(b.code != 0){
          Toast('系统繁忙!稍后重试');
         };
      Toast.success('删除成功,请返回地址列表');
      this.nowAddress = '';
    },


  },
  data(){
    return{
      areaCode : '',
      nowAddress : [],
      isAdd : this.$route.query.isAdd,
      nowAddressId : this.$route.query.address_id,
      addressList :[],

    }
  } 
};


</script>

<style>

</style>