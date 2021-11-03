<template>
  <layout class="quality-question" title="质量管理">
    <van-cell
      title="我填报的"
      style="margin-top: 10px"
      icon="records"
      is-link
      to="/qualityQuestionListByme"
    />
    <van-cell
      title="查询所有"
      style="margin-top: 10px"
      icon="notes-o"
      is-link
      to="/qualityQuestionList"
    />
    <van-cell
      title="统计分析"
      style="margin-top: 10px"
      icon="bar-chart-o"
      is-link
      to="/qualityQuestionStatistics"
    />
    <van-button
      icon="plus"
      class="quality-question-add"
      color="#26a2ff"
      type="primary"
      plain
      hairline
      round
      to="/addQualityQuestion"
    />
  </layout>
</template>
<style lang="less" scoped>
.quality-question {
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
