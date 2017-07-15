<template>
  <div id="app">
  	<transition name="fade">
    	<router-view>



      </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
 #app{
  height:100%;
 }

.fade-enter-active {
  transition: opacity 2.5s
}
.fade-leave-active{
  transition: opacity 0
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0 
}

</style>
