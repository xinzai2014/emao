<template>
    <div>
        <header class="user-tit declare-head">
            <span class="white-lt"></span>
            预定
        </header>

        <section class="car-info-wrap">
            <div class="car-parameter">
                <p class="car-name">2014款 经典版 1.6L 自由手动优 </p>
                <div class="car-price">
                    <p>
                        <span>预售价:</span>
                        <strong>328.59</strong>
                        <em>万</em>
                    </p>
                    <p>
                        <span>指导价：</span>
                        <em><i>333.39</i>万</em>
                    </p>
                </div>
                <div class="car-parameter-tips">定金 2000 元，未按时到达指定仓库，退回定金并赔付500 代金券</div>
            </div>
        </section>

        <section class="car-colour-vount">
            <p class="car-colour-title">选择外观/内饰颜色和数量</p>
            <ul>
                <li>
                    <p><span>黑色</span> / <span>米色</span> </p>
                    <p>库存： <span>5</span> 台</p>
                    <p><span>-</span> <span> <input type="text" name="" value="1"></span> <span>+</span> </p>
                </li>
                <li>
                    <p><span>黑色</span> / <span>米色</span> </p>
                    <p>库存： <span>5</span> 台</p>
                    <p><span>-</span> <span> <input type="text" name="" value="1"></span> <span>+</span> </p>
                </li>
                <li>
                    <p><span>黑色</span> / <span>米色</span> </p>
                    <p>库存： <span>5</span> 台</p>
                    <p><span>-</span> <span> <input type="text" name="" value="1"></span> <span>+</span> </p>
                </li>
            </ul>
        </section>


        <section class="car-account-wrap">
            <p class="car-account-title">请使用公司账户将定金转入以下账户：</p>
            <ul>
                <li>
                    <span>公司名称：</span>
                    <em>成都一猫电子商务有限公司</em>
                </li>
                <li>
                    <span>开户行：</span>
                    <em>中国银行股份有限公司成都天府大道支行</em>
                </li>
                <li>
                    <span>账号：</span>
                    <em>127993140154 </em>
                </li>
                <li>
                    <span>定金金额：</span>
                    <em>2,000.00</em>元
                </li>
            </ul>
            <p class="car-account-voucher">上传付款凭证</p>
            <div>
                上传图片组件
            </div>
            <p class="car-account-tips">注：使用个人账户打款，定金无法开具增值税专用发票</p>
        </section>


        <section class="car-warehouse-wrap">
            <p class="car-warehouse-title">选择提货仓</p>
            <ul>
                <li>
                    <i class= "weui-icon-success"></i>
                    <p>北京仓库</p>
                    <p>地址：北京市昌平区八达岭高速昌平南桥西侧 元龙产业园区8号  </p>
                </li>
                <li>
                    <i class= "weui-icon-success"></i>
                    <p>北京仓库</p>
                    <p>地址：北京市昌平区八达岭高速昌平南桥西侧 元龙产业园区8号  </p>
                </li>
                <li>
                    <i class= "weui-icon-success"></i>
                    <p>北京仓库</p>
                    <p>地址：北京市昌平区八达岭高速昌平南桥西侧 元龙产业园区8号  </p>
                </li>
            </ul>
            <div class="car-participation-wrap">
                <div class="car-participation">
                    <i class="weui-icon-checked"></i>
                    <p>参与活动：省内拼满12台， <span>石家庄</span> 提车</p>
                    <p>仓库地址：北京市昌平区八达岭高速昌平南桥西侧 元龙产业园区8号  </p>
                </div>
            </div>

        </section>

        <section class="car-reserve-btn">
            <input type="text" name="立即预定" value="立即预定" />
        </section>

    </div>
</template>


