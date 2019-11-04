<template>
  <div class="item">
    <div class="left">
      <div class="time">2018-08-11 14:35</div>
      <div class="content">
        报警内容报警内容报警内容报警内容报警内容报警内容报警内容报警内容报警内容报警内内容
      </div>
      <div class="address">
        <van-icon
          class="location"
          name="location"
          color="#6096F8"
          size="0.75rem"
        />报警地点报警地点
      </div>
    </div>
    <div class="right">
      <div class="right-content">
        <div>
          <van-icon
            class-prefix="iconfont"
            name="jinggao"
            size="1.875rem"
            color="#D81E06"
          />
        </div>
        <div class="title">报警中</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "item"
};
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
  height: 330px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 40px 30px;
  display: flex;
  align-items: center;
  .left {
    width: 420px;
    height: 100%;
    .time {
      font-size: 24px;
      color: rgba(153, 153, 153, 1);
    }
    .content {
      margin-top: 30px;
      font-size: 28px;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
    }
    .address {
      margin-top: 30px;
      display: flex;
      align-items: center;
      font-size: 24px;
      color: rgba(96, 150, 248, 1);
      line-height: 33px;
      .location {
        margin-right: 6px;
      }
    }
  }
  .right {
    flex: auto;
    text-align: center;
    .right-content {
      .title {
        margin-top: 25px;
        font-size: 36px;
        color: rgba(216, 30, 6, 1);
        line-height: 36px;
      }
    }
  }
}
</style>
