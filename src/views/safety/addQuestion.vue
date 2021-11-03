<template>
  <layout title="填报问题">
    <ali-select
      v-model="state.form[item.prop]"
      v-for="item in state.pickerList"
      :key="item"
      :label="item.text"
      :columns="state[item.type]"
      :columns-props="state.columnsProps"
    ></ali-select>
    <ali-select
      v-if="state.showPublic"
      v-model="state.form.isPublic"
      label="是否公开"
      :columns="state.publicList"
      :columns-props="state.columnsProps"
    ></ali-select>
    <ali-select
      v-model="state.form.resaved5"
      label="经办人"
      :columns="state.userList"
      :columns-props="state.columnsProps"
      @get-selection="getPerson"
    ></ali-select>
    <select-date
      v-model="state.form.startingTime"
      label="发起时间"
    ></select-date>
    <select-date v-model="state.form.endingTime" label="整改时限"></select-date>
    <van-field
      v-model="state.form.location"
      label="问题位置"
      placeholder="问题位置"
    >
      <template #button v-if="state.form.locationSelect === 'select'">
        <van-button size="mini" type="primary" @click="questionLocationSearch"
          >搜索</van-button
        >
      </template>
    </van-field>
    <van-popup
      :show="state.structure.showPicker"
      @click-overlay="state.structure.showPicker = false"
      position="bottom"
    >
      <van-picker
        :columns="state.structure.list"
        :columns-field-names="state.structure.props"
        @confirm="onConfirmStructure"
        @cancel="state.structure.showPicker = false"
      />
    </van-popup>
    <van-field
      v-model="state.form.marks"
      rows="3"
      autosize
      label="问题描述"
      type="textarea"
      maxlength="100"
      placeholder="问题描述"
      show-word-limit
    />
    <van-field
      v-model="state.form.rectification"
      rows="3"
      autosize
      label="整改要求"
      type="textarea"
      maxlength="100"
      placeholder="整改要求"
      show-word-limit
    />
    <van-uploader
      style="margin: 10px"
      v-model="state.fileList"
      :after-read="afterRead"
      result-type="dataUrl"
      :before-delete="beforeDelete"
    />
    <van-button
      type="primary"
      block
      round
      text="提交"
      @click="submit"
    ></van-button>
  </layout>
</template>
<script>
import { reactive, toRefs, onMounted, onBeforeMount, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import AliSelect from '@/components/AliSelect.vue'
import SelectDate from '@/components/selectDate.vue'
import {
  getDictList,
  addQuestion,
  getUserList,
  upload,
  getJudgePublic,
  getStructureName,
} from '@/api/safetyQuestion'
import { createGuid } from '@/utils/index'
import { Toast } from 'vant'
export default {
  components: { AliSelect, SelectDate },
  setup(props) {
    const state = reactive({
      columnsProps: { text: 'label', value: 'value' },
      form: {
        guid: createGuid(),
        level: '',
        professionType: '',
        status: '',
        isPublic: '',
        startingTime: '',
        endingTime: '',
        resaved5: '',
        modleId: '',
        projectId: '',
        rectification: '',
        person: '',
        location: '',
        locationSelect: '',
        marks: '',
      },
      showPublic: false,
      userList: [],
      publicList: [],
      statusList: [],
      professionList: [],
      levelList: [],
      locationList: [
        { label: '填写', value: 'write' },
        { label: '选择', value: 'select' },
      ],
      pickerList: [
        {
          text: '严重程度',
          prop: 'level',
          type: 'levelList',
        },
        {
          text: '专业分类',
          prop: 'professionType',
          type: 'professionList',
        },
        {
          text: '问题状态',
          prop: 'status',
          type: 'statusList',
          // },
          // {
          //   text: '经办人',
          //   prop: 'person',
          //   type: 'userList',
        },
        {
          text: '位置选择',
          prop: 'locationSelect',
          type: 'locationList',
        },
      ],
      fileList: [],
      fileUrls: [],
      structure: {
        list: [],
        props: { text: 'sturctureName' },
        showPicker: false,
      },
    })
    const router = useRouter()
    const getUsers = async () => {
      let { data } = await getUserList()
      state.userList = data.map((item) => ({
        label: item.userName,
        value: item.phonenumber,
      }))
    }
    const getDictListByType = async (dictType) => {
      let { data } = await getDictList({ dictType })
      return data.map((item) => ({
        label: item.dictLabel,
        value: item.dictValue,
      }))
    }
    // 上传文件
    const afterRead = async (file, detail) => {
      file.status = 'uploading'
      file.message = '上传中...'

      let res = await upload(file.file, state.form.guid)
      if (res.code == 0) {
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
    const getPerson = (user) => {
      state.form.person = user.label
    }
    const submit = async () => {
      let form = toRaw(state.form)
      form.startingTime = form.startingTime.split(' ')[0]
      form.endingTime = form.endingTime.split(' ')[0]
      if (form.locationSelect == 'select') {
        form.location = form.location.split('+')[1]
      }
      const loadding = Toast.loading('提交中...')
      let res = await addQuestion(form)
      loadding.clear()
      if (res.code == 0) {
        router.back()
      } else {
        Toast.fail(res.msg)
      }
    }
    const questionLocationSearch = async () => {
      let res = await getStructureName({ structureName: state.form.location })
      if (res.code == 0 && res.data.length > 0) {
        state.structure.list = res.data
        state.structure.showPicker = true
      } else {
        Toast('暂无数据')
      }
    }
    const onConfirmStructure = async (value) => {
      state.form.location = value.sturctureName
      state.form.modleId = value.code1
      state.structure.showPicker = false
      //
    }
    onBeforeMount(async () => {
      let { isPublic } = await getJudgePublic()
      state.form.isPublic = isPublic + ''
      state.showPublic = isPublic === '1'
      state.publicList = await getDictListByType('quality-problem_public')
      state.statusList = await getDictListByType('quality_problem_stasus')
      state.professionList = await getDictListByType(
        'quality_problem_profession'
      )
      state.levelList = await getDictListByType('quality_problem_level')
      await getUsers()
    })
    return {
      state,
      afterRead,
      beforeDelete,
      getPerson,
      submit,
      questionLocationSearch,
      onConfirmStructure,
    }
  },
}
</script>
<style lang="less" scoped></style>
