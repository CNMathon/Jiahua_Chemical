<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
::placeholder {
  color: #b9b9b9;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.van-nav-bar .van-nav-bar__text,
.van-nav-bar .van-icon {
  color: #000000 !important;
}

.refresh {
  .van-pull-refresh__track {
    .content {
      height: 70vh;
    }
  }
}
</style>
