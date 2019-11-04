<template>
  <div class="shebei">
    <van-nav-bar
      title="设备分类"
      shape="round"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @focus="onFocus"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="history" v-show="hidden">
      <div class="history-list">
        <div class="van-hairline--bottom" v-for="index in 3" :key="index">
          <div class="history-item" @click="selectHistory(`记录${index}`)">
            <div class="history-text">{{ `记录${index}` }}</div>
            <div class="history-remove">
              <van-icon name="cross" color="#C7C7C7" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-tabs
      v-show="!hidden"
      v-model="active"
      color="#33A4E8"
      title-inactive-color="#333333"
      title-active-color="#33A4E8"
    >
      <van-tab title="生产设备">
        <div v-for="index in 3" :key="index">
          <Item></Item>
        </div>
      </van-tab>
      <van-tab title="环保设备">
        <div v-for="index in 3" :key="index">
          <Item></Item>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Item from "./components/Item";
export default {
  name: "shebei",
  components: {
    Item
  },
  data() {
    return {
      value: "",
      active: 0,
      hidden: false
    };
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    onSearch() {
      this.hidden = false;
    },
    onCancel() {
      this.hidden = false;
    },
    onFocus() {
      this.hidden = true;
    },
    // onBlur() {
    //   this.hidden = false;
    // },
    selectHistory(value) {
      console.log("value: ", value);
      this.value = value;
      this.hidden = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.shebei {
  background-color: #ffffff;
  .history {
    box-sizing: border-box;
    padding: 0 30px;
    .history-list {
      .history-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .history-text {
          font-size: 30px;
          color: rgba(102, 102, 102, 1);
          line-height: 74px;
        }
      }
    }
  }
}
</style>
