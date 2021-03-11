<template>
  <div style="margin-top: 20px">
    <div style="text-align: center">
      <h2>找回密码</h2>
    </div>
    <van-field
        v-model="email"
        type="text"
        colon
        label-width="6em"
        label="邮箱"
        placeholder="输入邮箱"
        :rules="[{ required: true, message: '输入邮箱' }]"
    />
    <van-field
        v-model="validateCode"
        label-width="6em"
        colon
        label="验证码"
        placeholder="输入验证码"
    >
      <template #button>
        <van-image @click="imgCode" height="32px" width="82px" :src="imgUrl" />
      </template>
    </van-field>
    <van-field
        v-model="emailCode"
        label-width="6em"
        colon
        label="邮箱验证码"
        placeholder="输入邮箱验证码"
    >
      <template #button>
        <van-button round type="info" style="height: 40px" :disabled="yan_z_m_b" @click="sendEmailByRestPwd">发送验证码</van-button>
      </template>
    </van-field>
    <van-field
        v-model="password"
        type="text"
        colon
        label-width="6em"
        label="新密码"
        placeholder="输入新密码"
        :rules="[{ required: true, message: '输入新密码' }]"
    />

    <div style="margin: 20px;">
      <van-button round block type="primary" @click="submit">提交</van-button>
    </div>
    <div style="text-align: center;font-size: 14px;color: #606266;">
      <van-row>
        <van-col span="24" ><span class="reg" @click="login">已有账号，点此登录</span></van-col>
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
import {sendEmailByRestPwd,resetPassword} from '@/util/request'
import {Dialog, Toast} from 'vant';

export default {
  data() {
    return {
      mobile: null,
      emailCode: null,
      validateCode: null,
      imgUrl: null,
      yan_z_m_b:false,
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
    sendEmailByRestPwd(){
      this.yan_z_m_b = true;
      const data = {validateCode:this.validateCode,email:this.email}
      sendEmailByRestPwd(data).then(res=>{
        if(res.code==0){
          Toast.success(res.msg);
        }else {
          Toast.fail(res.msg);
        }
      }).finally(() => {
        this.yan_z_m_b = false;
      })
    },
    imgCode(){
     this.imgUrl = "/v1/sport/captchaImage?s=" + Math.random();
    },
    login() {
      this.$router.push({path: '/login'})
    },
    submit() {
      const that = this;
      const data = {email:this.email,emailCode:this.emailCode,password:this.password}
      resetPassword(data).then(response => {
        if (response.code === 0) {
          Dialog.confirm({
            message: '重置成功,是否登录',
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
