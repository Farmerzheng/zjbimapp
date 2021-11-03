<template>
  <layout :title="state.name">
    <van-collapse v-model="state.activeName" accordion >
      <van-collapse-item
        :key="index"
        v-for="(item, index) in state.list"
        :title="item.name"
        :name="index"
      >
        <van-cell
          title="下一层级"
          is-link
          icon="location-o"
          @click="toNext(item.guid, item.name)"
        />
        <van-cell
          title="添加测点"
          is-link
          icon="plus"
          @click="toAddPoint(item.guid, item.name)"
        />
      </van-collapse-item>
    </van-collapse>
    <!-- </van-list> -->
  </layout>
</template>
<script>
import { Toast } from "vant";
import { reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { nextMeasurePoint } from "@/api/control";
export default {
  setup() {
    const state = reactive({
      list: [],
      activeName: "1",
      guid: "",
      name: "测点",
    });

    //  创建路由对象
    const route = useRouter();
    onBeforeMount(async () => {
      if (route.currentRoute._value.query.guid) {
        state.guid = route.currentRoute._value.query.guid;
        state.name = route.currentRoute._value.query.name;
      } else {
        state.guid = null;
        state.name = "测点";
      }
      let res = await nextMeasurePoint({
        guid: state.guid,
      });
      state.list = res.data;
    });

    // 组件加载完成后请求数据
    const onLoad = async () => {
      // let res = await nextMeasurePoint();
      // console.log(res);
      // state.list = res.data;
    };
    // 点击下一级
    const toNext = async (guid, name) => {
      // 跳转路由之前，先发送网络请求，判断有没有下一级数据，即数据是否有长度
      let res = await nextMeasurePoint({
        guid: guid,
      });
      if (res.data.length > 0) {
        // 跳转路由
        route.push({
          path: "/nextSurveyData",
          query: { guid: guid, name: name },
        });
      } else {
        Toast("没有下一层级");
      }
    };

    const toAddPoint = (guid, name) => {
      // 跳转路由
      route.push({
        path: "/addSurveyData",
        query: { guid: guid, name: name },
      });
    };

    return {
      state,
      onLoad,
      toNext,
      toAddPoint,
    };
  },
};
</script>
<style scoped>
</style>