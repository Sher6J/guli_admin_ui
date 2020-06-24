import request from '@/utils/request'

export default {

  /**
   * 讲师列表（条件查询分页）
   * @param {当前页} current
   * @param {每页记录数} limit
   * @param {条件查询对象} teacherQueryVo
   */
  getTeacherListPage(current, limit, teacherQueryVo) {
    return request({
    //   url: '/table/list/' + current + '/' + limit,
      url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      // teacherQueryVo条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: teacherQueryVo
    })
  },
  /**
   * 删除讲师
   * @param {讲师的id} id
   */
  deleteTeacherById(id) {
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  /**
   * 添加讲师
   * @param {添加的讲师对象} teacher
   */
  addTeacher(teacher) {
    return request({
      url: `/eduservice/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  /**
   * 根据id查询讲师信息
   * @param {讲师的id} id
   */
  getTeacherInfoById(id) {
    return request({
      url: `/eduservice/edu-teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  /**
   * 修改讲师
   * @param {讲师对象} teacher
   */
  updateTeacher(teacher) {
    return request({
      url: `/eduservice/edu-teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}
