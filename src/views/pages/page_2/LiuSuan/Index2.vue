<template>
  <div class="liusuan">
    <van-nav-bar
      title="硫酸"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <Search></Search>
    <ActionBar></ActionBar>
    <div class="head">
      <div>
        <DropDown position="left"></DropDown>
      </div>
      <div>参考描述</div>
      <div>仪表位号</div>
      <div>值</div>
    </div>
    <div class="list">
      <div class="item">
        <Item
          desc="壁炉温度T101"
          id="2PIA-2001A"
          :value="65"
          unit="℃"
        />
      </div>
      <div class="item">
        <Item
          desc="氯化压力"
          id="3PICA-1001A"
          :value="65"
          unit="Mpa"
        />
      </div>
      <div class="item">
        <Item
          desc="进料流量(低液位)"
          id="2AIA-3011"
          :value="65"
          unit="μS/cm"
        />
      </div>
      <div class="item">
        <Item
          desc="用气排放中氯氧化物含量"
          id="3PICA-1101A"
          :value="65"
          unit="mm"
        />
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
  components: {
    ActionBar,
    Search,
    DropDown,
    Item
  },
  methods: {
    pageBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.liusuan {
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
