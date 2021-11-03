<template>
  <div>
    <div style="padding: 15px; display: flex; align-items: center">
      <div style="width: 250px; overflow: hidden">
        <input
          style="width: 100%; height: 22px"
          readonly
          clickable
          :value="searchDate"
          placeholder="选择时间"
          @click="showPicker = true"
        />
        <van-calendar
          v-model:show="showPicker"
          type="range"
          :min-date="minDate"
          @confirm="selectDataConfirm"
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
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <van-cell v-for="(item, index) in tabContentList" :key="index">
        <template #title>
          <div v-for="(key, keyIndex) in propsList" :key="'key' + keyIndex">
            {{ tabContentObj[key] }}:{{ item[key] }}
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { getPointDataList } from '@/api/control'
export default {
  name: 'PointData',
  data() {
    return {
      tabContentList: [],
      tabContentObj: {},
      loading: true,
      finished: false,
      params: {
        startTime: '',
        endTime: '',
        guid: '19c38772-5aba-46dd-adf2-fd97dd05524d',
        // yfieldValue: '',
        // xfieldValue: 'measure_date',
      },
      searchDate: '',
      showPicker: false,
      minDate: new Date(2010, 0, 1),
    }
  },
  props: {
    guid: String,
  },
  computed: {
    propsList() {
      return Object.keys(this.tabContentObj)
    },
  },
  mounted() {
    this.params.guid = this.guid
    this.getPointDataList()
  },
  methods: {
    search() {
      this.getPointDataList()
    },
    selectDataConfirm(date) {
      const [start, end] = date
      this.params.startTime = start.toLocaleDateString()
      this.params.endTime = end.toLocaleDateString()
      this.searchDate = `${this.params.startTime}至${this.params.endTime}`
      this.showPicker = false
    },
    getPointDataList() {
      getPointDataList(this.params).then((res) => {
        this.tabContentList = res.list
        this.tabContentObj = res.map
        this.loading = false
        this.finished = true
      })
    },
  },
}
</script>
