<template>
  <div>
    <div style="text-align: center">
      <h2>我要提现</h2>
    </div>
    <div style="text-align: center">
      当前可用余额：{{settings.balance}} 元
    </div>

    <div style="margin-top: 30px"></div>
    <van-field
        v-model="money"
        type="number"
        label="提现金额："
        placeholder="请输入提现的金额"
        autosize
        label-width="7.2em"
        :rules="[{ required: true, message: '请输入提现的金额' }]"
    />

    <div style="margin: 16px;">
      <van-button round block type="primary" @click="submit">提交</van-button>
    </div>

    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="setting" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {appSettingQuery,applyWithdrawal} from '@/util/request'
import {Toast} from "vant";
export default {
  data() {
    return {
      money:null,
      settings: {
      },
    };
  },
  mounted(){
   this.query()
  },
  methods:{
    submit(){
      const data = {money:this.money}
      applyWithdrawal(data).then(res =>{
        if(res.data.data===0){
          Toast.success("操作成功");
        }else{
          Toast.fail(res.data.msg);
        }
        this.query()
      })
    },
    query(){
      appSettingQuery().then(res =>{
        this.settings = res.data.data
      })
    },
    logOut(){
      this.$router.push("login");
    }

  },
};
</script>

<style>

</style>
