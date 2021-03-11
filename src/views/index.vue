<template>
  <div>
    <div style="text-align: center">
      <h2>欢迎来到全智能云系统</h2>
      <h5 style="color: orange">可用积分：{{user.integralTitle}}</h5>
    </div>
    <div style="padding: 0 20px;">
      <van-grid :column-num="3" icon-size="50px">
        <van-grid-item icon="https://txc.gtimg.com/data/286658/2020/1216/ebcddfd97a79150722875469e1c435a5.png" to="/sport/index" text="运动步数" />
        <van-grid-item icon="https://txc.gtimg.com/data/286658/2021/0303/8f65680b77c0a04c427dd0455e4f8cfa.png" to="/jd/index" text="京东豆豆" />
<!--        <van-grid-item icon="https://txc.gtimg.com/data/286658/2021/0303/8f65680b77c0a04c427dd0455e4f8cfa.png" to="/music/index" text="网抑云" />-->
      </van-grid>
    </div>


    <router-view />
    <van-tabbar route placeholder>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/setting/index" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {queryUser} from '@/util/sport'
export default {
  data() {
    return {
      user:{},
    };
  },
  mounted(){
    this.queryUser();
  },
  methods:{
    queryUser(){
      queryUser().then(res=>{
        if(res.code==0){
          this.user = res.data
        }
      })
    }
  },
};
</script>

<style>

</style>
