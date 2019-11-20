<template>
  <div class="dropdown van-hairline--surround" :class="classPosition">
    <van-dropdown-menu :overlay="false">
      <van-dropdown-item v-model="value" :options="values||option"  />
    </van-dropdown-menu>
  </div>
</template>
<script>
export default {
  name: "dropDown",
  props: {
    position: {
      type: String,
      default: "left"
    },
    values: Array,
    width: String,
  },
  data() {
    return {
      value: 0,
      option: [
        { text: "工段", value: 0 },
        { text: "启用", value: 1 },
        { text: "停用", value: 2 }
      ]
    };
  },
  computed: {
    classPosition() {
      return {
        left: this.position === "left",
        right: this.position === "right"
      };
    }
  }
};
</script>
<style lang="scss">
.dropdown {
  width: 28vw;
  height: 62px;
  border-radius: 4px;
  box-sizing: border-box;
  .van-dropdown-menu {
    height: 1.9375rem;
    background: rgba(246, 246, 246, 1);
    .van-dropdown-menu__item {
      box-sizing: border-box;
      padding: 0 0.625rem;
      .van-dropdown-menu__title {
        padding: 0 0.5rem 0 0;
      }
    }
    .van-popup--top {
      width: 28vw;
      .van-dropdown-item__option {
        background: rgba(246, 246, 246, 1);
        .van-cell__title {
          text-align: center;
        }
        .van-cell__value {
          display: none;
        }
      }
    }
  }
}
.left {
  .van-popup--top {
    left: 0.9375rem;
  }
}
.right {
  .van-popup--top {
    left: auto;
    right: 0.9375rem;
  }
}
</style>
