<template>
  <div class="yuan-liao">
    <van-nav-bar title="原料" left-text="返回" left-arrow @click-left="pageBack" />
    <div class="content">
      <div class="nav" v-for="(items, indexs) in list" :key="indexs" @click="toPage(items.url)">
        <div class="nav-image">
          <img :src="require(`@/assets/images/msg_1.svg`)" alt />
        </div>
        <div class="nav-text">{{ items.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import base  from "@/api/request/base.js";
import { mixin } from "@/mixin/mixin";
export default {
  name: "yuan_liao",
  mixins: [mixin],
  data() {
    return {
      list: [
        {
          name: "液氯（烧碱厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FLH.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "32%氢氧化钠（烧碱厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FZLRY.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "48%氢氧化钠（烧碱厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FGYY.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "除盐水（动力中心）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FXS.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "发烟硫酸（硫酸厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FFYLS.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "工业氯磺酸（硫酸厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FLHS.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "98%精制硫酸（硫酸厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252F98%2525JZLS.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "甘油（脂肪醇厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FGY.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "C12-14（脂肪醇厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FC12-14C.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "工业油酸7075（脂肪醇厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252F7075.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "对甲苯磺酰氯（新材料厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FPTSC.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "2-硝基-4-甲砜基苯甲酸（新材料厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FBA.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        },
        {
          name: "湿品2-硝基-4-甲砜基甲苯（新材料厂）",
          url:
            `${base.sq2}webroot/decision/view/report?viewlet=mobile_apps%252FNMST.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d`
        }
      ]
    };
  },
  methods: {
    toPage(url) {
      window.open(url);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
}
.nav {
  width: calc(100% / 3);
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
</style>
