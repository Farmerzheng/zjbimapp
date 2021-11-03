<template>
  <layout :title="title">
    <van-form @submit="onSubmit">
      <ali-select
        label="工序"
        name="processName"
        :rules="[{ required: true, message: '必填项' }]"
        v-model="form.processId"
        :columns="processList"
        :columns-props="processProps"
        required
      ></ali-select>
      <ali-select
        label="台座编号："
        name="pedestalName"
        :rules="[{ required: true, message: '必填项' }]"
        v-model="form.pedestalNo"
        :columns="beamPedestals"
        :columns-props="beamPedestalsProps"
        required
        right-icon="scan"
        @click-right-icon="scanIconClick"
      ></ali-select>
      <select-date
        name="startTime"
        v-model="form.startTime"
        required
        clearable
        :rules="[{ required: true, message: '必填项' }]"
        label="开始时间"
      ></select-date>
      <select-date
        name="endTime"
        v-model="form.endTime"
        required
        clearable
        :rules="[{ required: true, message: '必填项' }]"
        label="结束时间"
      ></select-date>
      <van-field
        label="备注："
        name="remark"
        v-model="form.remark"
        rows="3"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入"
        show-word-limit
      />
      <van-field label="照片">
        <template #input>
          <van-uploader
            v-model="imageList"
            :after-read="afterRead"
            :before-delete="beforeDelete"
          />
        </template>
      </van-field>
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </van-form>
    <scan
      v-if="scanbarShow"
      @go-back="() => (scanbarShow = false)"
      @success="scanSuccess"
    ></scan>
  </layout>
</template>
<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  progressReportAddInit,
  progressReportEditInit,
  progressReportAdd,
  progressReportEdit,
  uploadFile,
  deleteFile,
} from '@/api/beam'
import SelectDate from '@/components/selectDate.vue'
import AliSelect from '@/components/AliSelect.vue'
import Scan from '@/components/scan.vue'
import { Toast } from 'vant'
export default {
  components: { AliSelect, SelectDate, Scan },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      title: '',
      code1: '',
      form: {
        guid: '',
        structureId: '',
        structureType: '',
        processSetId: '', //
        processId: '',
        // processName: '',
        pedestalNo: '',
        // pedestalName: '',
        startTime: '',
        endTime: '',
        remark: '',
      },
      processList: [],
      processProps: { text: 'processName', value: 'guid' },
      beamPedestals: [],
      beamPedestalsProps: { text: 'pedestalName', value: 'pedestalNo' },
      fileList: [],
      imageList: [],
      scanbarShow: false,
    })
    state.code1 = route.query.code1
    state.title = route.query.code1
    const scanIconClick = () => {
      console.log('icon click')
      state.scanbarShow = true
    }
    const scanSuccess = (value) => {
      state.form.pedestalNo = value
      state.scanbarShow = false
    }
    const onSubmit = async (values) => {
      let res = await progressReportAdd(state.form)
      if (res.code !== 0) {
        Toast.fail(res.msg)
      } else {
        router.back()
      }
    }
    const afterRead = async (file, detail) => {
      file.status = 'uploading'
      file.message = '上传中...'
      let formData = new FormData()
      formData.append('file', file.file)
      let res = await uploadFile(
        {
          fileType: state.form.guid,
          linkId: state.form.guid,
        },
        formData
      )
      if (res.code == 0) {
        // state.fileList.push({ url: res.data.fileUrl, guid: res.data.guid })
        file.status = 'done'
        file.message = '上传完成'
        file.guid = res.data.guid
      } else {
        file.status = 'failed'
        file.message = '上传失败'
      }
    }
    //
    const beforeDelete = async (file, detail) => {
      debugger
      // let removeFile = state.fileList[detail.index]
      let res = await deleteFile({ guid: file.guid })
      if (res.code == 0) {
        // state.fileList.splice(detail.index, 1)
        return true
      } else {
        return false
      }
    }
    onMounted(async () => {
      let res = await progressReportAddInit({ code1: state.code1 })
      if (res.code != 0) {
        Toast(res.msg)
        return
      }
      state.form.guid = res.guid
      state.form.structureId = res.structureId
      state.form.processSetId = res.processSetId
      state.form.structureType = res.beamTypeCode
      state.processList = res.processList
      state.beamPedestals = res.beamPedestals
    })
    return {
      ...toRefs(state),
      onSubmit,
      afterRead,
      beforeDelete,
      scanIconClick,
      scanSuccess,
    }
  },
}
</script>
<style lang="scss">
.van-badge__wrapper.van-icon.van-icon-scan {
  font-size: 26px;
}
</style>
