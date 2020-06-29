<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="课程最终发布"/>
    </el-steps>

    <el-form label-width="120px">
    
    <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
    </el-form-item>
    
    <!-- 所属分类 TODO -->
    <!-- 所属分类 -->
    <el-form-item label="课程分类">
        <!-- 一级分类 
            key是唯一标识
            lable是显示的值
            value是传的值，也就是一级分类的id值 
        -->
        <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="一级分类" @change="oneSubjectChanged">
            <el-option
                v-for="subject in oneSubjectList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"/>
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
        <el-option
            v-for="subject in twoSubjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
    </el-form-item>
   
    <!-- 课程讲师 
            key是唯一标识
            lable是显示的值
            value是传的值 -->
    <el-form-item label="课程讲师">
        <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择">
            <el-option
                v-for="teacher in teacherList"
                :key="teacher.id"
                :label="teacher.name"
                :value="teacher.id"/>
        </el-select>
    </el-form-item>
    
    <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
    </el-form-item>
 
    <!-- 课程简介 -->
    <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
    </el-form-item>
    
    <!-- 课程封面-->
    <el-form-item label="课程封面">
        <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="BASE_API+'/eduoss/fileoss'"
            class="avatar-uploader">
            <img :src="courseInfo.cover">
        </el-upload>
    </el-form-item>
   
    <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
    </el-form-item>
 
    <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' //引入富文本编辑器的组件
export default {
    components: { Tinymce }, //第三方组件需要声明才能使用
    data() {
        return {
            saveBtnDisabled:false,
            courseInfo:{
                title: '',
                subjectId: '', //二级分类id
                subjectParentId: '', //一级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '/static/uploadcover.jpg',
                price: 0              
            },
            teacherList:[], //封装所有讲师的数组
            oneSubjectList:[], //一级分类
            twoSubjectList:[], //二级分类
            BASE_API: process.env.BASE_API
        }
    },
    created () {
        //初始化所有讲师
        this.getTeacherList()
        //初始化一级分类
        this.getOneSubject()
    },
    methods: {
        /**
         * 绑定到@change的方法，当一级分类下拉选项变化时触发
         * 当点击某一个一级分类，触发change事件，然后显示对应的二级分类
         * value就是一级分类的id
         */
        oneSubjectChanged(value) {
            //遍历所有分类，包含一级和二级分类
            for (let index = 0; index < this.oneSubjectList.length; index++) {
                //得到每个一级分类
                let oneSubject = this.oneSubjectList[index]
                //判断：所有一级分类id 和 点击的一级分类id 是否一样
                if (value === oneSubject.id) {
                    //从一级分类中获取其对应的所有二级分类
                    this.twoSubjectList = oneSubject.children
                    //把二级分类id值清空
                    this.courseInfo.subjectId = ''
                }
            }
        },
        //查询所有一级分类
        getOneSubject() {
            subject.getSubjectList()
              .then(response => {
                  this.oneSubjectList = response.data.list
              })
        },
        //查询所有讲师
        getTeacherList() {
            course.getTeacherList()
              .then(response => {
                  this.teacherList = response.data.items
              })
        },
        //上传课程封面成功
        handleAvatarSuccess(res, file) {
            this.courseInfo.cover = res.data.url
        },
        //上传课程封面之前调用的方法，保证上传图片格式和大小
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        saveOrUpdate() {
            course.addCourseInfo(this.courseInfo)
              .then(response => {
                  // 提示
                  this.$message({
                    type: 'success',
                    message: '添加课程信息成功'
                  })  
                  // 跳转到第二步
                  this.$router.push({path:'/course/chapter/'+response.data.courseId})
              })
        }
    }
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>