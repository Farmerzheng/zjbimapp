<template>
  <div>
    <div style="padding: 15px; display: flex; align-items: center">
      <div style="width: 250px; overflow: hidden">
        <input
          style="width: 100%; height: 22px"
          readonly
          clickable
          :value="searchDate"
          placeholder="选择日期"
          @click="showPicker = true"
        />
        <van-calendar
          v-model:show="showPicker"
          :minDate="minDate"
          type="range"
          @confirm="selectDateConfirm"
        />
      </div>
      <button
        style="
          background: rgb(38, 162, 255);
          border-width: 0;
          color: #fff;
          width: 120px;
          height: 28px;
        "
        @click="search"
      >
        搜索
      </button>
    </div>
    <div style="padding-left: 15px">
      <van-checkbox-group
        v-model="checkboxList"
        direction="horizontal"
        @change="checkboxChange"
      >
        <van-checkbox
          shape="square"
          :ref="optItem.value"
          v-for="(optItem, index) in staticsList"
          :name="optItem.value"
          :key="index"
          >{{ optItem.text }}</van-checkbox
        >
      </van-checkbox-group>
    </div>
    <div id="mainStatistics" class="mainstatistics"></div>
  </div>
</template>
<script>
import {
  getPointDataList,
  getWaringStatistics,
  getWaringList,
  getDataStatistics,
  getstaticsDict,
} from '@/api/control'
import { Toast } from 'vant'
import * as echarts from 'echarts'
import { getOption } from './point-statistics-option'
export default {
  data() {
    return {
      params: {
        startTime: '',
        endTime: '',
        guid: '',//19c38772-5aba-46dd-adf2-fd97dd05524d
        yfieldValue: '',
        xfieldValue: 'measure_date',
      },
      searchDate: '',
      showPicker: false,
      minDate: new Date(2010, 0, 1),
      staticsEcharts: null,
      checkboxList: [],
      staticsList: [],
    }
  },
  props: {
    guid: String,
  },
  mounted() {
    this.params.guid = this.guid
    this.getStaticsDict()
  },
  methods: {
    search() {
      this.getDataStatistics()
    },
    selectDateConfirm(date) {
      const [start, end] = date
      this.params.startTime = start.toLocaleDateString()
      this.params.endTime = end.toLocaleDateString()
      this.searchDate = `${this.params.startTime}至${this.params.endTime}`
      this.showPicker = false
    },
    checkboxChange(names) {
      if (this.checkboxList.length < 1) {
        Toast.fail('至少选择一个')
      } else {
        this.getDataStatistics()
      }
    },
    async getStaticsDict() {
      let res = await getstaticsDict({ guid: this.params.guid })
      if (res.code !== 0) {
        Toast.fail(res.msg)
        return false
      }
      Object.keys(res.map).forEach((key) => {
        this.staticsList.push({
          text: res.map[key],
          value: key,
        })
      })
      //
      this.checkboxList.push(this.staticsList[0].value)
      this.getDataStatistics()
    },
    initStatisticsEcharts(xData = [], yData = [], legend = []) {
      let options = getOption(xData, yData, legend)
      if (!this.staticsEcharts) {
        this.staticsEcharts = this.getEchartsInstance('mainStatistics')
      }
      this.setEchartsOption(this.staticsEcharts, options)
    },
    setEchartsOption(instance, options) {
      instance.setOption(options)
    },
    getEchartsInstance(id) {
      echarts.init(document.getElementById(id)).dispose();
      let ins = echarts.init(document.getElementById(id))
      return ins;
    },
    getDataStatistics() {
      this.params.yfieldValue = this.checkboxList.join(',')
      getDataStatistics(this.params).then((res) => {
        if (res.code !== 0) {
          Toast.fail(res.msg)
          return false
        }
        const { legendList, xList, yList } = res
        this.loading = false
        this.finished = true
        this.initStatisticsEcharts(xList, yList, legendList)
      })
    },
  },
}
</script>
