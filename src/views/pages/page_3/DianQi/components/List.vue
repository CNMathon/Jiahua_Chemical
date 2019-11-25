<template>
  <div class="dianqi-list" @click="goDetails(info.Id)">
    <div class="dianqi-list-content">
      <div>
        <span>作业名称：{{info.Name}}</span>
      </div>
      <div>负责人：{{info.Principal}}</div>
      <div>开始时间：{{info.PlanStartTime}}</div>
    </div>
    <div class="dianqi-list-auditBtn">{{zypztList[info.State].name}}</div>
  </div>
</template>

<script>
export default {
  name: "dianqi-list",
  props: {
    info: {}
  },
  data() {
    return {
      zypztList: [
        {
          name: "未提交",
          index: 1
        },
        {
          name: "审核中",
          index: 2
        },
        {
          name: "执行中",
          index: 3
        },
        {
          name: "等待确认",
          index: 4
        },
        {
          name: "等待评价",
          index: 5
        },
        {
          name: "完成",
          index: 6
        },
        {
          name: "已撤销",
          index: 7
        },
        {
          name: "已终止",
          index: 8
        }
      ] // 作业票状态列表
    };
  },
  methods: {
    goDetails(Id) {
      this.$router.push({ path: "../dianqi/details", query: { id: Id } });
    }
  }
};
</script>

<style  lang="scss" scoped>
.dianqi-list {
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
.dianqi-list-content {
  flex-grow: 1;
  text-align: left;
}
.dianqi-list-content-time {
  font-size: 20px;
}
.dianqi-list-content > div {
  line-height: 1;
  padding: 2% 0;
}
.dianqi-list-content-name {
  margin-left: 4%;
}
.dianqi-list-auditBtn {
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