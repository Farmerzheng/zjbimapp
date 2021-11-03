<template>
  <van-index-bar
    :index-list="indexAnchor"
    :sticky-offset-top="stickyOffsetTop"
    :sticky="sticky"
  >
    <div v-for="index in indexAnchor" :key="index">
      <van-index-anchor :index="index">{{ index }}</van-index-anchor>
      <van-cell
        v-for="user in indexAnchorMap[index]"
        :key="user.phonenumber"
        :title="user.userName"
        icon="user-o"
        is-link
        @click="$emit('selection', user)"
      />
    </div>
  </van-index-bar>
</template>
<script>
import pinyin from 'js-pinyin'
import { getPhoneNumberList } from '@/api/home'
import { toRefs, reactive, onBeforeMount } from 'vue'
export default {
  name: 'AddressBook',
  props: {
    sticky: {
      type: Boolean,
      default: true,
    },
    stickyOffsetTop: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const state = reactive({
      indexAnchorMap: {},
      indexAnchor: [],
      indexBar: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ],
      list: [],
    })
    const formatAnchor = () => {
      state.list.map((item) => {
        let userName = item.userName
        let firstLetter = pinyin
          .getFullChars(userName)
          .substr(0, 1)
          .toUpperCase()
        if (!state.indexAnchorMap[firstLetter]) {
          state.indexAnchorMap[firstLetter] = []
        }
        state.indexAnchorMap[firstLetter].push(item)
      })
      state.indexAnchor = Object.keys(state.indexAnchorMap).sort()
    }
    onBeforeMount(async () => {
      let res = await getPhoneNumberList()
      state.list = res.data
      formatAnchor()
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>
