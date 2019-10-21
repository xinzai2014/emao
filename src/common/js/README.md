## countdown(倒计时)

#### 使用

### 时间格式要求'2018/12/02 12:25:13'不然IOS报Invalid Date 不能是'2018-12-02 12:25:13'


1. 引入
    
    ```javascript
    import {timeCountdown, numberCountdown} from '../../common/js/countdown.js';
    ```

2. 时间倒计时    
    
    ```javascript
    // timeCountDown

    // 如果startTime和endTime不同则是一个活动倒计时；如果相同，则是一个普通时间倒计时，这是返回结果只有start和end状态
    let startTime = new Date('2018-06-01 00:00:00');
    let endTime = new Date('2018-06-03 00:00:00');
    let type = 'double'; 

    timeCountdown({startTime, endTime, type}, update => {
      // 倒计时更新触发的操作写在这里
      console.log(update);
    }, end => {
      // 倒计时结束触发的操作写在这里
      console.log(end);
    })
    ```
    - 传入的参数必须是一个对象，上面的写法是ES6的简写方式
    - startTime (Date) 活动开始时间
    - endTime (Date) 活动结束时间
    - type (String)类型
      - double 输出状态值和时间值，例如['ing', '09', '09', '23', '01']
      - single 输出状态值和时间值，并将每个时间值拆分为两个数值，例如['ing', '0', '9', '0', '9', '2', '3', '0', '1']
    - 返回的数据类型是Array，update的内容是['ing', '09', '09', '23', '01']，end的内容是['end', 0]
    - 返回数据的第一个值是倒计时状态
      - start (String) 活动未开始
      - ing (String) 活动进行中
      - end (String) 活动已结束

    
3. 数字倒计时
    
    ```javascript
    // numberCountdown
    const startNum = 60
    numberCountdown(startNum, update => {
      // 
      console.log(update);
    }, end => {
      console.log(end);
    })
    ```
    - 返回的数据类型是Array，update的内容是['ing', 15]，end的内容是['end', 0]
    - 返回数据的第一个值是倒计时状态
      - ing (String) 倒计时进行中
      - end (String) 倒计时已结束
    - startNum (String) 倒计时开始数值

#### 备注
  - 无

#### 修改意见
  - 无 

## shareOnly(分享)

## 使用
1. 引入
    
    ```javascript
    import {timeCountdown, numberCountdown} from '../../common/js/shareOnly.js';

    const shareData = {
      title: shareInfo.shareText,
      desc: shareInfo.shareDescription,
      link: shareInfo.shareUrl,
      imgUrl: shareInfo.shareImg
    };

    share(shareData);
    ```
