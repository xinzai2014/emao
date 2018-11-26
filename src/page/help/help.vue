<template>
    <div class="help">
        <div class="item">
            <h2>1.如何添加库存?</h2>
            <p>选择要录入车辆的品牌车型。</p>
            <p>录入车架号。车架号可以通过扫码前挡风的车架号快速识别录入。</p>
            <p>保存即可。</p>
            <img src="./images/t1.jpg">
        </div>
        <div class="item">
            <h2>2.如何变更车辆状态?</h2>
            <p>入口1：在车辆列表中对应每辆车都有快速操作入口。</p>
            <img src="./images/t2.jpg">
            <img src="./images/t3.jpg">
            <p>入口2：在车辆详情下方有对应的操作入口。</p>
            <img src="./images/t4.jpg" alt="">
            <p>入口3：选择好状态进行保存即可。</p>
            <img src="./images/t5.jpg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: 'help',
    beforeCreate: function() {
        document.title = '帮助'
    }
}
</script>
<style scoped>
    .help {
        padding-top: .426667rem;
    }
    .item {
        background: #fff;
        padding: 0 .586667rem;
        margin-bottom: .426667rem;
    }
    .item:last-child {
        margin-bottom: 0;
    }
    .item h2 {
        padding: .426667rem 0;
        font-size: .48rem;
        font-weight: bold;
    }
    p {
        font-size: .373333rem;
        color: #2c2c2c;
        margin-bottom: .266667rem;
        padding-left: .96rem;
        background: url(images/dot.png) no-repeat .48rem .16rem;    
    }
    img {
        width: 100%;
        margin-bottom: .426667rem;
    }
</style>

