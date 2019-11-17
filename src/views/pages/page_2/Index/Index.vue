<template>
  <div class="shuju">
    <van-nav-bar title="数据监控" fixed class="z-index-highest"/>
    <!-- 生产运行指标 (嘉化能源) -->
    <div class="content fixed-first">
      <div class="content-title">生产运行指标 (嘉化能源)</div>
      <van-row>
        <label v-for="(item, index) in nav" :key="index">
          <van-col span="6" v-if="index <= 2">
            <div class="nav" @click="toPage(item.router)">
              <div class="nav-image">
                <img :src="require(`@/assets/images/nav_${index + 9}.svg`)" alt />
              </div>
              <div class="nav-text">{{ item.text }}</div>
            </div>
          </van-col>
        </label>
      </van-row>
    </div>
    <!-- 生产运行指标 (嘉福新材料) -->
    <div class="content">
      <van-row>
        <div class="content-title">生产运行指标 (嘉福新材料)</div>
        <label v-for="(item, index) in nav" :key="index">
          <van-col span="6" v-if="index > 2">
            <div class="nav" @click="toPage(item.router)">
              <div class="nav-image">
                <img :src="require(`@/assets/images/nav_${index + 9}.svg`)" alt />
              </div>
              <div class="nav-text">{{ item.text }}</div>
            </div>
          </van-col>
        </label>
      </van-row>
    </div>
    <!-- 重大危险源监控 -->
    <div class="content">
      <div class="content-title">重大危险源监控</div>
      <van-row>
        <label v-for="(item, index) in MajHazNav" :key="index">
          <van-col span="6">
            <div class="nav" @click="toPage(item.router)">
              <div class="nav-image">
                <img :src="require(`@/assets/images/nav_${item.imageIndex}.svg`)" alt />
              </div>
              <div class="nav-text">{{ item.text }}</div>
            </div>
          </van-col>
        </label>
      </van-row>
    </div>
    <!-- 危化品监控 -->
    <div class="content">
      <div class="content-title">危化品监控</div>
      <van-tabs color="#33A4E8"
        title-inactive-color="rgba(0, 0, 0, .65)"
        title-active-color="#33A4E8"
      >
        <div class="item-title">
          <div class="item-title-item">危化品</div>
          <div class="item-title-item">分厂</div>
          <div class="item-title-item">库存</div>
        </div>
        <van-tab v-for="(item, index) in dangerInfo" :key="index" :title="item.text" >
          <div class="item-area">
            <Item size="big" :info="item.info" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 环保外排监控 -->
    <div class="content">
      <div class="content-title">环保外排监控</div>
      <van-tabs color="#33A4E8" title-inactive-color="#333333" title-active-color="#33A4E8">
        <van-tab title="入网口数据">
          <div class="panel-list">
            <div class="panel-list-item" v-for="(item, index) in envEntData" :key="index">
              <Panel size="big" :name="item.text" :value="item.value" />
            </div>
          </div>
        </van-tab>
        <van-tab title="雨排水排放数据">
          <div class="panel-list">
            <div class="panel-list-item" v-for="(item, index) in envRainData" :key="index">
              <Panel size="big" :name="item.text" :value="item.value"></Panel>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 危险环境监控 -->
    <div class="content">
      <div class="content-title">危险环境监控</div>
      <van-row>
        <van-col span="6" v-for="(item, index) in navs" :key="index">
          <div class="nav" @click="toPages(item, index)">
            <div class="nav-image">
              <img :src="require(`@/assets/images/nav_${item.imageIndex}.svg`)" alt />
            </div>
            <div class="nav-text">{{ item.text }}</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 主要关键设备状态 (嘉化能源) -->
    <div class="content">
      <div class="content-title">主要关键设备状态 (嘉化能源)</div>
      <van-row>
        <label v-for="(item, index) in nav" :key="index">
          <van-col span="6" v-if="index <= 2">
            <div class="nav" @click="toPage(item.router)">
              <div class="nav-image">
                <img :src="require(`@/assets/images/nav_${index + 9}.svg`)" alt />
              </div>
              <div class="nav-text">{{ item.text }}</div>
            </div>
          </van-col>
        </label>
      </van-row>
    </div>
    <!-- 主要关键设备状态 (嘉福新材料) -->
    <div class="content">
      <van-row>
        <div class="content-title">主要关键设备状态 (嘉福新材料)</div>
        <label v-for="(item, index) in nav" :key="index">
          <van-col span="6" v-if="index > 2">
            <div class="nav" @click="toPage(item.router)">
              <div class="nav-image">
                <img :src="require(`@/assets/images/nav_${index + 9}.svg`)" alt />
              </div>
              <div class="nav-text">{{ item.text }}</div>
            </div>
          </van-col>
        </label>
      </van-row>
    </div>
  </div>
