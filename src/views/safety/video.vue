<template>
  <layout title="视频监控">
    <div class="video-list">
      <div
        class="video-list-item"
        v-for="(item, index) in state.list"
        :key="index"
        @click="() => openVideo(item)"
      >
        <img style="width:100%" :src="item.picUrl" />
        <div class="video-list-item__title">
          {{ item.channelName }}
        </div>
      </div>
    </div>
  </layout>
</template>
<style lang="less">
.video-list {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 150px;
  gap: 20px 20px;
  padding: 20px 20px;
  &-item {
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 10px #ddd;
    position: relative;
    &__title {
      box-sizing: border-box;
      width: 100%;
      padding: 5px;
      position: absolute;
      bottom: 0;
      z-index: 2;
      background-color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
<script>
import { reactive, onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getCameraList, getLiveUrl, getVideoUrl } from '@/api/video'
import { getVideoToken } from '@/api/common'
import { Toast } from 'vant'
export default {
  setup(props) {
    const state = reactive({
      list: [],
    })
    const store = useStore()
    const router = useRouter()
    let token = ref(null)
    let projectId = computed(() => store.getters.projectId)
    const openVideo = async ({ channelName, deviceSerial, channelNo }) => {
      let {
        data: {
          data: { url },
        },
      } = await getLiveUrl(token, deviceSerial, channelNo)
      let videoUrl = getVideoUrl(token, url)
      router.push({
        name: 'webview',
        params: {
          url: videoUrl,
          title: channelName.split('@')[0],
        },
      })
    }
    const getToken = async (projectId) => {
      let res = await getVideoToken({ projectId })
      if (res.code != 0) {
        Toast.fail(res.msg)
        return false
      }
      return res.data
    }
    onMounted(async () => {
      token = await getToken(projectId)
      if (!token) {
        return
      }
      let { data } = await getCameraList(token)
      if (data.code != '200') {
        Toast.fail(data.msg)
        return
      }
      state.list = data.data
      // if (data && data.data) {
      //   data.data.forEach(async (item) => {
      //     let {
      //       data: {
      //         data: { url },
      //       },
      //     } = await getLiveUrl(token, item?.deviceSerial, item?.channelNo)
      //     // console.log(url)
      //     state.list.push({
      //       url: url,
      //       channelName: item.channelName,
      //       picUrl: item.picUrl,
      //     })
      //   })
      // }
    })
    return {
      state,
      openVideo,
    }
  },
}
</script>
