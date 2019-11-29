<template>
  <div class="zuoyepiao">
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
        <div class="name">{{columns[dataType]}}</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div>
      <van-skeleton title avatar :row="3" :loading="isLoading">
        <div v-for="(item, index) in pageList" :key="index">
          <van-checkbox v-model="item.checked">
            <div class="item">
              <div class="left">
                <div>作业票类型：{{columns[item.zyType]}}</div>
                <div>作业地点：{{item.address}}</div>
                <div>作业内容：{{item.content}}</div>
                <div>作业单位名称：{{item.zyDept}}</div>
                <div>申请人名称：{{item.applyRen}}</div>
                <div>作业开始时间：{{item.zyStarttime}}</div>
                <div>作业结束时间：{{item.zyEndtime}}</div>
              </div>
              <div class="right">{{item.htStatus}}</div>
            </div>
          </van-checkbox>
        </div>
      </van-skeleton>
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
import { mapMutations } from "vuex";
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: Object
  },
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
      result: ["a", "b"],
      isLoading: false,
      pageList: [],
      dataType: 0 // 筛选Value值
    };
  },
  methods: {
    confirm() {
      let arr = [];
      this.pageList
        .filter(item => item.checked)
        .map(item =>
          arr.push({
            ticketCode: item.zyCode,
            ticketType: item.zyType,
            ticketId: item.id
          })
        );
      this.$store.dispatch(`${this.storeModule}/changTag`, {
        key: this.storeKey,
        value: arr
      });
      this.$router.back()
      console.log(`newArr: `, this.value);
    },
    onConfirm(value, index) {
      this.showPop = false;
      this.dataType = index;
      this.getPageData();
    },
    // 获取页面数据
    getPageData() {
      this.isLoading = true;
      this.$api.page_3
        .cptListData({
          // zyType: this.columns[this.dataType],
          __sid: localStorage.JiaHuaSessionId
        })
        .then(res => {
          this.isLoading = false;
          console.log(`initData: `, res.list);
          res.list.map(item => {
            item.checked = false;
            this.pageList.push(item);
          });
        });
    }
  },
  created() {
    this.getPageData();
    // console.log(this.$route)
  },
  computed: {
    storeModule() {
      return this.$route.query.storeModule;
    },
    storeKey() {
      return this.$route.query.storeKey;
    },
    result() {
      return this.$store.state[this.storeModule][this.storeKey];
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