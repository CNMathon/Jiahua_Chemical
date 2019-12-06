<template>
  <div class="gongyi">
    <van-nav-bar title="异常报警" left-text="返回" left-arrow @click-left="pageBack" fixed />
    <div class="head fixed-first">
      <div>
        <DropDown position="right"></DropDown>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <Item :info="item" />
      </div>
    </div>
  </div>
</template>
<script>
import DropDown from "../components/DropDown";
import Item from "./components/Item";
export default {
  name: "error",
  components: {
    DropDown,
    Item
  },
  data() {
    return {
      listData: []
    };
  },
  created() {
    this.getPageList();
  },
  methods: {
    getPageList() {
      this.$api.page_3
        .apiAlarmHistoryAlarmRecords({
          __sid: localStorage.JiaHuaSessionId,
          userid: "EMP_201900031",
          regionid: "0101001",
          queryTime: this.getFormatNowDate,
          rows: 20,
          status: 1
        })
        .then(res => {
          console.log(`listData: `, res.response.datas);
          this.listData = res.response.datas
        });
    },
    pageBack() {
      this.$router.back();
    }
  },
  computed: {
    getFormatNowDate() {
      return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`
    }
  }
};
</script>
<style lang="scss" scoped>
.gongyi {
  background-color: #f5f5f5;
  .head {
    width: 100vw;
    box-sizing: border-box;
    padding: 20px 30px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 26px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    background-color: #ffffff;
  }
  .list {
    box-sizing: border-box;
    padding: 30px;
    .item {
      margin-bottom: 20px;
    }
  }
}
</style>
