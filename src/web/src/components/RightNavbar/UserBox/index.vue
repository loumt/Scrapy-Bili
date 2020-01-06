<template>
  <transition name="user-hook">
    <div v-show="show" class="user-info-box">111</div>
  </transition>
</template>

<script>
  export default {
    name: "UserBox",
    data(){
      return {
        show: true
      }
    }
  }
</script>

<style>
  .user-info-box {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    width: 30%;
    display: block;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
  }

  .user-hook-enter-active, .user-hook-leave-active {
    transition: opacity 1.5s;
  }

  .user-hook-enter, .user-hook-leave-to {
    opacity: 0;
  }
</style>
