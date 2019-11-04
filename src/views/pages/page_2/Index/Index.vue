<template>
  <div class="shuju">
    <van-nav-bar title="数据监控"></van-nav-bar>
    <div class="content">
      <div class="content-title">生产运行中心</div>
      <van-row>
        <van-col span="6" v-for="(item, index) in nav" :key="index">
          <div class="nav" @click="toPage(item.router)">
            <div class="nav-image">
              <img :src="require(`@/assets/images/nav_${index + 9}.svg`)" alt />
            </div>
            <div class="nav-text">{{ item.text }}</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <div class="content-title">环保外排监控</div>
      <van-tabs
        color="#33A4E8"
        title-inactive-color="#333333"
        title-active-color="#33A4E8"
      >
        <van-tab v-for="index in 2" :key="index" :title="'入网口数据' + index">
          <div class="panel-list">
            <div class="panel-list-item" v-for="index in 6" :key="index">
              <Panel size="big"></Panel>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <div class="content-title">重大危险源监控</div>
      <van-tabs
        color="#33A4E8"
        title-inactive-color="#333333"
        title-active-color="#33A4E8"
      >
        <div slot="nav-rights" class="nav-right" @click="toWeiHuaPage()">
          <van-icon name="bars" size="20px" />
        </div>
        <van-tab v-for="index in 1" :key="index" :title="'危险品监控'">
          <div class="head">
            <div>危化品</div>
            <div>库存</div>
            <div>库存状态</div>
          </div>
          <div class="list">
            <div class="item" v-for="index in 5" :key="index">
              <Item></Item>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <div class="content-title">危险环境监控</div>
      <van-row>
        <van-col span="6" v-for="(item, index) in navs" :key="index">
          <div class="nav" @click="toPages(item, index)">
            <div class="nav-image">
              <img
                :src="require(`@/assets/images/nav_${item.imageIndex}.svg`)"
                alt
              />
            </div>
            <div class="nav-text">{{ item.text }}</div>
          </div>
        </van-col>
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
          text: "工艺卡片",
          color: "rgba(78,169,232,0.1)",
          router: "/gongyi"
        },
        {
          text: "硫酸",
          color: "rgba(96,150,248,0.1);",
          router: "/liusuan"
        },
        {
          text: "脂肪醇",
          color: "rgba(237, 246, 252, 1)",
          router: "/zhifangchun"
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
      font-size: 30px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
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
</style>
