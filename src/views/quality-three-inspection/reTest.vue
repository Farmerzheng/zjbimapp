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
    <ali-collapse
      :title="item.activityName"
      v-for="(item, index) in commentsList"
      :key="index"
    >
      <van-field
        label="检查员"
        v-model="item.nextPerson"
        placeholder=""
        readonly
      >
      </van-field>
      <van-field
        label="希望到场时间"
        v-model="item.hopeToDate"
        placeholder=""
        readonly
      >
      </van-field>
      <van-field
        v-model="item.msg"
        rows="3"
        autosize
        readonly
        label="检查内容"
        type="textarea"
        maxlength="100"
        placeholder=""
        show-word-limit
      />
      <van-uploader
        :deletable="false"
        v-model="item.fileList"
        disabled
      ></van-uploader>
      <van-field
        v-if="item.actionName"
        label="退回原因"
        v-model="item.actionName"
        placeholder=""
        readonly
      >
      </van-field>
    </ali-collapse>
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
        @click="submitRetestContent"
        >提交</van-button
      >
      <van-button
        class="quality-inspection-bottom-button__submit"
        type="warning"
        round
        @click="rollbackButtonClick"
        >退回</van-button
      >
      <van-popup
        v-model:show="show"
        round
        closeable
        close-on-popstate
        close-icon="close"
        :close-on-click-overlay="true"
        position="bottom"
        :style="{ height: '200px', paddingTop: '40px' }"
      >
        <van-field
          v-model="rollback.rollbackReason"
          label="退回原因"
          type="textarea"
          show-word-limit
          maxlength="100"
          required
          placeholder="原因"
        />
        <ali-select
          label="回退节点"
          placeholder="请选择"
          v-model="rollback.title"
          :columns="rollbackTaskList"
          :columns-props="rollbackProp"
          @get-selection="
            (item) => (rollback.activityDefId = item.activityDefId)
          "
          required
          readonly
        ></ali-select>
        <van-button
          :style="{ width: '100%', marginTop: '10px' }"
          round
          type="primary"
          @click="rollbackButtonSave"
          >回退</van-button
        >
      </van-popup>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.quality-inspection-bottom-button {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  padding: 10px;
  .quality-inspection-bottom-button__submit,
  .quality-inspection-bottom-button__cancel {
    width: 100%;
  }
}
</style>
<script>
import { reactive, toRefs, ref, onMounted, toRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dateFormat } from '@/utils/date'
import SelectDate from '@/components/selectDate.vue'
import AliCollapse from '@/components/AliCollapse.vue'
import AliSelect from '@/components/AliSelect.vue'
import {
  getInspectionDetail,
  retestSpecialSave,
  upload,
  deleteFile,
  getRollbackTaskList,
  rollbackSave,
} from '@/api/quality3Inspection'
import { Toast } from 'vant'
export default {
  components: { AliCollapse, SelectDate, AliSelect },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      userList: [],
      userProps: { text: 'userName' },
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
      commentsList: [],
      comment: {
        guid: '',
        activityName: '',
        activityCode: '',
      },
      show: false,
      rollbackTaskList: [],
      rollbackProp: { text: 'title' },
      rollback: {
        title: '',
        activityDefId: '',
        rollbackReason: '',
      },
      guid: '',
      phoneNum: '',
    })

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

    const submitRetestContent = async () => {
      // let { retestContent, guid } = state.form
      const loading = Toast.loading('提交中...')
      let res = await retestSpecialSave(state.form, state.phoneNum)
      loading.clear()
      if(res.code == 0) {
        router.back()
      } else {
        Toast.fail(res.msg)
      }
    }
    const rollbackButtonClick = () => {
      state.show = true
    }
    const rollbackButtonSave = async () => {
      let res = await rollbackSave(state.rollback)
      if(res.code == 0) {
        router.back()
      } else {
        Toast.fail(res.msg)
      }
    }
    onMounted(async () => {
      window.parent.postMessage({msg: "mainToolbarHidden"},'*');
      let guid = route.query.guid
      let phoneNum = route.query.phoneNum
      state.phoneNum = phoneNum
      state.guid = guid
      let res = await getInspectionDetail({ guid, phoneNum })
      if (res.code == 0) {
        let {
          qualityThreeInspection,
          qualityThreeInspectionComments,
          attachmentList,
          comment,
          userList,
        } = res
        state.userList = userList
        state.comment = comment
        // state.form = qualityThreeInspection
        state.form.guid = qualityThreeInspection.guid
        state.form.teamId = qualityThreeInspection.teamId
        state.form.resaved1 = qualityThreeInspection.resaved1
        state.form.teamLeader = qualityThreeInspection.teamLeader
        state.form.resaved2 = qualityThreeInspection.resaved2
        state.form.gongquId = qualityThreeInspection.gongquId
        state.form.resaved4 = qualityThreeInspection.resaved4
        state.form.resaved3 = qualityThreeInspection.resaved3
        state.form.resaved5 = qualityThreeInspection.resaved5
        state.form.createUser = qualityThreeInspection.createUser
        state.form.startDate = qualityThreeInspection.startDate
        state.form.endDate = qualityThreeInspection.endDate
        state.form.qualityThreeInspectionComment.guid = comment.guid
        state.form.qualityThreeInspectionComment.activityCode =
          comment.activityCode
        state.form.qualityThreeInspectionComment.activityName =
          comment.activityName
        qualityThreeInspectionComments.forEach((ele) => {
          let fileList = []
          attachmentList.forEach((item) => {
            if (item.fileType == ele.guid) {
              fileList.push({ url: item.fileUrl })
            }
          })
          ele.fileList = fileList
        })
        state.commentsList = qualityThreeInspectionComments

        let rollbackRes = await getRollbackTaskList({ guid })
        state.rollbackTaskList = rollbackRes.data
      } else {
        Toast(res.msg)
      }
    })
    return {
      ...toRefs(state),
      afterRead,
      beforeDelete,
      submitRetestContent,
      rollbackButtonClick,
      rollbackButtonSave,
    }
  },
}
</script>
