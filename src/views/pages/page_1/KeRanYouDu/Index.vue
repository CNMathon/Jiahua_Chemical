<template>
  <div class="gongyi">
    <van-nav-bar title="可燃有毒气体" left-text="返回" left-arrow @click-left="pageBack" />

    <div>
      <van-tabs v-model="activeName" type="card" color="#6096f8">
        <div class="head">
          <div>名称</div>
          <div>位号</div>
          <div>值</div>
        </div>
        <van-tab v-for="(item,index) in tabList" :key="index" :title="item.text" :name="item.text">
          <Item :info="item.info" />
        </van-tab>
      </van-tabs>
    </div>

    <!-- <div class="list">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="data-item">{{item}}</div>
      </div>
    </div>-->
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
      // list: ['焚硫炉','转化器','公用酸循环槽','脱盐水预热器','公用酸循环泵','火管废热锅炉'],
      tabList: [
        {
          text: "动力中心",
          info: [
            {
              title: "氨水储罐A周边氨气",
              enText: "DLZX78_Y1_A0HSJ10CQ001",
              value: "",
              unit: ""
            },
            {
              title: "氨水储罐B周边氨气",
              enText: "DLZX78_Y1_A0HSJ10CQ002",
              value: "",
              unit: ""
            }
          ]
        },
        {
          text: "烧碱厂",
          info: [
            {
              title: "液氯包装东北氯气",
              enText: "SJC_AIA_1302",
              value: "",
              unit: ""
            },
            {
              title: "液氯储槽东南氯气",
              enText: "SJC_AIA_1303",
              value: "",
              unit: ""
            },
            {
              title: "液氯包装房内氯气",
              enText: "SJC_DAIA_1114",
              value: "",
              unit: ""
            },
            {
              title: "液氯汽化厂房氯气",
              enText: "SJC_DAIA_2811",
              value: "",
              unit: ""
            },
            {
              title: "电解厂房北氢气",
              enText: "SJC_AIA_2011A",
              value: "",
              unit: ""
            },
            {
              title: "电解厂房内氢气",
              enText: "SJC_CAIA2020",
              value: "",
              unit: ""
            }
          ]
        },
        {
          text: "新材料",
          info: [
            {
              title: "厂房区乙醇",
              enText: "XCLC_AIA_1006",
              value: "",
              unit: ""
            },
            {
              title: "磺化一楼X0108西甲苯",
              enText: "XCLC_GT_01001",
              value: "",
              unit: ""
            },
            {
              title: "还原投料东可燃气体",
              enText: "XCL_GI_21001",
              value: "",
              unit: ""
            },
            {
              title: "碱溶釜西南NO2",
              enText: "XCL_GI_21011",
              value: "",
              unit: ""
            },
            {
              title: "甲苯、乙醇",
              enText: "XCLC_AIA_1203",
              value: "",
              unit: ""
            },
            {
              title: "厂房区氯甲烷",
              enText: "XCLC_AIA_1017",
              value: "",
              unit: ""
            }
          ]
        },
        {
          text: "脂肪醇",
          info: [
            {
              title: "甲醇",
              enText: "GS5301",
              value: "",
              unit: ""
            },
            {
              title: "甲醇",
              enText: "GS6101",
              value: "",
              unit: ""
            },
            {
              title: "甲醇",
              enText: "GS20107a",
              value: "",
              unit: ""
            },
            {
              title: "氢气",
              enText: "GS20110a",
              value: "",
              unit: ""
            },
            {
              title: "氢气",
              enText: "GS2001",
              value: "",
              unit: ""
            }
          ]
        }
      ],
      activeName: "动力中心"
    };
  },
  created() {
    // console.log(this.Item)
    // this.getPageList1();
    // this.getPageList2();
    // this.getPageList3();
    // this.getPageList4();
    this.getPageList();
  },
  mounted() {
    this.activeName = this.$route.query.text;
  },
  methods: {
    getPageList() {
      this.isLoading = true;
      let tagNames = [];
      // let finishCount = 0;
      // this.isLoading = false;

      // 拼接查询参数
      // this.tabList.map(item => tagNames.push(item.key));
      this.tabList.map(item1 =>
        item1.info.map(item2 => tagNames.push(item2.enText))
      );

      console.log(tagNames);
      console.log(String(tagNames));

      this.$api.page_1
        .getRtMonTagInfosByNames({
          tagNames: String(tagNames)
        })
        .then(res => {
          console.log("res", res);

          res
            .filter((element1, index1) => index1 <= 1)
            .map((item2, index2) => {
              this.tabList[0].info[index2].value = item2.Value.toFixed(2);
              this.tabList[0].info[index2].unit = item2.Unit;
            });
          res
            .filter((element1, index1) => index1 > 1 && index1 <= 7)
            .map((item2, index2) => {
              this.tabList[1].info[index2].value = item2.Value.toFixed(2);
              this.tabList[1].info[index2].unit = item2.Unit;
            });
          res
            .filter((element1, index1) => index1 > 7 && index1 <= 13)
            .map((item2, index2) => {
              this.tabList[2].info[index2].value = item2.Value.toFixed(2);
              this.tabList[2].info[index2].unit = item2.Unit;
            });
          res
            .filter((element1, index1) => index1 > 13 && index1 <= 18)
            .map((item2, index2) => {
              this.tabList[3].info[index2].value = item2.Value.toFixed(2);
              this.tabList[3].info[index2].unit = item2.Unit;
            });
          console.log(res.filter((element, index1) => index1 <= 1));
          console.log(
            res.filter((element, index1) => index1 > 1 && index1 <= 7)
          );
          console.log(
            res.filter((element, index1) => index1 > 7 && index1 <= 13)
          );
          console.log(
            res.filter((element, index) => index > 13 && index <= 18)
          );
          // res.map((item, index) => {
          //   this.tabList[index].value = item.Value.toFixed(2);
          //   this.tabList[index].unit = item.Unit;
          // });
          this.isLoading = false;
        });
    },
    // getPageList2() {
    //   this.isLoading = true;
    //   let tagNames = [];
    //   // let finishCount = 0;
    //   // this.isLoading = false;

    //   // 拼接查询参数
    //   this.tabList.map(item => tagNames.push(item.key));

    //   console.log(tagNames);
    //   console.log(String(tagNames));

    //   this.$api.page_1
    //     .getRtMonTagInfosByNames({
    //       tagNames: String(tagNames)
    //     })
    //     .then(res => {
    //       console.log("res", res);

    //       res.map((item, index) => {
    //         this.tabList[index].value = item.Value.toFixed(2);
    //         this.tabList[index].unit = item.Unit;
    //       });
    //       this.isLoading = false;
    //     });
    // },
    // getPageList3() {
    //   this.isLoading = true;
    //   let tagNames = [];
    //   // let finishCount = 0;
    //   // this.isLoading = false;

    //   // 拼接查询参数
    //   this.tabList.map(item => tagNames.push(item.key));

    //   console.log(tagNames);
    //   console.log(String(tagNames));

    //   this.$api.page_1
    //     .getRtMonTagInfosByNames({
    //       tagNames: String(tagNames)
    //     })
    //     .then(res => {
    //       console.log("res", res);

    //       res.map((item, index) => {
    //         this.tabList[index].value = item.Value.toFixed(2);
    //         this.tabList[index].unit = item.Unit;
    //       });
    //       this.isLoading = false;
    //     });
    // },
    // getPageList4() {
    // this.isLoading = true;
    // let tagNames = [];
    // // let finishCount = 0;
    // // this.isLoading = false;

    // // 拼接查询参数
    // this.tabList.map(item => tagNames.push(item.key));

    // console.log(tagNames);
    // console.log(String(tagNames));

    // this.$api.page_1
    //   .getRtMonTagInfosByNames({
    //     tagNames: String(tagNames)
    //   })
    //   .then(res => {
    //     console.log("res", res);

    //     res.map((item, index) => {
    //       this.tabList[index].value = item.Value.toFixed(2);
    //       this.tabList[index].unit = item.Unit;
    //     });
    //     this.isLoading = false;
    //   });
    // },
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
  .data-item {
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
