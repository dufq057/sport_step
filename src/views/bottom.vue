<template>
  <div>
    <van-tabbar v-model="tabbarTempValue" placeholder @change="onChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="star-o">赚积分</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  props: {
    active: Number
  },
  data() {
    return {
      tabbarTempValue: this.active
    }
  },
  methods: {
    onChange(index) {
      const routerArray = [
        "/",
        "/user/integral",
        "/setting/index",
      ];
      this.$router.push(routerArray[index])
    }
  }
}
</script>
