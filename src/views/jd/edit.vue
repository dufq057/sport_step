<template>
  <div>
    <div style="text-align: center">
      <h2>修改任务</h2>
    </div>
    <div style="padding: 0 20px;">





      <van-form>
        <h5 style="text-align: center">请截图保存二维码用APP扫码<br>或使用浏览器打开点击授权直接授权</h5>
        <div style="background-color: #FAFAFA;text-align: center">
          <van-image
              width="200"
              height="200"
              :src="qrImg"
          />
        </div>
        <div>
          <van-button round type="info" block native-type="submit" @click="shouquan" style="margin-right: 10px;" color="orangered">一键授权</van-button>
        </div>
        <div style="margin-top: 16px;">
          <van-button round block type="default" @click="cancel">返回</van-button>
        </div>
      </van-form>


    </div>


    <router-view />
    <van-tabbar route placeholder>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/setting/index" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {qrLogin,checkLogin} from '@/util/jd'
import {Toast} from "vant";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      show: false,
      qrImg: "",
      token: null,
      okl_token: null,
      onekeylogUrl: "",
      lsid: "",
      editShow: false,
      switchChecked: false,
      editDate: {},
      list:[],
      ptPin:'',
      task:null,
      isLoading: false,
      ptKey:'',
      settings: {
      },
    };
  },
  mounted(){
    let id = this.$route.query.id;
    qrLogin().then(res=>{
      if(res.code==0){
        this.qrImg = "data:image/png;base64,"+res.data.qrcode
        this.onekeylogUrl = res.data.onekeylog_url
        this.token = res.data.token
        this.okl_token = res.data.okl_token
        this.lsid = res.data.lsid
      }else {
        Toast.fail(res.msg);
      }
    })

    const that = this
    this.task = setInterval(function () {
      if(that.token){
        checkLogin({id:id,token:that.token,okl_token:that.okl_token,lsid:that.lsid}).then(res=>{
          if(res.code==0){
            clearInterval(that.task)
            setTimeout(function () {
              that.$router.push("/jd/index");
            },1000)

          }
        })
      }
    },3*1000)


  },
  beforeDestroy(){
    clearInterval(this.task)
  },
  methods:{
    shouquan(){
      window.location.href=this.onekeylogUrl;
    },
    cancel(){
      this.$router.push("/jd/index");
    },
  },
};
</script>

<style>

</style>
