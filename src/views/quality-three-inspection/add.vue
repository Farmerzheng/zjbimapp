<template>
  <div class="nav-header">
    <van-nav-bar fixed title="质量三检" left-arrow @click-left="$router.back">
      <template #right>
        <van-icon name="sign" size="22"></van-icon>
      </template>
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
        required
      />
      <van-field
        label="分部分项"
        v-model="form.resaved3"
        placeholder="请输入"
        clearable
        required
      >
        <template #button>
          <van-button size="mini" type="primary" @click="structureSearch"
            >搜索</van-button
          >
        </template>
      </van-field>
      <van-popup
        :show="structure.showPicker"
        @click-overlay="structure.showPicker = false"
        position="bottom"
      >
        <van-picker
          :columns="structure.list"
          :columns-field-names="structure.props"
          @confirm="onConfirmStructure"
          @cancel="structure.showPicker = false"
        />
      </van-popup>
      <ali-select
        label="工序"
        v-model="form.processName"
        :columns="processList"
        :columns-props="processProps"
        @get-selection="(item) => (form.processId = item.guid)"
        required
      ></ali-select>
      <select-date
        v-model="form.startDate"
        required
        clearable
        label="开始时间"
      ></select-date>
      <select-date
        v-model="form.endDate"
        required
        clearable
        label="结束时间"
      ></select-date>
    </van-cell-group>
    <ali-collapse :title="comment.activityName">
      <ali-select
        label="检查员"
        placeholder="请选择人员"
        v-model="form.qualityThreeInspectionComment.nextPersonName"
        :columns="userList"
        :columns-props="userProps"
        @get-selection="
          (item) =>
            (form.qualityThreeInspectionComment.nextPerson = item.phonenumber)
        "
        required
        readonly
      ></ali-select>
      <select-date
        v-model="form.qualityThreeInspectionComment.hopeToDate"
        label="希望到场时间"
      ></select-date>
      <van-field
        v-model="form.qualityThreeInspectionComment.msg"
        rows="3"
        autosize
        required
        label="检查内容"
        type="textarea"
        maxlength="100"
        placeholder="请输入"
        show-word-limit
      />
      <van-uploader
        style="margin: 10px"
        v-model="fileList"
        :after-read="afterRead"
        result-type="dataUrl"
        :before-delete="beforeDelete"
      />
    </ali-collapse>
    <div class="quality-inspection-bottom-button">
      <van-button
        class="quality-inspection-bottom-button__submit"
        type="primary"
        round
        @click="submit"
        >提交</van-button
      >
    </div>
  </div>
</template>
<style lang="scss">
.quality-inspection-bottom-button {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  .quality-inspection-bottom-button__submit {
    width: 100%;
    // margin-right: 10px;
  }
  .quality-inspection-bottom-button__cancel {
    width: 50%;
  }
}
</style>
<script>
import { reactive, toRefs, ref, onMounted, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { dateFormat } from '@/utils/date'
import SelectDate from '@/components/selectDate.vue'
import AliCollapse from '@/components/AliCollapse.vue'
import AliSelect from '@/components/AliSelect.vue'
import {
  initPage,
  getStructureName,
  getProcess,
  addInspection,
  upload,
  deleteFile,
} from '@/api/quality3Inspection'
import { Toast } from 'vant'
export default {
  components: { SelectDate, AliCollapse, AliSelect },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      userList: [],
      userProps: { text: 'userName' },
      structure: {
        list: [],
        props: { text: 'sturctureName' },
        showPicker: false,
      },
      processList: [],
      processProps: { text: 'processName' },
      active: ['1'],
      form: {
        guid: '',
        teamId: '', //班组ID
        resaved1: '', // 班组名称
        teamLeader: '', // 班组长ID
        resaved2: '', // 班组长名称
        gongquId: '', //工区ID
        resaved4: '', //工区名称
        wbsId: '', // 分部分项ID
        resaved3: '', // 分部分项名称
        processId: '', // 工序ID
        processName: '',
        startDate: '',
        endDate: '',
        qualityThreeInspectionComment: {
          guid: '',
          activityName: '',
          activityCode: '',
          msg: '',
          nextPerson: '',
          nextPersonName: '',
          hopeToDate: '',
        },
      },
      fileList: [],
      fileUrls: [],
      comment: {
        guid: '',
        activityName: '',
        activityCode: '',
      },
    })
    // 分部分项搜索
    const structureSearch = async () => {
      let structureName = state.form.resaved3
      let res = await getStructureName({ structureName })
      if (res.code == 0 && res.data.length > 0) {
        state.structure.list = res.data
        state.structure.showPicker = true
      } else {
        Toast('暂无数据')
      }
    }
    // 分部分项选择
    const onConfirmStructure = async (value) => {
      state.form.resaved3 = value.sturctureName
      state.form.wbsId = value.code1
      state.structure.showPicker = false
      let res = await getProcess({ structureId: value.code1 })
      if (res.code == 0 && res.data.length > 0) {
        state.processList = res.data
      } else {
        Toast('暂无数据')
      }
    }

    // 上传文件
    const afterRead = async (file, detail) => {
      file.status = 'uploading'
      file.message = '上传中...'
      let formData = new FormData()
      formData.append('file', file.file)
      let res = await upload(
        {
          fileType: state.comment.guid,
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
    const submit = async () => {
      state.form.resaved3 = state.form.resaved3.split('+')[1]
      let res = await addInspection(state.form)
      if (res.code !== 0) {
        Toast(res.msg)
      } else {
        router.back()
      }
    }
    onMounted(async () => {
      let {
        foreman,
        team,
        workArea,
        userList,
        guid,
        comment,
      } = await initPage()
      state.comment = comment
      state.userList = userList
      state.form.qualityThreeInspectionComment.guid = comment.guid
      state.form.qualityThreeInspectionComment.activityCode =
        comment.activityCode
      state.form.qualityThreeInspectionComment.activityName =
        comment.activityName
      state.form.guid = guid
      state.form.teamId = team?.deptId
      state.form.resaved1 = team?.deptName
      state.form.teamLeader = foreman?.userId
      state.form.resaved2 = foreman?.userName
      state.form.gongquId = workArea?.deptId
      state.form.resaved4 = workArea?.deptName
    })
    return {
      ...toRefs(state),
      submit,
      afterRead,
      beforeDelete,
      structureSearch,
      onConfirmStructure,
    }
  },
}
</script>
