<template>
  <layout title="添加测点信息">
    <van-field
      required
      readonly
      clickable
      label="日期"
      v-model="state.currentDate"
      placeholder="选择日期"
      @click="state.showPicker = true"
    />
    <van-popup v-model:show="state.showPicker" round position="bottom">
      <van-datetime-picker
        type="datetime"
        title="选择时间"
        :min-date="state.minDate"
        :max-date="state.maxDate"
        @cancel="state.showPicker = false"
        @confirm="confirmDate"
        :formatter="formatter"
      />
    </van-popup>

    <van-cell-group>
      <van-field
        v-for="(item, index) in state.filedMap"
        :key="index"
        :label="item.value1"
        :placeholder="'请输入' + item.value1"
        v-model="item.value2"
      />
      <!-- <van-field label="文本" value="输入框已禁用"/> -->
    </van-cell-group>

    <div style="margin: 18px">
      <van-button round block type="info" @click="onSave"> 保存 </van-button>
    </div>
  </layout>
</template>
<script>
import { Toast } from "vant";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { addMeasureMsg, saveMeasureMsg } from "@/api/control";
export default {
  setup() {
    const state = reactive({
      guid: "",
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2055, 10, 1),
      // 页面显示的时间
      currentDate: "选择时间",
      // 传给服务器的时间
      toServerDate: "",
      showPicker: false,
      filedMap: [],
      measurePointId: "",
      tableName: "",
    });

    //  创建路由对象
    const route = useRouter();
    onMounted(async () => {
      // 通过路由获取guid和name
      state.guid = route.currentRoute._value.query.guid;

      //通过guid查询需要添加的信息字段
      let res = await addMeasureMsg({
        guid: state.guid,
      });
      // 存储需要传给数据库的字段
      state.measurePointId = res.data.measurePointId;
      state.tableName = res.data.tableName;
      /***
       * 将 res.data.filedMap 转换成如下格式，方便渲染
       *  [
           { key: "temp", value1: "温度-℃", value2: "12" },
           { key: "stress", value1: "应力-MP", value2: "34" },
         ]; 
       */
      for (var key in res.data.filedMap) {
        var obj = {};
        obj["key"] = key;
        obj["value1"] = res.data.filedMap[key];
        obj["value2"] = "";
        state.filedMap.push(obj);
      }
    });

    const onSave = async () => {
      //格式化请求参数
      var pramas = [];

      // [{"guid":""},{"measure_date":"2020-01-01 00:00:00"},{"measure_point_id":"9fb0d7d5-7f84-4c78-8037-64bede727a9d"},{"tableName":"zjbim_control_monitor_steelStress"},{"temp":"123"},{"stress":"456"}]

      var guid = { guid: "" };
      pramas.push(guid);
      var measure_date = { measure_date: state.toServerDate };
      pramas.push(measure_date);
      var measure_point_id = { measure_point_id: state.measurePointId };
      pramas.push(measure_point_id);
      var tableName = { tableName: state.tableName };
      pramas.push(tableName);

      for (var i = 0; i < state.filedMap.length; i++) {
        var obj = {};
        obj[state.filedMap[i]["key"]] = state.filedMap[i]["value2"];
        pramas.push(obj);
      }
      console.log(JSON.stringify(pramas));
      // 保存信息
      let res = await saveMeasureMsg({
        jsonData: encodeURI(JSON.stringify(pramas)),
      });

      console.log(res);
    };
    const confirmDate = (value) => {
      state.showPicker = false;
      const time = formatTime(value);
      state.currentDate = time;
      //存储传给服务器的时间
      state.toServerDate = formatTimeToServer(value);
      console.log(state.toServerDate);
    };

    const formatTime = (time) => {
      var date = new Date(time); // 初始化日期
      var year = date.getFullYear(); //获取年份
      var month = date.getMonth() + 1; // 获取月份
      if (month < 10) {
        month = "0" + month;
      }
      var day = date.getDate(); // 获取具体日
      if (day < 10) {
        day = "0" + day;
      }
      var hour = date.getHours(); // 获取时
      if (hour < 10) {
        hour = "0" + hour;
      }
      var minutes = date.getMinutes(); // 获取分
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return (
        year + "年" + month + "月" + day + "日 " + hour + "时" + minutes + "分"
      );
    };

    const formatTimeToServer = (time) => {
      var date = new Date(time); // 初始化日期
      var year = date.getFullYear(); //获取年份
      var month = date.getMonth() + 1; // 获取月份
      if (month < 10) {
        month = "0" + month;
      }
      var day = date.getDate(); // 获取具体日
      if (day < 10) {
        day = "0" + day;
      }
      var hour = date.getHours(); // 获取时
      if (hour < 10) {
        hour = "0" + hour;
      }
      var minutes = date.getMinutes(); // 获取分
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var seconds = date.getSeconds();
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds
      );
    };

    const formatter = (type, val) => {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      if (type === "hour") {
        return val + "时";
      }
      if (type === "minute") {
        return val + "分";
      }
      return val;
    };

    return {
      state,
      confirmDate,
      formatter,
      formatTime,
      onSave,
    };
  },
};
</script>
<style scoped>
</style>