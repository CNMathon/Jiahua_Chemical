<template>
  <div class="gaochu_home">
     <keep-alive :include="cachedViews">
      <router-view>
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "gaochu_home",
  computed: {
    cachedViews() {
      return this.$store.state.gaochu.keepAliveComponents;
    }
  }
};
</script>
