
export default {
  data () {
    return {
      title: '标题'
    }
  },
  methods: {
    sayHi () {
      console.log('nihao')
    },
    loginConfirm () {
      if (!this.$store.getters.getToken) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要登录',
          confirmButtonText: '爷去也'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return false
      }
      return true
    }
  }
}
