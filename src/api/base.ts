import { request } from '@/utils/service';

const base = import.meta.env.VITE_APP_BASE_URL
/** 用户信息 */
export function userInfo() {
  return request({
    baseURL: base,
    url: '/user/info',
    method: 'get'
  });
}
