import type { Feature } from '@/types/feature';
import { request } from '@/utils/service';

const base = import.meta.env.VITE_APP_BASE_URL
interface RequestData {
  pageNum: number;
  pageSize: number;
  condition: any;
}

/** 新增需求 */
export function createFeature(data: any) {
  return request({
    baseURL: base,
    url: '/feature/createFeature',
    method: 'post',
    data
  });
}
/** 需求详情 */
export function getFeatureById(id: string) {
  return request({
    baseURL: base,
    url: '/feature/getFeatureById',
    method: 'get',
    params: {id}
  });
}
/** 删除需求 */
export function deleteFeatureById(id: string) {
  return request({
    baseURL: base,
    url: `/feature/deleteFeatureById/${id}`,
    method: 'get'
  });
}
/**  更新需求 */
export function updateFeatureById(data: Feature) {
  return request({
    baseURL: base,
    url: '/feature/updateFeatureById',
    method: 'post',
    data
  });
}
/** 全部需求列表 */
export function featureList(data: RequestData) {
  return request({
    baseURL: base,
    url: '/feature/getFeatureList',
    method: 'post',
    data
  });
}
