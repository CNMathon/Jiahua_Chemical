<template>
  <div class="filter">
    <div class="sesrch">
      <van-search
        :placeholder="placeholder"
        shape="round"
        v-model="searchValue"
        @search="onSearch"
      />
    </div>
    <div class="filter-action" @click="tapFilter">
      <van-icon name="bars" color="#6096F8" />
    </div>
  </div>
</template>
<script>
export default {
  name: "filter_bar",
  data() {
    return {
      searchValue: ""
    };
  },
  watch: {
    searchValue(val) {
      this.changeValue(val);
    }
  },
  props: {
    value: {
      type: String || Number,
      default: ""
    },
    placeholder: {
      type: String,
      default: "搜索"
    }
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchValue);
    },
    changeValue(val) {
      this.$emit("input", val);
    },
    tapFilter() {
      this.$emit("tap");
    }
  }
};
</script>
<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 1);
  padding: 0 0 0 10px;
  box-sizing: border-box;
  .sesrch {
    width: calc(100% - 80px);
  }
  .filter-action {
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
