## verificationCode(发送短信验证码组件)

#### 使用

1. 引入

    ```javascript
    import VerificationCode from '../../components/common/verificationCode/verificationCode.vue'; 
    ```
    
2. 使用 
   
    ```html
    <verification-code
      :time = "60"
      :options="{
        url: '/withoutAuth/message/verify',
        params: codeParams
      }"
      :initStyleObj="{
        background: '#d5aa5c',
        textAlign: 'center',
        lineHeight: '1.17333rem',
        color: '#fff'
      }"
      :activeStyleObj="{
        background: '#e6e6e6d',
      }"></verification-code> 
    ```
    - time (Number) 再次发送短信的时间间隔
    - options (Object) 接口信息
      - url (String) 接口地址
      - params (Object) 接口需要的params
    - initStyleObj (Object) 按钮初始样式，格式是VUE的style义属性的格式
    - activeStyleObj (Object) 验证码发送后的样式，格式是VUE的style义属性的格式

#### 备注
  - 无

#### 修改意见
  - 无