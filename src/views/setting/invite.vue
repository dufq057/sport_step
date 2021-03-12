<template>
  <div>
    <div style="text-align: center">
      <h2>邀请好友</h2>
    </div>
    <van-field
        v-model="user.id"
        readonly
        type="text"
        label="邀请码："
        placeholder="我的邀请码"
        autosize
        label-width="5em"
        :rules="[{ required: true, message: '请输入推荐码' }]"
    />
    <van-field
        v-model="user.searchValue"
        name="searchValue"
        readonly
        :data-clipboard-text="user.searchValue"
        type="text"
        label="邀请地址："
        placeholder="我的邀请地址"
        @click="copy()"
        autosize
        label-width="5em"
        :rules="[{ required: true, message: '请输入推荐码' }]"
    />
    <div style="float: right;margin-right: 20px">
      <span style="font-size: 10px;color: #46a6ff">点击上方链接自动复制</span>
    </div>

    <div style="margin: 16px;text-align: center">
      <h6>我的邀请好友【显示最新10个】关联到小程序才算成功</h6>
      <h6>邀请成功，双方各送50积分</h6>
    </div>
    <div style="text-align: center;font-size: 14px">
      <van-row>
        <van-col span="8">账号</van-col>
        <van-col span="8">状态</van-col>
        <van-col span="8">时间</van-col>
      </van-row>

      <div v-if="list.length==0">
        <van-row>
          <van-col span="24">无数据</van-col>
        </van-row>
      </div>

      <div v-for="(item,i) in list" :key="i" >
      <van-divider />
      <van-row>
        <van-col span="8">{{item.mobile}}</van-col>
        <van-col span="8">{{ item.maUserId==null?'未到账':'已到账' }}</van-col>
        <van-col span="8">{{ item.createTime }}</van-col>
      </van-row>
      </div>

    </div>
    <div style="margin: 16px;">
      <van-button round block type="default" @click="logOut">返回</van-button>
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
import {buildInviteCode} from "@/util/request";
import {queryUser,queryUserChildren} from "@/util/sport";
import Clipboard from 'clipboard';
export default {
  data() {
    return {
      inviteCode:null,
      list:[],
      user:{}
    };
  },
  mounted(){
    this.queryUser()
    this.queryUserChildren()
  },
  methods:{
    queryUserChildren(){
      queryUserChildren().then(res=>{
        if(res.code==0){
          this.list = res.data
        }
      })
    },
    copy(){
      const clipboard = new Clipboard("input[name='searchValue']")
      clipboard.on('success', e => {
        Toast('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        Toast('复制失败，请手动选择复制')
        // 释放内存
        clipboard.destroy()
      })
    },
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
