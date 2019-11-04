<template>
  <div class="dongli">
    <van-nav-bar
      title="动力中心"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
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
          <div class="panel-item" v-for="index in 10" :key="index">
            <Panel size="big"></Panel>
          </div>
        </div>
      </van-tab>
      <van-tab title="锅炉">
        <Search></Search>
        <ActionBar></ActionBar>
        <div class="head">
          <div>锅炉编号</div>
          <div>炉平均产量</div>
          <div>煤气比</div>
        </div>
        <div class="list">
          <div class="item" v-for="index in 15" :key="index">
            <GuoLu></GuoLu>
          </div>
        </div>
      </van-tab>
      <van-tab title="蒸汽">
        <Search></Search>
        <ActionBar></ActionBar>
        <div class="head">
          <div>烟囱名</div>
          <div>平均</div>
          <div>汽耗</div>
        </div>
        <div class="list">
          <div class="item" v-for="index in 15" :key="index">
            <ZhengQi></ZhengQi>
          </div></div
      ></van-tab>
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
          <div class="item" v-for="index in 15" :key="index">
            <YanCong></YanCong>
          </div></div
      ></van-tab>
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
      active: 0
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
