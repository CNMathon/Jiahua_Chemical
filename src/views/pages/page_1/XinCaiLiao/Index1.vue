<template>
  <div class="gongyi">
    <van-nav-bar title="新材料" left-text="返回" left-arrow @click-left="pageBack" />
    <Search></Search>
    <ActionBar nodrop />
    <div class="head">
      <div>
        <DropDown position="left" :values="dropDownValue"/>
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
  components: {
    ActionBar,
    Search,
    DropDown,
    Item
  },
  data() {
    return {
      list: [
        // {
        //   title: '磺化工艺',
        //   name: '配比—液体三氧化硫∶二氯甲烷',
        //   key: 'V0106',
        //   value: "",
        //   unit: "",
        // },
        // {
        //   title: '磺化工艺',
        //   name: '配比—甲苯∶三氧化硫溶液',
        //   key: 'V0108',
        //   value: "",
        //   unit: "",
        // },
        // {
        //   title: '磺化工艺',
        //   name: '配比—甲苯∶氯磺酸',
        //   key: 'R0101A/B',
        //   value: "",
        //   unit: "",
        // },
        {
          title: '磺化工艺',
          name: '配料温度',
          key: 'XCLC_TI_V0106',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '1#混合泵A出口温度',
          key: 'XCLC_TIA_P0105A',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '1#混合泵B出口温度',
          key: 'XCLC_TIA_P0105B',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '2#混合泵A出口温度',
          key: 'XCLC_TIA_P0105C',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '2#混合泵B出口温度',
          key: 'XCLC_TIA_P0105D',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '磺化釜温度',
          key: 'XCLC_TISA_V0108',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '氯化釜温度A',
          key: 'XCLC_TIA_0101A',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '氯化釜温度B',
          key: 'XCLC_TIA_0101B',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '分解釜温度1',
          key: 'XCLC_TIA_0103',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '分解釜温度2',
          key: 'XCLC_TIA_R0140',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '配料釜压力',
          key: 'XCLC_PI_V0106',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '分解压力',
          key: 'XCLC_PIC_V0111',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '氯化釜压力',
          key: 'XCLC_PI_V0109',
          value: "",
          unit: "",
        },
        {
          title: '磺化工艺',
          name: '尾气总管压力',
          key: 'XCLC_PIA_T0201',
          value: "",
          unit: "",
        },
        // {
        //   title: '还原工艺',
        //   name: '配比—对甲苯磺酰氯∶水∶亚硫酸钠∶碳酸钠',
        //   key: 'XCLC_R2121A/B',
        //   value: "",
        //   unit: "",
        // },
        {
          title: '还原工艺',
          name: '还原温度1',
          key: 'XCLC_TI_21047A',
          value: "",
          unit: "",
        },
        {
          title: '还原工艺',
          name: '还原温度2',
          key: 'XCLC_TI_21047B',
          value: "",
          unit: "",
        },
        {
          title: '还原工艺',
          name: '碱洗塔压力',
          key: 'XCLC_PIA_T0203',
          value: "",
          unit: "",
        },
        // {
        //   title: '甲砜工艺',
        //   name: '配比—还原液∶氯甲烷∶液碱',
        //   key: 'XCLC_R1055',
        //   value: "",
        //   unit: "",
        // },
        {
          title: '甲砜工艺',
          name: '甲基化反应温度',
          key: 'XCLC_TIC_1055',
          value: "",
          unit: "",
        },
        {
          title: '甲砜工艺',
          name: '甲基化釜压力',
          key: 'XCLC_PIAS_1055',
          value: "",
          unit: "",
        },
        // {
        //   title: '邻硝基工艺',
        //   name: '配比—硝酸∶硫酸',
        //   key: 'XCLC_R1001A/B',
        //   value: "",
        //   unit: "",
        // },
        // {
        //   title: '邻硝基工艺',
        //   name: '配比—对甲砜基甲苯（折百）∶混酸∶硫酸',
        //   key: 'XCLC_R1002A/B',
        //   value: "",
        //   unit: "",
        // },
        // {
        //   title: '邻硝基工艺',
        //   name: '配比—硝化料液∶水',
        //   key: 'XCLC_R1003A/B/C',
        //   value: "",
        //   unit: "",
        // },
        {
          title: '邻硝基工艺',
          name: '混酸配制温度1',
          key: 'XCLC_TICA_1001A',
          value: "",
          unit: "",
        },
        {
          title: '邻硝基工艺',
          name: '混酸配制温度2',
          key: 'XCLC_TICA_1001B',
          value: "",
          unit: "",
        },
        {
          title: '邻硝基工艺',
          name: '预冷水温度1',
          key: 'XCLC_TI_V1017A',
          value: "",
          unit: "",
        },
        {
          title: '邻硝基工艺',
          name: '预冷水温度2',
          key: 'XCLC_TI_V1017B',
          value: "",
          unit: "",
        },
        {
          title: '邻硝基工艺',
          name: '硝化反应温度1',
          key: 'XCLC_TICA_1001A',
          value: "",
          unit: "",
        },
        {
          title: '邻硝基工艺',
          name: '硝化反应温度2',
          key: 'XCLC_TICA_1001B',
          value: "",
          unit: "",
        },
        {
          title: '邻硝基工艺',
          name: '水析温度1',
          key: 'XCLC_TISA_1003A',
          value: "",
          unit: "",
        },
        {
          title: '邻硝基工艺',
          name: '水析温度2',
          key: 'XCLC_TISA_1003A',
          value: "",
          unit: "",
        },
        {
          title: '邻硝基工艺',
          name: '水析温度3',
          key: 'XCLC_TISA_1003C',
          value: "",
          unit: "",
        },
        // {
        //   title: 'BA工艺',
        //   name: '配比—50%硝酸：邻硝基',
        //   key: 'XCLC_R2115A/B',
        //   value: "",
        //   unit: "",
        // },
        {
          title: 'BA工艺',
          name: 'R2101A温度2',
          key: 'XCL_TI_21004A3',
          value: "",
          unit: "",
        },
        {
          title: 'BA工艺',
          name: 'R2101A温度3',
          key: 'XCL_TI_21004A4',
          value: "",
          unit: "",
        },
        {
          title: 'BA工艺',
          name: 'R2101A温度4',
          key: 'XCL_TI_21004A8',
          value: "",
          unit: "",
        },
        {
          title: 'BA工艺',
          name: 'R2101A压力1',
          key: 'XCL_PI_21004A',
          value: "",
          unit: "",
        },
        {
          title: 'BA工艺',
          name: 'R2101A原料液流量',
          key: 'XCL_FI_21009A',
          value: "",
          unit: "",
        },
        {
          title: 'BA工艺',
          name: '尾气排放中氮氧化物含量',
          key: 'XCL_AI_21004',
          value: "",
          unit: "",
        },
      ],
      dropDownValue: [
        { text: "工段", value: 0 },
        { text: "硫酸工艺", value: 1 },
        { text: "还原工艺", value: 2 },
        { text: "甲砜工艺", value: 3 },
        { text: "邻硝基工艺", value: 4 },
        { text: "BA工艺", value: 5 },
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
            item.Value
              ? (this.list[index].value = item.Value.toFixed(2))
              : (this.list[index].value = "空");
            this.list[index].unit = item.Unit;
          });
        });
    }
  },
  created() {
    this.getPageList()
  }
};
</script>
<style lang="scss" scoped>
.gongyi {
  background-color: #ffffff;
  .head {
    width: 100vw;
    box-sizing: border-box;
    padding: 20px 60px 0 30px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    font-size: 26px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    background-color: #ffffff;
    div:nth-child(2) {
      width: 20%;
    }
    div:nth-child(3) {
      width: 35%;
    }
    div:nth-child(4) {
      width: 15%;
      text-align: right;
    }
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
