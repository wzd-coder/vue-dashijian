<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box">
      </div>
      <!-- 注册的表单区域 -->
      <!-- model设置表单数据对象，rules设置规则对象 -->
      <el-form :model="regForm" :rules="regRules" ref="regRef" status-icon>
        <!-- 用户名 -->
        <!-- prop指定当前表单匹配的规则名称，是字符串 -->
        <el-form-item prop="username">
          <el-input prefix-icon ="el-icon-user" v-model="regForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon ="el-icon-lock" v-model="regForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="repassword">
          <el-input prefix-icon ="el-icon-lock" v-model="regForm.repassword" type="password" placeholder="请再次确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-reg" @click=reg>注册</el-button>
          <el-link type="info">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  data() {
    const checkPwd = (rule, value, callback) => {
      if (value !== this.regForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      // 注册表单的数据对象
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      // 注册表单的验证规则对象，先是非空验证
      regRules: {
        username: [
          { required: true, message: '请输入您的用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reg() {
      this.$refs.regRef.validate(async validate => {
        if (!validate) {
          return
        }
        const { data: res } = await this.$http.post('/api/reg', {
          username: this.regForm.username,
          password: this.regForm.password,
          repassword: this.regForm.repassword
        })
        if (res.code !== 0) this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/login')
      })
    }

  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    // 水平居中
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat
    }
    .btn-reg {
      width: 100%;
    }

   }

}
</style>
