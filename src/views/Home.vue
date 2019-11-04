<template>
  <div class="home">
    <router-view class="router" v-if="$route.meta.showTabBar" />
    <router-view v-else />
    <div class="tabBar" v-if="$route.meta.showTabBar">
      <div
        class="tabs"
        v-for="(item, index) in tabBar"
        :key="index"
        @click="toPage(index)"
      >
        <div>
          <van-icon
            class-prefix="iconfont"
            :name="item.icon"
            size="1.25rem"
            :color="selectBar === index ? '#33A4E8' : '#A1A1A1'"
          />
        </div>
        <div :class="{ active: selectBar === index }">{{ item.text }}</div>
      </div>
    </div>
    <div class="tabBars" v-if="$route.meta.showTabBar"></div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      selectBar: 0,
      tabBar: [
        { text: "首页", icon: "shouye" },
        { text: "数据监控", icon: "jiankong" },
        { text: "业务管理", icon: "yewu" },
        { text: "信息查询", icon: "xinxichaxun" },
        { text: "教育培训", icon: "jiaoyupeixun" }
      ]
    };
  },
  created() {
    this.selectBar = this.$route.meta.tabBar;
  },
  methods: {
    toPage(index) {
      if (index === this.selectBar) return;
      this.selectBar = index;
      this.$router.push({ path: `/page_${index + 1}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  min-height: 100vh;
  position: relative;
  .router {
    min-height: calc(100vh - 98px);
  }
  .tabBar {
    width: 100vw;
    height: 98px;
    position: fixed;
    left: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: -2px 1px 4px 0px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 22px;
    color: rgba(138, 138, 138, 1);
    z-index: 999999;
    .tabs {
      flex: 1;
      text-align: center;
    }
    .active {
      color: #33a4e8;
    }
  }
  .tabBars {
    width: 100vw;
    height: 128px;
  }
}
</style>
