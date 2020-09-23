<!--  -->
<template>
  <div id="findPassword">
    <el-form :model="formItem" :rules="rules" ref="formItem" label-width="100px" class="demo-ruleForm">
       <el-form-item label="用户名" prop="userName">
        <el-input v-model="formItem.userName"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="checkCode">
        <el-input type="text" v-model="formItem.checkCode" autocomplete="off"></el-input>
        <span v-html="code" @click="getCode"></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCode,forget} from '@/api/login'
const validatePass = (rule, value, callback) =>{
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if(!reg.test(value)) return callback(new Error('用户名邮箱格式不正确'))
  return callback()
}
export default {
  data () {
    return {
      formItem:{
        userName:'',
        checkCode: ''
      },
      code: '',
      rules:{
        userName: [
           { required: true, message: '请输入用户名', trigger: 'blur' },
           { validator: validatePass, trigger: 'change' }
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      }
    };
  },

  components: {},

  computed: {},
  methods: {
    getCode(){
      getCode().then(res => {
        this.code = res.msg
      })
    },
    submit(){
      forget({email:this.formItem.userName}).then(res => {
        console.log(res)
      })
    }
  },
  mounted(){
    this.getCode()
  },
}

</script>
<style scoped>
.el-input{
  width: 50%;
  float: left;
}
</style>