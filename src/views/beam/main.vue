<template>
  <layout title="梁场管理" :left-arrow="true">
    <div class="group-title">生产信息</div>
    <van-grid :gutter="20" :column-num="4" square class="group-grid-container">
      <van-grid-item text="状态追踪" to="/beamState">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/beam/ztzz.png'" />
        </template>
      </van-grid-item>
      <van-grid-item
        v-for="item in state.list"
        :key="item.dictCode"
        :text="item.dictLabel"
        :to="'/beamPedestal?pedestalType=' + item.dictValue"
      >
        <template #icon>
          <img class="group-grid-icon" :src="item.remark" />
        </template>
      </van-grid-item>
      <van-grid-item text="全景地图" to="/beamPanorama">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/beam/qjdt.png'" />
        </template>
      </van-grid-item>
    </van-grid>
    <div class="group-title">进度信息</div>
    <van-grid :gutter="20" :column-num="4" square class="group-grid-container">
      <van-grid-item text="制梁计划" to="/beamMakingTask">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/beam/zljh.png'" />
        </template>
      </van-grid-item>
      <van-grid-item text="架梁计划" to="/beamErectionTask">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/beam/jljh.png'" />
        </template>
      </van-grid-item>
      <van-grid-item text="制梁进度" to="/beamMaking">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/beam/zljd.png'" />
        </template>
      </van-grid-item>
      <van-grid-item text="架梁进度" to="/beamErection">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/beam/jljd.png'" />
        </template>
      </van-grid-item>
    </van-grid>
    <div class="group-title">智能推送</div>
    <van-grid :gutter="20" :column-num="4" square class="group-grid-container">
      <van-grid-item text="我的任务" to="/beamTask">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/beam/wdrw.png'" />
        </template>
      </van-grid-item>
      <van-grid-item text="我的消息" to="/beamMessage">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/beam/wdxx.png'" />
        </template>
      </van-grid-item>
    </van-grid>
    <div style="position: fixed; bottom: 50px; width: 100%">
      <van-button
        type="primary"
        style="width: 100%; letter-spacing: 2px"
        to="/beamScan?toPath=beamProgressAdd&returnKey=code1"
        >扫码填报</van-button
      >
    </div>
  </layout>
</template>
<style lang="scss">
.home-grid-icon {
  width: 40px;
  height: 40px;
  display: inline-block;
}
</style>
<script>
import { reactive, onMounted, ref } from 'vue'
import { imageHttpUrl } from '@/config/index'
import { dictData } from '@/api/beam'
export default {
  setup(props) {
    const state = reactive({
      list: [],
      prefix: imageHttpUrl,
      showScan: false,
    })
    const getMenu = async () => {
      let res = await dictData()
      state.list = res.data
    }
    onMounted(async () => {
      await getMenu()
    })
    return {
      state,
      prefix: state.prefix,
    }
  },
}
</script>
