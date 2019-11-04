<template>
  <div class="cell" :class="[border ? 'border' : '']">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div
      class="cell-sheet"
      :class="'sheet' + id"
      @click.stop="showSheet = !showSheet"
    >
      <span class="cell-sheet__text">{{ value[valueKey] || "请选择" }}</span>
      <van-icon name="arrow-down" color="#C7C7C7" />
    </div>
    <div
      class="pop-mask"
      v-if="showSheet"
      @click.stop="showSheet = false"
      @touchmove.prevent
    ></div>
    <transition name="van-fade">
      <div class="pop" v-if="showSheet" :style="styleObject">
        <div v-if="actions.length > 0">
          <div
            class="pop-item van-hairline--bottom"
            v-for="(item, index) in actions"
            :key="String(index) + id"
            @click.stop="onSelect(item)"
          >
            {{ item[valueKey] }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "cell_sheet",
  props: {
    title: String,
    defaultIndex: {
      type: Number,
      default: 0
    },
    required: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Array
    },
    valueKey: {
      type: String,
      default: "name"
    }
  },
  data() {
    return {
      id: Math.round(Math.random() * 10),
      value: "",
      showSheet: false,
      styleObject: {}
    };
  },
  watch: {
    showSheet(showSheet) {
      if (showSheet) this.getStyleObject();
    }
  },
  mounted() {
    if (this.actions.length > 0)
      this.value = this.actions[this.defaultIndex][this.valueKey];
  },
  methods: {
    onSelect(e) {
      this.value = e;
      this.showSheet = false;
      this.$emit("select", e);
    },
    getTop(e) {
      var offset = e.offsetTop;
      if (e.offsetParent != null) {
        offset += this.getTop(e.offsetParent);
      }
      return offset;
    },
    getLeft(e) {
      var offset = e.offsetLeft;
      if (e.offsetParent != null) {
        offset += this.getLeft(e.offsetParent);
      }
      return offset;
    },
    getStyleObject() {
      let dom = document.getElementsByClassName(`sheet${this.id}`);
      let top = this.getTop(dom[0]) + dom[0].offsetHeight;
      let width = dom[0].offsetWidth;
      let left = this.getLeft(dom[0]);
      this.styleObject = {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.cell {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  position: relative;
  background-color: #ffffff;
  overflow: hidden;
  .cell_title {
    flex: 1;
    font-size: 28px;
    color: #2d2c33;
    line-height: 40px;
    .required {
      color: #cf2323;
    }
  }
  .cell-sheet {
    width: 520px;
    margin-left: 10px;
    height: 64px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    border: 1px solid rgba(229, 229, 229, 1);
    &__text {
      font-size: 24px;
      line-height: 64px;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.border {
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    width: calc(100% - 80px);
    bottom: 0;
    left: 40px;
    border-bottom: 1px solid #e5e5e5;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.pop-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 100;
}
.pop {
  position: fixed;
  z-index: 999;
  background-color: #ffffff;
  max-height: 400px;
  overflow-y: scroll;
  .pop-item {
    height: 80px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
}
</style>
