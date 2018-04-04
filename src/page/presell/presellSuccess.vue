<template>
    <div>
        <header class="user-tit declare-head">
            <span class="white-lt"></span>
            确认预定
        </header>

        <section class="car-reserved">提交成功，请等待财务审核，预计等待3小时</section>

        <section class="car-reserved-tips">
            本省经销商再订 <span>2</span> 台，即可包物流到 <span>石家庄</span>
        </section>

        <section class="car-reserved-share">
            <input type="text" name="分享到微信 邀请友商" value="分享到微信 邀请友商" />
        </section>
    </div>
</template>
<style>
    html{width:100%;background-color:#fff;}
    body{width:100%;height:100%;background-color:#fff;}
    .user-tit{font-weight:normal;}
    .user-tit .white-lt {  position: absolute;  left: 0.48rem;  top: 0.4rem;  }
    .car-reserved{height:1.333rem;font-size:.3467rem;color:#333;line-height:1.33rem;text-align:center;background-color:#f3e6cc;}
    .car-reserved-tips{margin-top:1.6rem;font-size:.3467rem;text-align:center;}
    .car-reserved-tips span{font-size:.48rem;font-weight:bold;}
    .car-reserved-share{position: fixed;  bottom: 2rem;  width: 100%;  text-align: center;}
    .car-reserved-share input{display: block;
        width: 6.666rem;
        height: 1.1733rem;
        margin: 5.447rem auto 0;
        color: white;
        font-size: .4533rem;
        line-height: 1.1733rem;
        text-align: center;
        background-color: #ff570f;
        border: 1px solid #ff570f;
        border-radius: .533rem;}
</style>