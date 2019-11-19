<template>
  <div class="home">
    <van-nav-bar title="业务管理" fixed/>
    <div class="head fixed-first">
      <div class="head-nav" @click="toPage('./wochuli/index')">
        <div class="head-nav-image">
          <img src="./../../../../assets/images/home_0.svg" />
        </div>
        <div class="head-nav-title">我处理的</div>
      </div>
      <div class="head-nav" @click="toPage('./wofaqi/index')">
        <div class="head-nav-image">
          <img src="./../../../../assets/images/home_1.svg" />
        </div>
        <div class="head-nav-title">我发起的</div>
      </div>
      <!--<div class="head-nav">
        <div class="head-nav-image">
          <img src="./../../../../assets/images/home_2.svg" alt />
        </div>
        <div class="head-nav-title">抄送我的</div>
      </div>-->
    </div>
    <div class="content">
      <div class="content-title">票务管理</div>
      <van-row type="flex" class="content-list">
        <van-col span="6" v-for="(item, index) in nav" :key="index">
          <div class="nav" @click="toPage(item.router)">
            <div class="nav-image">
              <img :src="require(`@/assets/images/nav_${item.icon ? item.icon : index}.svg`)" alt />
            </div>
            <div class="nav-text">{{ item.text }}</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="content" >
      <div class="content-title">其他</div>
      <van-row type="flex"  class="content-list">
        <van-col span="6" v-for="(item, index) in other" :key="index">
          <div class="nav" @click="toPage(item.router)">
            <div class="nav-image">
              <img :src="require(`@/assets/images/other_${index}.svg`)" alt />
            </div>
            <div class="nav-text">{{ item.text }}</div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      nav: [
        {
          text: "热力机械工作票",
          color: "rgba(23, 193, 149, 0.1)",
          icon: 'ticket',
          router: "./relijixie/index"
        },
        {
          text: "工作票",
          color: "rgba(23, 193, 149, 0.1)",
          icon: 'ticket',
          router: ""
        },
        {
          text: "工单管理",
          color: "rgba(23, 193, 149, 0.1)",
          icon: 'ticket',
          router: "./gongdanguanli/index"
        },
 
        {
          text: "动火安全",
          color: "rgba(238, 116, 95, 0.1)",
          icon: 'donghuo',
          router: "./donghuo/List"
        },
        {
          text: "受限空间安全",
          color: "rgba(78,169,232,0.1)",
          icon: 'shouxian',
          router: "./kongjian/list"
        },
        {
          text: "盲板抽堵安全",
          color: "rgba(96,150,248,0.1);",
          icon: 'mangban',
          router: "./mangban/list"
        },
        {
          text: "高处安全",
          color: "rgba(237, 246, 252, 1)",
          icon: 'gaochu',
          router: "./gaochu/list"
        },
        {
          text: "吊装安全",
          color: "rgba(239, 244, 254, 1)",
          icon: 'diaozhuang',
          router: "./diaozhuang/list"
        },
        {
          text: "临时用电",
          color: "rgba(231, 248, 244, 1)",
          icon: 'lingshi',
          router: "./linshi/list"
        },
        {
          text: "动土安全",
          color: "rgba(237, 246, 252, 1)",
          icon: 'dongtu',
          router: "./dongtu/list"
        },
        {
          text: "断路安全",
          color: "rgba(245, 166, 35, 0.14)",
          icon: 'duanlu',
          router: "./duanlu/list"
        }
      ],
      other: [
        {
          text: "隐患",
          icon: '',
          router: "./yinhuan/list"
        },
        {
          text: "违章",
          icon: '',
          router: "./weizhang/list"
        },
        {
          text: "缺陷",
          icon: '',
          router: "./quexian/list"
        }
      ]
    };
  },
  components: {},
  methods: {
    toPage(router) {
      this.$router.push({ path: router });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #f5f5f5;
  .head {
    width: 100%;
    height: 190px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 50px;
    .head-nav {
      .head-nav-image {
        width: 48px;
        height: 48px;
        margin: 32px auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .head-nav-title {
        width: 104px;
        height: 37px;
        font-size: 26px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 37px;
      }
    }
  }
  .content {
    width: 100%;
    margin-top: 24px;
    background: rgba(255, 255, 255, 1);
    .content-list{
      width: 100%;
      flex-wrap: wrap;
    }
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
  }
}
</style>
