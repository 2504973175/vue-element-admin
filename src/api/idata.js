import request from '@/utils/request'


export function doConnect (data) {
  return request({
    url: '/api/test',
    method: 'post',
    data
  })
}

export function exec (data) {
  return request({
    url: '/api/idata',
    method: 'post',
    data
  })
}
