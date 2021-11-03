<template>
  <div class="nav-header">
    <van-nav-bar fixed :title="form.courseTitle" left-arrow @click-left="$router.back">
      <template #right>
        <van-icon name="sign" size="22"></van-icon>
      </template>
    </van-nav-bar>
    <van-field
      label="课程名称"
      v-model="form.courseTitle"
      placeholder="课程名称"
    />
    <van-field
      label="培训日期"
      v-model="form.trainingDate"
      placeholder="培训日期"
    />
    <van-field
      label="培训机构"
      v-model="form.trainingOrganization"
      placeholder="培训机构"
    />
    <van-field
      label="培训讲师"
      v-model="form.trainingTeacher"
      placeholder="培训讲师"
      clearable
    />
    <van-field
      label="培训课时"
      v-model="form.trainingHours"
      placeholder="培训课时"
      clearable
    />
    <van-field
      label="培训地址"
      v-model="form.trainingAddress"
      placeholder="培训地址"
      clearable
    />
    <van-field
      label="培训人员"
      v-model="form.traingPersion"
      placeholder="培训人员"
      clearable
    />
    <van-field
      v-model="form.trainingContent"
      rows="3"
      autosize
      label="培训内容"
      type="textarea"
      maxlength="100"
      placeholder="培训内容"
      show-word-limit
    />
    <van-image :src="form.trainingImg" width="100px" height="100px"></van-image>
    <!-- <div class="quality-inspection-bottom-button">
      <van-button
        class="quality-inspection-bottom-button__submit"
        type="primary"
        round
        @click="submit"
        >提交</van-button
      >
    </div> -->
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
import { useRouter, useRoute } from 'vue-router'
import { dateFormat } from '@/utils/date'
import SelectDate from '@/components/selectDate.vue'
import AliCollapse from '@/components/AliCollapse.vue'
import AliSelect from '@/components/AliSelect.vue'
import { Toast } from 'vant'
export default {
  components: { SelectDate, AliCollapse, AliSelect },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      form: {},
    })

    const submit = async () => {}
    onMounted(() => {
      state.form = JSON.parse(route.query.item)
    })
    return {
      ...toRefs(state),
      submit,
    }
  },
}
</script>
