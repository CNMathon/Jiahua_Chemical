<template>
  <div class="pei-xun">
    <van-nav-bar
      title="教育培训"
      fixed
    />
    <div class="main fixed-first">
      <div class="top">
        <div class="card">
          <div class="head">
            <div class="header">
              <img
                class="header-img"
                :src="require(`@/assets/images/gen_${gender}.svg`)"
                alt
                srcset
              />
            </div>
            <div class="name">{{ userName }}</div>
          </div>
          <van-swipe class="swipe" :show-indicators="false" @change="onChange">
            <label v-for="(item, index) in swiperData" :key="index">
              <van-swipe-item>
                <div class="title">{{ item.name }}</div>
                <div class="nav-list">
                  <label v-for="(items, indexs) in item.list" :key="indexs">
                    <div class="nav">
                      <div class="nav-title" :class="`err_${indexs}`">{{ items.value }}</div>
                      <div class="nav-sub-title">{{ items.label }}</div>
                    </div>
                  </label>
                </div>
              </van-swipe-item>
            </label>
          </van-swipe>
        </div>
        <div class="custom-indicator">
          <div
            v-for="(item, index) in 3"
            :key="index"
            class="custom-indicator-item"
            :class="{ active: index === current }"
          ></div>
        </div>
      </div>
      <div class="nav-content">
        <div class="nav-item" v-for="(item, index) in nav" :key="index" @click="toPage(item.router)">
          <div class="img">
            <img :src="require(`@/assets/images/study_${index + 1}.svg`)" alt srcset />
          </div>
          <div class="title">{{ item.text }}</div>
        </div>
      </div>
      <div class="content">
        <div class="head">
          <div class="tip"></div>
          <div class="title">我的学习</div>
          <div class="icon" @click="toPage('./xue_xi')">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="tab">
          <van-tabs
            v-model="tabActive_1"
            color="#6096F8"
            :duration="0.5"
            title-active-color="#3875E5"
            title-inactive-color="#4A4A4A"
            animated
          >
            <van-tab title="我的学习任务">
              <div class="tab-content">
                <label v-for="(item, index) in studyData.studyTask" :key="index">
                  <class-1 :info="item" v-if="index < 3"></class-1>
                </label>
                <div class="null" v-if="studyData.studyTask.length === 0">暂无数据</div>
              </div>
            </van-tab>
            <van-tab title="我的学习历史">
              <div class="tab-content">
                <label v-for="(item, index) in studyData.historyTask" :key="index">
                  <class-1 :info="item" v-if="index < 3" isStart></class-1>
                </label>
                <div class="null" v-if="studyData.historyTask.length === 0">暂无数据</div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="content">
        <div class="head">
          <div class="tip tips"></div>
          <div class="title">我的考试</div>
          <div class="icon" @click="toPage('./kao_shi')">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="tab">
          <van-tabs
            v-model="tabActive_2"
            color="#FC942C"
            :duration="0.5"
            title-active-color="#FC942C"
            title-inactive-color="#4A4A4A"
            animated
          >
            <van-tab title="我的考试任务">
              <div class="tab-content">
                <label v-for="(item, index) in testData.now" :key="index">
                  <class-2 :info="item" v-if="index < 3"></class-2>
                </label>
                <div class="null" v-if="testData.now.length === 0">暂无数据</div>
              </div>
            </van-tab>
            <van-tab title="我的考试历史">
              <div class="tab-content">
                <label v-for="(item, index) in testData.history" :key="index">
                  <class-2 :info="item" v-if="index < 3" isEnd></class-2>
                </label>
                <div class="null" v-if="testData.history.length === 0">暂无数据</div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Class1 from "./components/Class_1";
