<template>
<div id="app">
  <!--  -->

  <!-- <router-link :to="{ name:'/login'}">a </router-link> -->
  <router-view class="main"></router-view>
</div>
</template>

<style lang='scss'>
@import 'assets/style/index.scss';
#app {
    height: 100%;
}
.main {
    background-color: #ededed;
    overflow: hidden;
    width: 100%;
}
</style>
