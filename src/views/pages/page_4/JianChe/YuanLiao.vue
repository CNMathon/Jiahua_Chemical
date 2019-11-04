<template>
  <div class="yuan-liao">
    <van-nav-bar
      title="原料"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="content">
      <div
        class="nav"
        v-for="(items, indexs) in list"
        :key="indexs"
        @click="toPage(items.url)"
      >
        <div class="nav-image">
          <img :src="require(`@/assets/images/msg_1.svg`)" alt />
        </div>
        <div class="nav-text">{{ items.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "yuan_liao",
  mixins: [mixin],
  data() {
    return {
      list: [
        {
          name: "硫磺（硫酸厂）",
          url:
            "http://192.168.2.91:8080/webroot/decision/view/report?viewlet=mobile_apps%252FLH.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d"
        },
        {
          name: "棕榈仁油（脂肪醇厂）",
          url:
            "http://192.168.2.91:8080/webroot/decision/view/report?viewlet=mobile_apps%252FZLRY.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d"
        },
        {
          name: "工业盐（烧碱厂）",
          url:
            "http://192.168.2.91:8080/webroot/decision/view/report?viewlet=mobile_apps%252FGYY.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d"
        },
        {
          name: "硝酸（新材料厂）",
          url:
            "http://192.168.2.91:8080/webroot/decision/view/report?viewlet=mobile_apps%252FXS.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d"
        },
        {
          name: "甲苯（新材料厂）",
          url:
            "http://192.168.2.91:8080/webroot/decision/view/report?viewlet=mobile_apps%252FXS.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d"
        },
        {
          name: "工业二氯甲烷（新材料厂）",
          url:
            "http://192.168.2.91:8080/webroot/decision/view/report?viewlet=mobile_apps%252FELJW.cpt&ref_t=design&op=write&ref_c=eb939190-331f-45fe-aaba-90cd2968d07d"
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
