<template>
  <div>
    <div style="text-align: center">
      <h2>只有想不到，没有做不到</h2>
      <h5 style="color: orange">可用积分：{{user.integralTitle}}</h5>
    </div>
    <div style="padding: 0 20px;">
      <van-grid :column-num="3" icon-size="50px">
        <van-grid-item icon="https://txc.gtimg.com/data/286658/2020/1216/ebcddfd97a79150722875469e1c435a5.png" to="/sport/index" text="运动步数" />
        <van-grid-item icon="https://txc.gtimg.com/data/286658/2021/0303/8f65680b77c0a04c427dd0455e4f8cfa.png" to="/jd/index" text="京东豆豆" />
        <van-grid-item icon="https://txc.gtimg.com/data/286658/2020/1219/64aa5aae29b6033b59cacea4a91c7229.png" to="/music/index" text="网抑云" />
      </van-grid>
    </div>

    <TabbarHtml v-bind:active=0 ></TabbarHtml>
  </div>
</template>

<script>
import {queryUser} from '@/util/sport'
import  TabbarHtml  from '@/views/bottom.vue';
export default {
  components:{
    'TabbarHtml':TabbarHtml
  },
  data() {
    return {
      user:{},
    };
  },
  mounted(){
    this.queryUser();
  },
  methods:{
    queryUser(){
      queryUser().then(res=>{
        if(res.code==0){
          this.user = res.data
        }
      })
    }
  },
};
</script>

<style>

</style>
