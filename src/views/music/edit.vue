<template>
  <div>
    <div style="text-align: center">
      <h2>修改任务</h2>
    </div>
    <div style="padding: 0 20px;">
      <van-notice-bar style="margin-top: 10px" :scrollable="true" wrapable text="有部分账号一次刷不够，可以多写几次" color="#1989fa" background="#ecf9ff" left-icon="volume-o"/>


      <van-form @submit="editForm">
        <div style="background-color: #FAFAFA;padding: 20px">

          <div>
            <van-field
                type="text"
                autosize
                v-model="account"
                name="account"
                label="手机号："
                placeholder="输入手机号或邮箱"
                :rules="[{ required: true, message: '必填' }]"
            />
            <van-field
                type="text"
                v-model="password"
                autosize
                name="password"
                label="密码："
                placeholder="输入密码"
                :rules="[{ required: true, message: '必填' }]"
            />
            <van-field
                type="text"
                v-model="stepRunNum"
                autosize
                name="stepRunNum"
                label="每日执行次数："
                placeholder="输入每日执行次数,默认1次"
            />
          </div>

          <div style="text-align: center;margin-top: 10px">
            <van-button type="info" size="small" native-type="submit" style="margin-right: 10px">提交</van-button>
            <van-button type="info" size="small" color="green" native-type="button" @click="cancel" style="margin-right: 10px">取消</van-button>
          </div>
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
import {musicEditSave} from '@/util/music'
import {sportEdit} from '@/util/sport'
import {Toast} from "vant";
export default {
  data() {
    return {
      account: null,
      password: null,
      stepRunNum: null,
    };
  },
  mounted(){
    let id = this.$route.query.id;
    sportEdit({id:id}).then(res=>{
      if(res.code==0){
        this.account = res.data.account;
        this.password = res.data.password;
        this.stepRunNum = res.data.stepRunNum;
      }else {
        Toast.fail(res.msg);
      }
    })
  },
  methods:{
    editForm(data){
      data.id = this.$route.query.id;
      const that = this;
      musicEditSave(data).then(res=>{
        if(res.code==0){
          Toast.success("修改成功");
          setTimeout(function () {
            that.$router.push("/music/index");
          },3*1000)
        }else {
          Toast.fail(res.msg);
        }
      })
    },
    cancel(){
      this.$router.push("/music/index");
    },
  },
};
</script>

<style>

</style>
