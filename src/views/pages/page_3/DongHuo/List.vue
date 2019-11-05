<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-nav-bar
      title="动火安全"
      left-text="返回"
      right-text="发起"
      left-arrow
      @click-left="pageBack"
      @click-right="onClickRight"
    />
    <j-filter-bar
      v-model="searchValue"
      @search="getPageData(true)"
      @tap="showFilter = true"
    >
      
    </j-filter-bar>
    
    <div class="list-card-area">
      <list-card></list-card>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import ListCard from "@/views/pages/page_3/components/DongHuoListCard";
export default {
  data() {
    return {
      searchValue: "",
      listData: [],
      showPopup: true
    };
  },
  mixins: [mixin],
  methods: {
    onClickRight() {
      this.$router.push({
        path: "../donghuo"
      });
    }
    onClickMenu() {
      this.showPopup = true
    }
  },
  components: {
    ListCard
  }
};
</script>

<style lang="scss" scoped>
.donghuo {
  background-color: #f5f5f5;
}

.list-card-area {
  width: 90%;
  margin: 0 auto;
}

.icon {
  display: flex;
}

.popup {
  padding: 20px 30px
}
</style>
