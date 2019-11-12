<template>
  <div class="home">
    <van-nav-bar 
      title="首页"
      fixed="true"
      class="navbar"
    >
      <div slot="left" class="sign-out" @click="signOut">退出</div>
      <van-icon
        slot="right"
        class-prefix="iconfont"
        name="jinggao"
        size="1.125rem"
        color="#F39800"
        @click="toPage('./error')"
      />
    </van-nav-bar>
    <div class="content fixed-first">
      <div class="content-title">生产运行</div>
      <van-row>
        <van-col span="6" v-for="(item, index) in nav" :key="index">
          <div class="nav" @click="toPage(item.router)">
            <div class="nav-image">
              <img :src="require(`@/assets/images/nav_${index}.svg`)" alt />
            </div>
            <div class="nav-text">{{ item.text }}</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <div class="content-title">安全环保</div>
      <van-tabs
        color="#33A4E8"
        title-inactive-color="#333333"
        title-active-color="#33A4E8"
      >
        <div slot="nav-rights" class="nav-right" @click="toPage('./shebei')">
          <van-icon name="bars" size="20px" />
        </div>
        <van-tab
          v-for="index in 8"
          :key="index"
          :title="'岗位' + index"
          class="tabs-box"
        >
          <div class="tabs-box-item" v-for="index in 3" :key="index">
            <Liquidfill :type="index"></Liquidfill>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <div class="content-title">重要设备状态</div>
      <van-tabs
        color="#33A4E8"
        title-inactive-color="#333333"
        title-active-color="#33A4E8"
      >
        <div slot="nav-rights" class="nav-right" @click="toPage('./shebei')">
          <van-icon name="bars" size="20px" />
        </div>
        <van-tab
          v-for="index in 8"
          :key="index"
          :title="'设备' + index"
          class="tabs-box"
        >
          <ActionBar></ActionBar>
          <div class="tabs-box-item">
            <Panel name="温度" value="155℃"></Panel>
          </div>
          <div class="tabs-box-item">
            <Panel name="压力" value="61 Pa"></Panel>
          </div>
          <div class="tabs-box-item">
            <Panel name="液位" value="329M"></Panel>
          </div>
          <!-- <div class="tabs-box-item">
            <Panel2 :type="index"></Panel2>
          </div> -->
        </van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <div class="content-title">启停时间</div>
      <SelectTime v-model="date_1"></SelectTime>
      <div>
        <LineChart></LineChart>
      </div>
    </div>
    <div class="content">
      <div class="content-title">液位历史曲线</div>
      <SelectTime v-model="date_2"></SelectTime>
      <div>
        <LineCharts></LineCharts>
      </div>
    </div>
  </div>
</template>

<script>
import Liquidfill from "./components/Liquidfill";
import Panel from "../components/Panel";
import Panel2 from "../components/Panel2";
import ActionBar from "../components/ActionBar";
import SelectTime from "./components/SelectTime";
import LineChart from "./components/LineChart";
import LineCharts from "./components/LineCharts";
export default {
  name: "home",
  components: {
    Liquidfill,
    Panel,
    Panel2,
    ActionBar,
    SelectTime,
    LineChart,
    LineCharts
  },
  data() {
    return {
      nav: [
        {
          text: "动力中心",
          color: "rgba(23, 193, 149, 0.1)",
          router: "./dongli"
        },
        {
          text: "烧碱",
          color: "rgba(238, 116, 95, 0.1)",
          router: "./shaojian"
        },
        {
          text: "新材料",
          color: "rgba(78,169,232,0.1)",
          router: "./gongyi"
        },
        {
          text: "硫酸",
          color: "rgba(96,150,248,0.1);",
          router: "./liusuan"
        },
        {
          text: "脂肪醇",
          color: "rgba(237, 246, 252, 1)",
          router: "./zhifangchun"
        }
      ],
      date_1: new Date(),
      date_2: new Date()
    };
  },
  methods: {
    // 退出
    signOut() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "请确认是否退出登录"
        })
        .then(() => {
          localStorage.removeItem("JiaHuaSessionId");
          localStorage.removeItem("JiaHuaOfficeCode");
          localStorage.removeItem("JiaHuaUserName");
          localStorage.removeItem("JiaHuaOfficeName");
          this.$router.replace({
            path: "/login"
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    toPage(router) {
      this.$router.push({ path: router });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
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
        width: 113px;
        height: 113px;
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
    .van-tabs__nav--line {
      width: calc(100% - 50px);
    }
    .nav-right {
      width: 100px;
      height: 88px;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tabs-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      .tabs-box-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0 30px 0;
      }
    }
  }
}

.fixed-first {
  margin-top: 46px;
}

.navbar {
  z-index: 99 !important;
}
</style>
