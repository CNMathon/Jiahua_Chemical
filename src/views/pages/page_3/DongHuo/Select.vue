<template>
  <div class="donghuo_select">
    <van-nav-bar title="请选择" left-text="返回" left-arrow @click-left="pageBack" />
    <div class="check_box">
      <van-checkbox
        class="checkbox"
        checked-color="#1FC41D"
        v-model="checkAll"
        @click="setCheckAll"
      >全选</van-checkbox>
      <van-checkbox-group v-model="result">
        <van-checkbox
          class="checkbox"
          checked-color="#1FC41D"
          v-for="item in showList"
          :key="item"
          :name="item"
        >{{ item }}</van-checkbox>
      </van-checkbox-group>
      <van-checkbox
        class="checkbox"
        checked-color="#1FC41D"
        v-model="checkInput"
        label-disabled
        @change="setCheckInput"
      >
        <van-field placeholder="自定义输入文字" v-model="inputValue" :disabled="!checkInput" />
      </van-checkbox>
    </div>
    <div class="confirm" @click="confirm">确认({{ chaeckNumber }}/{{ AllChaeckNumber }})</div>
  </div>
</template>
<script>
export default {
  name: "donghuo_select",
  data() {
    return {
      checkAll: false,
      checkInput: false,
      select_list: 1,
      showList: [],
      list_1: [
        "电焊",
        "气（割）焊",
        "塑焊",
        "电钻",
        "风镐",
        "切割",
        "磨削",
        "喷灯"
      ],
      list_2: [
        "登高",
        "受限空间",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ],
      list_3: [
        "火灾、爆炸",
        "中度和窒息",
        "化学灼伤",
        "机械伤害",
        "触电",
        "高处坠落"
      ],
      result: [],
      inputValue: "",
      chaeckNumber: 0
    };
  },
  created() {
    // 获取显示List序列
    this.select_list = this.$route.query.index || 1;
    // 设置显示List
    this.showList = this.$route.query.showList;
    // 设置选项总数
    this.AllChaeckNumber = this.showList.length + 1;
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    // 全选-反选
    setCheckAll() {
      this.checkAll = !this.checkAll;
      this.result = this.checkAll
        ? this[`list_${this.select_list}`].map(el => el)
        : [];
      this.checkInput = this.checkAll;
    },
    // 设置是否开启自定义输入
    setCheckInput(val) {
      this.checkInput = val;
    },
    // 判断是否为全选
    isCheckAll() {
      this.chaeckNumber = this.result.length + (this.checkInput ? 1 : 0);
      if (this.showList.length === this.result.length && this.checkInput) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    // 确认选择
    confirm() {
      if (this.checkInput) {
        if (this.inputValue === "") {
          this.$notify("请输入自定义文字");
          return false;
        }
      }
      this.pageBack();
    }
  },
  watch: {
    result() {
      this.isCheckAll();
    },
    checkInput() {
      this.isCheckAll();
    }
  }
};
</script>
<style lang="scss" scoped>
.donghuo_select {
  width: 100vw;
  height: 100vh;
  position: relative;
  .check_box {
    padding: 20px 40px;
    .checkbox {
      margin: 15px 0;
      .van-cell {
        padding: 0;
        border: 1px solid #c7c7c7;
      }
    }
  }
  .confirm {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 97px;
    font-size: 32px;
    text-align: center;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 97px;
    background: rgba(96, 150, 248, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
  }
}
</style>
