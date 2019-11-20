<template>
  <div class="gongyi">
    <van-nav-bar title="新材料" left-text="返回" left-arrow @click-left="pageBack" />
    <Search></Search>
    <ActionBar></ActionBar>
    <div class="head">
      <div>
        <DropDown position="left"></DropDown>
      </div>
      <div>卡片名称</div>
      <div>位号</div>
      <div>值</div>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in list" :key="index">
        <Item :info="item"></Item>
      </div>
    </div>
  </div>
</template>
<script>
import ActionBar from "../components/ActionBar";
import Search from "../components/Search";
import DropDown from "../components/DropDown";
import Item from "./components/Item";
export default {
  name: "gongyi",
  components: {
    ActionBar,
    Search,
    DropDown,
    Item
  },
  data() {
    return {
      list: [
        {
          title: "硫磺工艺",
          name: "硫磺釜温度",
          key: "2PIA-2001A",
          value: "21"
        },
        {
          title: "还原工艺",
          name: "还原温度",
          key: "3PICA-1001A",
          value: "74",
          unit: "℃"
        },
        {
          title: "甲砜工艺",
          name: "甲基化反应温度",
          key: "2AIA-3011",
          value: "97",
          unit: "℃"
        },
        {
          title: "BA工艺",
          name: "氧化温度",
          key: "3PIA-1101A",
          value: "158",
          unit: "℃"
        }
      ]
    };
  },
  methods: {
    pageBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.gongyi {
  background-color: #ffffff;
  .head {
    width: 100vw;
    box-sizing: border-box;
    padding: 20px 60px 20px 30px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    background-color: #ffffff;
  }
  .list {
    box-sizing: border-box;
    padding: 30px;
    .item {
      margin-bottom: 10px;
    }
  }
}
</style>
