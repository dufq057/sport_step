<template>
  <div>
    <div style="text-align: center">
      <h2>去水印</h2>
      <h5 style="color: orange">每执行一次任务消耗1积分</h5>
      <h5 style="color: orange;padding: 0 20px">目前支持：抖音</h5>
    </div>
    <div style="padding: 0 20px;">
      <van-button @click="addButton" round type="primary" block color="linear-gradient(to left, #ff6034, #ee0a24)">新增任务</van-button>
      <van-notice-bar style="margin-top: 10px" scrollable text="打开代刷开关，才会自动每天刷，使用教程找推荐人获取" color="#1989fa" background="#ecf9ff" left-icon="volume-o"/>

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-for="(item,i) in list" :key="i" style="background-color: #FAFAFA;padding: 20px;color: #646566;font-size: 14px;text-align: left;margin-top: 10px;border-radius: 30px">
        <van-row>
          <van-col span="6">账号：</van-col>
          <van-col span="18">{{ item.account }}</van-col>
        </van-row>
        <van-row style="margin-top: 10px">
          <van-col span="6">接口：</van-col>
          <van-col span="18">
            <span v-if="item.type==3">小米运动</span>
            <span v-if="item.type==4">乐心健康</span>
            <span v-if="item.type==5">悦动圈</span>
          </van-col>
        </van-row>
        <van-row style="margin-top: 10px">
          <van-col span="6">状态：</van-col>
          <van-col span="18">
            <span v-if="item.status==1">正常</span>
            <span v-if="item.status==2">ck失效</span>
            <span v-if="item.status==3">密码错误</span>
          </van-col>
        </van-row>
        <van-row style="margin-top: 10px">
          <van-col span="6">运行时间：</van-col>
          <van-col span="18"> {{ item.runTime }}</van-col>
        </van-row>
        <van-row style="margin-top: 10px">
          <van-col span="6">执行次数：</van-col>
          <van-col span="18">{{ item.runNum }}</van-col>
        </van-row>
        <van-row style="margin-top: 10px">
          <van-col span="6">目标步数：</van-col>
          <van-col span="18">{{ item.stepToday }}</van-col>
        </van-row>
        <van-row style="margin-top: 10px">
          <van-col span="6">执行步数：</van-col>
          <van-col span="18">{{ item.stepRunNum }}</van-col>
        </van-row>
        <van-row style="margin-top: 10px">
          <van-col span="6">刷步模式：</van-col>
          <van-col span="18">{{ item.stepType ==1?'秒刷':'累计'}}</van-col>
        </van-row>
        <van-row style="margin-top: 10px">
          <van-col span="6">刷步时间：</van-col>
          <van-col span="18">{{ item.stepTime}}</van-col>
        </van-row>
        <van-row style="margin-top: 10px">
          <van-col span="6">代刷开关：</van-col>
          <van-col span="18">
            <van-switch :value="item.isOpen==1?true:false" @input="open(item)" size="19px"/>
          </van-col>
        </van-row>
        <div style="margin-top: 10px;text-align: right">
          <van-button type="info" size="small" style="margin-right: 10px" @click="run(item.id)">执行</van-button>
          <van-button type="info" size="small" color="green" style="margin-right: 10px" @click="edit(item.id)">修改</van-button>
          <van-button type="info" size="small" color="red" style="margin-right: 10px" @click="del(item.id)">删除</van-button>
        </div>
      </div>
      </van-pull-refresh>


      <div v-if="list.length==0" style="background-color: #FAFAFA;padding: 20px;color: #646566;font-size: 12px;text-align: center;margin-top: 10px;border-radius: 30px">
        <h3>暂无数据</h3>
      </div>

    </div>


    <router-view />
    <van-tabbar route placeholder>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/setting/index" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {sportList,jdDel,run,updateStatus} from '@/util/sport'
import {Toast} from "vant";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      type: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      show: false,
      editShow: false,
      switchChecked: false,
      editDate: {},
      list:[],
      ptPin:'',
      isLoading: false,
      ptKey:'',
      settings: {
      },
    };
  },
  mounted(){
    this.queryList()
  },
  methods:{
    onConfirm(value){
      this.type = value;
      this.showPicker = false;
    },
    addButton(){
      this.$router.push("/sport/add");
    },
    open(item){
      if(item.isOpen==1){
        Dialog.confirm({
          title: '提醒',
          message: '是否关闭代刷功能？',
        }).then(() => {


          updateStatus({id:item.id,isOpen:0}).then(res=>{
            if(res.code==0){
              Toast.success("操作成功");
              item.isOpen = 0
            }else {
              Toast.fail(res.msg);
            }
          })

        }).catch(() => {

        });
      }else if(item.isOpen==0){
        Dialog.confirm({
          title: '提醒',
          message: '是否打开代刷功能？',
        }).then(() => {

          updateStatus({id:item.id,isOpen:1}).then(res=>{
            if(res.code==0){
              Toast.success("操作成功");
              item.isOpen = 1
            }else {
              Toast.fail(res.msg);
            }
          })

        }).catch(() => {
        });
      }

    },
    onRefresh() {
      this.queryList()
    },
    queryList(){
      sportList().then(res=>{
        if(res.code==0){
          this.list = res.data
        }else {
          Toast.fail(res.msg);
        }
        this.isLoading = false;
      })
    },
    edit(id){
      this.$router.push({path: '/sport/edit', query: {id: id}});
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
    run(id){
      run({id:id}).then(res=>{
        if(res.code==0){
          Toast.success("操作成功");
        }else {
          Toast.fail(res.msg);
        }
        const that = this
        setTimeout(function () {
          that.queryList()
        },3*1000)

      })
    },

  },
};
</script>

<style>

</style>
