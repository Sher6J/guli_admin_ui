<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="课程最终发布"/>
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chapterList">
        <li
            v-for="chapter in chapterList"
            :key="chapter.id">
            <p>
                {{ chapter.title }}
                <span class="acts">
                    <el-button type="text" @click="openVideo(chapter.id)">添加课时</el-button>
                    <el-button type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
                    <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
                </span>
            </p>

            <!-- 小节视频 -->
            <ul class="chapterList videoList">
                <li
                    v-for="video in chapter.children"
                    :key="video.id">
                    <p>{{ video.title }}
                        <span class="acts">
                            <el-button type="text" @click="editVideo(video.id)">编辑</el-button>
                            <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                        </span>
                    </p>
                </li>
            </ul>
        </li>
    </ul>
    <div>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加和修改章节表单(弹框) -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
            <el-form-item label="章节标题">
                <el-input v-model="chapter.title"/>
            </el-form-item>
            <el-form-item label="章节排序">
                <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
    <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
        <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
        <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
        <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
        </el-radio-group>
        </el-form-item>
       
        <el-form-item label="上传视频">
            <el-upload
                :on-success="handleVodUploadSuccess"
                :on-remove="handleVodRemove"
                :before-remove="beforeVodRemove"
                :on-exceed="handleUploadExceed"
                :file-list="fileList"
                :action="BASE_API+'/eduvod/video/uploadVideoToAliyun'"
                :limit="1"
                class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
                <div slot="content">最大支持1G，<br>
                    支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                    GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                    MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                    SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                <i class="el-icon-question"/>
            </el-tooltip>
            </el-upload>
        </el-form-item>    

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
    </div>
    </el-dialog>    

  </div>
</template>
<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'
export default {
    data() {
        return {
            saveBtnDisabled:false,
            courseId:'',
            chapterList:[],
            chapter:{ //封装章节数据
                title: '',
                sort: 0
            },
            video:{ //封装小节数据
                title: '',
                sort: 0,
                free: 0,
                videoSourceId: '',
                videoOriginalName: ''//上传视频名称
            },
            dialogChapterFormVisible:false, //章节弹框是否显示
            dialogVideoFormVisible:false, //小节弹框是否显示
            fileList:[], //上传文件列表
            BASE_API:process.env.BASE_API //接口API地址
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
        //=======================小节中视频操作=========================
        //点击x之后点击 确定 时调用这个方法
        handleVodRemove() {
            //调用接口删除视频
            video.deleteAliyunVod(this.video.videoSourceId)
              .then(response => {
                  this.$message({
                    type: 'success',
                    message: '删除视频成功！'
                  });
                  this.fileList = []
                  //删除阿里云中的视频后，还需要把数据库中视频id和视频名称字段清空
                  this.video.videoSourceId = ''
                  this.video.videoOriginalName = ''
              })
        },
        //点击 × 时调用这个方法
        beforeVodRemove(file, fileList) {
            return this.$confirm(`确认移除 ${ file.name } ?`);
        },
        //上传视频成功调用的方法
        handleVodUploadSuccess(response, file, fileList) {
            this.video.videoSourceId = response.data.videoId
            this.video.videoOriginalName = file.name
        },
        //上传视频之前的方法
        handleUploadExceed() {
            this.$message.warning('想要重新上传视频，请先删除已上传的视频')
        },


        //=======================小节操作==============================

        //添加小节弹框
        openVideo(chapterId) {
            this.dialogVideoFormVisible = true
            //设置章节id
            this.video.chapterId = chapterId
            //同时清空弹框
            this.video.title = ''
            this.video.sort = 0
            this.free = 0
            this.videoSourceId = ''
        },
        //编辑小节
        editVideo(id) {
            this.dialogVideoFormVisible = true
            video.getVideoInfo(id)
              .then(response => {
                  this.video = response.data.item
              })
        },
        //更新小节
        updateVideo() {
            video.updateVideo(this.video)
              .then(response => {
                  //关闭弹框
                  this.dialogVideoFormVisible = false
                  //提示信息
                  this.$message({
                    type: 'success',
                    message: '编辑小节成功！'
                  });
                  //刷新页面
                  this.getChapters()
              })
        },
        //删除小节 
        removeVideo(id) {
            this.$confirm('此操作将删除该小节记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              video.deleteVideo(id)
                .then(response => {
                  //提示信息
                  this.$message({
                    type: 'success',
                    message: '删除小节成功!'
                  });
                //刷新页面
                this.getChapters()
              })
            }) 
        },
        //添加小节
        addVideo() {
            //设置课程id
            this.video.courseId = this.courseId
            video.addVideo(this.video)
              .then(response => {
                  //关闭弹框
                  this.dialogVideoFormVisible = false
                  //提示信息
                  this.$message({
                    type: 'success',
                    message: '添加小节成功！'
                  });
                  //刷新页面
                  this.getChapters()
              })
        },
        saveOrUpdateVideo() {
            if (!this.video.id) {
                this.addVideo()
            } else {
                this.updateVideo()
            }
        },
        

        //=======================章节操作==============================

        //删除章节
        removeChapter(chapterId) {
            this.$confirm('此操作将删除该章节记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              chapter.deleteChapter(chapterId)
                .then(response => {
                  //提示信息
                  this.$message({
                    type: 'success',
                    message: '删除章节成功!'
                  });
                //刷新页面
                this.getChapters()
              })
            })             
        },
        //修改章节弹框（有数据回显）
        openEditChapter(chapterId) {
            this.dialogChapterFormVisible = true
            chapter.getChapterInfo(chapterId)
              .then(response => {
                  this.chapter = response.data.chapter
              })
        },
        //弹出添加章节的弹框（弹出的同时清空弹框表单）
        openChapterDialog() {
            this.dialogChapterFormVisible = true
            this.chapter.title = ''
            this.chapter.sort = 0
        },
        //添加章节
        addChapter() {
            this.chapter.courseId = this.courseId
            chapter.addChapter(this.chapter)
              .then(response => {
                  //关闭弹框
                  this.dialogChapterFormVisible = false
                  //提示信息
                  this.$message({
                    type: 'success',
                    message: '添加章节成功！'
                  });
                  //刷新页面
                  this.getChapters()
              })
        },
        //修改章节
        updateChapter() {
            chapter.updateChapter(this.chapter)
              .then(response => {
                  //关闭弹框
                  this.dialogChapterFormVisible = false
                  //提示信息
                  this.$message({
                    type: 'success',
                    message: '修改章节成功！'
                  });
                  //刷新页面
                  this.getChapters()
              })
        },
        saveOrUpdate() {
            //有id是修改，无id是添加
            if (!this.chapter.id) {
                this.addChapter()
            } else{
                this.updateChapter()
            }
        },
        //根据课程id查询章节和小节
        getChapters() {
            chapter.getChapters(this.courseId)
              .then(response => {
                  this.chapterList = response.data.chapters
              })
        },
        previous() {
            // 跳转到第一步
            this.$router.push({path:'/course/info/' + this.courseId})
        },
        next() {
            // 跳转到第三步
            this.$router.push({path:'/course/publish/' + this.courseId})
        }
    }
}
</script>
<style scoped>
.chapterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chapterList li{
  position: relative;
}
.chapterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chapterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>