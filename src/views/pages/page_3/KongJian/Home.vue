<template>
  <div class="kongjian_home">
    <keep-alive :include="cachedViews">
      <router-view>
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  computed: {
    cachedViews() {
      return this.$store.state.kongjian.keepAliveComponents;
    }
  }
};
</script>
