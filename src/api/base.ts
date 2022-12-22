import { request } from '@/utils/service';

const base = import.meta.env.VITE_APP_BASE_URL
/** 最近签署合同列表 */
export function userInfo() {
  return request({
    baseURL: base,
    url: '/hr-contract-web/employee/signed/latest',
    method: 'post'
  });
}
