import request from '@/utils/request'

export default {

  /**
   * 课程列表
   * @param {当前页} current
   * @param {每页记录数} limit
   * @param {查询条件} courseQueryVo
   */
  getPageList(current, limit, courseQueryVo) {
    return request({
      url: `/eduservice/edu-course/pageCourseCondition/${current}/${limit}`,
      method: 'post',
      data: courseQueryVo
    })
  },
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
   * 根据课程id查询课程信息
   * @param {课程id} id
   */
  getCourseInfoById(id) {
    return request({
      url: `/eduservice/edu-course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  /**
   * 修改课程信息
   * @param {课程信息} courseInfo
   */
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/edu-course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },

  /**
   * 课程发布信息确认显示
   * @param {课程id} id
   */
  getCoursePublish(id) {
    return request({
      url: `/eduservice/edu-course/getCoursePublishInfo/${id}`,
      method: 'get'
    })
  },

  /**
   * 课程最终发布
   * @param {课程id} id
   */
  publishCourse(id) {
    return request({
      url: `/eduservice/edu-course/publishCourse/${id}`,
      method: 'post'
    })
  },
  /**
   * 根据课程id删除课程
   * @param {课程id} id
   */
  removeCourseById(id) {
    return request({
      url: `/eduservice/edu-course/deleteCourse/${id}`,
      method: 'delete'
    })
  }
}
