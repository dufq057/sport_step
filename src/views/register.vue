<template>
  <div style="margin-top: 200px">
    <div style="text-align: center">
      <h2>欢迎来到神马都是浮云</h2>
    </div>
    <van-field
        v-model="mobile"
        type="text"
        colon
        label-width="5em"
        label="手机号码"
        placeholder="输入手机号码"
        :rules="[{ required: true, message: '输入手机号码' }]"
    />
    <van-field
        v-model="email"
        type="text"
        colon
        label-width="5em"
        label="邮箱"
        placeholder="输入邮箱"
        :rules="[{ required: true, message: '输入邮箱' }]"
    />
    <van-field
        v-model="password"
        type="text"
        colon
        label-width="5em"
        label="密码"
        placeholder="输入密码"
        :rules="[{ required: true, message: '输入密码' }]"
    />
    <van-field
        v-model="validateCode"
        label-width="5em"
        colon
        label="验证码"
        placeholder="输入验证码"
    >
      <template #button>
        <van-image @click="imgCode" height="32px" width="82px" :src="imgUrl" />
      </template>
    </van-field>

    <div style="margin: 20px;">
      <van-button round block type="primary" @click="submit">注册</van-button>
    </div>
    <div style="margin: 20px;">
      <van-button round block type="default" @click="login">登录</van-button>
    </div>
  </div>
</template>
<script>
import {register} from '@/util/request'
import {Dialog, Toast} from 'vant';
import { token } from '@/util/common';
import {jdDel} from "@/util/sport";

export default {
  data() {
    return {
      mobile: null,
      validateCode: null,
      imgUrl: null,
      email: null,
      password: null,
      list: [],
      show: false,
    };
  },
  mounted() {
    this.imgCode();
  },
  methods: {
    imgCode(){
     this.imgUrl = "/v1/sport/captchaImage?s=" + Math.random();
    },
    login() {
      this.$router.push({path: '/login'})
    },
    submit() {
      const that = this;
      const data = {mobile: this.mobile,validateCode:this.validateCode,email:this.email,password:this.password}
      register(data).then(response => {
        if (response.code === 0) {
          Dialog.confirm({
            message: '注册成功,是否登录',
          })
          .then(() => {
            that.$router.push({path: '/login'})
          })
          .catch(() => {

          });
        } else {
          Toast.fail(response.msg);
        }
      });
    },
  },
};




</script>
