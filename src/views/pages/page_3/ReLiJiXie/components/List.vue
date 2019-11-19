<template>
  <div class="relijixie-list" :class="{'complete': complete}" @click="goDetails">
    <div class="relijixie-list-content">
      <div>
        <span>作业名称：隐患整改单</span>
      </div>
      <div>负责人：王大锤</div>
      <div>开始时间：2019-0923 17:33:00</div>
    </div>
    <div class="relijixie-list-auditBtn">{{zypztList[1].name}}</div>
  </div>
</template>

<script>
export default {
  name: "relijixie-list",
  props: {
    complete: {
      type: Boolean,
      default: false
    }
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
    goDetails() {
      this.$router.push({ path: "../relijixie/details" });
    },
  }
};
</script>

<style  lang="scss" scoped>
.relijixie-list {
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
.relijixie-list-content {
  flex-grow: 1;
  text-align: left;
}
.relijixie-list-content-time {
  font-size: 20px;
}
.relijixie-list-content > div {
  line-height: 1;
  padding: 2% 0;
}
.relijixie-list-content-name {
  margin-left: 4%;
}
.relijixie-list-auditBtn {
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