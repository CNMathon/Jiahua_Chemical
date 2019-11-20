<template>
  <div class="liusuan">
    <van-nav-bar title="脂肪醇" left-text="返回" left-arrow @click-left="pageBack" />
    <Search></Search>
    <ActionBar nodrop></ActionBar>
    <div class="head">
      <div>卡片名称</div>
      <div>位号</div>
      <div>值</div>
    </div>
    <div class="list">
      <!-- <div class="item" v-for="index in 4" :key="index">
        <Item></Item>
      </div>-->
      <Item2 :value="pageList"></Item2>
    </div>
  </div>
</template>
<script>
import ActionBar from "../components/ActionBar";
import Search from "../components/Search";
import DropDown from "../components/DropDown";
import Item from "./components/Item";
import Item2 from "./components/Item2";
export default {
  name: "liusuan",
  components: {
    ActionBar,
    Search,
    DropDown,
    Item,
    Item2
  },
  data() {
    return {
      pageList: [
        {
          text: "甲酯进氢化温度",
          enText: "ZFCC_TIC1203",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "氢化反应器进口温度",
          enText: "ZFCC_TIC1205",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "氢化反应器温差",
          enText: "ZFCC_TDI1208",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "冷凝甲醇温度",
          enText: "ZFCC_TI1212",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "K1201进口压力",
          enText: "ZFCC_PIC1211",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "蒸发器液位",
          enText: "ZFCC_LIC1202",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "冷凝甲醇回收罐液位",
          enText: "ZFCC_LIC1211",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "蒸发器氢气温度",
          enText: "ZFCC_TIC1222",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "加氢反应器床层进口压力",
          enText: "ZFCC_PI1205A",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "加氢反应器床层进口压力",
          enText: "ZFCC_PI1206A",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "加氢反应器床层出口压力",
          enText: "ZFCC_PI1205B",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "加氢反应器床层出口压力",
          enText: "ZFCC_PI1206B",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "加氢反应器床层压差",
          enText: "ZFCC_PDI1205",
          value: "",
          unit: "",
          level: "装置级"
        },
        {
          text: "加氢反应器床层压差",
          enText: "ZFCC_PDI1206",
          value: "",
          unit: "",
          level: "装置级"
        }
      ]
    };
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    getPageList() {
      let tagNames = [];
      // let finishCount = 0;
      // this.isLoading = false;

      // 拼接查询参数
      this.pageList.map(item => tagNames.push(item.enText));

      console.log(tagNames);
      console.log(String(tagNames));

      this.$api.page_1
        .getRtMonTagInfosByNames({
          tagNames: String(tagNames)
        })
        .then(res => {
          console.log("res", res);

          res.map((item, index) => {
            item.Value ? this.pageList[index].value = item.Value.toFixed(2) : this.pageList[index].value = "空";
            this.pageList[index].unit = item.Unit;
          });
        });
    }
  },
  created() {
    this.getPageList();
  }
};
</script>
<style lang="scss" scoped>
.liusuan {
  background-color: #ffffff;
  .head {
    width: 100vw;
    box-sizing: border-box;
    padding: 20px 80px 0 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    background-color: #ffffff;
    // div:
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
