import axios from 'axios';
import wx from 'weixin-js-sdk';

let share = (shareData) => {
  console.log(shareData)
  let shareObj = {
    // 初始化分享
    initShare (arg) {
      let _this = this;
      this._wxReady().then(() => {
        // 朋友圈
        wx.onMenuShareTimeline({
          title: arg.title,
          desc: arg.desc,
          link: arg.link,
          imgUrl: arg.imgUrl,
          success: function(res) {
          },
        });
        // 朋友
        wx.onMenuShareAppMessage({
          title: arg.title,
          desc: arg.desc,
          link: arg.link,
          imgUrl: arg.imgUrl,
          success: function(res) {
          }
        });
        // qq
        wx.onMenuShareQQ({
          title: arg.title,
          desc: arg.desc,
          link: arg.link,
          imgUrl: arg.imgUrl,
          success: function(res) {
            // alert('已分享');
          },
          cancel: function(res) {
            // alert('已取消');
          }
        });
        // qq空间
        wx.onMenuShareQZone({
          title: arg.title,
          desc: arg.desc,
          link: arg.link,
          imgUrl: arg.imgUrl,
          success: function(res) {
            // alert('已分享');
          },
          cancel: function(res) {
            // alert('已取消');
          }
        });
      })
    },
    // 获取config
    _getConfig () {
      var _this = this;
      return new Promise(resolve => {
        axios({
          method: "post",
          url: 'https://tcmapi.emao.com/shop/wechat',
          params: {
            url: encodeURIComponent(window.location.href.split('#')[0])
          }
        })
        .then((response) => {
          let config = response.data.data;
          resolve(config)
        })
      })
    },
    // 注入config进入准备状态
    _wxReady () {
      return new Promise((resolve) => {
        this._getConfig().then((config) => {
          wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: config.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: config.timestamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature, // 必填，签名，见附录1
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareQZone'
            ]  
          });
          wx.ready(function() {
            resolve();
          });
        })
      })
    }
  }
  shareObj.initShare(shareData);
}

export default share;
