import axios from 'axios'
import router from "@/router";
import { Toast } from 'vant';
import { token } from './common';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '',
  // 超时
  timeout: 20*1000
})
let vanToast;
service.interceptors.request.use(config => {
    vanToast = Toast.loading({
        message: '加载中...',
        overlay:true,
        duration:0,
        forbidClick: true,
    });
  config.headers['sportToken'] = localStorage.getItem(token) // 让每个请求携带自定义token 请根据实际情况自行修改  }
    return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
    res => {
        vanToast.clear();
      if (res.data.code === 901) {
          router.replace('/login')
      }
      return res.data;
    },
    error => {
        vanToast.clear();
        Toast.fail("请求错误");
      return Promise.reject(error);
    }
);
export default service

export function login(query) {
    return service({
        url: '/v1/sport/login',
        method: 'post',
        params: query
    })
}
export function register(query) {
    return service({
        url: '/v1/sport/register',
        method: 'post',
        params: query
    })
}
export function buildInviteCode(query) {
    return service({
        url: '/v1/sport/buildInviteCode',
        method: 'post',
        params: query
    })
}
export function resetPassword(query) {
    return service({
        url: '/v1/sport/resetPassword',
        method: 'post',
        params: query
    })
}
export function sendEmailByRestPwd(query) {
    return service({
        url: '/v1/sport/sendEmailByRestPwd',
        method: 'post',
        params: query
    })
}
