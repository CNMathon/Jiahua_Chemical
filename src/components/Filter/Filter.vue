<template>
  <div class="j-filter" :style="styleObject" v-show="value" @click.stop>
    <div class="mask" v-if="value" @click.stop="onClose"></div>
    <div class="contenter">
      <slot></slot>
    </div>
    <div class="action" @click="confirmFilter">确认筛选</div>
  </div>
</template>
<script>
export default {
  name: "j-filter",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styleObject: {}
    };
  },
  watch: {
    value(value) {
      if (value) {
        this.onOpen();
      } else {
        this.onClose();
      }
    }
  },
  mounted() {
    this.getMaskHeight();
  },
  methods: {
    getMaskHeight() {
      let navBarheight = document.getElementsByClassName("van-nav-bar")[0]
        .clientHeight;
      let maskHeight = document.body.clientHeight - navBarheight;
      this.styleObject = {
        top: `${navBarheight}px`,
        height: `${maskHeight}px`
      };
    },
    onOpen() {
      this.$emit("input", true);
    },
    onClose() {
      this.$emit("input", false);
    },
    // 触发搜索
    onSearch() {
      this.$emit("search");
    },
    // 确认筛选
    confirmFilter() {
      this.onClose();
      this.$emit("confirm");
    }
  }
};
</script>
<style lang="scss" scoped>
.j-filter {
  width: 100vw;
  position: fixed;
  top: 46px;
  left: 0;
  z-index: 99;
  background: transparent;
}
.contenter {
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0 30px;
}
.mask {
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
  background: rgba(0, 0, 0, 0.5);
}
.action {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 97px;
  background: rgba(96, 150, 248, 1);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
  font-size: 32px;
  color: rgba(255, 255, 255, 1);
  line-height: 97px;
  text-align: center;
  z-index: 100;
}
</style>
