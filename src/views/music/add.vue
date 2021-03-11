<template>
  <div>
    <div style="text-align: center">
      <h2>添加任务</h2>
    </div>

    <van-notice-bar style="margin-top: 10px" :scrollable="false" wrapable text="刷步时间可为空,或者为正整数，1,2,3到23，请勿填写其他数字" color="#1989fa" background="#ecf9ff" left-icon="volume-o"/>

    <van-form @submit="addForm">
      <div style="background-color: #FAFAFA;padding: 20px">

        <div>
          <van-field
              type="text"
              autosize
              v-model="mobile"
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

          <van-field name="stepType" label="刷步模式：">
            <template #input>
              <van-radio-group v-model="stepType" direction="horizontal" >
                <van-radio name="1">秒刷</van-radio>
                <van-radio name="2">累计</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-row style="margin-top: 10px">
            <van-col span="6">执行次数：</van-col>
            <van-col span="18">{{ item.stepRunNum }}</van-col>
          </van-row>

        </div>

        <div style="text-align: center;margin-top: 10px">
          <van-button type="info" size="small" native-type="submit" style="margin-right: 10px">提交</van-button>
          <van-button type="info" size="small" color="green" native-type="button" @click="cancel" style="margin-right: 10px">取消</van-button>
        </div>
      </div>
    </van-form>

    <router-view />
    <van-tabbar route placeholder>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/setting/index" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {sportSave,jdDel,run,updateStatus} from '@/util/sport'
import {Toast} from "vant";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      typeName: '',
      stepType:'1',
      type:null,
      stepTime:null,
      columns: [{name:"小米运动",type: '3'}, {name:"乐心健康",type: '4'}, {name:"悦动圈",type: '5'}],
      show: false,
      editShow: false,
      switchChecked: false,
      showPicker: false,
      editDate: {},
      list:[],
      ptPin:'',
      isLoading: false,
      ptKey:'',
      mobile:null,
      password:null,
      stepMin:null,
      stepMax:null,
      cookie:null,
    };
  },
  mounted(){
    // this.queryList()
  },
  methods:{
    onConfirm(value){
      this.typeName = value.name;
      this.type = value.type;
      this.showPicker = false;
    },
    addButton(){
      this.show = true
    },
    open(item){
      if(item.isOpen==1){
        Dialog.confirm({
          title: '提醒',
          message: '是否关闭代刷功能？',
        }).then(() => {

          this.updateStatus({id:item.id,isOpen:0})
          item.isOpen = 0
        }).catch(() => {

        });
      }else if(item.isOpen==0){
        Dialog.confirm({
          title: '提醒',
          message: '是否打开代刷功能？',
        }).then(() => {
          this.updateStatus({id:item.id,isOpen:1})
          item.isOpen = 1
        }).catch(() => {
        });
      }

    },
    onRefresh() {
      this.queryList()
    },
    updateStatus(data) {
      updateStatus(data).then(res=>{
        if(res.code==0){
          Toast.success("操作成功");
        }else {
          Toast.fail(res.msg);
        }
      })
    },
    del(id){
      Dialog.confirm({
        message: '是否确认删除',
      })
          .then(() => {
            jdDel({id:id}).then(res=>{
              if(res.code==0){
                Toast.success("添加成功");
              }else {
                Toast.fail(res.msg);
              }
              this.queryList();
            })
          })
          .catch(() => {

          });

    },
    addForm(data){
      data.type = this.type;
      const that = this;
      sportSave(data).then(res=>{
        if(res.code==0){
          Toast.success("添加成功");
          this.show = false
        }else {
          Toast.fail(res.msg);
        }
        setTimeout(function () {
          that.$router.push("/sport/index");
        },3*1000)

      })
    },
    run(id){
      run({id:id}).then(res=>{
        if(res.code==0){
          Toast.success("操作成功,请稍后查询结果");
        }else {
          Toast.fail(res.msg);
        }
        const that = this
        setTimeout(function () {
          that.queryList()
        },3*1000)

      })
    },
    cancel(){
      this.$router.push("/sport/index");
    },

  },
};
</script>

<style>

</style>
