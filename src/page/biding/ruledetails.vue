<template>
    <div id="ruledetails">
        <div class="list_item">
            <p class="item_title">1.保证金的缴纳</p>
            <div class="item_cont">保证金是竞拍人参加竞拍的凭证，如用户有意参加相关商品竞拍活动，则须缴纳参与竞拍活动的保证金。缴纳次数：如参加竞拍，每个商品的竞拍只需要缴纳一次保证金；</div>
        </div>
        <div class="list_item">
            <p class="item_title">2.保证金的返还</p>
            <div class="item_cont">在符合以下条件时将原路退还用户保证金：1.用户未成功竞拍商品：例如在竞拍过程中始终未出价、在竞拍过程中放弃加价等情况；2.竞拍成功，确认提车后系统会在1-8个工作日内将款项退还到支付账号中。3.未获拍，竞拍结束后系统会自动在1-8个工作日内将款项退还到支付账号中，如您缴纳的竞拍保证金符合退还条件，但是系统未予退还，您可以联系客服<span>400-825-2368</span>我们会尽快帮您处理。</div>
        </div>
        <div class="list_item">
            <p class="item_title">3.保证金的扣除</p>
            <div class="item_cont">1.在竞拍成功之时起的3天内未按照成交价格支付商品货款的。2.在竞拍成功且提交汇款凭证后，竞拍人申请退款。</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ruledetails',
    data () {
        return {

        }
    },
    created(){
        document.title="保证金细则"
    }
}
</script>

<style scoped>
#ruledetails {
    box-sizing: border-box;
    padding: 0.4rem;
}
.list_item {
    padding-bottom: 0.16rem;
}
.list_item .item_title {
    line-height: 0.8rem;
    font-size: 0.4rem;
    font-weight: bold;
}
.list_item .item_cont {
    font-size: 0.34rem;
    line-height: 0.64rem;
}
</style>
