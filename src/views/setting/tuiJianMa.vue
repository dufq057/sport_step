<template>
  <div>
    <div style="text-align: center">
      <h2>修改推荐码</h2>
    </div>
    <van-field
        v-model="user.inviteCode"
        type="text"
        label="邀请码："
        placeholder="输入邀请码"
        autosize
        label-width="7.2em"
        :rules="[{ required: true, message: '请输入推荐码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" @click="submit">提交</van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="default" @click="logOut">返回</van-button>
    </div>

    <TabbarHtml v-bind:active=2 ></TabbarHtml>
  </div>
</template>

<script>
import {Toast} from "vant";
import {buildInviteCode} from "@/util/request";
import {queryUser} from "@/util/sport";
import  TabbarHtml  from '@/views/bottom.vue';

export default {
  components:{
    'TabbarHtml':TabbarHtml
  },
  data() {
    return {
      inviteCode:null,
      user:{}
    };
  },
  mounted(){
    this.queryUser()
  },
  methods:{
    queryUser(){
      queryUser().then(res=>{
        if(res.code==0){
          this.user = res.data
        }
      })
    },
    submit(){
      buildInviteCode({inviteCode:this.user.inviteCode}).then(res=>{
        if(res.code==0){
          Toast.success("绑定成功");
        }else {
          Toast.fail(res.msg);
        }
      })
    },
    logOut(){
      this.$router.push("/setting/index");
    }

  },
};
</script>

<style>

</style>
