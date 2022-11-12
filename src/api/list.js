import request from '@/utils/request'

export function submit(data) {
  return request({
    url: '/api/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export function pullData(par) {
  return request({
    url: '/api/list',
    method: 'get',
    params: par
  })
}