<template>
    <div class="mask-loader">
    	<p class="loading-icon"><img src="../../../assets/loading.gif"></p>
    </div>
</template>
<style>
/*Loading*/
.mask-loader{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:999;
}
.loading-icon{
    width:0.43rem;
    height:0.43rem;
    position:absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    margin:auto;
}
.loading-icon img{
    width:100%;
    height:100%;
}
.mask-loader *{
    box-sizing:content-box;
}
</style>