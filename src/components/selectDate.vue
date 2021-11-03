<template>
  <div>
    <van-field
      readonly
      clearable
      v-bind="$attrs"
      :label="label"
      placeholder="请选择日期"
      :modelValue="modelValue"
      @click="state.show = true"
    />
    <van-popup
      :show="state.show"
      @click-overlay="state.show = false"
      position="bottom"
    >
      <van-datetime-picker
        type="datetime"
        :min-date="new Date('2020-01-01')"
        :max-date="new Date('2029-12-31')"
        :formatter="formatter"
        @confirm="confirm"
        @cancel="state.show = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { reactive, ref, toRefs } from 'vue'
import { dateFormat } from '@/utils/date'
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '日期',
    },
  },
  setup(props, context) {
    const emit = context.emit
    const state = reactive({
      show: false,
    })
    const formatter = (type, val) => {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      return val
    }
    const confirm = (value) => {
      let date = dateFormat(value, 'yyyy-MM-dd HH:mm:ss')
      state.show = false
      emit('update:modelValue', date)
    }
    return {
      state,
      formatter,
      confirm,
    }
  },
}
</script>
