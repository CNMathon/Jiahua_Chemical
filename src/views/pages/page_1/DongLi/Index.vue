<template>
  <div class="dongli">
    <van-nav-bar title="动力中心" left-text="返回" left-arrow @click-left="pageBack" fixed class="nav-bar" />
    <van-tabs
      v-model="active"
      background="#6096F8"
      color="#FC942C"
      title-active-color="#ffffff"
      title-inactive-color="#ffffff"
      class="fixed-first"
    >
      <!-- <van-search placeholder="搜索" v-model="value" /> -->
      <van-tab title="总显">
        <ActionBar></ActionBar>
        <div class="panel-list">
          <van-row v-if="$route.query.from == 'index'">
            <label v-for="(item,index) in zongxian" :key="index">
              <label v-if="item.name == '1617电量' || item.name == '1275电量' || item.name == '自用汽率' || item.name == '自用电率' || item.name == '外供蒸汽'">
                <van-col span="12" class="pannel3-area">
                  <Panel3 size="big" :name="item.name" :value="item.value" :unit="item.unit"></Panel3>
                </van-col>
              </label>
            </label>
          </van-row>
          <van-row v-else>
            <label v-for="(item,index) in zongxian" :key="index">
              <van-col span="12" class="pannel3-area">
                <Panel3 size="big" :name="item.name" :value="item.value" :unit="item.unit"></Panel3>
              </van-col>
            </label>
          </van-row>
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
          <div>平均发电量</div>
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
import Panel3 from "../components/Panel3";
import GuoLu from "./components/GuoLu";
import ZhengQi from "./components/ZhengQi";
import YanCong from "./components/YanCong";
export default {
  name: "dongli",
  components: {
    ActionBar,
    Search,
    Panel,
    Panel3,
    GuoLu,
    ZhengQi,
    YanCong
  },
  data() {
    return {
      active: 0,
      zongxian: [
        { name: "煤、化工段煤道大皮带上煤量", value: "1552.21", unit: "t" },
        { name: "煤、化工段产水量", value: "15524", unit: "t" },
        { name: "1617电量", value: "155213", unit: "KW" },
        { name: "1275电量", value: "1552.21", unit: "KW" },
        { name: "煤、化工段平均上煤量", value: "136", unit: "KW" },
        { name: "煤、化工段原水用量", value: "1552.21", unit: "t" },
        { name: "煤、化工段平均原水用量", value: "1552.21", unit: "t" },
        { name: "煤、化工段平均产水量", value: "1552.21", unit: "t/h" },
        { name: "煤、化工段回水量", value: "1552.21", unit: "t" },
        { name: "煤、化工段平均回水量", value: "1552.21", unit: "t/h" },
        { name: "自用汽量", value: "1552.21", unit: "t" },
        { name: "平均自用汽量", value: "1552.21", unit: "t/h" },
        { name: "自用汽率", value: "1552.21", unit: "" },
        { name: "自用电量", value: "1552.21", unit: "KW" },
        { name: "平均自用电量", value: "1552.21", unit: "KW" },
        { name: "自用电率", value: "1552.21", unit: "" },
        { name: "平均1617电量", value: "1552.21", unit: "KW" },
        { name: "平均1275电量", value: "1552.21", unit: "KW" },
        { name: "外供蒸汽", value: "1552.21", unit: "t" },
        { name: "外供平均蒸汽", value: "1552.21", unit: "t/h" },
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
  },
  created() {
    console.log(this.$router)
    console.log(this.$route)
    console.log(this.$route.query.from)
  }
};
</script>
<style lang="scss" scoped>
.dongli {
  .panel-list {
    width: 100%;
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

.pannel3-area {
  margin-bottom: 20px;
}

.nav-bar {
  z-index: 99 !important;
}
</style>