import Class2 from "./components/Class_2";
export default {
  name: "pei_xun",
  components: {
    Class1,
    Class2
  },
  data() {
    return {
      userName: "",
      load: false,
      current: 0,
      tabActive_1: 0,
      tabActive_2: 0,
      gender: 0,
      nav: [
        {
          text: "资料库",
          router: "./zi_liao_ku",
          image: 1
        },
        {
          text: "培训签到",
          router: "./qian_dao",
          image: 2
        },
        {
          text: "学习",
          router: "./xue_xi",
          image: 1
        },
        {
          text: "考试",
          router: "./kao_shi",
          image: 2
        }
      ],
      swiperData: [],
      // testHistory: [], //总记录
      studyData: {
        studyTask: [],
        historyTask: []
      }, //学习记录
      testTask: {
        studyTask: [],
        historyTask: []
      },
      testData: {
        now: [],
        history: [],
      }
    };
  },
  created() {
    if (this.load) return;
    this.getHomePage();
    this.getMyTest();
    // this.getMyTestHistory();
    this.getMyStudy();
    this.getUserName();
  },
  methods: {
    // 获取首页数据
    getHomePage() {
      let sendData = {
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_5
        .getStatisticsInfo(sendData)
        .then(res => {
          this.swiperData = res;
        })
        .catch(() => {});
    },
    // 获取用户名
    getUserName() {
      this.userName = localStorage.getItem("JiaHuaUserName");
    },
    // 获取我的学习
    getMyStudy() {
      let sendData = {
        pageNo: 1,
        pageSize: 10,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_5
        .getMyStudy(sendData)
        .then(res => {
          if (JSON.stringify(data) !== "{}") this.studyData = res[0];
        })
        .catch(() => {});
    },
    // 获取考试列表
    getMyTest() {
      this.$api.page_5
        .getMyTestHistory({
          pageNo: 1,
          pageSize: 10,
          __sid: this.$userInfo.sessionId
        })
        .then(res => {
          console.log(`testData: `, res.list)
          // this.testTask.studyTask = res.list;
          res.list.map(item => {
            console.log(item)
            if (item.isfinalsubmit == 1) {
              this.testData.history.push(item)
            } else {
              this.testData.now.push(item)
            }
          })
        })
        .catch(() => {});
    },
    // 获取考试历史
    // getMyTestHistory() {
    //   let sendData = {
    //     isfinalsubmit: 1,
    //     pageNo: 1,
    //     pageSize: 10,
    //     __sid: this.$userInfo.sessionId
    //   };
    //   this.$api.page_5
    //     .getMyTestHistory(sendData)
    //     .then(res => {
    //       this.testTask.historyTask = res.list;
    //     })
    //     .catch(() => {});
    // },
    onChange(index) {
      this.current = index;
    },
    toPage(router) {
      if (router === "") return;
      this.$router.push({ path: `${router}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.pei-xun {
  width: 100vw;
  background-color: #f6f6f6;
  .top {
    width: 100vw;
    height: 429px;
    position: relative;
    padding-top: 30px;
    background: url("../../../../assets/images/study_bg.svg");
    background-size: cover;
    .card {
      width: 690px;
      height: 346px;
      box-shadow: 0px 4px 16px 0px rgba(32, 76, 156, 1);
      border-radius: 20px;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 1);
      margin: 0 auto;
      .head {
        padding: 20px;
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 1);
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        .header {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background-color: #f6f6f6;
          overflow: hidden;
          .header-img {
            width: 74px;
            height: 74px;
            border-radius: 50%;
          }
        }
        .name {
          font-size: 34px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 34px;
          margin-left: 20px;
        }
      }
      .swipe {
        width: 690px;
        height: 231px;
        margin: 0 auto;

        .title {
          font-size: 30px;
          font-weight: 500;
          color: rgba(56, 117, 229, 1);
          line-height: 70px;
          padding: 0 20px;
        }
        .nav-list {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 20px;
          .nav {
            text-align: center;
            .nav-title {
              font-size: 60px;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              line-height: 60px;
            }
            .err_2 {
              color: #fc942c;
            }
            .err_3 {
              color: #cf2323;
            }
            .nav-sub-title {
              font-size: 24px;
              color: rgba(102, 102, 102, 1);
              line-height: 33px;
            }
          }
        }
      }
    }
    .custom-indicator {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      .custom-indicator-item {
        width: 12px;
        height: 12px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        margin: 0 5px;
      }
      .active {
        background: rgba(255, 255, 255, 1);
      }
    }
  }
  .nav-content {
    width: 100%;
    height: 208px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: space-around;
    .nav-item {
      text-align: center;
      .img {
        margin: 0 auto;
        width: 90px;
        height: 90px;
        img {
          width: 90px;
          height: 90px;
        }
      }
      .title {
        font-size: 28px;
        color: rgba(68, 68, 68, 1);
        line-height: 68px;
      }
    }
  }
  .content {
    margin-top: 20px;
    background-color: #ffffff;
    .head {
      width: 100%;
      height: 105px;
      padding-left: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid rgba(229, 229, 229, 1);
      .tip {
        width: 6px;
        height: 34px;
        background: rgba(56, 117, 229, 1);
      }
      .tip {
        background: rgba(252, 148, 44, 1);
      }
      .title {
        font-size: 36px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-left: 10px;
        margin-right: auto;
      }
      .icon {
        height: 100%;
        padding: 0 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .tab {
      .tab-content {
        padding: 20px 30px;
      }
    }
  }
  .null {
    text-align: center;
    font-size: 14px;
    line-height: 60px;
  }
}
</style>
