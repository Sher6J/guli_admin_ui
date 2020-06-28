import request from '@/utils/request'

export default {
  /**
   * 课程分类列表
   * 返回所有分类，包含一级和二级（二级作为一级的children返回）
   */
  getSubjectList() {
    return request({
      url: `/eduservice/edu-subject/getAllSubject`,
      method: 'get'
    })
  }
}
