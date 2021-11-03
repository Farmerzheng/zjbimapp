<template>
  <layout title="测点信息">
    <section class="main-section">
      <van-tabs type="card" v-model:active="activeTabName" color="#26a2ff">
        <van-tab name="数据管理" title="数据管理"> </van-tab>
        <van-tab name="统计分析" title="统计分析"> </van-tab>
        <van-tab name="预警分析" title="预警分析"> </van-tab>
      </van-tabs>
      <point-data v-if="activeTabName === '数据管理'" :guid="guid"></point-data>
      <point-statistics
        v-else-if="activeTabName === '统计分析'"
        :guid="guid"
      ></point-statistics>
      <point-warning
        v-else-if="activeTabName === '预警分析'"
        :guid="guid"
      ></point-warning>
    </section>
  </layout>
</template>
<script>
import PointData from './point-data.vue'
import PointStatistics from './point-statistics.vue'
import PointWarning from './point-warning.vue'
export default {
  name: 'point',
  components: { PointData, PointStatistics, PointWarning },
  data() {
    return {
      activeTabName: '数据管理',
      tabList: ['数据管理', '统计分析', '预警分析'],
      guid: '',
    }
  },
  created() {
    this.guid = this.$route.query.guid
  },
}
</script>
<style lang="scss">
.main-section {
  padding: 20px 5px;
  .mainstatistics {
    width: 100%;
    height: calc(100vh - 300px);
    margin-top: 20px;
  }
  .mainWarning {
    width: 100%;
    height: 180px;
  }
  .list-item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-i {
      flex-basis: 1;
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
}
</style>
