<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
      name:'app'
  }
</script>
<style lang="scss">
  @import "assets/css/reset";
  .app{
    height: 100vh;
    width: 100vw;
  }
</style>
