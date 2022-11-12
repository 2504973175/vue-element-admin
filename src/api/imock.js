import request from '@/utils/request'

export function getTestMock (data) {
  return request({
    url: '/api/imock',
    method: 'post',
    data
  })
}

export function setTestMock (data) {
  return request({
    url: '/api/_mock_settings_',
    method: 'post',
    data
  })
}