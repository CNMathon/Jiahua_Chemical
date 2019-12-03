<template>
  <div class="app">
    <van-nav-bar title="消息通知" left-text="返回" left-arrow @click-left="pageBack" fixed />
    <van-skeleton title avatar :row="3" :loading="isLoading" class="fixed-first">
      <div class="list fixed-first">
        <div class="item" v-for="(item, index) in pageList" :key="index">
          <Item :info="item" />
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import Item from "./components/Item";
export default {
  data() {
    return {
      isLoading: false,
      pageList: [
        {
          img: "https://img.fengz.me/images/2019/06/28/GlDp.jpg",
          time: "20:11",
          title: "动火安全审批",
          content: "配置内容已超时"
        },
        {
          img: "https://img.fengz.me/images/2019/06/28/GlDp.jpg",
          time: "20:11",
          title: "动火安全审批",
          content: "配置内容已超时"
        },
        {
          img: "https://img.fengz.me/images/2019/06/28/GlDp.jpg",
          time: "20:11",
          title: "动火安全审批",
          content: "配置内容已超时"
        },
        {
          img: "https://img.fengz.me/images/2019/06/28/GlDp.jpg",
          time: "20:11",
          title: "动火安全审批",
          content: "配置内容已超时"
        },
      ]
    };
  },
  components: {
    Item
  },
  methods: {
    getPageList() {
      this.isLoading = true
      this.$api.page_3
        .actCoreMobileMsgListData({
          __sid: localStorage.JiaHuaSessionId
        })
        .then(res => {
          this.isLoading = false
          console.log(`listData: `, res.data);
          res.list.map(res =>
            this.pageList.push({
              // img: item.
              // time: item.
              // title: item.
              // content: item.
            })
          );
        });
    }
  },
  created() {
    this.getPageList()
  }
};
</script>

<style lang="scss" scoped>
.app {
  .list {
    .item {
    }
  }
}
</style>