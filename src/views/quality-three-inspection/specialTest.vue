<template>
  <div class="nav-header">
    <van-nav-bar fixed title="质量三检" left-arrow @click-left="$router.back">
    </van-nav-bar>
    <van-cell-group>
      <van-field
        label="班组"
        v-model="form.resaved1"
        placeholder="班组"
        readonly
      />
      <van-field
        label="班组长"
        v-model="form.resaved2"
        placeholder="班组长"
        readonly
      />
      <van-field
        label="工区"
        v-model="form.resaved4"
        placeholder="工区"
        readonly
      />
      <van-field
        label="分部分项"
        v-model="form.resaved3"
        placeholder="分部分项"
        readonly
      >
      </van-field>
      <van-field
        label="工序"
        v-model="form.resaved5"
        placeholder="工序"
        readonly
      >
      </van-field>
      <van-field
        label="发起人"
        v-model="form.createUser"
        placeholder="发起人"
        readonly
      >
      </van-field>
      <van-field
        label="开始时间"
        v-model="form.startDate"
        placeholder="开始时间"
        readonly
      >
      </van-field>
      <van-field
        label="结束时间"
        v-model="form.endDate"
        placeholder="结束时间"
        readonly
      >
      </van-field>
    </van-cell-group>
    <ali-collapse title="相关负责人">
      <van-field
        label="复检员"
        v-model="form.reInspector"
        placeholder="复检员"
        readonly
      >
      </van-field>
      <van-field
        label="希望到场时间"
        v-model="form.retestDate"
        placeholder="希望到场时间"
        readonly
      >
      </van-field>
    </ali-collapse>
    <ali-collapse title="自检结果">
      <van-field
        v-model="form.selfTestContent"
        rows="3"
        autosize
        readonly
        label="自检内容"
        type="textarea"
        maxlength="100"
        placeholder="自检内容"
        show-word-limit
      />
      <van-uploader
        :deletable="false"
        v-model="selfList"
        disabled
      ></van-uploader>
    </ali-collapse>
    <ali-collapse title="复检员审核">
      <van-field
        v-model="form.retestContent"
        rows="3"
        autosize
        readonly
        label="意见内容"
        type="textarea"
        maxlength="100"
        placeholder="意见内容"
        show-word-limit
      />
      <van-uploader :deletable="false" v-model="reList" disabled></van-uploader>
      <van-field
        label="处理人"
        v-model="form.reInspector"
        placeholder="处理人"
        readonly
      >
      </van-field>
      <van-field
        label="处理时间"
        v-model="form.retestHandleDate"
        placeholder="处理时间"
        readonly
      >
      </van-field>
    </ali-collapse>
    <ali-collapse title="专检员审核">
      <van-field
        v-model="form.specialInspectionContent"
        rows="3"
        autosize
        label="意见内容"
        type="textarea"
        maxlength="100"
        placeholder="意见内容"
        show-word-limit
        @blur="submitRetestContent"
      />
      <van-uploader
        style="margin: 10px"
        v-model="fileList"
        :after-read="afterRead"
        result-type="dataUrl"
        :before-delete="beforeDelete"
      />
    </ali-collapse>
  </div>
</template>
<script>
import { reactive, toRefs, ref, onMounted, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AliCollapse from '@/components/AliCollapse.vue'
import {
  getInspectionDetail,
  retestSpecialSave,
  upload,
  deleteFile,
} from '@/api/quality3Inspection'
import { Toast } from 'vant'
export default {
  components: { AliCollapse },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      form: {
        guid: '',
        createUser: null,
        resaved1: '', // 班组名称
        resaved2: '', // 班组长名称
        resaved4: '', //工区名称
        resaved3: '', // 分部分项名称
        resaved5: '',
        startDate: '',
        endDate: '',
        selfTestContent: '', //自检内容
        specialInspector: null, //专检
        specialInspectionDate: null,
        specialInspectionContent: null,
        specialHandleDate: null,
        reInspector: null, // 复检
        retestDate: null,
        retestContent: null,
        retestHandleDate: null,
      },
      selfList: [],
      reList: [],
      specialList: [],
      fileList: [],
      fileUrls: [],
    })
    // 上传文件
    const afterRead = async (file, detail) => {
      file.status = 'uploading'
      file.message = '上传中...'
      let formData = new FormData()
      formData.append('file', file.file)
      let res = await upload(
        {
          fileType: 'specialtest',
          linkId: state.form.guid,
        },
        formData
      )
      if (res.code == 0) {
        state.fileUrls.push({ url: res.data.fileUrl, guid: res.data.guid })
        file.status = 'done'
        file.message = '上传完成'
      } else {
        file.status = 'failed'
        file.message = '上传失败'
      }
    }
    //
    const beforeDelete = async (file, detail) => {
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

    const submitRetestContent = async () => {
      let { specialInspectionContent, guid } = state.form
      const loading = Toast.loading('保存中...')
      let res = await retestSpecialSave({ specialInspectionContent, guid })
      loading.clear()
    }
    onMounted(async () => {
      let guid = route.query.guid
      let res = await getInspectionDetail({ guid })
      if (res.code == 0) {
        let { data, specialtest, retest, selftest } = res
        state.form = data
        state.specialList = specialtest.map((item) => {
          return { url: item.fileUrl }
        })
        state.selfList = selftest.map((item) => {
          return { url: item.fileUrl }
        })
        state.reList = retest.map((item) => {
          return { url: item.fileUrl }
        })
      } else {
        Toast(res.msg)
      }
    })
    return {
      ...toRefs(state),
      beforeDelete,
      afterRead,
      submitRetestContent,
    }
  },
}
</script>
