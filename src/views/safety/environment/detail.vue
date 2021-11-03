<template>
  <layout title="测点信息">
    <section class="main-section">
      <van-tabs
        type="card"
        v-model="state.activeTabName"
        color="#26a2ff"
        @change="changeTab"
      >
        <van-tab name="环境监测" title="环境监测">
          <div>实时数据</div>
          <div class="realdata">
            <div
              v-for="(item, index) in state.realKeys"
              :key="index"
              class="realdata-item"
            >
              <img width="50" height="50" :src="imagePath(item)" />
              <div>
                <strong>{{ state.realKeysLabel[index] }}</strong>
              </div>
              <strong>{{ state.realData[item] }}</strong>
            </div>
          </div>
          <div class="historydata-title">
            <div>历史数据</div>
            <div>
              <input
                readonly
                clickable
                :value="state.searchDate"
                placeholder="选择时间"
                @click="showDatePicker = true"
              />
            </div>
          </div>
          <div v-if="state.historyOption">
            <ali-chart
              :option="state.historyOption"
              id="chart-history-1"
            ></ali-chart>
          </div>
        </van-tab>
        <van-tab name="预警信息" title="预警信息">
          <div>
            <van-button @click="() => warningHistory()">今日</van-button>
            <van-button @click="() => warningHistory(2)">本周</van-button>
            <van-button @click="() => warningHistory(3)">本月</van-button>
            <van-button @click="() => warningHistory(4)">本年</van-button>
          </div>
          <div class="history-detail history__table-head">
            <span>指标</span>
            <span>阈值</span>
            <span>超标次数</span>
          </div>
          <div
            class="history-detail"
            v-for="(item, index) in state.historyThresholdList"
            :key="index"
            :item="item"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.threshold }}</span>
            <span>{{ item.count }}</span>
          </div>
        </van-tab>
      </van-tabs>
      <van-calendar
        type="range"
        poppable
        :min-date="new Date('1990-01-01')"
        :show="showDatePicker"
        close-on-click-overlay
        @confirm="dateConfirm"
      />
    </section>
  </layout>
</template>
<script>
import { reactive, ref, onMounted, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getHistoryData, getRealtimeData } from '@/api/environment'
import { Toast } from 'vant'
import * as echarts from 'echarts'
import AliChart from '@/components/AliChart.vue'
import { option, choseDate, dateFormat } from './history-option'
import { imageHttpUrl } from '@/config/index'
export default {
  components: { AliChart },
  setup(props) {
    const state = reactive({
      list: [],
      searchDate: '',
      activeTabName: '环境监测',
      tabList: ['环境监测', '预警信息'],
      params: {
        beginTime: '',
        endTime: '',
        deviceNum: '',
      },
      realKeys: ['hum', 'noise', 'pm25', 'pm10', 'tem', 'wd360', 'wp', 'ws'],
      realKeysLabel: [
        '湿度',
        '噪声',
        'PM2.5',
        'PM10',
        '温度',
        '风向',
        '气压',
        '风速',
      ],
      realData: {},
      historyOption: null,
      historyData: [],
      historyThresholdList: [],
    })
    let showDatePicker = ref(false)
    const route = useRoute()
    const router = useRouter()
    let historyXAxisData = [
      'PM10',
      'PM2.5',
      '湿度',
      '噪音',
      '温度',
      '风向',
      '风力',
      '风速',
    ]
    let thresholdArr = [150, 75, 500, 70, 500, 500, 500, 500] //阈值
    let historyArr = []
    state.params.deviceNum = route.query.deviceNum
    const historyDataEcharts = (data) => {
      var recordTime = []
      var pm10s = [],
        pm25s = [],
        hums = [],
        noises = [],
        tems = [],
        wd360s = [],
        wps = [],
        wss = []
      if (data != null && data.length > 0) {
        data.forEach(function (item) {
          recordTime.push(
            dateFormat(new Date(item.recordTime), 'yyyy-MM-dd HH:mm')
          )
          pm10s.push(item.pm10)
          pm25s.push(item.pm25)
          hums.push(item.hum)
          noises.push(item.noise)
          tems.push(item.tem)
          wd360s.push(item.wd360)
          wps.push(item.wp)
          wss.push(item.ws)
        })
      }
      historyArr = [pm10s, pm25s, hums, noises, tems, wd360s, wps, wss]
      //
      bindMonitorData(historyArr)
      var seriesData = []
      for (var i = 0; i < historyXAxisData.length; i++) {
        var obj = {}
        obj.name = historyXAxisData[i]
        obj.data = historyArr[i]
        obj.type = 'line'
        seriesData.push(obj)
      }
      return {
        xAxis: recordTime,
        series: seriesData,
      }
    }
    const bindMonitorData = (historyArr) => {
      state.historyThresholdList = []
      for (let i = 0; i < historyXAxisData.length; i++) {
        let name = historyXAxisData[i] //指标
        let threshold = thresholdArr[i] //阈值
        let count = 0
        if (name != '风向') {
          let historyData = historyArr[i] //历史数据
          count = historyData.filter((data) => {
            return data > threshold
          }).length
          state.historyThresholdList.push({
            name: name,
            count: count,
            threshold: threshold,
          })
        }
      }
    }
    const warningHistory = (val = 1) => {
      let { startDate, endDate } = choseDate(val)
      state.params.beginTime = startDate
      state.params.endTime = endDate
      getHistory()
    }
    const getHistory = async () => {
      let { data } = await getHistoryData(state.params)
      let historyData = JSON.parse(data)
      state.historyData = historyData

      let { xAxis, series } = historyDataEcharts(historyData)
      option.xAxis.data = xAxis
      option.series = series
      state.historyOption = option
    }
    const getRealtime = async () => {
      let { data } = await getRealtimeData()
      let realData = JSON.parse(data)
      state.realData = realData[0]
    }
    const changeTab = (name) => {
      console.log(name)
    }
    const dateConfirm = (date) => {
      const [start, end] = date
      state.params.beginTime = dateFormat(start, 'yyyy-MM-dd HH:mm')
      state.params.endTime = dateFormat(end, 'yyyy-MM-dd HH:mm')
      state.searchDate = `${state.params.beginTime}至${state.params.endTime}`
      showDatePicker.value = false
      getHistory()
    }
    const imagePath = (name) => {
      return imageHttpUrl + '/img/' + name + '.svg'
    }
    onBeforeMount(async () => {
      await warningHistory()
      await getRealtime()
    })
    return {
      state,
      showDatePicker,
      changeTab,
      dateConfirm,
      warningHistory,
      imagePath,
    }
  },
}
</script>
<style lang="scss">
.main-section {
  padding: 20px 5px;
  .realdata {
    margin: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    align-items: center;
    justify-content: space-evenly;
    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
  .historydata-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .history-detail {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    & > span {
      border: 1px solid #eee;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .history__table-head {
    background-color: #ddd;
  }
}
</style>
