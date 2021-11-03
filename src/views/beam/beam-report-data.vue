<template>
  <layout :title="title" :left-arrow="true">
    <header class="head">
      <strong>{{ headInfo.code1 }}</strong>
      <div style="font-size: 14px">
        所属桥梁：{{ headInfo.beamLineName }},所属墩号：{{
          headInfo.startPier + '-' + headInfo.endPier
        }}
        规格：{{ headInfo.beamTypeName }}
      </div>
    </header>
    <main style="padding-bottom: 50px">
      <van-tabs
        v-model:active="tabActive"
        @change="tabChange"
        color="#26a2ff"
        type="card"
      >
        <van-tab title="工序详情">
          <van-steps direction="vertical" :active="active">
            <van-step v-for="(step, index) in list" :key="index">
              <div class="step-title">
                <h3>{{ step.processName }}</h3>
                <van-icon
                  size="24px"
                  name="edit"
                  @click="() => editProgressStep(step.guid)"
                />
              </div>
              <p>开始时间：{{ step.startTime }}</p>
              <p>结束时间：{{ step.endTime }}</p>
              <p v-if="step.endTime">
                耗时：{{ formatHours(step.startTime, step.endTime) }} (预计：{{
                  formatMinutes(step.estimatedTime)
                }})
              </p>
              <p v-else>
                耗时：未结束(预计：{{ formatMinutes(step.estimatedTime) }})
              </p>
              <p>
                台座：{{ step.pedestalNo + '，记录人： ' + step.createUser }}
              </p>
              <p v-if="step.remark">备注：{{ step.remark }}</p>
              <p v-if="step.picture">
                图片：
                <img
                  width="50"
                  height="50"
                  style="display: inline-block; vertical-align: top"
                  v-for="(imgUrl, index) in step.picture.split(',')"
                  :key="index"
                  :src="imgUrl"
                />
              </p>
            </van-step>
          </van-steps>
        </van-tab>
        <van-tab title="属性信息">
          <div class="prop-list-item" v-for="item in propList" :key="item">
            <div>{{ item.name }}：{{ item.propValue }}{{ item.unit }}</div>
          </div>
        </van-tab>
      </van-tabs>
      <van-button
        type="primary"
        style="width: 100%; position: fixed; bottom: 0"
        @click="addProgress"
        >添加</van-button
      >
    </main>
  </layout>
</template>
<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { structure, reportData, modelPropBasicList } from '@/api/beam'
import { Toast } from 'vant'
export default {
  setup(props) {
    const state = reactive({
      list: [],
      active: 0,
      params: {
        code1: '',
      },
      title: '',
      headInfo: {
        code1: '',
        beamLineName: '',
        beamTypeName: '',
        startPier: '',
        endPier: '',
      },
      tabActive: 0,
      propList: [],
    })
    const router = useRouter()
    const route = useRoute()
    state.params.code1 = route.query.code1
    state.title = route.query.title

    const toDetail = (item) => {}
    const search = async () => {}
    const formatMinutes = (value) => {
      let middle = parseInt(value) // 分
      let hour = parseInt(middle / 60)
      return hour + 'h'
    }
    const formatHours = (start, end) => {
      start = new Date(start).getTime()
      end = new Date(end).getTime()
      let total = (end - start) / (1000 * 3600)
      return total.toFixed() + 'h'
    }
    const editProgressStep = (guid) => {
      router.push({
        path: '/beamProgressEdit',
        query: {
          guid: guid,
        },
      })
    }
    const addProgress = () => {
      router.push({
        path: '/beamProgressAdd',
        query: {
          code1: state.params.code1,
        },
      })
    }
    const tabChange = (name, title) => {
      // state.para = name
      // onLoad()
    }
    onMounted(async () => {
      let res = await structure(state.params)
      if (res.code != 0) {
        Toast(res.msg)
      } else {
        state.headInfo = res.data[0]
      }
      let reportRes = await reportData(state.params)
      if (reportRes.code != 0) {
        Toast(reportRes.msg)
      } else {
        state.list = reportRes.data
        state.active = reportRes.data.length - 1
      }
      let propRes = await modelPropBasicList({ code1: state.params.code1 })
      state.propList = propRes.data
    })
    return {
      ...toRefs(state),
      toDetail,
      search,
      formatMinutes,
      formatHours,
      editProgressStep,
      addProgress,
      tabChange,
    }
  },
}
</script>
<style lang="less">
.head {
  padding: 10px;
  font-size: 16px;
}
.step-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.prop-list-item {
  // border: 1px solid #333;
  // border-top-width: 0;
  margin: 0 15px;
  padding: 5px;
  font-size: 14px;
  &:first-of-type {
    margin-top: 10px;
    // border-top-width: 1px;
  }
}
</style>
