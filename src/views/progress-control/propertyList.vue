<template>
  <layout title="属性列表">
    <!-- <van-cell-group>
      <van-row>
        <van-col span="4"> <van-cell title="备注" /></van-col>
        <van-col span="4"> <van-cell title="描述名" /></van-col>
        <van-col span="4"> <van-cell title="描述值" /></van-col>
        <van-col span="4"> <van-cell title="单位" /></van-col>
        <van-col span="4"> <van-cell title="首压值" /></van-col>
        <van-col span="4"> <van-cell title="变更值" /></van-col>
      </van-row>
    </van-cell-group> -->
    <van-collapse v-model="state.activeName" accordion>
      <van-collapse-item
        :key="index"
        v-for="(item, index) in state.list"
        :title="item.descName"
        :name="index"
      >
        <van-cell title="描述值" :value="item.descValue" />
        <van-cell title="首压值" :value="item.resaved2" />
        <van-cell title="变更值" :value="item.resaved3" />
        <van-cell title="备注" :value="item.remark" />
        <van-row>
          <van-col span="24">
            <van-button
              span="24"
              size="normal"
              round
              type="primary"
              @click="toEdit(item)"
              >编辑信息</van-button
            >
          </van-col>
        </van-row>
      </van-collapse-item>
    </van-collapse>
  </layout>
</template>
<script>
import { Toast } from "vant";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { struectureDescList } from "@/api/progress-control";
export default {
  setup() {
    const state = reactive({
      loading: true,
      finished: false,
      activeName: "1",
      list: [],
    });
    // /progress/api/progressBridgeStructure/getStructureByParent';
    //  创建路由对象
    const route = useRouter();

    onMounted(async () => {
      // 属性列表
      console.log("发送网络请求");
      let res = await struectureDescList({
        code1: route.currentRoute._value.query.code1,
      });

      state.list = res.data;
      console.log(res);

      // 加载状态结束
      state.loading = false;
      state.finished = true;
    });
    // 点击编辑
    const toEdit = (item) => {
      // 跳转路由
      route.push({
        path: "/editProperty",
        query: {
          guid: item.guid,
          descName: item.descName,
          descValue: item.descValue,
          unit: item.unit,
          remark:item.remark,
          resaved2:item.resaved2,
          resaved3:item.resaved3,
          code1:item.code1
        },
      });
    };

    return {
      state,
      toEdit,
    };
  },
};
</script>
<style scoped>
button {
  width: 100%;
}
</style>