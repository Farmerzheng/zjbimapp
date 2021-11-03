<template>
  <scan @go-back="() => $router.back()" @success="scanSuccess"></scan>
</template>
<script>
import Scan from '@/components/scan.vue'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { Toast } from 'vant'
export default {
  name: 'BeamScan',
  components: {
    Scan,
  },
  setup(props) {
    const toPathKey = 'toPath' //必须参数
    const returnKey = 'returnKey'
    const router = useRouter()
    const route = useRoute()
    if (!route.query[toPathKey]) {
      Toast.fail('toPath参数未定义或未赋值')
      return
    } else if (!route.query[returnKey]) {
      Toast.fail('returnKey参数未定义或未赋值')
      return
    }
    const scanSuccess = (returnValue) => {
      let query = Object.create(null)
      let toPath = ''
      Object.keys(route.query).forEach((key) => {
        if (key == toPathKey) {
          toPath = route.query[key]
        } else if (key == returnKey) {
          let valueKey = route.query[key]
          query[valueKey] = returnValue
        } else {
          query[key] = route.query[key]
        }
      })
      Toast(JSON.stringify(query))
      router.push({
        path: '/' + toPath,
        query: query,
      })
    }
    return {
      scanSuccess,
    }
  },
}
</script>
