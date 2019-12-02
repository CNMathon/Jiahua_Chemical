<template>
  <div class="wochuli">
    <van-nav-bar title="我处理的" left-text="返回" left-arrow @click-left="pageBack" fixed/>
    <van-tabs
      v-model="active"
      type="card"
      background="#FFFFFF"
      color="#6096F8"
      title-active-color="#FFFFFF"
      title-inactive-color="#6096F8"
      class="fixed-first"
    >
      <van-tab :title="'待我处理的 ('+ wait +')' " class="wochuliList-content">
        <van-skeleton title avatar :row="3" :loading="pageList[0].isLoading">
          <wochuliListItem :info="pageList[0].list" />
        </van-skeleton>
      </van-tab>
      <van-tab :title="'我已处理的 ('+ myComplete +')' " class="wochuliList-content">
        <van-skeleton title avatar :row="3" :loading="pageList[1].isLoading">
          <wochuliListItem complete :info="pageList[1].list" />
        </van-skeleton>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { business } from "@/mixin/business";
import wochuliListItem from "@/views/pages/page_3/components/ChuLiListCard.vue";
export default {
  name: "wochuli-Index",
  mixins: [business],
  components: { wochuliListItem },
  data() {
    return {
      myComplete: 4,
      wait: 1,
      active: 0,
      pageList: [
        {
          isLoading: false,
          list: []
        },
        {
          isLoading: false,
          list: []
        }
      ],
    };
  },
  methods: {
    getPageList() {
      // 获取待我处理列表
      let getTodoList = (index) => {
        this.pageList[index].isLoading = true;
        this.$api.page_3
          .actCoreMobileDoingListData({
            __sid: localStorage.JiaHuaSessionId
          })
          .then(res => {
            console.log('todoList: ', res.data.list);
            this.pageList[index].list = res.data.list;
            this.pageList[index].isLoading = false;
          })
          
      }
      // 获取待我处理列表
      let getFinshList = (index) => {
        this.pageList[index].isLoading = true;
        this.$api.page_3
          .actCoreclientStartListData({
            __sid: localStorage.JiaHuaSessionId
          })
          .then(res => {
            console.log('finishList: ', res.list);
            this.pageList[index].list = res.list;
            this.pageList[index].isLoading = false;
          })
      }

      getTodoList(0);
      getFinshList(1);
    }
  },
  created() {
    this.getPageList()
  }
};
</script>
<style lang="scss">
.wochuli .van-tabs--card {
  padding: 0;
}
.wochuli .van-tabs__nav--card {
  border-radius: 1.3vw;
  overflow: hidden;
}
.wochuli .van-tabs__wrap {
  padding: 4vw 5.3vw;
  box-sizing: content-box;
  background-color: #fff;
  margin-bottom: 10px;
}
</style>
<style lang="scss" scoped>
.wochuli {
  min-height: 100vh;
  // background-color: #f5f5f5;
}
.wochuliList-content {
  width: 100%;
  padding: 0 4%;
}
</style>