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
  </div>
</template>
<script>
import { reactive, toRefs, ref, onMounted, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AliCollapse from '@/components/AliCollapse.vue'
import { getInspectionDetail } from '@/api/quality3Inspection'
import { Toast } from 'vant'
export default {
  components: { AliCollapse },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
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
      },
      selfList: [],
      reList: [],
      commentsList: [],
    })
    onMounted(async () => {
      let guid = route.params.guid
      let phoneNum = store.getters.userPhone
      let res = await getInspectionDetail({ guid, phoneNum })
      if (res.code == 0) {
        let {
          qualityThreeInspection,
          qualityThreeInspectionComments,
          attachmentList,
        } = res
        state.form = qualityThreeInspection
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
      } else {
        Toast(res.msg)
      }
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>
