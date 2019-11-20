<template>
  <div class="she-bei-xiang-qing-home">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>
<script>
export default {
  name: "she_bei_xiang_qing_home"
};
</script>
<style lang="scss" scoped>
.she-bei-xiang-qing-home {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  // background-color: #f6f6f6;
}
</style>
