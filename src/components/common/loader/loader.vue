<template>
    <div class="mask-loader">
    	<!-- <p class="loading-icon"><img src="../../../assets/loading.gif"></p> -->
        <div class="la-ball-triangle-path la-2x">
            <div></div>
            <div></div>
            <div></div>
        </div>
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
    width:1rem;
    height:1rem;
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

.la-ball-triangle-path{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  -webkit-box-sizing:border-box;
  -moz-box-sizing:border-box;
  box-sizing:border-box
}
.la-ball-triangle-path{
  display:block;font-size:0;color:rgb(204, 204, 204)
}
.la-ball-triangle-path.la-dark{
  color:#333
}
.la-ball-triangle-path>div{
  display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor
}
.la-ball-triangle-path{
  width: .42667rem;
  height: .42667rem
}
.la-ball-triangle-path>div{
  position:absolute;top:0;left:0;width: .13333rem;height:.13333rem;border-radius:100%
}
.la-ball-triangle-path>div:nth-child(1){
  -webkit-animation:ball-triangle-path-ball-one 2s 0s ease-in-out infinite;
  animation:ball-triangle-path-ball-one 2s 0s ease-in-out infinite
}
.la-ball-triangle-path>div:nth-child(2){
  -webkit-animation:ball-triangle-path-ball-two 2s 0s ease-in-out infinite;
  animation:ball-triangle-path-ball-two 2s 0s ease-in-out infinite
}
.la-ball-triangle-path>div:nth-child(3){
  -webkit-animation:ball-triangle-path-ball-three 2s 0s ease-in-out infinite;
  animation:ball-triangle-path-ball-three 2s 0s ease-in-out infinite
  }
.la-ball-triangle-path.la-sm{
    width:.21333rem;
    height:.21333rem
}
.la-ball-triangle-path.la-sm>div{
    width:.05333rem;
    height:.05333rem
}
.la-ball-triangle-path.la-2x{width:.85333rem;height:.85333rem}
.la-ball-triangle-path.la-2x>div{width:.24rem;height:.24rem}
@keyframes ball-triangle-path-ball-one{
    0%{-webkit-transform:translate(0, 0);transform:translate(0, 0)}
    66%{-webkit-transform:translate(220%, 0);transform:translate(220%, 0)}
    33%{-webkit-transform:translate(110%, 220%);transform:translate(110%, 220%)}
    100%{-webkit-transform:translate(0, 0);transform:translate(0, 0)}}
@keyframes ball-triangle-path-ball-two{
    0%{-webkit-transform:translate(220%, 0);transform:translate(220%, 0)}
    66%{-webkit-transform:translate(110%, 220%);transform:translate(110%, 220%)}
    33%{-webkit-transform:translate(0, 0);transform:translate(0, 0)}
    100%{-webkit-transform:translate(220%, 0);transform:translate(220%, 0)}}
@keyframes ball-triangle-path-ball-three{
  0%{-webkit-transform:translate(110%, 220%);transform:translate(110%, 220%)}
  66%{-webkit-transform:translate(0, 0);transform:translate(0, 0)}
  33%{-webkit-transform:translate(220%, 0);transform:translate(220%, 0)}
  100%{-webkit-transform:translate(110%, 220%);transform:translate(110%, 220%)}
}

</style>