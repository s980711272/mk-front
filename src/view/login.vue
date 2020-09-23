<!--  -->
<template>
  <div id="login">
    <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录" name="login">
            <login @changePage="changeRegister"></login>
          </el-tab-pane>
          <el-tab-pane :label="type == 'register' ? '注册' : '找回密码' " name="register">
            <register v-if="type == 'register'"></register>
            <find-passwd v-else></find-passwd>
          </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import login from './components/login'
import register from './components/register'
import findPasswd from './components/find-password'
export default {
  name:'app',
  components:{
    login,register,findPasswd
  },
  data () {
    return {
      activeName:'login',
      type: 'register'
    };
  },
  mounted(){
    this.getCapture()
  },
  methods: {
    getCapture(){
      axios.get("http://localhost:3000/getCaptcha").then(res=>{
        this.verCode = res.data.msg;
      })
    },
    handleClick(name){
      console.log(name)
    },
    changeRegister(){
      this.type = "find"
      this.activeName = 'register'
    }
  }
}

</script>
<style scoped>
.box-card {
    width: 600px;
    margin-left: calc(50% - 300px);
}
</style>