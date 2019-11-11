<template>
  <div class="cell">
    <div class="cell_title">
      <div class="cell_title_left">
        <span>{{ title }}</span>
        <span class="required" v-if="required">*</span>
      </div>
      <div class="cell_title_right">
        <img src="../../assets/images/add.jpg" class="cell_add_button" @click="toSelect" />
      </div>
    </div>
    <div class="cell_other">
      <van-col span="8" v-for="(item, index) in tagList" :key="index">
        <div class="cell_type_tag">
          {{ item }}
          <span class="delete">
            <van-icon name="cross" @click="removeItem(item)" />
          </span>
        </div>
      </van-col>
      <!-- <van-col span="8">
        <div class="cell_type_tag_add" @click="toSelect()">+</div>
      </van-col>-->
    </div>
  </div>
</template>
<script>
export default {
  name: "cell_select_tag",
  // data() {
  //   return {
  //     showImg: './../assets/images/add.jpg'
  //   }
  // },
  props: {
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    tagList: Array,
    showList: Array,
    storeModule: String,
    storeKey: String,
    disable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toSelect() {
      if (this.disable) return;
      this.$router.push({
        path: "./select",
        query: {
          showList: this.showList,
          storeModule: this.storeModule,
          storeKey: this.storeKey
        }
      });
    },
    removeItem(item) {
      if (this.disable) return;
      let obj = {
        key: this.storeKey,
        value: item
      };
      this.$store.dispatch(`${this.storeModule}/deleteTagItem`, obj);
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
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 28px;
    color: rgba(45, 44, 51, 1);
    line-height: 40px;
    .required {
      color: #cf2323;
    }
  }
  .cell_other {
    width: 100%;
    margin-top: 15px;
    // 多行文本框
    .cell_textarea {
      padding: 20px;
      width: 100%;
      height: 171px;
      border-radius: 8px;
      border: 1px solid rgba(229, 229, 229, 1);
      font-size: 24px;
      font-weight: 400;
      color: #2d2c33;
      line-height: 33px;
    }
    // 标签
    .cell_type_tag,
    .cell_type_tag_add {
      width: 176px;
      height: 62px;
      margin: 18px auto;
      background: rgba(96, 150, 248, 1);
      border-radius: 10px;
      font-size: 28px;
      text-align: center;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 62px;
      position: relative;
      .delete {
        position: absolute;
        top: -15px;
        right: -15px;
        width: 35px;
        height: 35px;
        background: rgba(108, 108, 108, 1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .cell_type_tag_add {
      font-weight: bold;
      font-size: 39px;
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
  .cell_add_button {
    width: 40px;
  }
}
</style>
