<template>
  <div class="filter_search">
    <van-search
      :placeholder="placeholder"
      v-model="searchValue"
      show-action
      shape="round"
    >
      <div slot="action" @click.stop="onSearch">
        <div class="search-action">搜索</div>
      </div>
    </van-search>
  </div>
</template>
<script>
export default {
  name: "filter_search",
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
      
    },
    changeValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .van-search {
  padding-left: 0;
}
/deep/ .van-search__action {
  padding: 0 5px 0 10px;
}
.search-action {
  color: rgba(96, 150, 248, 1);
}
</style>
