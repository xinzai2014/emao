class Countdown {
  constructor () {
    this.time = this.time.bind(this)
    // this.number = this.time.bind(this)
    // this.padStart = this.padStart.bind(this)
  }
  // 时间倒计时
  time (arg, update, end) {
    let _this = this;
    if (!arg.startTime) {
      console.error('arguments error:', 'startTime is not defined!');
      return;
    }
    if (!(arg.startTime instanceof Date)) {
      console.error('arguments error:', 'the type of startTime is "Date"');
      return;
    }
    if (!arg.endTime) {
      console.error('arguments error:', 'endTime is not defined!');
      return;
    }
    if (!(arg.endTime instanceof Date)) {
      console.error('arguments error:', 'the type of endTime is "Date"');
      return;
    }
    let startTime = arg.startTime.getTime();
    let endTime = arg.endTime.getTime();
    let type = arg.type || 'double';
    const nowTime = new Date().getTime();
    alert(startTime)
    alert(endTime+'结束');
    if (endTime < startTime) {
      console.error('arguments error:', 'the "endTime" is should later than "startTime"');
      return;
    }
    let returnContent = [];
    const state = (nowTime > startTime && nowTime <= endTime) ? 'ing' : nowTime <= startTime ? 'start' : 'end';
    returnContent.push(state);
    if (state === 'end') {
      if (type === 'double') {
        end([state, '00', '00', '00', '00']);
      } else {
        end([state, '0', '0', '0', '0', '0', '0', '0', '0',]);
      }
      
      if (timeTimer) {
        clearInterval(timeTimer);
      }
      return;
    }
    const timeLength = state === 'start' ? startTime - nowTime : state === 'ing' ? endTime - nowTime : 0;

    const px_d = 1000 * 60 * 60 *24;
    const px_h = 1000 * 60 * 60;
    const px_m = 1000 * 60;
    const px_s = 1000;
    let d = Math.floor(timeLength / px_d);
    let h = Math.floor((timeLength - px_d * d) / px_h);
    let m = Math.floor((timeLength - px_d * d - px_h * h) / px_m);
    let s = Math.floor((timeLength - px_d * d - px_h * h - px_m * m) / px_s);
    let timeArr = []
    if (type === 'single') {
      timeArr = [
        _this.padStart(d)[0],
        _this.padStart(d)[1],
        _this.padStart(h)[0],
        _this.padStart(h)[1],
        _this.padStart(m)[0],
        _this.padStart(m)[1],
        _this.padStart(s)[0],
        _this.padStart(s)[1]
      ];
    } else if (type === 'double') {
      timeArr = [
        _this.padStart(d),
        _this.padStart(h),
        _this.padStart(m),
        _this.padStart(s)
      ];
    }
    returnContent = returnContent.concat(timeArr)
    update(returnContent);
    let timeTimer = setTimeout(() => {_this.time(arg, update, end)}, 10000)
  }
  
  // 数字倒计时
  number (num, update, end) {
    if (!num) {
      console.error('arguments error:', '"num" is must, and type is Number');
      return;
    }
    if (typeof num !== 'number') {
      console.error('arguments error:', 'The arguments[0] type should be number');
      return;
    }
    let startNum = num;
    let state = '';
    if (startNum < 1) {
      state = 'end';
      end([state, 0]);
      return;
    }
    state = 'ing'
    let numTimer = setInterval(() => {
      if (startNum === -1) {
        clearInterval(numTimer);
        state = 'end';
        end([state, 0]);
        return;
      }
      update([state, startNum--]);
    }, 1000);
  }

  // 补位
  padStart (num) {
    return num < 10 ? '0' + num : '' + num
  }
}

let countdown = new Countdown();
export const timeCountdown = countdown.time;
export const numberCountdown = countdown.number; 