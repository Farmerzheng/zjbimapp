<template>
  <div class="home" :style="bgStyle">
    <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="image in swipeList" :key="image">
        <img style="width: 100%; height: 100%" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 消息，公告，待办，已办 -->
    <van-grid clickable square gutter="10px" class="home-grid">
      <van-grid-item text="消息">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/home/news.png'" />
        </template>
      </van-grid-item>
      <van-grid-item text="公告">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/home/notice.png'" />
        </template>
      </van-grid-item>
      <van-grid-item text="待办" @click="toTodoTaskList">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/home/todo.png'" />
        </template>
      </van-grid-item>
      <van-grid-item text="已办" @click="toHistoryTaskList">
        <template #icon>
          <img class="home-grid-icon" :src="prefix + '/img/home/done.png'" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 最新动态 -->
    <div class="home-module" v-show="lastNewsList.length > 0">
      <div class="home-module-head">
        <div>最新动态</div>
        <div class="home-module-head-more" @click="more">更多</div>
      </div>
      <div
        class="home-module-item"
        v-for="(item, index) in lastNewsList"
        :key="index"
        @click="() => toDetail(item)"
      >
        <div class="norem-item">
          <img :src="item.resaved1" />
        </div>
        <div class="home-module-item__content">
          <div class="home-module-item__content-title">
            {{ item.location }}
            <!-- <span class="home-module-item__content-tag">{{
              item.rectification
            }}</span> -->
          </div>
          <div
            style="
              color: #6a6a6a;
              font-size: 12px;
              transform: scale(0.83) translate(-26px);
            "
          >
            创建人：{{ item.createUser }}
          </div>
          <div
            style="
              color: #6a6a6a;
              font-size: 12px;
              transform: scale(0.83) translate(-26px);
            "
          >
            创建时间： {{ item.createDate }}
          </div>
        </div>
      </div>
    </div>
    <!-- 常用功能 -->
    <div class="home-module">
      <div class="home-module-head">
        <div>常用功能</div>
        <!-- <div class="home-module-head-more" @click="edit">编辑</div> -->
      </div>
      <van-grid :border="false" gutter="10px" square>
        <van-grid-item
          v-for="(item, index) in moduleList"
          :key="index"
          :text="item.menuName"
          :to="item.url"
          :icon="item.picture"
        ></van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import { toRefs, reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { getSwiperList, testApi } from '@/api/home'
import {
  getQuestionList,
  getToDoTaskList,
  getHistoryTaskList,
} from '@/api/qualityQuestion'
import { getMenuList } from '@/api/common'
import { imageHttpUrl } from '@/config/index'
export default {
  setup(props) {
    const state = reactive({
      swipeList: [],
      lastNewsList: [],
      todoTaskNum: 0,
      taskNum: 0,
      prefix: imageHttpUrl,
      bgStyle: {
        backgroundImage: '',
      },
      moduleList: [],
    })
    const router = useRouter()
    const store = useStore()
    // let prefix = process.env.NODE_ENV == 'development' ? '' : '/dist'
    state.bgStyle.backgroundImage = 'url(' + state.prefix + '/img/banner.png)'
    const more = () => {
      router.push({
        path: '/qualityQuestionList',
      })
    }
    const toTodoTaskList = () => {
      console.log('toTodoTaskList')
      router.push({
        path: '/todoTask',
      })
    }
    const toHistoryTaskList = () => {
      console.log('toHistoryTaskList')
      router.push({
        path: '/historyTask',
      })
    }
    const edit = () => {
      console.log('edit')
    }
    const toDetail = (item) => {
      router.push({
        path: '/qualityQuestionDetail',
        query: {
          guid: item.guid,
        },
      })
    }

    onBeforeMount(() => {
      state.swipeList = []
      getSwiperList().then((res) => {
        res.data && res.data.forEach((item) => state.swipeList.push(item.url))
      })
      getMenuList({ location: 'lastDynamic' }).then((res) => {
        state.lastNewsList = []
        if (res.code == 0 && res.data[0].url == '1') {
          getQuestionList({
            pageSize: 2,
            page: 0,
            isAll: true,
          }).then((qRes) => {
            state.lastNewsList = qRes.data
          })
        }
      })

      // let todoTaskRes = await getToDoTaskList({
      //   phone: store.getters.userPhone,
      //   start: 0,
      //   limit: 9999,
      // })
      // state.todoTaskNum = todoTaskRes.count
      // let taskRes = await getHistoryTaskList({
      //   phone: store.getters.userPhone,
      //   start: 0,
      //   limit: 9999,
      // })
      // state.taskNum = taskRes.count
      getMenuList({ location: 'commonfuntion', parentId: '' }).then((res) => {
        if (res.code == 0 && res.data && res.data.length > 0) {
          state.moduleList = res.data.map((ele) => {
            ele.url +=
              (ele.url.indexOf('?') !== -1 ? '&' : '?') +
              'parentId=' +
              ele.parentId
            return ele
          })
        }
      })
    })
    return {
      ...toRefs(state),
      toHistoryTaskList,
      toTodoTaskList,
      more,
      edit,
      toDetail,
    }
  },
}
</script>
<style lang="scss">
.home {
  padding: 40px 11px 60px;
  background-image: url('/img/banner.png');
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100% auto;
  height: calc(100vh + 70px);
  .home-swipe {
    height: 211px;
    border-radius: 10px;
    .van-swipe-item {
      overflow: hidden;
      height: 100%;
    }
  }
  .home-grid {
    background-color: #fff;
    border-radius: 10px;
    // height: 99px;
    margin-top: 8px;
    margin-bottom: 8px;
    .van-grid-item .van-grid-item__content {
      padding: 14px 0 0;
    }
    .van-grid-item .van-grid-item__content--surround::after,
    .van-grid-item .van-grid-item__content::after {
      border-width: 0;
    }
    &-icon {
      width: 48px;
      height: 48px;
      display: inline-block;
    }
  }
  .home-module {
    background-color: #fff;
    border-radius: 7px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    margin-bottom: 10px;
    .van-grid-item .van-grid-item__content {
      padding: 0;
    }
    .van-grid-item .van-grid-item__content--surround::after,
    .van-grid-item .van-grid-item__content::after {
      border-width: 0;
    }
    .home-grid-icon {
      width: 40px;
      height: 40px;
      display: inline-block;
    }
    &-head {
      display: flex;
      justify-content: space-between;
      padding: 14px;
      font-size: 13px;
      font-weight: bold;
      color: #373d45;
      &-more {
        color: #6a6a6a;
      }
    }
    &-item {
      padding: 0 10px;
      border-bottom: 1px solid #ebedf0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &__avatar {
        flex-basis: 25%;
      }
      &__content {
        // flex-grow: 1;
        flex-basis: 75%;
        padding: 10px;
        font-size: 12px;

        &-title {
          color: #373d45;
          font-size: 14px;
          font-weight: bold;
          overflow: hidden;
          // display: flex;
          // justify-content: space-between;
        }
        &-tag {
          float: right;
          width: 80px;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          background: #ffeee9;
          padding: 2px 10px;
          border-radius: 10px;
          color: #ff8164;
          font-size: 12px;
          transform: scale(0.83);
        }
      }
    }
  }
}
// .home-banner {
//   background-image: url('/dist/img/banner.png');
// }
.norem-item {
  width: 51px;
  height: 51px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ccc;
}
</style>
