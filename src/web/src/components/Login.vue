<template>
  <div>
    <el-form :model="form" label-width="80px" class="login-box">
      <h3 class="login-title">登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginAction">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {login} from "./../service/getData"

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            loginAction() {
                if(this.form.username === "") {
                    this.$message({type: 'error', message: '请确认用户名'});
                }
                if(this.form.password === "") {
                    this.$message({type: 'error', message: '请确认密码'});
                }

                login(this.form.username, this.form.password).then(res => {
                    localStorage.setItem("BiliToken", res.data.token)
                    this.$router.push("/");
                }, error => {
                    _this.$message({type: 'error', message: '登录失败'});
                })
            }
        }
    }
</script>

<style scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
