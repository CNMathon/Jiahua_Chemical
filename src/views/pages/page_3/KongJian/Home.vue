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
      console.log("this.$store.state.kongjian.keepAliveComponents", this.$store.state.kongjian.keepAliveComponents);
      return this.$store.state.kongjian.keepAliveComponents;
    }
  }
};
</script>
