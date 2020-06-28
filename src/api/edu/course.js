import request from '@/utils/request'

export default {
  /**
   * 添加课程信息
   * @param {课程信息} courseInfo
   */
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/edu-course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  /**
   * 查询所有讲师
   */
  getTeacherList() {
    return request({
      url: `/eduservice/edu-teacher/findAll`,
      method: 'get'
    })
  }
}