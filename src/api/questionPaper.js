import request from '@/utils/request'

export default {
  // 删除单个问卷
  deletePaper (paperCode) {
    return request({
      url: '/deletePaper',
      method: 'delete',
      params: {
        paperCode
      }
    })
  },
  // 获取未删除的问卷
  queryAllPaper (params) {
    return request({
      url: '/queryAllPaper',
      method: 'get',
      params
    })
  },
  // 获取删除的问卷
  queryAllDeletePaper (params) {
    return request({
      url: '/queryAllDeletedPaper',
      method: 'get',
      params
    })
  },
}
