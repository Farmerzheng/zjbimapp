<template>
  <layout :title="state.name">
    <!-- 名称 -->
    <van-field
      border
      required
      placeholder="请输入测点名称（必填）"
      v-model="state.pointName"
      label="名称"
    />
    <!-- 编号 -->
    <van-field
      v-model="state.pointNum"
      placeholder="请输入测点编号"
      type="tel"
      label="编号"
    />
    <van-field
      required
      readonly
      clickable
      label="测点类型"
      v-model="state.value"
      placeholder="选择测点"
      @click="state.showPicker = true"
    />
    <van-popup v-model:show="state.showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="state.columns"
        @cancel="state.showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <div style="margin: 18px">
      <van-button round block type="info" @click="onSubmit"> 提交 </van-button>
    </div>
  </layout>
</template>
<script>
import { Toast } from "vant";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { measurePointType, addMeasurePoint } from "@/api/control";
export default {
  setup() {
    const state = reactive({
      guid: "",
      name: "测点",
      pointName: "",
      pointNum: "",
      //pick选中的文本内容
      value: "",
      //popup是否显示
      showPicker: false,
      columns: [],
      measureType: null,
    });

    //  创建路由对象
    const route = useRouter();
    onMounted(async () => {
      // 通过路由获取guid和name
      state.guid = route.currentRoute._value.query.guid;
      state.name = route.currentRoute._value.query.name;
      //通过guid查询测点类型
      let res = await measurePointType({
        guid: state.guid,
      });

      res.data.forEach((element) => {
        // console.log(element);
        var item = {
          text: element.dictLabel,
          value: element.dictValue + ":" + element.dictCode,
        };
        //返回的测点类型添加到数组
        state.columns.push(item);
      });
    });

    const onConfirm = (item) => {
      state.showPicker = false;
      state.value = item.text;
      state.measureType = item.value;
    };

    const onSubmit = async () => {
      // 跳转路由
      console.log("提交信息");
      console.log(
        state.pointName,
        state.pointNum,
        state.measureType,
        state.guid
      );
      let res = await addMeasurePoint({
        name: state.pointName,
        measureCode: state.pointNum,
        measureType: state.measureType,
        parentId: state.guid,
      });

      // console.log(res)
      if (res.code == 0) {
        Toast("添加成功");
        setTimeout(function () {
          route.back();
        }, 1000);
      }
    };

    return {
      state,
      onSubmit,
      onConfirm,
    };
  },
};
</script>
<style scoped>
</style>