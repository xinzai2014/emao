<template>
    <div class="mask-loader">
    	<div class="loader-box">
    		<div class="loader-circle">
    			<p class="circle-box"></p>
    		</div>
    		<div class="loader">
    			<div class="element-animation"></div>
    		</div>
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
    background:rgba(0,0,0,0.7);
    z-index:100;
}
.loader-box{
    position: fixed;
    left:50%;
    top:50%;
    margin-left:-0.8rem;
    margin-top:-0.666667rem;
}
@supports (animation:animationFrames linear 2s){
    .loader-box{
        width: 1.613333rem;
        height: 1.573333rem;
    }
    .loader{
        position: absolute;
        top: 0.093333rem;
        left: 0.133333rem;
        width:1.333333rem;
        height:1.36rem;
        overflow:hidden;
        display:block;
        -moz-border-radius:100%;
        -webkit-border-radius:100%;
        border-radius:100%;
        margin:0 auto;
        z-index:1;
    }
    .element-animation{
        margin-top: 0.333333rem;
        animation:animationFrames linear 2s;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards; /*when the spec is finished*/
        -webkit-animation: animationFrames linear 2s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-fill-mode:forwards; /*Chrome 16+, Safari 4+*/
        -moz-animation: animationFrames linear 2s;
        -moz-animation-iteration-count: infinite;
        -moz-animation-fill-mode:forwards; /*FF 5+*/
        -o-animation: animationFrames linear 2s;
        -o-animation-iteration-count: infinite;
        -o-animation-fill-mode:forwards; /*Not implemented yet*/
        -ms-animation: animationFrames linear 2s;
        -ms-animation-iteration-count: infinite;
        -ms-animation-fill-mode:forwards; /*IE 10+*/
        width: 13.333333rem;
        height: 0.666667rem;
        background: url(../../../assets/loading.png) no-repeat;
		background-size:contain;
    }
    .loader-circle {
        position: relative;
        margin: 0 auto;
        width: 1.333333rem;
        height: 1.346667rem;
        border: 0.106667rem solid;
        border-top-color: hsl(154,100%,31%);
        border-left-color: hsl(216,87%,52%);
        border-bottom-color: hsl(8,66%,50%);
        border-right-color: hsl(42,100%,51%);
        border-radius: 50%;
        transform: rotate(45deg);
    }
    .circle-box {
        position: absolute;
        top: 0.213333rem;
        left: 0;
        display: inline-block;
        width: 1.426667rem;
        height: 1.426667rem;
        /* The background is used to specify the border background */
        background: linear-gradient(90deg, hsla(212,67%,36%,0) 0%,
        hsla(207,69%,51%,0) 76%,
        hsla(0,0%,100%,1) 85%,
        hsla(0,0%,100%,1) 100%); /* W3C */
        /* Background origin is the padding box by default.
        Override to make the background cover the border as well. */
        -moz-background-origin: border;
        background-origin: border-box;
        /* A transparent border determines the width */
        border: 0.08rem solid transparent;
        border-radius: 50%;
        box-shadow: inset -999px 0 0; /* The background color */
        transform: translate(-0.106667rem, 0.733333rem);
        animation: loading 1s linear infinite;
    }
}


@keyframes animationFrames{
    0% {
        transform: translate(-11.28rem,0.2rem)  ;
    }
    100% {
        transform: translate(0px,0.2rem)  ;
    }
}

@-moz-keyframes animationFrames{
    0% {
        transform: translate(-15.466667rem,0.2rem)  ;
    }
    100% {
        transform: translate(0px,0.2rem)  ;
    }
}

@-webkit-keyframes animationFrames {
    0% {
        transform: translate(-15.466667rem,0.2rem)  ;
    }
    100% {
        transform: translate(0px,0.2rem)  ;
    }
}

@-o-keyframes animationFrames {
    0% {
        transform: translate(-15.466667rem,0.2rem)  ;
    }
    100% {
        transform: translate(-0px,0.2rem)  ;
    }
}

@-ms-keyframes animationFrames {
    0% {
        transform: translate(-15.466667rem,0.2rem)  ;
    }
    100% {
        transform: translate(0px,0.2rem)  ;
    }
}

@keyframes loading {
    0% { transform: translate(-0.12rem, -0.333333rem) rotate(0deg); }
    100% { transform: translate(-0.12rem, -0.333333rem) rotate(360deg); }
}
@-webkit-keyframes loading {
    0% { transform: translate(-0.12rem, -0.333333rem) rotate(0deg); }
    100% { transform: translate(-0.12rem, -0.333333rem) rotate(360deg); }
}
@-moz-keyframes loading {
    0% { transform: translate(-0.12rem, -0.333333rem) rotate(0deg); }
    100% { transform: translate(-0.12rem, -0.333333rem) rotate(360deg); }
}
@-o-keyframes loading {
    0% { transform: translate(-0.12rem, -0.333333rem) rotate(0deg); }
    100% { transform: translate(-0.12rem, -0.333333rem) rotate(360deg); }
}
@-ms-keyframes loading {
    0% { transform: translate(-0.12rem, -0.333333rem) rotate(0deg); }
    100% { transform: translate(-0.12rem, -0.333333rem) rotate(360deg); }
}
</style>