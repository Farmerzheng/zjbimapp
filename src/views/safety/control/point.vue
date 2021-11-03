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
      <van-icon
        name="plus"
        style="
          position: fixed;
          right: 1rem;
          bottom: 2rem;
          background-color: rgb(38, 162, 255);
          font-size: 20px;
          color: #fff;
          border-radius: 50%;
          height: 30px;
          width: 30px;
          line-height: 30px;
          text-align: center;
        "
        @click="addMsg"
      />
    </section>
  </layout>
</template>
<script>
import PointData from "./point-data.vue";
import PointStatistics from "./point-statistics.vue";
import PointWarning from "./point-warning.vue";
import { useRouter } from "vue-router";
export default {
  name: "point",
  components: { PointData, PointStatistics, PointWarning },
  data() {
    return {
      activeTabName: "数据管理",
      tabList: ["数据管理", "统计分析", "预警分析"],
      guid: "",
      route: useRouter(),
    };
  },
  created() {
    this.guid = this.$route.query.guid;
  },
  methods: {
    addMsg() {
      //  创建路由对象
      // const route = useRouter();
      // console.log(this.route);
      this.route.push({
        path: "/addSurveyMessage",
        query: { guid: this.guid },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
