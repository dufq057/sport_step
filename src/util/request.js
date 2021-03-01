import axios from 'axios'
import router from "@/router";
import { Toast } from 'vant';
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
  config.headers['sportToken'] = localStorage.getItem("sportToken") // 让每个请求携带自定义token 请根据实际情况自行修改  }
    // this.$loading1.show()
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



export function appSettingQuery() {
    return service({
        url: 'v1/ma/appSetting/query',
        method: 'post',
    })
}
export function queryUser(query) {
    return service({
        url: 'v1/ma/queryUser',
        method: 'post',
        params: query
    })
}
export function userAgree(query) {
    return service({
        url: 'v1/ma/userAgree',
        method: 'post',
        params: query
    })
}
export function userClose(query) {
    return service({
        url: 'v1/ma/userClose',
        method: 'post',
        params: query
    })
}
export function applyWithdrawal(query) {
    return service({
        url: 'v1/ma/applyWithdrawal',
        method: 'post',
        params: query
    })
}
export function sportSave(query) {
    return service({
        url: '/v1/sport/save',
        method: 'post',
        params: query
    })
}
export function sportList(query) {
    return service({
        url: '/v1/sport/list',
        method: 'post',
        params: query
    })
}
export function jdDel(query) {
    return service({
        url: '/v1/sport/del',
        method: 'post',
        params: query
    })
}
export function sportEdit(query) {
    return service({
        url: '/v1/sport/edit',
        method: 'post',
        params: query
    })
}
export function sportEditSave(query) {
    return service({
        url: '/v1/sport/editSave',
        method: 'post',
        params: query
    })
}
export function updateStatus(query) {
    return service({
        url: 'v1/sport/updateStatus',
        method: 'post',
        params: query
    })
}
export function run(query) {
    return service({
        url: '/v1/sport/run',
        method: 'post',
        params: query,
    })
}
