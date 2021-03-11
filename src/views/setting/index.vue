<template>
  <div>
    <div style="text-align: center">
      <h2>我的信息</h2>
    </div>
    <van-notice-bar style="margin-top: 10px;margin-bottom: 10px" scrollable text="功能待完善" color="#1989fa" background="#ecf9ff" left-icon="volume-o"/>
<!--    <van-field  label-width="7.2em" label="appId：" :value="settings.appId" disabled />-->
    <van-cell icon="location-o" title="推荐码" is-link label="修改或关联推荐码" to="/setting/tuiJianMa"/>
<!--    <van-field-->
<!--        v-model="settings.maVersion"-->
<!--        type="text"-->
<!--        label="小程序版本号："-->
<!--        placeholder="输入小程序版本"-->
<!--        autosize-->
<!--        label-width="7.2em"-->
<!--        :rules="[{ required: true, message: '请输入小程序版本号' }]"-->
<!--    />-->
<!--    <van-field-->
<!--        v-model="settings.homeAd"-->
<!--        type="textarea"-->
<!--        label="首页公告："-->
<!--        placeholder="输入首页公告"-->
<!--        autosize-->
<!--        label-width="7.2em"-->
<!--        :rules="[{ required: true, message: '请输入首页公告' }]"-->
<!--    />-->
<!--    <van-field-->
<!--        v-model="settings.sportAd"-->
<!--        type="textarea"-->
<!--        label="刷步页面公告："-->
<!--        placeholder="输入刷步页面公告"-->
<!--        autosize-->
<!--        label-width="7.2em"-->
<!--        :rules="[{ required: true, message: '请输入刷步页面公告' }]"-->
<!--    />-->
<!--    <van-field-->
<!--        v-model="settings.vipMoney"-->
<!--        type="text"-->
<!--        label="开通vip价格："-->
<!--        placeholder="输入开通vip价格"-->
<!--        autosize-->
<!--        label-width="7.2em"-->
<!--        :rules="[{ required: true, message: '请输入开通vip价格' }]"-->
<!--    />-->
<!--    <van-field-->
<!--        v-model="settings.openId"-->
<!--        type="text"-->
<!--        label="提现账号openId："-->
<!--        placeholder="输入提现账号openId"-->
<!--        autosize-->
<!--        label-width="7.2em"-->
<!--        :rules="[{ required: true, message: '请输入提现账号openId' }]"-->
<!--    />-->
<!--    <van-field-->
<!--        v-model="settings.userName"-->
<!--        type="text"-->
<!--        label="提现人真实姓名："-->
<!--        placeholder="输入提现人真实姓名"-->
<!--        autosize-->
<!--        label-width="7.2em"-->
<!--        :rules="[{ required: true, message: '请输入提现人真实姓名' }]"-->
<!--    />-->
<!--    &lt;!&ndash;    <van-cell center title="广告开关">&ndash;&gt;-->
<!--    &lt;!&ndash;      <van-switch v-model="settings.adIsOpen"/>&ndash;&gt;-->
<!--    &lt;!&ndash;    </van-cell>&ndash;&gt;-->
<!--    <div style="margin: 16px;">-->
<!--      <van-button round block type="primary" @click="submit">提交</van-button>-->
<!--    </div>-->
    <div style="margin: 16px;">
      <van-button round block type="default" @click="logOut">退出</van-button>
    </div>


    <router-view />
    <van-tabbar route placeholder >
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/setting/index" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {Toast} from "vant";
import {token} from "@/util/common";

export default {
  data() {
    return {

    };
  },
  mounted(){
  },
  methods:{
    logOut(){
      localStorage.removeItem(token);
      this.$router.push("login");
    }

  },
};
</script>

<style>

</style>
