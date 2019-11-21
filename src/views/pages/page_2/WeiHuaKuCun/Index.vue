<template>
  <div class="weihua">
    <van-nav-bar title="危化品库存" left-text="返回" left-arrow @click-left="pageBack"></van-nav-bar>
    <div class="top van-hairline--bottom">
      <div class="search">
        <van-search class="van-search" placeholder="搜索" v-model="value" shape="round" />
      </div>
    </div>
    <div class="content">
      <div class="head">
        <div>危化品</div>
        <div>分厂</div>
        <div>位号</div>
        <div>库存/t</div>
      </div>
      <div class="list">
        <div class="item">
          <Item :info="listData"/>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>
<script>
import Item from "./components/Item";
export default {
  name: "weihua",
  components: {
    Item
  },
  data() {
    return {
      value: "",
      show: false,
      columns: ["偏高", "正常", "偏低"],
      listData: [
        {
          name: "硫磺",
          enName: "LSC_LH_VV026",
          factory: "硫酸厂",
          value: ""
        },
        {
          name: "发烟硫酸",
          enName: "LSC_FYLS_VV014A",
          factory: "硫酸厂",
          value: ""
        },
        {
          name: "氯磺酸",
          enName: "LSC_LHS",
          factory: "硫酸厂",
          value: ""
        },
        {
          name: "盐酸",
          enName: "SJC_YS",
          factory: "烧碱厂",
          value: ""
        },
        {
          name: "盐酸",
          enName: "XCLC_YS_V1207",
          factory: "新材料厂",
          value: ""
        },
        {
          name: "液氯",
          enName: "SJC_YL",
          factory: "烧碱厂",
          value: ""
        },
        {
          name: "甲醇",
          enName: "ZFCC_JC",
          factory: "脂肪醇厂原料库",
          value: ""
        },
        {
          name: "氯甲烷",
          enName: "XCLC_LJW_V1057",
          factory: "新材料厂",
          value: ""
        },
        {
          name: "甲苯",
          enName: "XCLC_JB_V1201",
          factory: "新材料厂",
          value: ""
        },
        {
          name: "二氯甲烷",
          enName: "XCLC_RLJW_V1203",
          factory: "新材料厂",
          value: ""
        },
        {
          name: "浓硝酸",
          enName: "XCLC_NXS",
          factory: "新材料厂",
          value: ""
        },
        // {
        //   name: '氨水',
        //   enName: '',
        //   factory: '热电厂辅料库',
        //   value: '',
        // },
        {
          name: "80%硫酸",
          enName: "XCLC_LS80",
          factory: "新材料厂",
          value: ""
        },
        {
          name: "30%硫酸",
          enName: "XCLC_LS30_V1209",
          factory: "新材料厂",
          value: ""
        },
        {
          name: "30%硝酸",
          enName: "XCLC_XXS30_V1223",
          factory: "新材料厂",
          value: ""
        }
      ]
    };
  },
  methods: {
    getPageList() {
      this.isLoading = true;
      let tagNames = [];
      // let finishCount = 0;
      // this.isLoading = false;

      // 拼接查询参数
      this.listData.map(item => tagNames.push(item.enName));

      console.log(tagNames);
      console.log(String(tagNames));

      this.$api.page_1
        .getRtMonTagInfosByNames({
          tagNames: String(tagNames)
        })
        .then(res => {
          console.log("res", res);

          res.map((item, index) => {
            this.listData[index].value = item.Value.toFixed(2);
            // this.listData[index].unit = item.Unit;
          });
          this.isLoading = false;
        });
    },
    onConfirm(value, index) {
      console.log("index: ", index);
      console.log("value: ", value);
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    pageBack() {
      this.$router.back();
    }
  },
  created() {
    this.getPageList()
  }
};
</script>
<style lang="scss" scoped>
.weihua {
  background-color: #f5f5f5;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    box-sizing: border-box;
    padding: 18px 30px;
    .search {
      flex: auto;
      .van-search {
        padding: 0;
        padding-right: 20px;
      }
    }
    .tip {
      display: flex;
      align-items: center;
      .text {
        font-size: 28px;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        padding-right: 20px;
      }
      .icon {
        .van-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .content {
    width: 100%;
    background: #ffffff;
    .content-title {
      padding: 16px 30px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 42px;
      border-bottom: 1px solid #fafafa;
    }
    .head {
      width: 100vw;
      box-sizing: border-box;
      padding: 20px 60px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      font-size: 32px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 32px;
      background-color: #ffffff;
      div:nth-child(1) {
        width: 20%;
        text-align: left;
      }
      div:nth-child(2) {
        width: 20%;
        
      }
      div:nth-child(3) {
        width: 40%
      }
      div:nth-child(4) {
        width: 20%;
        text-align: right;
      }
    }
    .list {
      box-sizing: border-box;
      padding: 30px;
      padding-top: 0;
      background-color: #ffffff;
      .item {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
