<template>
  <div class="nav-header safety-question">
    <van-nav-bar fixed title="安全管理" left-arrow @click-left="$router.back" />
    <van-cell
      title="我填报的"
      style="margin-top: 10px"
      icon="records"
      is-link
      to="/safetyQuestionListByme"
    />
    <van-cell
      title="查询所有"
      style="margin-top: 10px"
      icon="notes-o"
      is-link
      to="/safetyQuestionList"
    />
    <van-cell
      title="统计分析"
      style="margin-top: 10px"
      icon="bar-chart-o"
      is-link
      to="/safetyQuestionStatistics"
    />
    <van-button
      icon="plus"
      class="safety-question-add"
      color="#26a2ff"
      type="primary"
      plain
      hairline
      round
      to="/addSafetyQuestion"
    />
  </div>
</template>
<style lang="less" scoped>
.safety-question {
  height: calc(100vh - 46px);
  position: relative;
  &-add {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: fixed;
    right: 20px;
    bottom: 20px;
    background-color: #fff;
    box-shadow: 0 0 5px #969799;
    border: 0 solid #969799;
    border-radius: 20px;
  }
}
</style>
