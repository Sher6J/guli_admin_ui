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
  },
  /**
   * 添加章节
   */
  addChapter(chapter) {
    return request({
      url: `/eduservice/edu-chapter/addChapter`,
      method: 'post',
      data: chapter
    })
  },
  /**
   * 根据id查询章节
   */
  getChapterInfo(chapterId) {
    return request({
      url: `/eduservice/edu-chapter/getChapterInfo/${chapterId}`,
      method: 'get'
    })
  },
  /**
   * 修改章节
   */
  updateChapter(chapter) {
    return request({
      url: `/eduservice/edu-chapter/updateChapter`,
      method: 'post',
      data: chapter
    })
  },
  /**
   * 删除章节
   */
  deleteChapter(chapterId) {
    return request({
      url: `/eduservice/edu-chapter/deleteChapter/${chapterId}`,
      method: 'delete'
    })
  }
}
