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

.fixed-first {
  margin-top: 120px !important;
}

.readonly {
  background-color: #eee !important;
}

.head {
  display: flex;
  text-align: center;
  .head_1 {
    width: 420px;
    // background-color: red
  }
  .head_2 {
    width: 100px;
  }
  .head_3 {
    width: 300px;
  }
}
.home {
  min-height: 100vh;
  position: relative;
  }
.list-card-area {
  width: 90%;
  margin: 0 auto;
}
.z-index-highest {
  z-index: 999 !important;
}
</style>
