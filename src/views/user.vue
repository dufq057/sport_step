<template>
  <div>
    <div style="text-align: center">
      <h2>我的信息</h2>
    </div>
    <van-notice-bar style="margin-top: 10px" scrollable text="待开发" color="#1989fa" background="#ecf9ff" left-icon="volume-o"/>
    <!--    <van-field  label-width="7.2em" label="appId：" :value="settings.appId" disabled />-->
    <!--    <van-field-->
    <!--        v-model="settings.siteName"-->
    <!--        type="text"-->
    <!--        label="小程序名称："-->
    <!--        placeholder="输入小程序名称"-->
    <!--        autosize-->
    <!--        label-width="7.2em"-->
    <!--        :rules="[{ required: true, message: '请输入小程序名称' }]"-->
    <!--    />-->
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
      <van-tabbar-item replace to="/user" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import request,{appSettingQuery} from '@/util/request'
import {Toast} from "vant";
export default {
  data() {
    return {
      settings: {
      },
    };
  },
  mounted(){
  },
  methods:{
    submit(){
      appSettingEdit(this.settings).then(res =>{
        if(res.data.data===0){
          Toast.success("修改成功");
        }else{
          Toast.fail(res.data.msg);
        }
      })
    },
    logOut(){
      this.$router.push("login");
    }

  },
};
export function appSettingEdit(query) {
  return request({
    url: '/v1/ma/appSetting/edit',
    method: 'post',
    params: query
  })
}
</script>

<style>

</style>
