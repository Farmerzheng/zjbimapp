<template>
  <layout title="问题详情" style="background: #fff">
    <van-field
      v-for="(prop, index) in props"
      :key="index"
      v-model="form[prop.value]"
      :label="prop.label"
      :placeholder="prop.label"
      :type="prop.type || 'text'"
      readonly
    />
    <div style="margin-bottom: 10px">
      <!-- <van-image
        width="2.5rem"
        height="2.5rem"
        style="border: 1px solid #f7f8fa"
        fit="cover"
        v-for="{ url } in imageList"
        :key="url"
        :src="url"
      /> -->
      <van-uploader :deletable="false" disabled v-model="imageList"></van-uploader>
    </div>
    <van-cell>
      <template #default>
        <strong style="font-size: 24px">评论列表</strong>
      </template>
    </van-cell>
    <div v-if="commentsList.length > 0" style="padding-bottom: 60px;">
      <comment-item
        v-for="item in commentsList"
        :key="item"
        :item="item"
      ></comment-item>
    </div>
    <van-empty class="custom-image" v-else description="暂无评论数据" />
    <van-cell clickable center class="comment-container">
      <template #title>
        <van-button icon="edit" class="comment-input" @click="openComment"
          >写评论</van-button
        >
      </template>
    </van-cell>
    <van-popup
      :show="showComment"
      round
      closeable
      close-icon="close"
      position="bottom"
      safe-area-inset-bottom
      :style="{ height: '40%', 'padding-top': '40px' }"
      @click-overlay="closeComment"
      @click-close-icon="closeComment"
    >
      <van-field
        v-model="commentContent"
        rows="3"
        autosize
        label="评论"
        type="textarea"
        maxlength="100"
        placeholder="写评论"
        show-word-limit
      />
      <van-uploader
        style="margin: 10px"
        v-model="fileList"
        :after-read="afterRead"
        result-type="dataUrl"
        :before-delete="beforeDelete"
      />
      <van-button type="primary" round block @click="submitComment"
        >评论</van-button
      >
    </van-popup>
  </layout>
</template>
<style lang="less">
.custom-image {
  margin-bottom: 60px;
}
.custom-image .van-empty__image {
  width: 50px;
  height: 50px;
}
.comment-container {
  position: fixed;
  bottom: 0;
  box-shadow: 0 0 5px #999;
  .comment-input {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: #eee;
    padding: 5px 10px;
  }
}
</style>
<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  getQuestionDetail,
  getCommentList,
  addComment,
  upload,
} from '@/api/qualityQuestion'
import CommentItem from './commentItem.vue'
import { createGuid } from '@/utils/index'
import { Toast } from 'vant'
export default {
  components: { CommentItem },
  setup(props) {
    const state = reactive({
      form: {},
      guid: '',
      props: [
        {
          label: '所属位置',
          value: 'location',
        },
        {
          label: '严重程度',
          value: 'level',
        },
        {
          label: '专业分类',
          value: 'professionType',
        },
        {
          label: '问题状态',
          value: 'status',
        },
        {
          label: '发起时间',
          value: 'resaved4',
        },
        {
          label: '整改时限',
          value: 'resaved5',
        },
        {
          label: '整改要求',
          value: 'rectification',
        },
        {
          label: '经办人',
          value: 'person',
        },
        {
          label: '问题描述',
          value: 'marks',
          type: 'textarea',
        },
      ],
      imageList: [],
      commentsList: [],
      showComment: false,
      commentGuid: '',
      commentContent: '',
      fileList: [],
      fileUrls: [],
    })
    const route = useRoute()
    state.guid = route.query.guid
    const formatImageUrl = (imageUrlStr = '') => {
      if (imageUrlStr) {
        if (imageUrlStr.indexOf(',') !== -1) {
          imageUrlStr.split(',').forEach((url) => {
            state.imageList.push({ url })
          })
        } else {
          state.imageList.push({ url: imageUrlStr })
        }
      }
    }
    const getCommentListByGuid = async () => {
      let commentsRes = await getCommentList({ qualityGuid: state.guid })
      state.commentsList = commentsRes.data
    }
    // 上传文件
    const afterRead = async (file, detail) => {
      file.status = 'uploading'
      file.message = '上传中...'
      let res = await upload(file.file, state.form.guid)
      if (res.code == 0) {
        // state.fileUrls.push({ url: res.data.fileUrl, guid: res.data.guid })
        file.status = 'done'
        file.message = '上传完成'
      } else {
        file.status = 'failed'
        file.message = '上传失败'
      }
    }
    //
    const beforeDelete = async (file, detail) => {
      return true
      let removeFile = state.fileUrls[detail.index]
      let res = await deleteFile({ guid: removeFile.guid })
      if (res.code == 0) {
        state.fileUrls.splice(detail.index, 1)
        state.fileList.splice(detail.index, 1)
        return true
      } else {
        return false
      }
    }
    const openComment = () => {
      state.commentGuid = createGuid()
      state.showComment = true
    }
    const submitComment = async () => {
      if (!state.commentContent) {
        Toast('请输入评论内容')
        return
      }
      let res = await addComment({
        guid: state.commentGuid,
        marks: state.commentContent,
        qualityId: state.guid,
      })
      if (res.code === 0) {
        Toast('评论成功')
        closeComment()
        getCommentListByGuid()
      } else {
        Toast(res.msg)
      }
    }
    const closeComment = () => {
      state.commentGuid = ''
      state.commentContent = ''
      state.fileList = []
      state.showComment = false
    }
    onMounted(async () => {
      let res = await getQuestionDetail({ guid: state.guid })
      state.form = res.data
      formatImageUrl(res.data.resaved1)
      getCommentListByGuid()
    })
    return {
      ...toRefs(state),
      openComment,
      submitComment,
      closeComment,
      afterRead,
      beforeDelete,
    }
  },
}
</script>
