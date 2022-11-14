// 引入axios
import axios from 'axios'
import { Toast } from 'vant';
import qs from 'qs'

export default {
  // 请求搜索数据的方法
  async getSearchData(obj){
    let { data } = await axios.get('http://159.75.89.136:3000/api_search', {
      params : obj
    });
    if(data.code != 0){
      console.log(data)
      console.log('请求搜索数据');
      return;
    };
    return data.data;
  },
  
  // 请求分类数据的方法
  async getCatData(){
    let { data } = await axios.get('http://159.75.89.136:3000/api_cat');
    if(data.code != 0){
      console.log(data)
      console.log('请求导航分类数据');
      return;
    };
    return data.data;
  },

  // 请求分类数据的方法
  async getGoodsData(datas){
    let { data } = await axios.get('http://159.75.89.136:3000/api_goods', {
      params : datas
    });
    if(data.code != 0){
      console.log(data)
      console.log('请求导航分类数据');
      return;
    };

    return data.data;
  },

  // 请求轮播图数据方法
  async getBannerData(){
    let { data } = await axios.get('http://159.75.89.136:3000/api_banner', {
      params : {
        bannerId : 1
      }
    });
    if(data.code != 0){
      console.log(data)
      console.log('请求导航分类数据');
      return;
    };
    return data.data;
  },

  // 请求小分类标题数据的方法
  async getClassifyData(){
    let { data } = await axios.get('http://159.75.89.136:3000/api_classify');
    if(data.code != 0){
      console.log(data)
      console.log('请求导航分类数据');
      return;
    };
    return data.data;
  },

  // 用户操作
  async getUserData(obj){
    let { data } = await axios.post('http://159.75.89.136:3000/api_user', qs.stringify(obj));
    return data;
  },

  // 查看购物车数据的方法
  async getCartViewData(obj){
    let { data } = await axios.post('http://159.75.89.136:3000/api_cart', qs.stringify(obj));
    if(data.code != 0){
      console.log(data)
      console.log('查看购物车数据的方法');
      return;
    };
    return data.data;
  },

  // 加入和更新购物车数据的方法
  async getCartAddData(obj){
    let { data } = await axios.post('http://159.75.89.136:3000/api_cart', qs.stringify(obj));
    if(data.code != 0){
      console.log(data)
      console.log('更新购物车数据的方法');
      return;
    };
    return data;
  },

  // 删除购物车数据的方法
  async getCartDelData(obj){
    let { data } = await axios.post('http://159.75.89.136:3000/api_cart', qs.stringify(obj));
    if(data.code != 0){
      console.log(data)
      console.log('更新购物车数据的方法');
      return;
    };
    return true;
  },

  // 获取用户地址列表的方法
  async getAddressData(obj){
    let { data } = await axios.post('http://159.75.89.136:3000/api_address' , qs.stringify(obj));
    if(data.code != 0){
      console.log(data)
      console.log('获取地址失败');
      return;
    };
    return data;
  },
   // 增加用户地址的方法
   async addAddressData(obj){
    let { data } = await axios.post('http://159.75.89.136:3000/api_address' , qs.stringify(obj));
    if(data.code != 0){
      console.log(data)
      Toast.fail('地址操作失败,请返回地址列表');
      return;
    };
    return data;
  },
   // 删除用户地址的方法
   async delAddressData(obj){
    let { data } = await axios.post('http://159.75.89.136:3000/api_address' , qs.stringify(obj));
    if(data.code != 0){
      console.log(data)
      Toast.fail('地址操作失败,请返回地址列表');
      return;
    };
    return data; 
  },
   // 设置默认地址的方法
   async setAddressData(obj){
    let { data } = await axios.post('http://159.75.89.136:3000/api_address' , qs.stringify(obj));
    if(data.code != 0){
      console.log(data)
      console.log('设置默认地址失败');
      return;
    };
    return data;
  },
}
