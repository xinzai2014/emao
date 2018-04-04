<template>
    <div>
        <header class="user-tit declare-head">
            <span class="white-lt"></span>
            我的预售
        </header>
        <section class="car-reserve-list">
            <ul class="car-reserve-con">
                <li class="car-reserve-txt">
                    <p class="car-reserve-state">等待财务审核，需等待3个小时</p>
                    <div class="car-presell-in">
                        <p class="car-presell-name">奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</p>
                         <ul class="car-presell-facade">
                          <li>
                              <p><span>闪光黑</span>/<span>黑色内饰</span></p>
                              <p>X <span>1</span></p>
                          </li>
                          <li>
                              <p><span>闪光黑</span>/<span>黑色内饰</span></p>
                              <p>X <span>1</span></p>
                          </li>
                      </ul>
                    </div>
                </li>
                <li class="car-reserve-txt">
                    <p class="car-reserve-state">等待财务审核，需等待3个小时</p>
                    <div class="car-presell-in">
                        <p class="car-presell-name">奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</p>
                        <ul class="car-presell-facade">
                            <li>
                                <p><span>闪光黑</span>/<span>黑色内饰</span></p>
                                <p>X <span>1</span></p>
                            </li>
                            <li>
                                <p><span>闪光黑</span>/<span>黑色内饰</span></p>
                                <p>X <span>1</span></p>
                            </li>
                        </ul>
                        <div class="car-presell-aigin-wrap">
                            <input class="car-presell-aigin" type="button" name="重新预定" value="重新预定">
                        </div>
                    </div>
                </li>
                <li class="car-reserve-txt">
                    <p class="car-reserve-state">等待财务审核，需等待3个小时</p>
                    <div class="car-presell-in">
                        <p class="car-presell-name">奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</p>
                        <ul class="car-presell-facade">
                            <li>
                                <p><span>闪光黑</span>/<span>黑色内饰</span></p>
                                <p>X <span>1</span></p>
                            </li>
                            <li>
                                <p><span>闪光黑</span>/<span>黑色内饰</span></p>
                                <p>X <span>1</span></p>
                            </li>
                        </ul>
                        <div class="car-presell-aigin-wrap">
                            <input class="car-presell-aigin" type="button" name="重新预定" value="重新预定">
                        </div>

                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>
<style>
    .user-tit{font-weight:normal;}
    .user-tit .white-lt {  position: absolute;  left: 0.48rem;  top: 0.4rem;  }
    .car-reserve-list{}
    .car-reserve-list{} .car-reserve-con .car-reserve-txt{margin-bottom:.4rem;padding:.4rem;background-color:#fff;}
    .car-reserve-state{margin-bottom:.4rem;color:#fc3036;font-size:.3467rem;}
    .car-presell-in{padding-top:.4rem;border-top:1px solid #e0e0e0;}
    .car-presell-name{line-height:.6rem;font-size:.4rem;font-weight:bold;color:#000;}
    .car-presell-facade{}
    .car-presell-facade li{clear:both;overflow:hidden;font-size:.32rem;color:#999;}
    .car-presell-facade li p{line-height:.6rem;}
    .car-presell-facade li p:nth-of-type(1){float:left;}
    .car-presell-facade li p:nth-of-type(2){float:right;}
    .car-presell-aigin-wrap{text-align:right;}
    .car-presell-aigin{display:inline-block;width:2.4rem;height:.8rem;margin-top:.4rem;border:none;border-radius:.4rem;font-size:.373rem;color:#fff;background-color:#d6ab55;}
</style>