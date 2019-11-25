<template>
  <div class="zuoyepiao">
    <van-sticky>
      <van-nav-bar
        title="请选择"
        left-text="取消"
        right-text="提交"
        left-arrow
        @click-left="pageBack"
        @click-right="confirm"
      />
      <div class="select-type">
        <div class="select-type__content" @click="showPop = true">
          <div class="name">盲板作业票</div>
          <van-icon name="arrow" />
        </div>
      </div>
    </van-sticky>
    <div>
      <van-checkbox-group v-model="result">
        <van-checkbox name="a">
          <div class="item">
            <div class="left">
              <div>作业票类型：动火作业票</div>
              <div>作业地点：2号车间</div>
              <div>作业内容：2号车间设备检修</div>
              <div>作业单位名称：制造部</div>
              <div>申请人名称：王大锤</div>
              <div>作业开始时间：2019-10-12 14：13</div>
              <div>作业结束时间：2019-10-12 14：13</div>
            </div>
            <div class="right">正在执行中</div>
          </div>
        </van-checkbox>
        <van-checkbox name="b">
          <div class="item">
            <div class="left">
              <div>作业票类型：动火作业票</div>
              <div>作业地点：2号车间</div>
              <div>作业内容：2号车间设备检修</div>
              <div>作业单位名称：制造部</div>
              <div>申请人名称：王大锤</div>
              <div>作业开始时间：2019-10-12 14：13</div>
              <div>作业结束时间：2019-10-12 14：13</div>
            </div>
            <div class="right">正在执行中</div>
          </div>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <van-popup v-model="showPop" position="bottom">
      <van-picker
        show-toolbar
        title="请选择作业票类型"
        :columns="columns"
        @cancel="showPop = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "zuoyepiaoxuanze",
  data() {
    return {
      showPop: false,
      columns: [
        "盲板作业票",
        "动火作业票",
        "受限空间",
        "吊装作业票",
        "动土作业票",
        "断路作业票",
        "临时用电作业票"
      ],
      result: ["a", "b"]
    };
  },
	created() {
		
	},
  methods: {
    confirm() {},
    onConfirm(value, index) {
      this.showPop = false;
      console.log("value: ", value);
      console.log("index: ", index);
    }
  }
};
</script>
<style lang="scss" scoped>
.select-type {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;

  &__content {
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #f5f5f5;

    .name {
      font-size: 18px;
    }
  }
}
.item {
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  background-color: #6096f8;
  padding: 2.9%;
  box-sizing: border-box;
  color: #ffffff;
  border-radius: 1.3vw;
  margin-bottom: 15px;
  .left {
    width: 70%;
  }
  .right {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
  }
}
</style>