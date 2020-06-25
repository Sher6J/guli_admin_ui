<template>
  <div class="app-container">
    添加讲师
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from '@/api/edu/teacher'
export default {
  data() {
    return {
      teacher:{},
      saveBtnDisabled:false  
    }
  },
  created () { //页面渲染之前执行，实现数据回显
    this.init()
  },
  //监听，当路由发生变化时，$route(to, from)方法就会执行
  watch: {
    $route(to, from) {
      // console.log('watch $route')
      this.init()
    }
  },
  methods: {
    init() {
      //路径中有id值，修改操作
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      } else { //路径中没有id值，添加操作
        //清空表单
        this.teacher = {}
      }
    },
    //根据讲师id查询讲师信息
    getInfo(id) {
      teacher.getTeacherInfoById(id)
        .then(response => {
          this.teacher = response.data.teacher
        })
    },
    saveOrUpdate() {
      //判断是修改还是添加
      if (!this.teacher.id) {
        //添加
        this.saveTeacher()
      } else {
        //修改
        this.updateTeacher()
      }
    },
    //添加讲师方法
    saveTeacher() {
      teacher.addTeacher(this.teacher)
        .then(respons => {
          //提示信息
          this.$message({
            type: 'success',
            message: '保存讲师成功！'
          });
          //回到列表页面，当前在添加讲师页面，要到讲师列表页面，需要路由跳转即重定向
          this.$router.push({path:'/teacher/table'})
        })
    },
    //修改讲师方法
    updateTeacher() {
      teacher.updateTeacher(this.teacher)
        .then(response => {
          //提示信息
          this.$message({
            type: 'success',
            message: '修改讲师成功！'
          });
          //回到列表页面，当前在添加讲师页面，要到讲师列表页面，需要路由跳转即重定向
          this.$router.push({path:'/teacher/table'})
        })
    }
  }
}
</script>
