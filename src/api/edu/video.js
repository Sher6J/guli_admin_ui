import request from '@/utils/request'

export default {
  /**
   * 添加小节
   */
  addVideo(video) {
    return request({
      url: `/eduservice/edu-video/addVideo`,
      method: 'post',
      data: video
    })
  },
  /**
   * 删除小节
   */
  deleteVideo(id) {
    return request({
      url: `/eduservice/edu-video/deleteVideo/${id}`,
      method: 'delete'
    })
  },
  /**
   * 根据id查询小节
   */
  getVideoInfo(id) {
    return request({
      url: `/eduservice/edu-video/getVideoInfo/${id}`,
      method: 'get'
    })
  },
  /**
   * 更新小节信息
   */
  updateVideo(video) {
    return request({
      url: `/eduservice/edu-video/updateVideo/${video.id}`,
      method: 'post',
      data: video
    })
  },
  /**
   * 删除阿里云的视频
   * @param {视频id} id
   */
  deleteAliyunVod(id) {
    return request({
      url: `/eduvod/video/removeVideoFromAliyun/${id}`,
      method: 'delete'
    })
  }
}
