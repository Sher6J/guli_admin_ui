import request from '@/utils/request'

export default {
  /**
   * 根据id获取章节和小节（小节作为章节的children）数据列表
   */
  getChapters(courseId) {
    return request({
      url: `/eduservice/edu-chapter/getChapters/${courseId}`,
      method: 'get'
    })
  }
}
