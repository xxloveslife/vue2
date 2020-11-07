<template>
<div class="login">
  <div class="box">
    <span>使用账号 登录官网</span>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="user">
        <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import { setStore, getStore, removeStore } from "@/utils/storage";
export default {
  name: "",
  data() {
    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {

      ruleForm: {
        user: '',
        pass: '',
      },
      rules: {
        user: [{
          validator: validateUser,
          trigger: 'blur'
        }],
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      // element表单自带的validate校验器,回调函数
      this.$refs[formName].validate(async value => {
        if (value) {
          //传给后端,对象{ruleForm},获得返回信息,已经token
          // 拿到token,做数据持久化
          let res = await this.$http.post('/api/login',this.ruleForm)
          if (res.data.code===200){
            let {username, token, id } = res.data;
            // 做数据持久化
            setStore('token',token)
            setStore('id',id)

          // 没有做后端处理,所以使用下假的数据
          // let token = 'xxloveslife';
          // let id = 12345;
          // setStore('token',token);
          // setStore('id',id);
          // 跳转

        }else {
          console.log("submit error");
        }
      }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.login {
    position: relative;
    overflow: visible;
    background: #ededed;
    .box {
        width: 450px;
        border: 1px solid #dadada;
        border-radius: 10px;
        position: absolute;
        top: 200px;
        left: 50%;
        padding: 50px 50px 50px 10px;
        margin-left: -225px;
        box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2), 0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 10px 20px -10px rgba(0, 0, 0, 0.04);
        text-align: center;
        form {
            margin-top: 30px;
        }
        span {
            color: #333;
            font-weight: 400;
        }
    }
}
</style>
