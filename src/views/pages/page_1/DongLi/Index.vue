<template>
  <div class="dongli">
    <van-nav-bar title="动力中心" left-text="返回" left-arrow @click-left="pageBack" />
    <van-tabs
      v-model="active"
      background="#6096F8"
      color="#FC942C"
      title-active-color="#ffffff"
      title-inactive-color="#ffffff"
    >
      <van-tab title="总显">
        <ActionBar></ActionBar>
        <div class="panel-list">
          <div class="panel-item" v-for="(item,index) in zongxian" :key="index">
            <Panel size="big" :name="item.name" :value="item.value" :unit="item.unit"></Panel>
          </div>
        </div>
      </van-tab>
      <van-tab title="锅炉">
        <Search></Search>
        <ActionBar></ActionBar>
        <div class="head">
          <div>锅炉名称</div>
          <div>炉平均产量</div>
          <div>煤气比</div>
        </div>
        <div class="list">
          <div class="item" v-for="index in 15" :key="index">
            <GuoLu></GuoLu>
          </div>
        </div>
      </van-tab>
      <van-tab title="汽机">
        <Search></Search>
        <ActionBar></ActionBar>
        <div class="head">
          <div>汽机名称</div>
          <div>平均</div>
          <div>汽耗</div>
        </div>
        <div class="list">
          <div class="item" v-for="index in 15" :key="index">
            <ZhengQi></ZhengQi>
          </div>
        </div>
      </van-tab>
      <van-tab title="烟囱">
        <Search></Search>
        <ActionBar></ActionBar>
        <div class="head">
          <div>烟囱名</div>
          <div>SO2</div>
          <div>NOx</div>
          <div>烟尘</div>
        </div>
        <div class="list">
          <div class="item" v-for="(item,index) in yancong" :key="index">
            <YanCong :info="item"></YanCong>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import ActionBar from "../components/ActionBar";
import Search from "../components/Search";
import Panel from "../components/Panel";
import GuoLu from "./components/GuoLu";
import ZhengQi from "./components/ZhengQi";
import YanCong from "./components/YanCong";
export default {
  name: "dongli",
  components: {
    ActionBar,
    Search,
    Panel,
    GuoLu,
    ZhengQi,
    YanCong
  },
  data() {
    return {
      active: 0,
      zongxian: [
        { name: "均产汽合计", value: "100", unit: "t/h" },
        { name: "锅炉总负荷率", value: "100", unit: "%" },
        { name: "1275电线电量", value: "100", unit: "KWh" },
        { name: "耗煤量", value: "100", unit: "t/h" },
        { name: "脱盐水产量", value: "100", unit: "t/h" },
        { name: "1617电线电量", value: "100", unit: "KWh" },
        { name: "外供气", value: "100", unit: "t/h" },
        { name: "自用汽率", value: "100", unit: "%" },
        { name: "汽机总负荷率", value: "100", unit: "%" },
        { name: "发电合计", value: "100", unit: "KW" },
        { name: "自用电率", value: "100", unit: "t/h" },
        { name: "倒送电量", value: "100", unit: "KWh" }
      ],
      yancong: [
        {
          name: "东侧2#塔",
          so2: "0.47",
          nox: "7.426",
          yanchen: "1.70"
        },
        {
          name: "东侧3#塔",
          so2: "0.02",
          nox: "23.451",
          yanchen: "1.50"
        },
        {
          name: "东侧1#炉",
          so2: "2.45",
          nox: "31.942",
          yanchen: "2.45"
        },
        {
          name: "东侧2#炉",
          so2: "3.57",
          nox: "21.453",
          yanchen: "0.65"
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
.dongli {
  .panel-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px 30px;
    align-items: center;
  }
  .panel-item:nth-child(3n + 1) {
    margin-left: auto;
  }
  .panel-item:nth-child(3n + 2) {
    margin: 0 auto;
  }
  .head {
    width: 100vw;
    box-sizing: border-box;
    padding: 20px 60px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 32px;
    background-color: #ffffff;
  }
  .list {
    box-sizing: border-box;
    padding: 30px;
    background-color: #ffffff;
    .item {
      margin-bottom: 10px;
    }
  }
}
</style>
