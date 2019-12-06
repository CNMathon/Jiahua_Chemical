<template>
  <div class="shaojian">
    <van-nav-bar title="烧碱" left-text="返回" left-arrow @click-left="pageBack" />
    <Search></Search>
    <!-- <ActionBar></ActionBar> -->
    <div class="head">
      <div>
        <DropDown position="left"></DropDown>
      </div>
      <div>参考描述</div>
      <div>仪表位号</div>
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
  name: "shaojian",
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
          title: "电解",
          name: "A套总管氯气压力",
          key: "2PIA-2001A",
          value: "65",
          unit: "kPa"
        },
        {
          title: "氢处理",
          name: "A套总管氢气压力",
          key: "2PIA-2002",
          value: "73",
          unit: "kPa"
        },
        {
          title: "氯处理",
          name: "B套总管氯气压力",
          key: "3PIA-2001",
          value: "62",
          unit: "ppm"
        },
        {
          title: "液氯储存",
          name: "B套总管氢气压力",
          key: "3PIA-2002",
          value: "49",
          unit: "MPa"
        },
        {
          title: "氯气液化",
          name: "A套氯氢压差",
          key: "2PdV-2001A",
          value: "52",
          unit: "ppm"
        },
        {
          title: "液氯气化",
          name: "B套氯氢压差",
          key: "3PdV-2003A",
          value: "94",
          unit: "ppm"
        },
        {
          title: "成品储运",
          name: "A套1#电解槽单元槽槽电压",
          key: "EI-R2001A",
          value: "63",
          unit: "%  "
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
.shaojian {
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
