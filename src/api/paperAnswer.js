import request from '@/utils/request'

export default {
    //查找某个问卷所有答卷
    queryPaperAnswer(params) {
        return request({
            url: '/queryPaperAnswer',
            method: 'get',
            params
          })
    },
    //新增答卷
    postAddAnswer(data) {
        return request({
            url: '/addAnswer',
            method: 'post',
            data
          })
    },
    //删除一份答卷
    deleteSingleAnswerPaper(id) {
        return request({
            url: '/deleteSingleAnswerPaper',
            method: 'delete',
            params:{id}
          })
    },
    //删除一份问卷所有答卷
    deleteAllAnswerPaper(paperCode) {
        return request({
            url: '/deleteAllAnswerPaper',
            method: 'delete',
            params:{paperCode}
        })
    },
    //下载一份问卷所有答卷
    getAllAnswerPaper(paperCode){
        return request({
            url:'/download',
            method:'get',
            params:{paperCode:paperCode},

        })
    }

}
