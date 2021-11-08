<template>
  <layout title="属性管理">
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        is-link
        v-for="(item, index) in state.list"
        :key="index"
        :title="item.sturctureName"
        @click="() => toNext(item.code1)"
      />
    </van-list>
  </layout>
</template>
<script>
import { Toast } from "vant";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getProgressProperty } from "@/api/progress-control";
export default {
  setup() {
    const state = reactive({
      loading: true,
      finished: false,
      list:[]
    });
    // /progress/api/progressBridgeStructure/getStructureByParent';
    //  创建路由对象
    const route = useRouter();

    const onLoad = async () => {
      //查询属性
      //判断是否是第一次进入
      if (JSON.stringify(route.currentRoute._value.query) == "{}") {
        //第一次进入，传入 code = #
        let res = await getProgressProperty({
          code1: "#",
        });
        console.log(res);
        state.list = res.data;
      } else {
        // 不是第一次进入，传入 code 从路由中获取
        let res = await getProgressProperty({
          code1: route.currentRoute._value.query.code1,
        });
        state.list = res.data;
      }
      // 加载状态结束
      state.loading = false;
      state.finished = true;
    };

    // 点击下一级
    const toNext = async (code1) => {
      // 跳转路由之前，先发送网络请求，判断有没有下一级数据，即数据是否有长度
      // 发送网络请求，判断有无下一层级数据
      let res = await getProgressProperty({
        code1: code1,
      });
      // 判断返回数组是否为空
      if (res.data.length > 0) {
        // 跳转路由
        route.push({
          path: "/progressProperty",
          query: { code1: code1 },
        });
      } else {
        // 没有下一级了就跳转到展示列表截面
        route.push({
          path: "/propertyList",
          query: { code1: code1 },
        });
      }
    };

    return {
      state,
      onLoad,
      toNext,
    };
  },
};
</script>
<style scoped>
</style>