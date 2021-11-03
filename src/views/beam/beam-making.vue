<template>
  <layout title="制梁分析" :left-arrow="true">
    <div>
      <van-grid direction="horizontal" :column-num="3">
        <van-grid-item>
          <div class="custom-grid-item">
            <strong>{{ state.progressAnalysis.planCount }}</strong>
            <span>计划完成</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="custom-grid-item">
            <strong>{{ state.progressAnalysis.totalCount }}</strong>
            <span>总量</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="custom-grid-item">
            <strong>{{ state.progressAnalysis.actualCount }}</strong>
            <span>实际完成</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="product-head">
      <van-radio-group
        direction="horizontal"
        v-model="state.showType"
        @change="changeType"
      >
        <van-radio name="0" icon-size="24px">月度统计</van-radio>
        <van-radio name="1" icon-size="24px">累计统计</van-radio>
      </van-radio-group>
    </div>
    <div>
      <div class="custom-search">
        <ali-select
          label=""
          v-model="state.params.beamTypeCode"
          placeholder="梁段类型"
          :columns="state.beamTypeList"
          :columnsProps="state.columnsProps"
          @get-selection="search"
        ></ali-select>
        <van-field
          style="margin-left: 10px; margin-right: 10px"
          v-model="state.calendarDate"
          @click="state.showCalendar = true"
          placeholder="选择日期"
          readonly
          clickable
          clearable
        ></van-field>
        <van-button
          type="default"
          icon="delete-o"
          @click="clearParams"
        ></van-button>
      </div>
      <ali-chart
        v-if="state.showType == 1"
        id="acc"
        height="300px"
        :option="state.accOption"
      ></ali-chart>
      <ali-chart
        v-else
        id="mon"
        height="300px"
        :option="state.monOption"
      ></ali-chart>
    </div>
    <van-calendar
      v-model:show="state.showCalendar"
      type="range"
      :min-date="new Date('2000-01-01')"
      @confirm="onConfirm"
    />
  </layout>
</template>
<style lang="less">
.product-head {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  & > div,
  & > button {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
}
.custom-grid-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > strong {
    font-size: 18px;
  }
}
</style>
<script>
import { reactive, onBeforeMount, onMounted, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { beamMaking, beamType } from '@/api/beam'
import AliChart from '@/components/AliChart.vue'
import AliSelect from '@/components/AliSelect.vue'
import { accOption, monOption } from './beam-making-config'
import { Toast } from 'vant'
export default defineComponent({
  components: { AliChart, AliSelect },
  setup() {
    const state = reactive({
      progressAnalysis: {
        actualCount: 0,
        planCount: 0,
        totalCount: 0,
      },
      accOption: JSON.parse(JSON.stringify(accOption)),
      monOption: JSON.parse(JSON.stringify(monOption)),
      showType: '1',
      params: {
        beginTime: '',
        endTime: '',
        type: 1, // 0 代表月，1代表累计
        beamTypeCode: '',
      },
      columnsProps: {
        text: 'name',
        value: 'code',
      },
      beamTypeList: [],
      showCalendar: false,
      calendarDate: '',
    })
    const route = useRoute()
    //
    const getBeamMaking = async (params) => {
      let res = await beamMaking(params)
      if (res.code !== 0) {
        Toast.fail(res.msg)
        return
      }
      state.progressAnalysis = res.progressAnalysis
      return res.data
    }
    //
    const initMonth = async () => {
      state.params.type = state.showType
      let data = await getBeamMaking(state.params)
      if (data.length == 0) {
        clearChart(state.monOption)
        return
      }
      let monX = [],
        monY1 = [],
        monY2 = []
      data.forEach((curr) => {
        monX.push(curr.monthDate)
        monY1.push(curr.reality)
        monY2.push(curr.plan)
      })
      state.monOption.xAxis.data = monX
      state.monOption.series[0].data = monY1
      state.monOption.series[1].data = monY2
    }
    //
    const initAcc = async () => {
      state.params.type = state.showType
      let data = await getBeamMaking(state.params)
      if (data.length == 0) {
        clearChart(state.accOption)
        return
      }
      let accX = [],
        accY1 = [],
        accY2 = []
      data.forEach((curr) => {
        accX.push(curr.monthDate)
        accY1.push(curr.reality)
        accY2.push(curr.plan)
      })
      state.accOption.xAxis.data = accX
      state.accOption.series[0].data = accY1
      state.accOption.series[1].data = accY2
    }
    const clearChart = (option) => {
      option.xAxis.data = []
      option.series[0].data = []
      option.series[1].data = []
    }
    const initData = async () => {
      if (state.showType == 1) {
        await initAcc()
      } else {
        await initMonth()
      }
    }
    const search = () => {
      initData()
    }
    const clearParams = () => {
      state.params.beginTime = ''
      state.params.endTime = ''
      state.calendarDate = ''
      state.params.beamTypeCode = ''
      initData()
    }
    const changeType = async (value) => {
      // state.params.beamTypeCode = ''
      // state.params.beginTime = ''
      // state.params.endTime = ''
      // state.calendarDate = ''
      await initData()
    }
    const formatDate = (date) =>
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const onConfirm = (values) => {
      const [start, end] = values
      state.params.beginTime = formatDate(start)
      state.params.endTime = formatDate(end)
      state.calendarDate = formatDate(start) + ' 至 ' + formatDate(end)
      state.showCalendar = false
      initData()
    }
    onMounted(async () => {
      let beamTypeRes = await beamType()
      state.beamTypeList = beamTypeRes.data
      await initData()
    })
    return {
      state,
      search,
      onConfirm,
      changeType,
      clearParams,
    }
  },
})
</script>
