<template>
  <div class="liusuan">
    <van-nav-bar title="硫酸" left-text="返回" left-arrow @click-left="pageBack" fixed />
    <van-skeleton title :row="3" :loading="isLoading" class="fixed-first">
      <div class="fixed-first">
        <Search></Search>
        <ActionBar nodrop />
        <div class="head">
          <div>参考描述</div>
          <div>位号</div>
          <div>值</div>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index">
          <Item :desc="item.title" :id="item.key" :value="item.value" :unit="item.unit" />
        </div>
      </div>
    </van-skeleton>
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
    },
    getPageList() {
      this.isLoading = true;
      let tagNames = [];
      // let finishCount = 0;
      // this.isLoading = false;

      // 拼接查询参数
      this.list.map(item => tagNames.push(item.key));

      console.log(tagNames);
      console.log(String(tagNames));

      this.$api.page_1
        .getRtMonTagInfosByNames({
          tagNames: String(tagNames)
        })
        .then(res => {
          console.log("res", res);

          res.map((item, index) => {
            this.list[index].value = item.Value.toFixed(2);
            this.list[index].unit = item.Unit;
          });
          this.isLoading = false;
        });
    }
  },
  data() {
    return {
      list: [
        {
          title: "汽轮机",
          key: "LSC_SI-1601",
          value: "",
          unit: ""
        },
        {
          title: "电风机转速",
          key: "LSC_SITS_1701",
          value: "",
          unit: ""
        },
        {
          title: "空气流量",
          key: "LSC_FI_1201",
          value: "",
          unit: ""
        },
        {
          title: "焚硫炉出口炉气温度",
          key: "LSC_TIAS_1201",
          value: "",
          unit: ""
        },
        {
          title: "焚硫炉出口炉气温度",
          key: "LSC_TIAS_1202",
          value: "",
          unit: ""
        },
        {
          title: "中压蒸汽流量",
          key: "LSC_FIQ1503",
          value: "",
          unit: ""
        },
        {
          title: "余热锅炉汽包压力",
          key: "LSC_PIRA-1502",
          value: "",
          unit: ""
        },
        {
          title: "余热锅炉液位",
          key: "LSC_LIC1501",
          value: "",
          unit: ""
        },
        {
          title: "余热锅炉液位",
          key: "LSC_LIC1502",
          value: "",
          unit: ""
        },
        {
          title: "转化器一段入口气温",
          key: "LSC_TI_1204",
          value: "",
          unit: ""
        },
        {
          title: "转化器一段出口温度",
          key: "LSC_TI_1206A",
          value: "",
          unit: ""
        },
        {
          title: "转化器二段入口气温",
          key: "LSC_TI_1209",
          value: "",
          unit: ""
        },
        {
          title: "转化器三段入口气温",
          key: "LSC_TI_1213",
          value: "",
          unit: ""
        },
        {
          title: "转化器四段入口气温",
          key: "LSC_TI_1218",
          value: "",
          unit: ""
        },
        {
          title: "公用酸循环槽酸浓",
          key: "LSC_AICAS_1302",
          value: "",
          unit: ""
        },
        {
          title: "干燥塔上塔酸流量",
          key: "LSC_FIA_1301",
          value: "",
          unit: ""
        },
        {
          title: "一吸塔上塔酸流量",
          key: "LSC_FIA_1302",
          value: "",
          unit: ""
        },
        {
          title: "二吸塔上塔酸流量",
          key: "LSC_FICAS_1304",
          value: "",
          unit: ""
        },
        {
          title: "三氧化硫蒸发器A温度",
          key: "LSC_TI_128",
          value: "",
          unit: ""
        },
        {
          title: "三氧化硫蒸发器B温度",
          key: "LSC_TI_130",
          value: "",
          unit: ""
        },
        {
          title: "三氧化硫中间槽A液位",
          key: "LSC_LI_104A1",
          value: "",
          unit: ""
        },
        {
          title: "三氧化硫中间槽A液位",
          key: "LSC_LI_104A2",
          value: "",
          unit: ""
        },
        {
          title: "三氧化硫中间槽B液位",
          key: "LSC_LI_104B1",
          value: "",
          unit: ""
        },
        {
          title: "三氧化硫中间槽B液位",
          key: "LSC_LI_104B2",
          value: "",
          unit: ""
        },
        {
          title: "低压蒸汽流量",
          key: "LSC_FI_109",
          value: "",
          unit: ""
        },
        // {
        //   title: "浓盐酸流量",
        //   key: "LSC_FICA101",
        //   value: "",
        //   unit: ""
        // },
        {
          title: "脱吸塔顶部温度",
          key: "LSC_TIA102",
          value: "",
          unit: ""
        },
        {
          title: "脱吸塔底部温度",
          key: "LSC_TIA109",
          value: "",
          unit: ""
        },
        {
          title: "尾气SO2浓度",
          key: "LSC_AI-2209",
          value: "",
          unit: ""
        },
        {
          title: "雨排水pH",
          key: "LSC_PH_106",
          value: "",
          unit: ""
        },
        {
          title: "液硫储罐液位",
          key: "LSC_LIAS_1103",
          value: "",
          unit: ""
        },
        {
          title: "98%硫酸储罐A液位",
          key: "LSC_LIAS_1401",
          value: "",
          unit: ""
        },
        {
          title: "98%硫酸储罐B液位",
          key: "LSC_LIAS_1402",
          value: "",
          unit: ""
        },
        {
          title: "氯磺酸储罐A液位",
          key: "LSC_LI-1403",
          value: "",
          unit: ""
        },
        {
          title: "氯磺酸储罐B液位",
          key: "LSC_LI-1404",
          value: "",
          unit: ""
        },
        {
          title: "氯磺酸储罐C液位",
          key: "LSC_LI-1405",
          value: "",
          unit: ""
        },
        {
          title: "精制98%硫酸储罐液位",
          key: "LSC_LIAS_1408",
          value: "",
          unit: ""
        },
        {
          title: "96%硫酸储罐A液位",
          key: "LSC_LIAS_1409A",
          value: "",
          unit: ""
        },
        {
          title: "96%硫酸储罐B液位",
          key: "LSC_LIAS_1409B",
          value: "",
          unit: ""
        },
        {
          title: "AR硫酸储罐A液位",
          key: "LSC_LIAS_1410A",
          value: "",
          unit: ""
        },
        {
          title: "AR硫酸储罐B液位",
          key: "LSC_LIAS_1410B",
          value: "",
          unit: ""
        },
        {
          title: "200m3精制98%硫酸储罐液位",
          key: "LSC_LIAS_1411",
          value: "",
          unit: ""
        },
        {
          title: "22%发烟硫酸储罐液位",
          key: "LSC_LIAS_1406",
          value: "",
          unit: ""
        },
        {
          title: "副产硫酸储罐液位",
          key: "LSC_LIAS_1407",
          value: "",
          unit: ""
        }
      ],
      isLoading: true
    };
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
    padding: 20px 60px 20px 60px;
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
