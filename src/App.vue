<template>
  <div id="app1">
    <router-view :key="key" v-slot="{ Component }">
      <transition name="slide-left">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script>
import {
  inject,
  computed,
  watchEffect,
  onBeforeMount,
  ref,
  reactive,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVersion } from '@/api/common'
import { Dialog, Toast } from 'vant'
export default {
  setup(props) {
    const state = reactive({
      downloadTask: null,
      showDownLoading: false,
      showDownLoadPercent: 0,
    })
    const route = useRoute()
    const router = useRouter()
    const key = computed(() => route.fullPath + Math.random())
    // watchEffect(() => console.log(route.fullPath))
    const downloadFile = (url, callback) => {
      if (!window.plus) {
        Toast('插件未安装')
        return
      }
      if (state.downloadTask) {
        Toast('文件下载中...')
        return
      }
      state.downloadTask = plus.downloader.createDownload(
        url,
        {
          filename: '_downloads/',
        },
        (d, status) => {
          // 下载完成
          if (status == 200) {
            // console.log('Download success: ' + d.filename)
            // Toast('文件地址在' + d.filename)
            // Toast('文件地址在' + d.filename)
            plus.nativeUIshowWaiting('安装更新中...')
            plus.runtime.install(
              d.filename,
              {},
              (successMessage) => {
                plus.nativeUI.closeWaiting()
                plus.nativeUI.alert('应用安装完成', () => {
                  plus.runtime.restart()
                })
              },
              (e) => {
                plus.nativeUI.closeWaiting()
                plus.nativeUI.alert('安装失败[' + e.code + ']:' + e.message)
              }
            )
            callback(true)
            // plus.runtime.openFile(d.filename)
          } else {
            // console.log('Download failed: ' + status)
            Toast.fail('下载失败，请重试')
            callback(false)
            state.downloadTask.abort()
          }
          state.downloadTask = null
          state.showDownLoading = false
          state.showDownLoadPercent = 0
        }
      )
      state.downloadTask.addEventListener(
        'statechanged',
        (down, status) => {
          console.log(down)
          if (down.state == 3 || down.state == 4) {
            state.showDownLoadPercent = (
              (down.downloadedSize / down.totalSize) *
              100
            ).toFixed(0)
          }
        },
        false
      )
      state.downloadTask.start()
      state.showDownLoading = true
    }

    onBeforeMount(async () => {
      let res = await getVersion()
      if (res.newVersion) {
        Dialog.alert({
          title: '发现新版本',
          message: res.appVersion.marks,
          messageAlign: 'left',
          theme: 'round-button',
          confirmButtonColor: '#26a2ff',
          confirmButtonText: '立即更新',
          closeOnPopstate: false,
          'before-close': () => {
            console.log('before-close')
            // document.location.href = res.appVersion.downUrl
            return new Promise((resolve, reject) => {
              downloadFile(res.appVersion.downUrl, (result) => {
                resolve(true)
              })
            })
          },
        })
      }
    })
    return {
      key,
    }
  },
}
</script>

<style lang="scss">
$durationTime: 300ms;
#app1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7f8fa;
}
/*向左滑动*/
@keyframes slideInLeft {
  from {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-left-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInLeft $durationTime linear forwards;
}
.slide-left-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInRight $durationTime linear forwards;
}
/*向右滑动*/
@keyframes slideOutLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideOutRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-right-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutLeft $durationTime linear forwards;
}
.slide-right-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutRight $durationTime linear forwards;
}
</style>
