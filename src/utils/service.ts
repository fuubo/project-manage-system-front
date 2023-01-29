import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

/** 创建请求实例 */
function createService() {
  // 创建一个 axios 实例
  const service = axios.create({
    baseURL: '/api'
  })
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 api 返回的数据
      const apiData = response.data as any
      // 这个 code 是和后端约定的业务 code
      const code = apiData.code
      // 如果没有 code, 代表这不是项目后端开发的 api
      if (code === undefined) {
        ElMessage.error('网络错误')
        return Promise.reject(new Error('网络错误'))
      } else {
        switch (code) {
          case 1:
            // code === 1 代表没有错误
            return apiData.data
          default:
            // 不是正确的 code
            ElMessage.error(apiData.message || 'Error')
            return Promise.reject(new Error('Error'))
        }
      }
    },
    (error) => {
      // status 是 HTTP 状态码
      const status = error.response.status
      switch (status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          // TODO 跳转登录
          break
        default:
          error.message = '网络错误'
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    const configDefault = {
      headers: {
        'Content-Type': config.headers && config.headers.getContentType|| 'application/json'
      },
      timeout: 30000,
      baseURL: config.baseURL,
      withCredentials: true,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)
