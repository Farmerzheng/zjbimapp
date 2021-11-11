<template>
  <layout title="编辑属性">
    <van-cell-group>
      <van-field v-model="iType" label="类型" readonly />
      <van-field v-model="state.descName" label="描述名" readonly />
      <van-field v-model="state.descValue" label="描述值" readonly />
      <van-field v-model="state.remark" label="备注" readonly />
      <van-field
        v-model="state.resaved2"
        label="首压值"
        placeholder="请输入首压值"
      />
      <van-field
        v-model="state.resaved3"
        label="变更值"
        placeholder="请输入变更值"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" @click="onSave">保存</van-button>
      </div>
    </van-cell-group>
  </layout>
</template>
<script>
import { Toast } from "vant";
import { reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { editDescList } from "@/api/progress-control";
export default {
  setup() {
    const state = reactive({
      guid: "",
      descName: "",
      descValue: "",
      unit: "",
      remark: "",
      resaved2: "",
      resaved3: "",
    });
    // /progress/api/progressBridgeStructure/getStructureByParent';
    //  创建路由对象
    const route = useRouter();

    const iType = computed(() => {
      let iType = route.currentRoute._value.query.iType;
      switch (iType) {
        case "10":
          iType = "设计";
          break;
        case "20":
          iType = "施工";
          break;
        case "30":
          iType = "变更设计";
          break;
        default:
          iType = "其他";
      }
      return iType;
    });

    onMounted(async () => {
      const query = route.currentRoute._value.query;
      console.log(query);
      state.code1 = query.code1;
      state.guid = query.guid;
      state.descName = query.descName;
      state.descValue = query.descValue + query.unit;
      state.unit = query.unit;
      state.remark = query.remark;
      state.resaved2 = query.resaved2;
      state.resaved3 = query.resaved3;
    });

    const onSave = async () => {
      //保存数据
      console.log("保存数据");
      console.log(state);

      let res = await editDescList({
        guid: state.guid,
        remark: state.remark,
        resaved2: state.resaved2,
        resaved3: state.resaved3,
        code1: state.code1,
        unit: state.unit,
        descName: state.descName,
        descValue: parseFloat(state.descValue),
      });
      console.log(res);
      if (res.code == 0) {
        Toast("添加成功");
        setTimeout(function () {
          route.back();
        }, 1000);
      }
    };

    return {
      state,
      iType,
      onSave,
    };
  },
};
</script>
<style scoped>
button {
  width: 100%;
}
</style>