<template>
  <div class="nav-header">
    <van-nav-bar
      fixed
      :title="state.title"
      left-arrow
      @click-left="$router.back"
    />
    <van-search
      v-model="state.value"
      show-action
      placeholder="请输入搜索关键词"
      @update:model-value="onSearch"
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="file-item" v-for="item in state.list" :key="item">
        <van-image class="file-item__icon" fit="cover" :src="item.fileIcon" />
        <van-cell
          class="file-item__content"
          is-link
          @click="
            () => {
              fileClick(item)
            }
          "
          :title="item.fileName"
        />
      </div>
    </van-list>
    <van-overlay :show="state.showDownLoading">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        "
      >
        <van-circle
          :current-rate="state.showDownLoadPercent"
          :speed="1"
          fill="white"
          :text="state.showDownLoadText"
        >
        </van-circle>
      </div>
    </van-overlay>
    <!-- <van-popup :show="state.showDownLoading">
      <van-circle
        :current-rate="state.showDownLoadPercent"
        :speed="1"
        :text="state.showDownLoadText"
      />
    </van-popup> -->
  </div>
</template>
<style lang="less">
.file-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  padding: 5px 10px;
  margin-top: 2px;
  &__icon {
    width: 30px;
    height: 30px;
  }
  &__content {
    width: 100%;
  }
}
</style>
<script>
import {
  reactive,
  ref,
  toRefs,
  onBeforeMount,
  watch,
  onUnmounted,
  computed,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { initList, fileDrawingFolder, fileDrawingFuzzySearch } from '@/api/file'
import { Toast } from 'vant'
import { imageHttpUrl } from '@/config/index'
export default {
  setup(props) {
    const state = reactive({
      list: [],
      loading: true,
      finished: false,
      guid: '',
      value: '',
      folderCode: 'file',
      foldType: 'fold',
      downloadTask: null,
      showDownLoading: false,
      showDownLoadPercent: 1,
      showDownLoadText: '',
      title: '',
    })

    const route = useRoute()
    const router = useRouter()
    state.folderCode = route.query.type
    state.guid = route.query.guid || ''
    state.title = route.query.type === 'file' ? '知识库' : '图纸查询'
    const fileTypeMap = {
      fold: imageHttpUrl + '/fileType/fold.png',
      file: imageHttpUrl + '/fileType/file.png',
      doc: imageHttpUrl + '/fileType/doc.png',
      docx: imageHttpUrl + '/fileType/doc.png',
      xls: imageHttpUrl + '/fileType/xls.png',
      xlsx: imageHttpUrl + '/fileType/xls.png',
      ppt: imageHttpUrl + '/fileType/ppt.png',
      pptx: imageHttpUrl + '/fileType/ppt.png',
      jpg: imageHttpUrl + '/fileType/jpg.png',
      png: imageHttpUrl + '/fileType/png.png',
      gif: imageHttpUrl + '/fileType/jpg.png',
      mp4: imageHttpUrl + '/fileType/mp4.png',
      pdf: imageHttpUrl + '/fileType/pdf.png',
      rar: imageHttpUrl + '/fileType/rar.png',
    }
    state.showDownLoadText = computed(() => state.showDownLoadPercent + '%')

    const fileClick = (item) => {
      console.log(item)
      if (item.fileType == state.foldType) {
        router.push({
          path: '/fileManager',
          query: { type: state.folderCode, guid: item.guid },
        })
      } else {
        downloadFile(item.fileUrl)
      }
    }
    const downloadFile = (url) => {
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
            console.log('Download success: ' + d.filename)
            // Toast('文件地址在' + d.filename)
            // Toast('文件地址在' + d.filename)
            plus.runtime.openFile(d.filename)
          } else {
            console.log('Download failed: ' + status)
            Toast.fail('下载失败，请重试')
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

    const onCancel = () => {}
    const formatList = ({
      fileList,
      folderList,
      fileRecordList,
      drawingRecordList,
    }) => {
      let list = []
      folderList.map((item) => {
        let name = item.folderName
        if (item.folderName.length > 15) {
          name = item.folderName.slice(0, 5) + '...' + item.folderName.slice(-8)
        }
        list.push({
          createDate: item.createDate,
          guid: item.guid,
          fileIcon: fileTypeMap.fold,
          fileType: state.foldType,
          fileName: name,
        })
      })
      drawingRecordList.map((item) => {
        let name = item.fileName
        if (item.fileName.length > 15) {
          name = item.fileName.slice(0, 5) + '...' + item.fileName.slice(-8)
        }
        list.push({
          createDate: item.createDate,
          guid: item.guid,
          fileType: state.foldType,
          fileIcon: fileTypeMap.fold,
          fileName: name,
        })
      })
      fileRecordList.map((item) => {
        let name = item.fileName
        if (item.fileName.length > 15) {
          name = item.fileName.slice(0, 5) + '...' + item.fileName.slice(-8)
        }
        list.push({
          createDate: item.createDate,
          guid: item.guid,
          fileType: state.foldType,
          fileIcon: fileTypeMap.fold,
          fileName: name,
        })
      })
      fileList.map((item) => {
        let name = item.resaved2
        if (item.resaved2.length > 15) {
          name = item.resaved2.slice(0, 5) + '...' + item.resaved2.slice(-8)
        }
        list.push({
          createDate: item.createDate,
          guid: item.guid,
          fileType: item.fileSuffix,
          fileIcon: fileTypeMap[item.fileSuffix],
          fileName: name,
          fileUrl: item.fileUrl,
        })
      })
      state.list = list
    }
    const getinitList = async () => {
      let res = await initList({ folderCode: state.folderCode })
      formatList(res)
    }
    const getFolderList = async ({ guid }) => {
      let res = await fileDrawingFolder({ guid })
      formatList(res)
    }
    const onSearch = async (val = null) => {
      let res = await fileDrawingFuzzySearch({
        folderCode: state.folderCode,
        fileFuzzyName: val,
      })
      formatList(res)
    }
    const onLoad = async () => {
      state.loading = true
      state.finished = false
      if (state.guid) {
        await getFolderList({ guid: state.guid })
      } else {
        await getinitList()
      }
      state.loading = false
      state.finished = true
    }
    onUnmounted(() => {
      state.downloadTask = null
    })
    return {
      state,
      fileTypeMap,
      onLoad,
      onSearch,
      onCancel,
      fileClick,
    }
  },
}
</script>
