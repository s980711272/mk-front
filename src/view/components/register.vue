<!--  -->
<template>
  <div id="loginComp">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="aliasName">
        <el-input type="text" v-model="form.aliasName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="form.passWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPasswd">
        <el-input type="password" v-model="form.confirmPasswd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="checkCode">
        <el-input type="text" v-model="form.checkCode" autocomplete="off"></el-input>
        <span v-html="code" @click="getCode"></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCode} from '@/api/login'
const validateUser = (rule, value, callback) =>{
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if(!reg.test(value)) return callback(new Error('用户名邮箱格式不正确'))
  return callback()
}

export default {
  data () {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.form.passWord) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    };
    return {
      validateUser,
      code: '',
      rules:{
        userName: [
           { required: true, message: '请输入用户名', trigger: 'blur' },
           { validator: validateUser, trigger: 'change' }
        ],
        aliasName:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max:6, message: '最多输入6个字符', trigger: 'blur' },
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        confirmPasswd:[
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      form:{
        userName: '',
        aliasName: '',
        passWord: '',
        confirmPassword:'',
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