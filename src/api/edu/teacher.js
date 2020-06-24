import request from '@/utils/request'

export default {

  /**
   * 讲师列表（条件查询分页）
   * @param {*} current 当前页
   * @param {*} limit  每页记录数
   * @param {*} teacherQueryVo 条件查询对象
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
   * @param {*} id 讲师的id
   */
  deleteTeacherById(id) {
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  /**
   * 添加讲师
   * @param {*} teacher 添加的讲师对象
   */
  addTeacher(teacher) {
    return request({
      url: `/eduservice/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  }
}
