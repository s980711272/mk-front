<!--  -->
<template>
  <div id="loginComp">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="form.passWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="checkCode">
        <el-input type="text" v-model="form.checkCode" autocomplete="off"></el-input>
        <span v-html="code" @click="getCode"></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <span @click="changeFindPassWd">忘记密码?</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCode} from '@/api/login'
const validatePass = (rule, value, callback) =>{
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if(!reg.test(value)) return callback(new Error('用户名邮箱格式不正确'))
  return callback()
}
export default {
  data () {
    return {
      validatePass,
      code: '',
      rules:{
        userName: [
           { required: true, message: '请输入用户名', trigger: 'blur' },
           { validator: validatePass, trigger: 'change' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      form:{
        userName: '',
        passWord: '',
        checkCode: ''
      }
    };
  },

  components: {},

  computed: {},

  mounted(){
    this.getCode()
  },

  methods: {
    submit(){

    },
    changeFindPassWd(){
      this.$emit('changePage')
    },
    getCode(){
      getCode().then(res => {
        this.code = res.msg
      })
    }
  }
}

</script>
<style scoped>
.el-input{
  width: 50%;
  float: left;
}
</style>