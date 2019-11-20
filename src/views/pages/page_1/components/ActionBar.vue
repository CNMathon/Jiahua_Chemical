<template>
  <div class="action-bar">
    <div class="time-select">
      <div class="time">
        <div class="start">开始时间</div>
        <div class="line"></div>
        <div class="end">结束时间</div>
      </div>
      <div class="time-icon">
        <van-icon name="notes-o" size="1.125rem" color="#C7C7C7" />
      </div>
    </div>
    <div class="show-type van-hairline--surround" v-if="!nodrop">
      <van-dropdown-menu :overlay="false">
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "actionBar",
  props: {
    nodrop: Boolean
  },
  data() {
    return {
      value1: 0,
      option1: [
        { text: "全部", value: 0 },
        { text: "启用", value: 1 },
        { text: "停用", value: 2 }
      ]
    };
  }
};
</script>
<style lang="scss">
.action-bar {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  .time-select {
    flex: auto;
    margin-right: 30px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(246, 246, 246, 1);
    border-radius: 4px;
    border: 1px solid rgba(229, 229, 229, 1);
    .time {
      flex: auto;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .start,
      .end {
        font-size: 24px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 33px;
      }
      .line {
        width: 36px;
        height: 1px;
        border: 1px solid #999999;
      }
    }
    .time-icon {
      width: 80px;
      height: 100%;
      border-left: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .show-type {
    width: 170px;
    height: 62px;
    background: rgba(246, 246, 246, 1);
    border-radius: 4px;
    box-sizing: border-box;
    .van-dropdown-menu {
      height: 1.9375rem;
      background: rgba(246, 246, 246, 1);
      .van-dropdown-menu__item {
        box-sizing: border-box;
        padding: 0 0.625rem;
        .van-dropdown-menu__title {
          padding: 0 0.5rem 0 0;
        }
      }
      .van-popup--top {
        width: 5.34375rem;
        left: auto;
        right: 0.9375rem;
        .van-dropdown-item__option {
          background: rgba(246, 246, 246, 1);
          .van-cell__title {
            text-align: center;
          }
          .van-cell__value {
            display: none;
          }
        }
      }
    }
  }
}
</style>
