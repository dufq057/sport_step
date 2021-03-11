<template>
  <div style="margin-top: 200px">
    <div style="text-align: center">
      <h2>欢迎来到神马都是浮云</h2>
    </div>
    <van-field
        v-model="mobile"
        type="text"
        label="手机号码："
        placeholder="输入手机号码"
        :rules="[{ required: true, message: '输入手机号码' }]"
    />
    <van-field
        v-model="password"
        type="text"
        label="密码："
        placeholder="输入密码"
        :rules="[{ required: true, message: '输入密码' }]"
    />
    <div style="margin: 20px;">
      <van-button round block type="primary" @click="submit">登录</van-button>
    </div>
    <div style="text-align: center;font-size: 14px;color: #606266;">
      <van-row>
        <van-col span="12" ><span class="reg" @click="reg">注册</span></van-col>
        <van-col span="12" ><span class="reg" @click="resetPwd">忘记密码</span></van-col>
      </van-row>
    </div>

  </div>
</template>
<style>
.reg:hover{
  text-decoration: underline;
  cursor: pointer;
  color: #46a6ff;
}
</style>
<script>
import {login} from '@/util/request'
import {Toast} from 'vant';
import { token } from '@/util/common';

export default {
  data() {
    return {
      mobile: null,
      password: null,
      list: [],
      show: false,
    };
  },
  methods: {
    reg(){
      this.$router.push({path: '/register'})
    },
    resetPwd(){
      this.$router.push({path: '/resetPwd'})
    },
    submit: function () {
      const data = {mobile: this.mobile,password:this.password}
      login(data).then(res => {
        if (res.code === 0) {
            localStorage.setItem(token, res.data.token)
            this.$router.push({path: '/'})
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};




</script>
