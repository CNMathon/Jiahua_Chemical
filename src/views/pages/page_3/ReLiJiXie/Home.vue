<template>
  <div class="home">
    <keep-alive :include="cachedViews">
      <router-view>
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "relijixie",
  computed: {
    cachedViews() {
      return this.$store.state.relijixie.keepAliveComponents;
    }
  }
};
</script>
