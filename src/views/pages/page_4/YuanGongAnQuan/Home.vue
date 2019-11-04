<template>
  <div class="yuan-gong-an-quan-home">
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
  name: "yuan_gong_an_quan"
};
</script>
<style lang="scss" scoped>
.yuan-gong-an-quan-home {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: #f6f6f6;
}
</style>
