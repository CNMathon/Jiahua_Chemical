<template>
  <div class="app">
    <div class="wochuli-list" :class="{'complete': complete}" v-for="(item, index) in info" :key="index">
      <div class="wochuli-list-content">
        <div>
          <span>流程名称：{{item.actReProcdef.name}}</span>
          <span class="wochuli-list-content-name">申请人：{{item.createByName}}</span>
        </div>
        <div class="wochuli-list-content-time">流程发起时间：{{item.startTime}}</div>
        <div class="wochuli-list-content-time">任务开始时间：{{item.endTime}}</div>
      </div>
      <!-- <div class="wochuli-list-auditBtn">{{complete ? '已终结' : '安全员审核'}}</div> -->
      <div class="wochuli-list-auditBtn">{{item.proInsStatusName}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "wochuli-list",
  props: {
    complete: {
      type: Boolean,
      default: false
    },
    info: Array
  },
  data() {
    return {};
  }
};
</script>

<style  lang="scss" scoped>
.wochuli-list {
  width: 100%;
  padding: 2.9%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: stretch;
  background-color: #6096f8;
  color: #fff;
  border-radius: 1.3vw;
  margin-top: 10px;
  font-size: 24px;
  &.complete {
    background-color: #666666;
  }
}
.wochuli-list-content {
  flex-grow: 1;
  text-align: left;
}
.wochuli-list-content-time {
  font-size: 20px;
}
.wochuli-list-content > div {
  line-height: 1;
  padding: 2% 0;
}
.wochuli-list-content-name {
  margin-left: 4%;
}
.wochuli-list-auditBtn {
  width: 18.8%;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>