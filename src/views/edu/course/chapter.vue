<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="课程最终发布"/>
    </el-steps>

    <ul>
        <li v-for="chapter in chapterList" :key="chapter.id">
            {{chapter.title}}
            <ul>
                <li v-for="video in chapter.children" :key="video.id">
                    {{video.title}}
                </li>
            </ul>
        </li>
    </ul>

    <el-form label-width="120px">

      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import chapter from '@/api/edu/chapter'
export default {
    data() {
        return {
            saveBtnDisabled:false,
            courseId:'',
            chapterList:[]
        }
    },
    created () {
        //获取到路由中的id值
        if (this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id
            //根据课程id查询章节和小节
            this.getChapters()
        }
    },
    methods: {
        //根据课程id查询章节和小节
        getChapters() {
            chapter.getChapters(this.courseId)
              .then(response => {
                  this.chapterList = response.data.chapters
              })
        },
        previous() {
            // 跳转到第一步
            this.$router.push({path:'/course/info/1'})
        },
        next() {
            // 跳转到第三步
            this.$router.push({path:'/course/publish/1'})
        }
    }
}
</script>
