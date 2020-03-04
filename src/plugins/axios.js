import axios from 'axios'
import { config } from './config'
 
// 定义加载动画
// let loading = null
// let loadingShow = false
 
// axios.defaults.baseURL = 'http://172.20.1.148:8082'
 
// 添加请求拦截器
axios.interceptors.request.use(
  conf => {
    // 配置axios请求的url  ${config.ajaxUrl} 是配置的请求url统一前缀，配置好就不用重复写一样的url前缀了，只写后面不同的就可以了
    conf.url = `${config.domain}${conf.url}`
 
    // 显示加载动画
    // if (!loadingShow) {
    //   loadingShow = true
    //   loading = message.loading('数据加载中...', 0)
    // }
 
    // 设置 token 判断是否存在token，如果存在的话，则每个http header都加上token
    // if (sessionStorage.getItem('auth')) {
    //   conf.headers['Authorize'] = sessionStorage.getItem('auth')
    // }
 
    return conf
  },
  error => {
    // 抛出请求错误信息
    Promise.reject(error.response)
  }
)
 
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 请求失败处理
    return Promise.reject(error)
  }
)
 
export default axios
