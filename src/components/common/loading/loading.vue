<template>
	<div class="center">
		<div class="loaders">
		    <div class="loader-inner pacman">
		      <div></div>
		      <div></div>
		      <div></div>
		      <div></div>
		      <div></div>
		    </div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'loading',
		data () {
		    return {
		     
		    }
		},
		methods:{
		    
	    },
	    mounted(){
	    	this.$http({
	            url:"passport/key/notApp",
	            method:"GET"
	        }).then(function (response) {
	            sessionStorage.dataToken = response.body.data.dataToken;
	            this.$router.push('/login/account'); //路由跳转
	          }).catch(function (error) {
	          	console.log(error);
	            console.log("登录失败了");
	          });
	  	}
	}

</script>

<style>

.center{
	position:fixed;
	top:50%;
	left:50%;
	transform:translateX(-50%) translateY(-50%);
}
.loaders{
      box-sizing: border-box;
      display: flex;
      flex: 0 1 auto;
      flex-direction: column;
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 25%;
      max-width: 25%;
      height: 200px;
      align-items: center;
      justify-content: center; }



@-webkit-keyframes rotate_pacman_half_up {
  0% {
    -webkit-transform: rotate(270deg);
            transform: rotate(270deg); }

  50% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); }

  100% {
    -webkit-transform: rotate(270deg);
            transform: rotate(270deg); } }

@keyframes rotate_pacman_half_up {
  0% {
    -webkit-transform: rotate(270deg);
            transform: rotate(270deg); }

  50% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); }

  100% {
    -webkit-transform: rotate(270deg);
            transform: rotate(270deg); } }

@-webkit-keyframes rotate_pacman_half_down {
  0% {
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg); }

  50% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }

  100% {
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg); } }

@keyframes rotate_pacman_half_down {
  0% {
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg); }

  50% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }

  100% {
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg); } }

@-webkit-keyframes pacman-balls {
  75% {
    opacity: 0.7; }

  100% {
    -webkit-transform: translate(-3rem, -6.25px);
            transform: translate(-3rem, -6.25px); } }

@keyframes pacman-balls {
  75% {
    opacity: 0.7; }

  100% {
    -webkit-transform: translate(-3rem, -6.25px);
            transform: translate(-3rem, -6.25px); } }

.pacman {
  position: relative; }
  .pacman > div:nth-child(2) {
    -webkit-animation: pacman-balls 1s 0s infinite linear;
            animation: pacman-balls 1s 0s infinite linear; }
  .pacman > div:nth-child(3) {
    -webkit-animation: pacman-balls 1s 0.33s infinite linear;
            animation: pacman-balls 1s 0.33s infinite linear; }
  .pacman > div:nth-child(4) {
    -webkit-animation: pacman-balls 1s 0.66s infinite linear;
            animation: pacman-balls 1s 0.66s infinite linear; }
  .pacman > div:nth-child(5) {
    -webkit-animation: pacman-balls 1s 0.99s infinite linear;
            animation: pacman-balls 1s 0.99s infinite linear; }
  .pacman > div:first-of-type {
    width: 0px;
    height: 0px;
    border-right: 0.75rem solid transparent;
    border-top: 0.75rem solid #d6ab55;
    border-left: 0.75rem solid #d6ab55;
    border-bottom: 0.75rem solid #d6ab55;
    border-radius: 0.75rem;
    -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
            animation: rotate_pacman_half_up 0.5s 0s infinite; }
  .pacman > div:nth-child(2) {
    width: 0px;
    height: 0px;
    border-right: 0.75rem solid transparent;
    border-top: 0.75rem solid #d6ab55;
    border-left: 0.75rem solid #d6ab55;
    border-bottom: 0.75rem solid #d6ab55;
    border-radius: 0.75rem;
    -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
            animation: rotate_pacman_half_down 0.5s 0s infinite;
    margin-top: -1.5rem; }
  .pacman > div:nth-child(3), .pacman > div:nth-child(4), .pacman > div:nth-child(5), .pacman > div:nth-child(6) {
    background-color: #d6ab55;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 100%;
    margin: 2px;
    position: absolute;
    -webkit-transform: translate(0, -6.25px);
        -ms-transform: translate(0, -6.25px);
            transform: translate(0, -6.25px);
    top:0.75rem;
    left: 3rem; }

</style>
