<template>
  <div class="nav-header">
    <van-nav-bar fixed title="质量三检" left-arrow @click-left="$router.back">
      <template #right>
        <van-icon
          name="filter-o"
          size="22"
          style="margin-right: 10px"
          @click="showSearch"
        ></van-icon>
        <van-icon name="plus" size="22" @click="add"></van-icon>
      </template>
    </van-nav-bar>
    <van-list
      :loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <list-item
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        @click="() => goToDetail(item)"
      ></list-item>
    </van-list>
    <van-popup
      :show="show"
      position="right"
      :style="{ height: '100vh', width: '70%' }"
      @click-overlay="closeSearch"
    >
      <van-cell-group title="工区">
        <div class="p10">
          <van-radio-group
            v-model="params.gongquId"
            direction="horizontal"
            @change="gongquChange"
          >
            <van-radio
              v-for="item in gongquList"
              :key="item.deptId"
              :name="item.deptId"
              >{{ item.deptName }}</van-radio
            >
          </van-radio-group>
        </div>
      </van-cell-group>
      <van-cell-group title="班组" v-if="teamList.length">
        <div class="p10">
          <van-radio-group v-model="params.teamId" direction="horizontal">
            <van-radio
              v-for="item in teamList"
              :key="item.deptId"
              :name="item.deptId"
              >{{ item.deptName }}</van-radio
            >
          </van-radio-group>
        </div>
      </van-cell-group>
      <van-cell-group title="状态">
        <div class="p10">
          <van-radio-group v-model="params.status" direction="horizontal">
            <van-radio
              v-for="(item, index) in stateList"
              :key="index"
              :name="item.label"
              style="width: 50%; padding-bottom: 10px"
              >{{ item.label }}</van-radio
            >
          </van-radio-group>
        </div>
      </van-cell-group>
      <div style="width: 90%; margin: 0 auto">
        <van-button
          type="primary"
          size="small"
          style="width: 50%"
          @click="search"
          >筛选</van-button
        >
        <van-button
          plain
          type="default"
          size="small"
          style="width: 50%"
          @click="clear"
          >重置</van-button
        >
      </div>
    </van-popup>
  </div>
</template>
<script>
import { reactive, ref, toRefs, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  getList,
  getWorkAreaAndTeam,
  getQueryState,
} from '@/api/quality3Inspection'
import ListItem from './ListItem.vue'

export default {
  components: { ListItem },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      show: false,
      gongquList: [],
      teamList: [],
      stateList: [],
      params: {
        gongquId: '',
        teamId: '',
        status: '',
      },
    })
    const getParamsConfig = async (gongquId = '') => {
      let { data } = await getWorkAreaAndTeam({ gongquId })
      return data
    }
    const gongquChange = async (name = '') => {
      if (!name) return false
      state.teamList = await getParamsConfig(name)
    }
    const onLoad = async () => {
      // 异步更新数据
      state.finished = false
      state.loading = true
      state.list = []
      let res = await getList(state.params)
      state.list = res.data
      // 加载状态结束
      state.loading = false
      state.finished = true
    }
    const add = () => router.push('/quality3InspectionAdd')
    const search = () => {
      state.show = false
      onLoad()
    }
    const clear = () => {
      state.params.gongquId = ''
      state.params.teamId = ''
      state.params.status = ''
    }
    const showSearch = () => (state.show = true)
    const closeSearch = () => (state.show = false)
    const goToDetail = (item) => {
      router.push({
        name: 'quality3InspectionDetail',
        params: { guid: item.guid },
      })
    }
    onMounted(async () => {
      state.gongquList = await getParamsConfig()
      let { data } = await getQueryState()
      Object.keys(data).forEach((key) => {
        state.stateList.push({
          label: data[key],
          value: key,
        })
      })
    })
    return {
      ...toRefs(state),
      getParamsConfig,
      gongquChange,
      onLoad,
      add,
      search,
      clear,
      showSearch,
      closeSearch,
      goToDetail,
    }
  },
}
</script>
<style lang="scss" scoped>
.p10 {
  padding: 10px;
}
</style>
