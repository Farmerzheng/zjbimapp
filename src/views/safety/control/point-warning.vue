<template>
  <div>
    <div id="mainWarning" class="mainWarning"></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <van-cell v-for="(item, index) in tabContentList" :key="index">
        <template #title>
          <div class="list-item-main">
            <div>事件名称：{{ item.resaved1 }}</div>
            <div>位置：{{ item.resaved2 }}</div>
            <div>触发值：{{ item.waringValue }}</div>
            <div>触发时间：{{ item.createDate }}</div>
          </div>
          <div class="list-item-bottom">
            <div class="list-item-bottom-i">
              预警等级：
              <van-button type="warning" round size="mini">{{
                item.grade
              }}</van-button>
            </div>
            <div class="list-item-bottom-i">
              <van-button type="info" round size="mini">{{
                item.handleState
              }}</van-button>
            </div>
            <div class="list-item-bottom-i">
              <van-button
                type="primary"
                round
                size="mini"
                @click="handleWarning(item)"
                >处理</van-button
              >
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
    <van-dialog
      v-model:show="showHandleWarning"
      title="预警信息"
      show-cancel-button
      confirm-button-color="black"
      :before-close="submitHandleInfo"
    >
      <van-field
        rows="2"
        autosize
        label=""
        type="textarea"
        maxlength="50"
        show-word-limit
        placeholder="请输入处理信息"
        v-model="handleInfo"
      ></van-field>
    </van-dialog>
  </div>
</template>
<script>
import { getWaringStatistics, getWaringList, waringHandle } from '@/api/control'
import { Toast } from 'vant'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tabContentList: [],
      loading: false,
      finished: false,
      params: {
        // startTime: '',
        // endTime: '',
        guid: '', //19c38772-5aba-46dd-adf2-fd97dd05524d
        // yfieldValue: '',
        // xfieldValue: 'measure_date',
      },
      warningEcharts: null,
      showHandleWarning: false,
      handleItem: null,
      handleInfo: '',
    }
  },
  props: {
    guid: String,
  },
  mounted() {
    this.params.guid = this.guid
    this.init()
  },
  methods: {
    submitHandleInfo(action, done) {
      waringHandle({ marks: this.handleInfo, guid: this.handleItem.guid })
        .then((res) => {
          if (res.code == 0) {
            Toast.success(res.msg)
            done()
          } else {
            Toast.fail(res.msg)
            done(false)
          }
        })
        .catch((err) => {
          console.log(err)
          Toast.fail('请求错误，请重试')
          done(false)
        })
    },
    handleWarning(item) {
      this.handleItem = item
      this.showHandleWarning = true
    },
    setEchartsOption(instance, options) {
      instance.setOption(options)
    },
    initWarningEcharts(data) {
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '',
        },
        label: {
          formatter: '{b}{c} 个',
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '65%'],
            center: ['50%', '50%'],
            data: [
              { name: '已办', value: data[1] },
              { name: '待办', value: data[0] },
            ],
          },
        ],
      }
      if (!this.warningEcharts) {
        this.warningEcharts = this.getEchartsInstance('mainWarning')
      }

      this.setEchartsOption(this.warningEcharts, option)
    },
    getEchartsInstance(id) {
      echarts.init(document.getElementById(id)).dispose();
      let instance = echarts.init(document.getElementById(id));
      return instance;
    },
    init() {
      getWaringStatistics(this.params).then((res) => {
        this.loading = false
        this.finished = true
        this.initWarningEcharts(res.data)
      })
      let params = { pageSize: 99999, measurepointId: this.params.guid }
      getWaringList(params).then((res) => {
        this.tabContentList = res.data
      })
    },
  },
}
</script>
