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
      pageList: []
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
          console.log(`listData: `, res.data.list);
          res.data.list.map(item =>
            this.pageList.push({
              img: `http://pngimg.com/uploads/github/github_PNG40.png`,
              time: item.sendDate,
              title: item.msgContentEntity.title,
              content: item.msgContentEntity.content
            })
          );
        });
    },
    // timeFormat(e) {
    //   let date = Data(e)
    //   let res = date.
    //   return res
    // }
  },
  created() {
    this.getPageList()
  }
};
</script>

<style lang="scss" scoped>
</style>