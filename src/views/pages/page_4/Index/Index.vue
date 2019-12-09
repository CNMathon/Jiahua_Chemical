<template>
  <div class="shuju">
    <van-nav-bar
      title="信息查询"
      fixed
    />
    <div class="app fixed-first">
      <div class="content" v-for="(item, index) in nav" :key="index">
        <div class="content-title">{{ item.title }}</div>
        <van-row>
          <van-col span="6" v-for="(items, indexs) in item.navs" :key="indexs">
            <div class="nav" @click="toPage(items.router)">
              <div class="nav-image">
                <img
                  :src="require(`@/assets/images/msg_${items.image}.svg`)"
                  alt
                />
              </div>
              <div class="nav-text">{{ items.text }}</div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "xin_xi_zhong_xin",
  data() {
    return {
      nav: [
        {
          title: "质量检测台账",
          navs: [
            {
              text: "原料",
              router: "./jian_che/yuan_liao",
              image: 1
            },
            {
              text: "产品",
              router: "./jian_che/chan_pin",
              image: 2
            }
          ]
        },
        {
          title: "承包商台账",
          navs: [
            {
              text: "承包商信息",
              router: "./cheng_bao_shang",
              image: 3
            },
            {
              text: "承包商人员信息",
              router: "./cheng_bao_shang_ren_yuan",
              image: 4
            }
          ]
        },
        {
          title: "设备台账",
          navs: [
            {
              text: "设备档案",
              router: "./she_bei_dang_an",
              image: 5
            },
            {
              text: "维护保养",
              router: "./wei_hu_bao_yang",
              image: 6
            }
          ]
        },
        {
          title: "人员安全台账",
          navs: [
            {
              text: "员工安全信息台账",
              router: "./yuan_gong_an_quan",
              image: 7
            }
          ]
        }
      ]
    };
  },
  methods: {
    toPage(router) {
      if (router === "") return;
      this.$router.push({ path: `${router}` });
    }
  }
};
</script>
<style lang="scss" scoped>
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
