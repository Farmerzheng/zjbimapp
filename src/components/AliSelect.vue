<template>
  <div>
    <van-field
      v-model="state.modelText"
      readonly
      clickable
      clearable
      name="picker"
      :label="label"
      placeholder="请选择"
      v-bind="$attrs"
      @click-input="state.showPicker = true"
    />
    <van-popup
      :show="state.showPicker"
      @click-overlay="state.showPicker = false"
      position="bottom"
    >
      <van-picker
        :columns="columns"
        :columns-field-names="columnsProps"
        @confirm="onConfirm"
        @cancel="state.showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
import {
  reactive,
  ref,
  toRaw,
  onMounted,
  onBeforeMount,
  watchEffect,
  watch,
} from 'vue'
export default {
  props: {
    label: {
      type: String,
      default: '选择器',
    },
    modelValue: {
      type: String,
    },
    columns: {
      type: Array,
      default: [],
    },
    columnsProps: {
      type: Object,
      default: () => {
        return {
          text: 'text',
          value: 'value',
        }
      },
    },
  },
  emits: ['update:modelValue', 'get-selection'],
  setup(props, context) {
    let emit = context.emit
    const state = reactive({
      showPicker: false,
      modelText: '',
    })
    watch(
      () => props.modelValue,
      (prev, after) => {
        init()
      }
    )
    const init = () => {
      state.modelText = ''
      props.columns.forEach((item) => {
        if (item[props.columnsProps.value] == props.modelValue) {
          state.modelText = item[props.columnsProps.text]
        }
      })
    }

    const onConfirm = (value) => {
      state.showPicker = false
      state.modelText = value[props.columnsProps.text]
      emit('update:modelValue', value[props.columnsProps.value])
      // console.log(toRaw(value))
      emit('get-selection', toRaw(value))
    }
    // onBeforeMount(() => {
    // init()
    // })
    // onMounted(() => {
    // console.log("执行了吗")
    // console.log(props.columns)
    // })
    return {
      state,
      onConfirm,
    }
  },
}
</script>