</template>
<script>
import Panel from "../../page_1/components/Panel";
import Item from "./components/Item";
export default {
  name: "shuJu",
  components: {
    Panel,
    Item
  },
  data() {
    return {
      dangerInfo: [
        {
          text: "危化品库存监控",
          info: [
            {
              itemName: "硫磺",
              factory: "硫酸厂",
              value: "89"
            },
            {
              itemName: "发烟硫酸",
              factory: "硫酸厂",
              value: "70"
            },
            {
              itemName: "氯磺酸",
              factory: "硫酸厂",
              value: "86"
            },
            {
              itemName: "盐酸",
              factory: "烧碱厂",
              value: "71"
            },
          ]
        },
        {
          text: "可燃有毒气体",
          info: [
            {
              itemName: "硫磺",
              factory: "硫酸厂",
              value: "89"
            },
            {
              itemName: "发烟硫酸",
              factory: "硫酸厂",
              value: "70"
            },
            {
              itemName: "氯磺酸",
              factory: "硫酸厂",
              value: "86"
            },
            {
              itemName: "盐酸",
              factory: "烧碱厂",
              value: "71"
            },
          ]
        },
        {
          text: "动力中心柴油库",
          info: [
            {
              itemName: "硫磺",
              factory: "硫酸厂",
              value: "89"
            },
            {
              itemName: "发烟硫酸",
              factory: "硫酸厂",
              value: "70"
            },
            {
              itemName: "氯磺酸",
              factory: "硫酸厂",
              value: "86"
            },
            {
              itemName: "盐酸",
              factory: "烧碱厂",
              value: "71"
            },
          ]
        },
      ],
      nav: [
        {
          text: "动力中心",
          color: "rgba(23, 193, 149, 0.1)",
          router: "/dongli"
        },
        {
          text: "烧碱",
          color: "rgba(238, 116, 95, 0.1)",
          router: "/shaojian"
        },
        {
          text: "脂肪醇",
          color: "rgba(237, 246, 252, 1)",
          router: "/zhifangchun"
        },
        {
          text: "新材料",
          color: "rgba(78,169,232,0.1)",
          router: "/gongyi"
        },
        {
          text: "硫酸",
          color: "rgba(96,150,248,0.1);",
          router: "/liusuan"
        }
      ],
      navs: [
        {
          text: "柴油库",
          color: "rgba(23, 193, 149, 0.1)",
          router: "/dongli",
          imageIndex: 14
        },
        {
          text: "烧碱厂",
          color: "rgba(238, 116, 95, 0.1)",
          router: "/shaojian",
          imageIndex: 10
        },
        {
          text: "新材料",
          color: "rgba(78,169,232,0.1)",
          router: "/gongyi",
          imageIndex: 15
        },
        {
          text: "硫酸",
          color: "rgba(96,150,248,0.1);",
          router: "/liusuan",
          imageIndex: 12
        }
      ],
      MajHazNav: [
        {
          text: "烧碱厂",
          color: "rgba(238, 116, 95, 0.1)",
          router: "/shaojian",
          imageIndex: 10
        },
        {
          text: "新材料",
          color: "rgba(78,169,232,0.1)",
          router: "/gongyi",
          imageIndex: 12
        },
        {
          text: "硫酸",
          color: "rgba(96,150,248,0.1);",
          router: "/liusuan",
          imageIndex: 13
        }
      ],
      envEntData: [
        {
          text: "PH",
          value: "8"
        },
        {
          text: "COD",
          value: "450 mg/l"
        },
        {
          text: "氨氮",
          value: "30 mg/l"
        },
        {
          text: "总磷",
          value: "8 mg/l"
        },
        {
          text: "MLSS",
          value: "400"
        },
        {
          text: "入网流量",
          value: "256 m²/h"
        }
      ],
      envRainData: [
        {
          text: "PH",
          value: "123"
        },
        {
          text: "COD",
          value: "400 mg/l"
        },
        {
          text: "氨氮",
          value: "28 mg/l"
        },
        {
          text: "总磷",
          value: "10 mg/l"
        },
        {
          text: "MLSS",
          value: "402"
        },
        {
          text: "入网流量",
          value: "352 m²/h"
        }
      ]
    };
  },
  methods: {
    toPage(router) {
      this.$router.push({ path: `/page_1${router}` });
    },
    toPages(item, index) {
      this.$router.push({
        path: "./templatepage",
        query: {
          index: index,
          title: item.text
        }
      });
    },
    toWeiHuaPage() {
      this.$router.push({ path: "./weihua" });
    }
  }
};
</script>
<style lang="scss">
.shuju {
  background-color: #f5f5f5;
  .content {
    width: 100%;
    margin-top: 24px;
    background: #ffffff;
    .content-title {
      padding: 16px 30px;
      font-size: 27px;
      font-weight: 500;
      color: #666;
      font-weight: bold;
      line-height: 42px;
      border-bottom: 1px solid #fafafa;
    }
    .nav {
      padding: 17px;
      text-align: center;
      .nav-image {
        margin: 0 auto;
        width: 110px;
        height: 110px;
        border-radius: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nav-text {
        margin-top: 8px;
        font-size: 26px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 37px;
      }
    }
    .head {
      width: 100vw;
      box-sizing: border-box;
      padding: 20px 60px;
      margin: 0 auto;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 32px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 32px;
      background-color: #ffffff;
    }
    .panel-list {
      box-sizing: border-box;
      padding: 0 30px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px 30px;
      align-items: center;
      margin-top: 40px;
      padding-bottom: 40px;
      .panel-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .panel-list-item:nth-child(3n + 1) {
        margin-left: auto;
      }
      .panel-list-item:nth-child(3n + 3) {
        margin-right: auto;
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


.item-title {
  margin-top: 20px !important;
  margin-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
  .item-title-item {
    font-size: 28px;
    width: 33%;
    &:nth-child(2) {
      text-align: center
    }
    &:nth-child(3) {
      text-align: right
    }
  }
}
</style>
