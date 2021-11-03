<template>
  <div class="nav-header">
    <van-nav-bar fixed title="通讯录" left-arrow @click-left="$router.back" />
    <address-book
      :sticky-offset-top="46"
      @selection="selectionHandler"
    ></address-book>
  </div>
</template>
<script>
import AddressBook from '@/components/addressBook.vue'
import { useRouter } from 'vue-router'
import { toRaw } from 'vue'
export default {
  components: { AddressBook },
  setup(props) {
    const router = useRouter()
    const selectionHandler = (user) => {
      console.log(toRaw(user))
      let {
        userName,
        phonenumber,
        email,
        company,
        dept: { deptName },
      } = toRaw(user)
      router.push({
        path: '/addressBookDetail',
        query: {
          userName,
          phonenumber,
          email,
          company,
          deptName,
        },
      })
    }
    return {
      selectionHandler,
    }
  },
}
</script>
