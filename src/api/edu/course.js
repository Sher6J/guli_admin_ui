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
  },
  /**
   * 根据id查询课程基本信息
   */
  getCourseInfoById(id) {
    return request({
      url: `/eduservice/edu-course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  /**
   * 修改课程信息
   */
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/edu-course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  }
}
