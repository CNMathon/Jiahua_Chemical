<template>
  <div class="cheng-bao-shang-ren-yuan-home">
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
  name: "cheng_bao_shang_ren_yuan"
};
</script>
<style lang="scss" scoped>
.cheng-bao-shang-ren-yuan-home {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: #f6f6f6;
}
</style>
