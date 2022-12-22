import { request } from '@/utils/service';

const base = import.meta.env.VITE_APP_BASE_URL
interface RequestData {
  pageNum: number;
  pageSize: number;
}

/** 最近签署合同列表 */
export function currentList() {
  return request({
    baseURL: base,
    url: '/hr-contract-web/employee/signed/latest',
    method: 'post'
  });
}
/**合同文件列表 */
export function fileList(contractNo: string) {
  return request({
    baseURL: base,
    url: '/hr-contract-web/employee/signed/files',
    method: 'post',
    data: {contractNo}
  });
}
/** 全部合同列表 */
export function contractList(data: RequestData) {
  return request({
    baseURL: base,
    url: '/hr-contract-web/employee/signed/list',
    method: 'post',
    data
  });
}
