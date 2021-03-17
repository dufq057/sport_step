<template>
  <div style="margin-top: 20px">
    <div style="text-align: center">
      <h2>用户注册</h2>
    </div>
    <van-form @submit="submit">
    <van-field
        v-model="mobile"
        type="text"
        name="mobile"
        colon
        label-width="5em"
        label="手机号码"
        placeholder="输入手机号码"
        :rules="[{ required: true, message: '输入手机号码' }]"
    />
    <van-field
        v-model="email"
        type="text"
        name="email"
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
        name="password"
        label-width="5em"
        label="密码"
        placeholder="输入密码"
        :rules="[{ required: true, message: '输入密码' }]"
    />
    <van-field
        v-model="validateCode"
        label-width="5em"
        name="validateCode"
        colon
        label="验证码"
        placeholder="输入验证码"
        :rules="[{ required: true, message: '输入验证码' }]"
    >
      <template #button>
        <van-image @click="imgCode" height="32px" width="82px" :src="imgUrl" />
      </template>
    </van-field>
    <van-field
        v-model="inviteCode"
        type="text"
        colon
        name="inviteCode"
        label-width="5em"
        label="邀请码"
        placeholder="输入邀请码,跟客服索取"
        :rules="[{ required: true, message: '输入邀请码,跟客服索取' }]"
    />
    <div style="margin: 20px;">
      <van-button round block type="primary" native-type="submit">注册</van-button>
    </div>
    </van-form>
    <div style="text-align: center;font-size: 14px;color: #606266;">
      <van-row>
        <van-col span="24" ><span class="reg" @click="login">已有账号，点此登录</span></van-col>
      </van-row>
    </div>
    <div style="text-align: center;color: red">
      <h6>注：邀请码跟客服索取</h6>
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
import {register} from '@/util/request'
import {Dialog, Toast} from 'vant';

export default {
  data() {
    return {
      mobile: null,
      validateCode: null,
      imgUrl: null,
      email: null,
      inviteCode: null,
      password: null,
      list: [],
      show: false,
    };
  },
  mounted() {
    this.inviteCode = this.$route.query.inviteCode;
    this.imgCode();
  },
  methods: {
    imgCode(){
     this.imgUrl = "/v1/sport/captchaImage?s=" + Math.random();
    },
    login() {
      this.$router.push({path: '/login'})
    },
    submit(data) {
      const that = this;
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
