<template>
  <div class="cell" @click="toSelectUser">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell_value">
      <span>{{ showNames || "人名" }}</span>
      <span class="cell_value_arrow">
        <van-icon name="search" />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "cell_select_user",
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    return {
      showNames: ""
    };
  },
  props: {
    title: String,
    storeModule: String,
    storeKey: String,
    required: {
      type: Boolean,
      default: false
    },
    value: Array
  },
  methods: {
    toSelectUser() {
      this.$router.push({
        path: "./select_user",
        query: {
          storeModule: this.storeModule,
          storeKey: this.storeKey
        }
      });
    }
  },
  watch: {
    value(value) {
      let newValueArray = value.map(item => {
        return item.userName;
      });
      this.showNames = newValueArray.join(",");
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
  padding: 30px 40px;
  position: relative;
  background-color: #ffffff;
  .cell_title {
    width: 50%;
    font-size: 28px;
    font-weight: 400;
    color: rgba(45, 44, 51, 1);
    line-height: 40px;
    .required {
      color: #cf2323;
    }
  }
  .cell_value {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 28px;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
    line-height: 40px;
    .cell_value_arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
    }
  }
  .cell::after {
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
</style>
