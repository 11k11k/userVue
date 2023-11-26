<template>
  <div class="login">
    <van-nav-bar title="登录页" right-text="" left-arrow @click-left="$router.go(-1)"  />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPinCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{ this.second===this.totalSecond?"获取验证码" : this.second+"秒后重新获取" }}
          </button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>

import { getMsgCode, getPinCode, getLogin } from '@/api/login'

export default {
  name: 'LoginIndex',
  async created () {
    this.getPinCode()
  },
  data () {
    return {
      // 图形验证码
      picCode: '',
      picUrl: '',

      picKey: '',
      // 手机号
      mobile: '',
      // 短信验证码
      msgCode: '',
      // 秒数
      second: 60,
      // 总秒数
      totalSecond: 60,
      // 计数器
      timer: ''
    }
  },

  methods: {
    async getPinCode () {
      const { data: { base64, key } } = await getPinCode()
      this.picUrl = base64
      this.picKey = key
    },
    validFn () {
      const mobileVal = /^1[3-9]\d{9}$/
      const bicCodeVal = /^[0-9a-zA-Z]{4}$/
      if (!mobileVal.test(this.mobile)) {
        this.$toast('手机号格式错误')
        return false
      }
      if (!bicCodeVal.test(this.picCode)) {
        this.$toast('验证码格式错误')
        return false
      }
      return true
    },
    // 差个
    async getCode () {
      if (!this.validFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信发送成功')
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      const msgVal = /^\d{6}$/
      if (!msgVal.test(this.msgCode)) {
        return
      }
      const res = await getLogin(this.mobile, this.msgCode)
      this.$store.commit('user/getUserData', res.data)
      this.$toast('登录成功')

      // 进行判断，看地址栏有无跳回地址
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }

  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
