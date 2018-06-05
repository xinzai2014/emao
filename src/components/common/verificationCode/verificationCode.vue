<template>
  <div class="getCode" :style="styleObj" @click="getCode" :class="{'sended': hasSendCode}">{{getCodeText}}</div>
</template>

<script>
  import {numberCountdown} from '../../../common/js/countdown.js';

  export default {
    data () {
      return {
        // 是否已经发送验证码
        hasSendCode: false,
        // 获取验证码
        getCodeText: '获取验证码'
      }
    },
    props: {
      // 倒计时时间
      time: {
        type: Number,
        default: 60
      },
      // 请求参数
      options: {
        type: Object,
        default: () => ({
          url: '',
          params: null
        })
      },
      // 按钮初始样式
      initStyleObj: {
        type: Object,
        default: () => ({
          background: '#d5aa5c',
          textAlign: 'center',
          lineHeight: '1.17333rem',
          color: '#fff'
        })
      },
      // 验证码发送后的样式
      activeStyleObj: {
        type: Object,
        default: () => ({
          background: '#e6e6e6',
        })
      }
    },
    computed: {
      // 按钮样式
      styleObj () {
        if (!this.hasSendCode) {
          return this.initStyleObj
        } else {
          return Object.assign({}, this.initStyleObj, this.activeStyleObj)
        }
      }
    },
    methods: {
       // 点击获取验证码
      getCode () {
        let _this = this;
        if (this.hasSendCode) { return; }
        if (this.options.params.phone == '') {
          _this.setStoreAlert("请填写正确的电话号码！")
          return
        }
        if (!/^\d{11}$/g.test(this.options.params.phone)) {
          _this.setStoreAlert("电话号码为11位数字!")
          return
        }
        
        this.$axios({
          url: this.options.url,
          type: 'GET',
          params: this.options.params
        })
        .then((res) => {
          _this.setStoreAlert("短信发送成功，请稍等！")
          
          numberCountdown(_this.time, update => {
            _this.getCodeText = `${update[1]}s后重新获取`;
            _this.hasSendCode = true;
          }, end => {
            _this.getCodeText = '获取验证码';
            _this.hasSendCode = false;
          })
        })
        .catch((err) => {
          _this.setStoreAlert("短信发送失败！")
        })
      },
      setStoreAlert (content) {
        this.$store.dispatch("ALERT", {
          flag: true,
          text: content
        })
      }
    }
  }
</script>

<style scoped>
.sended {background: #e6e6e6; border: 1px solid #e6e6e6;}
</style>