<style>
    .user-tit{font-weight:normal;}
    .user-tit .white-lt {  position: absolute;  left: 0.48rem;  top: 0.4rem;  }
    .car-info-wrap{padding:.53rem .4rem .4rem;  background-color:#fff; }
    .car-parameter .car-name{font-size:.4rem;font-weight:bold;color:#000;line-height:.9333rem;}
    .car-price{clear:both;overflow:hidden;}
    .car-price p{float:left;}
    .car-price p:nth-of-type(1) {margin-right:1.0667rem;color:#fc3036;font-size:.4rem;}
    .car-price p:nth-of-type(1) strong{font-size:.427rem;font-weight:bold;}
    .car-price p:nth-of-type(1) em{font-size:.32rem;}
    .car-price p:nth-of-type(2) {font-size:.32rem;color:#999;}
    .car-price p:nth-of-type(2) em{text-decoration:line-through;}
    .car-price p:nth-of-type(2) em i{color:#999;}
    .car-parameter-tips{margin-top:.32rem;color:#ff825c;font-size:.3467rem;}
    .car-colour-vount{margin-top:.2667rem;padding:.53rem .4rem .4rem;background-color:#fff;}
    .car-colour-vount .car-colour-title{font-size: .4rem; font-weight: bold;  color: #000;}
    .car-colour-vount ul{margin-top:.5333rem;}
    .car-colour-vount ul li{height:1.333rem;line-height:1.333rem;border-bottom:1px solid #e0e0e0;font-size:.3733rem;}
    .car-colour-vount ul li p:nth-of-type(1) {float:left;color:#000;}
    .car-colour-vount ul li p:nth-of-type(2) {float:left;margin-left:.6rem;color:#999;}
    .car-colour-vount ul li p:nth-of-type(3) {float:right;}
    .car-colour-vount ul li p:nth-of-type(3) span{color:#d5aa5c;font-size:.49rem;}
    .car-colour-vount ul li p:nth-of-type(3) input{display:inline-block;width:.6667rem;height:.667rem;color:#333;margin-left:.0667rem;margin-right:.0667rem;line-height:.667rem;text-align:center;border:1px solid #d5aa5c;border-radius:.0667rem;}
    .car-colour-vount ul li:last-child{border-bottom:none;}
    .car-account-wrap{margin-top:.4rem;padding:.53rem .4rem .4rem;background-color:#fff;}
    .car-account-title{font-size: .4rem; color: #000;}
    .car-account-wrap ul{margin-top:.333rem;padding:.333rem .333rem 0 .333rem;background-color:#fef9f1;}
    .car-account-wrap ul li{ margin-bottom:.333rem;font-size: .346rem;}
    .car-account-wrap ul li span{display:inline-block;width:1.7333rem;color: #999;}
    .car-account-wrap ul li em{color: #333;}
    .car-account-wrap ul li:last-child{color:#fc3036;}
    .car-account-wrap ul li:last-child span{color:#fc3036;}
    .car-account-wrap ul li:last-child em{color:#fc3036;}
    .car-account-voucher{margin-top:.4rem;margin-bottom:.4rem;}
    .car-account-tips{color:#fc3036;}
    .car-warehouse-wrap{margin-top:.4rem;margin-bottom:.4rem;padding:.53rem .4rem .4rem;background-color:#fff;}
    .car-warehouse-title{margin-bottom:.5333rem;font-size: .4rem; color: #000;}
    .car-warehouse-wrap ul{}
    .car-warehouse-wrap ul li{position:relative;margin-bottom:.4rem;  padding:.333rem .333rem .333rem 1.333rem;border:1px solid #e0e0e0;border-radius:.2667rem;}
    .car-warehouse-wrap ul li p:nth-of-type(1){margin-bottom:.2667rem;font-size:.3467rem;color: #000;}
    .car-warehouse-wrap ul li p:nth-of-type(2){font-size:.3467rem;color: #999;}
    .car-warehouse-wrap ul li i{position:absolute;top:.85rem;left:.5rem;}
    @font-face {
        font-weight: normal;
        font-style: normal;
        font-family: "weui";
        src: url('data:application/octet-stream;base64,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') format('truetype');
    }
    [class^="weui-icon-"], [class*=" weui-icon-"] {
        display: inline-block;
        vertical-align: middle;
        font: normal normal normal 14px/1 "weui";
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
    &:before{
         display: inline-block;
         margin-left: .2em;
         margin-right: .2em;
     }
    }
    .weui-check {
        position: absolute;
        left: -9999em;
    }
    .weui-check:checked + .weui-icon-checked:before {
        content: '\EA06';
        color: #F43530;
    }
    .weui-icon-checked:before {
        content: '\EA01';
        color: #C9C9C9;
        font-size: 0.54rem;
        display: block;
    }
    /*.weui-cell__hd {*/
        /*padding-right: 2em;*/
        /*float: left;*/
        /*display: inline-block;*/
        /*position: relative;*/
        /*top: 0.85rem;*/
        /*height: 2rem;*/
    /*}*/
    .weui-icon-success{
        font-size: 23px;
        color: red;
    }
    .weui-icon-success:before{
        content: "\EA06";
        font-size: 0.54rem;
    }
    .car-participation-wrap{margin-top:.4rem;padding-top:.4rem;border-top:1px dashed #d5aa5c;}
    .car-participation{position:relative;padding:.333rem .333rem .333rem 1.333rem;background-color:#fef9f1;}
    .car-participation i{position:absolute;top:.85rem;left:.5rem;}
    .car-participation p:nth-of-type(1){margin-bottom:.2667rem;color:#ff825c;}
    .car-participation p:nth-of-type(2){color:#999;}
    .car-reserve-btn{height:1.867rem;margin:0 auto;background-color:#fff;line-height:1.867rem;text-align:center;}
    .car-reserve-btn input{display:inline-block;width:6.667rem;height:1.1733rem;margin:0 auto;text-align:center;line-height:1.17333rem;font-size:.4rem;color:#fff;border:none;
        border-radius:.5867rem;background-color:#d5aa5c;}
</style>