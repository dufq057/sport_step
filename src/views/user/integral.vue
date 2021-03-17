<template>
  <div>
    <div style="text-align: center">
      <h2>赚积分</h2>
    </div>
    <van-notice-bar style="margin-top: 10px" scrollable text="由于被**举报，导致没有签到,等更新其他渠道获得积分" color="#1989fa" background="#ecf9ff" left-icon="volume-o"/>
    <div style="text-align: center;font-size: 14px">
      在线购买积分  10元 500积分<br>
      目前仅支持【支付宝】扫码支付
    </div>
    <div style="text-align: center;color: red;margin-top: 10px">
      当前账号积分：{{user.integralTitle}}
    </div>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="toPay">购买</van-button>
    </div>
    <div v-if="payUrl!=null" style="text-align: center">
      <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          :src="payUrl"
      />
    </div>
    <div style="text-align: center">
      {{ statusStr }}
    </div>

    <TabbarHtml v-bind:active=1 ></TabbarHtml>
  </div>
</template>

<script>
import {Toast} from "vant";
import  TabbarHtml  from '@/views/bottom.vue';
import {toQrPay,queryOrder} from '@/util/integral'
import {queryUser} from '@/util/sport'
export default {
  components:{
    'TabbarHtml':TabbarHtml
  },
  data() {
    return {
      payUrl:null,
      user:{},
      task:null,
      orderCode:null,
      statusStr:null,
    };
  },
  mounted(){
    this.queryUser();
  },
  beforeDestroy(){
    clearInterval(this.task)
  },
  methods:{
    queryUser(){
      queryUser().then(res=>{
        if(res.code==0){
          this.user = res.data
        }
      })
    },
    toPay(){
      toQrPay().then(res=>{
        if(res.code==0){
          this.payUrl = "data:image/png;base64,"+res.data.payUrl;
          this.orderCode = res.data.orderCode;
          this.queryOrder();
        }else {
          Toast.fail(res.msg);
        }
      })
    },
    queryOrder(){
      const that = this
      this.task = setInterval(function () {
        if(that.orderCode){
          queryOrder({orderCode:that.orderCode}).then(res=>{
            if(res.code==0){
              if(res.data ==1){
                that.statusStr = "待支付";
              }
              if(res.data ==2){
                that.statusStr = "付款成功";
                clearInterval(that.task)
                that.queryUser();
                that.payUrl = null;
              }
            }else {
              Toast.fail("支付异常，重新刷新页面");
              clearInterval(that.task)
            }
          })
        }
      },3*1000)
    }
  },
};
</script>

<style>

</style>
