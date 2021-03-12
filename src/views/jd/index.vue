<template>
  <div>
    <div style="text-align: center">
      <h2>欢迎来到jd_sign云系统</h2>
      <h5 style="color: orange">每执行一次任务消耗1积分</h5>
    </div>
    <div style="padding: 0 20px;">
      <van-button @click="addButton" round type="primary" block color="linear-gradient(to left, #ff6034, #ee0a24)">新增任务</van-button>
      <van-notice-bar style="margin-top: 10px" scrollable text="打开代刷开关，才会自动每天刷，使用教程找推荐人获取" color="#1989fa" background="#ecf9ff" left-icon="volume-o"/>

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-for="(item,i) in list" :key="i" style="background-color: #FAFAFA;padding: 20px;color: #646566;font-size: 14px;text-align: left;margin-top: 10px;border-radius: 30px">
        <van-row>
          <van-col span="6">账号：</van-col>
          <van-col span="18">{{ item.remarks }}</van-col>
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


      <van-popup round v-model="show" :style="{ height: '420px',width:'80%'}">
        <van-form @submit="addForm">
              <h5 style="text-align: center">请保存二维码用APP扫码<br>或使用浏览器打开直接授权</h5>
              <div style="background-color: #FAFAFA;text-align: center">
                <van-image
                    width="200"
                    height="200"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                />
           </div>
          <div style="text-align: center">
            <van-button type="info" size="small" native-type="submit" style="margin-right: 10px">提交</van-button>
            <van-button type="info" size="small" color="green" native-type="button" @click="cancel" style="margin-right: 10px">取消</van-button>
          </div>
        </van-form>
      </van-popup>

      <van-popup round v-model="editShow" :style="{ height: '420px',width:'80%'}">
        <van-form @submit="editForm">
          <h5 style="text-align: center">修改信息</h5>
          <div style="background-color: #FAFAFA;padding: 20px">
            <van-field
                type="textarea"
                autosize
                v-model="editDate.ptPin"
                name="ptPin"
                label="pt_pin："
                placeholder="输入ck的pt_pin"
                :rules="[{ required: true, message: '必填' }]"
            />
            <van-field
                type="textarea"
                v-model="editDate.ptKey"
                autosize
                name="ptKey"
                label="pt_key："
                placeholder="输入ck的pt_key"
                :rules="[{ required: true, message: '必填' }]"
            />
          </div>
          <div style="text-align: center">
            <van-button type="info" size="small" native-type="submit" style="margin-right: 10px">提交</van-button>
            <van-button type="info" size="small" color="green" native-type="button" @click="cancel" style="margin-right: 10px">取消</van-button>
          </div>
        </van-form>
      </van-popup>

    </div>


    <router-view />
    <van-tabbar route placeholder>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/setting/index" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {jdSave,jdList,jdDel,jdEditSave,run} from '@/util/jd'
import {updateStatus} from '@/util/sport'
import {Toast} from "vant";
import { Dialog } from 'vant';
export default {
  data() {
    return {
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
    addButton(){
      this.$router.push("/jd/add");
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
      jdList().then(res=>{
        if(res.code==0){
          this.list = res.data
        }else {
          Toast.fail(res.msg);
        }
        this.isLoading = false;
      })
    },
    edit(id){
      this.$router.push({path: '/jd/edit', query: {id: id}});
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
      const that = this;
      jdSave(data).then(res=>{
        if(res.code==0){
          Toast.success("添加成功");
          this.show = false
        }else {
          Toast.fail(res.msg);
        }
        setTimeout(function () {
          that.queryList()
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
    editForm(){
      let ptKey = this.editDate.ptKey;
      let ptPin = this.editDate.ptPin;
      let id = this.editDate.id;
      jdEditSave({ptKey:ptKey,ptPin:ptPin,id:id}).then(res=>{
        if(res.code==0){
          Toast.success("修改成功");
          this.editShow = false
        }else {
          Toast.fail(res.msg);
        }
      })
    },
    cancel(){
      this.show = false
      this.editShow = false
    },

  },
};
</script>

<style>

</style>
