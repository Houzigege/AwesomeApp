import { delay } from '../utils'
import request  from '../utils/request'

export const login = (data) => {
  return request({
    url: '/user/getImageCode',
    method: 'get',
    params: data
  })
};
