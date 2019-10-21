<template>
  <div>test</div>
</template>
<script>
  export default {
    created () {
      if (!this.$route.query.code) {
        const url = encodeURIComponent(location.href);
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      }
      console.log(this.$route.query.code)
    }
  }
</script>
