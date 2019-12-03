<template>
  <div class="app">
    <div class="left">
      <div class="header">
        <img :src="info.img" />
      </div>
    </div>
    <div class="right van-hairline--bottom">
      <div class="text">
        <div class="title">{{info.title}}</div>
        <div class="content">{{info.content}}</div>
      </div>
      <div class="time">{{info.time}}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  padding: 10px 20px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  // background: red;
  .left {
    height: 100px;
    width: 15%;
    .header {
      height: 100%;
      // height: 100%;
      img {
        border-radius: 50%; 
        // width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    height: 100%;
    width: 80%;
    display: flex;
    // border-bottom: 1px solid gray;
    padding-top: 10px;
    padding-bottom: 30px;
    .text {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      .title {
        font-size: 30px; 
        // font-weight: bold;
      }
      .content {
        font-size: 15px;
        color: gray;
      }
    }
    .time {
      font-size: 28px;
      color: gray;
      width: 20%;
      text-align: right;
    }
  }
}
</style>

<script>
export default {
  props: {
    info: Object
  },
  created() {
    console.log(this.info)
  }
}
</script>