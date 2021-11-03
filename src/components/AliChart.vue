<script>
import {
  watch,
  h,
  onMounted,
  onBeforeMount,
  ref,
  onUnmounted,
  toRaw,
} from "vue";

import * as echarts from "echarts";

export default {
  name: "AliChart",
  props: {
    id: {
      // 图表 标签id 标识图标唯一性
      type: String,
      required: true,
    },
    width: {
      // 图表宽度
      type: [Number, String],
      default: "100vw",
    },
    height: {
      // 图表高度
      type: [Number, String],
      default: "500px",
    },
    option: {
      type: Object,
    },
  },
  setup(props) {
    let echartsContainer = ref(null);
    let echartsIns = ref(null);
    watch(
      () => props.option,
      (option) => {
        console.log(option);
        // 重新渲染图表
        echartsIns.setOption(option);
      },
      {
        deep: true,
        flush: "post",
      }
    );
    onMounted(() => {
      console.log(props.id, props.option);
      // 这是个坑
      if (props.option == null) {
        // 首次只生成，在watch中渲染
        echartsIns = echarts.init(document.getElementById(props.id));
      } else {
        // 第二次切换的时候有数据了再渲染
        echartsIns = echarts.init(document.getElementById(props.id));
        // 重新渲染图表
        echartsIns.setOption(props.option);
      }

      // echarts.init(document.getElementById(props.id)).dispose();

      // if(props.option) {
      //   echartsIns.setOption(props.option)
      // }
    });
    onUnmounted(() => {
      echartsIns.dispose();
      echartsIns = null;
    });
    return () =>
      h(
        "transition",
        {
          name: "slideInUp",
        },
        [
          h("div", {
            ref: echartsContainer,
            style: { width: props.width, height: props.height },
            id: props.id,
          }),
        ]
      );
  },
};
</script>
