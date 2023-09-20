//封装请求方法

// import { Toast } from 'element-ui';
// import { Toast } from 'vant';
import axios from 'axios';

//配置基础请求路径
axios.defaults.baseURL = 'https://apic.netstart.cn/mbcomic';

let appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // Toast({
  //   type: 'loading',
  //   message: '加载中...',
  //   duration: 0,
  //   forbidClick: true
  // });
 

  if (config.method === 'get') {

    //在发送请求之前处理参数, 将appkey作为参数
    config.params = config.params || {};

    // config.params.appkey = appkey;
    config.adapter.push('Access-Control-Allow-Origin');
    console.log(" config.adapter", config.adapter);

  } else if (config.method === 'post') {
    

    let data = config.data || {};

    let dataString = '';

    for (let key in data) {
      dataString += `${key}=${data[key]}&`;
    }

    // dataString = dataString.slice(0, -1);

    // dataString += `appkey=${appkey}`;

    config.data = dataString
    

  }

  console.log('config ==> ', config);

  

  return config;
}, function (error) {
  // 对请求错误做些什么
  // Toast.clear();
  return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  // Toast.clear();

  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // Toast.clear();
  
  return Promise.reject(error);
});

//轮播图
export const getBanner = function () {
  return axios({
    method: 'get',
    url: '/Banner'
  })
}

//获取商品类型
export const getType = function () {
  return axios({
    method: 'get',
    url: '/type'
  })
}

//根据类型获取商品数据
export const getProduct = function(value) {
  return axios({
    method: 'get',
    url: '/typeProducts',
    params: {
      key: 'type',
      value
    }
  })
}

//获取商品详情数据
export const getProductDetail = function(pid) {
  return axios({
    method: 'get',
    url: '/productDetail',
    params: {
      pid
    }
  })
}

//收藏商品
export const likeProduct = function(pid) {
  return axios({
    method: 'post',
    url: '/like',
    data: {
      pid,
      tokenString : 'aaa',
    }
  })
}