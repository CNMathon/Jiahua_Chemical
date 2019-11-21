<template>
  <div class="gongyi">
    <van-nav-bar title="新材料" left-text="返回" left-arrow @click-left="pageBack" />

    <div>
      <van-tabs v-model="activeName">
        <van-tab v-for="(item,index) in tabList" :key="index" :title="item" :name="item"></van-tab>
      </van-tabs>
    </div>

    <Search></Search>
    <div class="list">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="data-item">{{item}}</div>
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
      list: ['焚硫炉','转化器','公用酸循环槽','脱盐水预热器','公用酸循环泵','火管废热锅炉'],
      tabList:['硫酸','烧碱','新材料','脂肪醇'],
      activeName:'硫酸'
    };
  },
  mounted(){
    this.activeName=this.$route.query.text
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
  .data-item{
    width: 100%;
    height: 126px;
    margin: 0 auto;
    background: rgba(96, 150, 248, 1);
    border-radius: 10px;
    box-sizing: border-box;
    color: white;
    text-align: center;
    line-height: 126px;
  }
}
</style>
