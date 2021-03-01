<template>
  <div style="margin-top: 200px">
    <div style="text-align: center">
      <h2>欢迎来到sport_step云系统</h2>
      <h6 style="color: red">注：本系统不支持注册</h6>
      <h6 style="color: red">注册账号，请前往小程序授权登录绑定手机号即可</h6>
    </div>
    <van-field
        v-model="mobile"
        type="text"
        label="手机号码："
        placeholder="输入手机号码"
        :rules="[{ required: true, message: '输入手机号码' }]"
    />
    <div style="margin: 20px;">
      <van-button round block type="primary" @click="submit">登录</van-button>
    </div>


    <van-popup round v-model="show" style="width: 200px;font-size: 14px;padding: 10px">
      <div style="text-align: center;font-size: 16px;font-weight: bold;color:red">请选择身份</div>
      <div v-for="(item,i) in list" :key="i" style="margin-top: 10px">
          <span>{{item.appName==null?"未知":item.appName}}</span><span @click="login1(item.id)" style="float: right;color: blue">点击进入</span>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {login} from '@/util/request'
import {Toast} from 'vant';

export default {
  data() {
    return {
      mobile: null,
      list: [],
      show: false,
    };
  },
  methods: {
    submit: function () {
      const data = {mobile: this.mobile}
      login(data).then(res => {
        if (res.code === 0) {
          if(res.data.token){
            localStorage.setItem('sportToken', res.data.token)
            this.$router.push({path: '/'})
          }else {
            this.list = res.data;
            this.show = true;
          }
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    login1: function (id) {
      const data = {mobile: this.mobile,id:id}
      login(data).then(response => {
        if (response.code === 0) {
          if(response.data.token){
            localStorage.setItem('sportToken', response.data.token)
            this.$router.push({path: '/'})
          }
        } else {
          Toast.fail(response.msg);
        }
      });
    },
  },
};




</script>
