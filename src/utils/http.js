import axios from 'axios'

import {
  Message
} from 'element-ui'

import {
  getToken
} from '@/utils/auth'

import {
  login
} from '@/utils/index.js'

// axios.defaults.baseUrl = process.env.VUE_APP_BASE_API //默认接口地址前缀
//
// axios.defaults.timeout = 15000 //请求超时时间

const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 15000
})

server.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Cookie'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
server.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== '200') {
      if (res.code === '302') {
        login();
        return
      }
      Message({
        message: res.msg || '请求失败,请重试',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || '请求失败,请重试'))
    } else {
      return res
    }
  },
  error => {
    /* 请求错误时*/
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
      Message({
        message: '请求超时',
        type: 'error',
        duration: 5 * 1000
      })
      var config = error.config
      config.__retryCount = config.__retryCount || 0

      if (config.__retryCount >= config.retry) {
        return Promise.reject(error)
      }
      config.__retryCount += 1
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve()
        }, config.retryDelay || 1)
      })

      return backoff.then(function () {
        return axios(config)
      })
    } else {
      if (error.message === 'Network Error') {
        error.message = '请求失败,请重试'
      }
      Message({
        message: error.message || '请求失败,请重试',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)


const http = {
  get(url, params={}) {
    return server.get(url, {
      params: params,
    })
  },
  post(url, data = {}) {
    return server.post(url, {
      data: data,
    })
  },
  requestAll(...fn) {
    return server.all(...fn)
  }
}

export default http
