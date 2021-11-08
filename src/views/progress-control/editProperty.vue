<template>
  <layout title="编辑属性">
   
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
      list: [],
    });
    // /progress/api/progressBridgeStructure/getStructureByParent';
    //  创建路由对象
    const route = useRouter();

    onMounted(async () => {

     
    });
    // 点击编辑
    const toSave = (guid) => {    
        //保存数据
    
    };

    return {
      state,
      toSave
    };
  },
};
</script>
<style scoped>
button {
  width: 100%;
}
</style>