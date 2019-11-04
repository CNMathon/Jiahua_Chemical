<template>
  <div class="donghuo">
    <van-nav-bar
      title="动火安全"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value
        title="申请部门"
        required
        :value="$userInfo.officeName"
      ></cell-value>
      <!-- 申请人 -->
      <cell-value
        title="申请人"
        required
        :value="$userInfo.userName"
      ></cell-value>
      <!-- 动火地点及内容 -->
      <cell-textarea
        title="动火地点及内容"
        required
        v-model="sendData.siteContent"
        placeholder="请输入作业内容"
      ></cell-textarea>
      <!-- 动火级别 -->
      <cell-picker
        title="动火级别"
        required
        v-model="sendData.dhLevel"
        :columns="dhLevelColumns"
      ></cell-picker>
      <!-- 动火方式 -->
      <cell-select-tag
        required
        title="动火方式"
        storeKey="dhWay"
        :tagList="dhWay"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 涉及其他作业 -->
      <cell-select-tag
        required
        title="涉及其他作业"
        storeKey="otherSpecial"
        :tagList="otherSpecial"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardSb"
        :tagList="hazardSb"
        :showList="list_3"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 动火开始时间 -->
      <cell-time
        v-model="sendData.startTime"
        title="动火开始时间"
        required
      ></cell-time>
      <!-- 动火结束时间 -->
      <cell-time
        v-model="sendData.endTime"
        title="动火结束时间"
        required
      ></cell-time>
      <!-- 动火作业负责人 -->
      <cell-select-user
        title="动火作业负责人"
        required
        :storeModule="storeModule"
        storeKey="dhzyPrincipal"
        v-model="sendData.dhzyPrincipal"
      ></cell-select-user>
      <!-- 动火人 -->
      <cell-select-user
        title="动火人"
        required
        :storeModule="storeModule"
        storeKey="dhzyRen"
        v-model="sendData.dhzyRen"
      ></cell-select-user>
      <!-- 动火安全 -->
      <donghuo-confirm></donghuo-confirm>
      <!-- 抄送人 -->
      <!-- <div class="cell">
        <div class="cell_title">
          <span>抄送人</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 5"
              :key="index"
            >
              <div class="cell_other_peoples_header">
                <van-image
                  round
                  width="100%"
                  height="100%"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <span class="delete">
                  <van-icon name="cross" color="#ffffff" />
                </span>
              </div>
              <div class="cell_other_peoples_name">王安石</div>
              <div
                class="cell_other_peoples_arrow"
                v-if="index % 4 !== 0 || index === 0"
              >
                <img
                  src="./../../../../assets/images/arrow-right.svg"
                  alt
                  srcset
                />
              </div>
            </div>
            <div class="cell_other_add_peoples">+</div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="next" @click="Next">下一步</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import DonghuoConfirm from "./Confirm";
export default {
  name: "donghuo",
  mixins: [business],
  data() {
    return {
      storeModule: "donghuo",
      sendData: {
        siteContent: "", //动火地点及内容
        dhLevel: null, //动火级别
        startTime: "", //动火开始时间
        endTime: "", //动火结束时间
        dhWay: [], //动火方式
        otherSpecial: [], //涉及其他作业
        hazardSb: [], //危害辨识
        dhzyPrincipal: [], //动火作业负责人
        dhzyRen: [] //动火人
      },
      dhLevelColumns: ["制定位置特殊动火作业", "特殊", "|类", "||类"],
      list_1: [
        "电焊",
        "气（割）焊",
        "塑焊",
        "电钻",
        "风镐",
        "切割",
        "磨削",
        "喷灯"
      ],
      list_2: [
        "登高",
        "受限空间",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ],
      list_3: [
        "火灾、爆炸",
        "中度和窒息",
        "化学灼伤",
        "机械伤害",
        "触电",
        "高处坠落"
      ]
    };
  },
  computed: mapState({
    dhWay: state => state.donghuo.dhWay,
    otherSpecial: state => state.donghuo.otherSpecial,
    hazardSb: state => state.donghuo.hazardSb,
    dhzyPrincipal: state => state.donghuo.dhzyPrincipal,
    dhzyRen: state => state.donghuo.dhzyRen
  }),
  beforeDestroy() {
    this.$store.dispatch("donghuo/cleanState");
  },
  methods: {
    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.dhWay = this.stringData("dhWay", "list_1");
      sendData.otherSpecial = this.stringData("otherSpecial", "list_2");
      sendData.hazardSb = this.stringData("hazardSb", "list_3");
      sendData.dhzyPrincipal = this.userString(
        sendData.dhzyPrincipal,
        "userName"
      );
      sendData.dhzyRen = this.userString(sendData.dhzyRen, "userName");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applyRen = this.$userInfo.userName;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseDhzypSave(sendData)
        .then(res => {
          console.log("res: ", res);
          this.$Toast.success({
            message: "提交成功",
            onClose() {
              that.pageBack();
            }
          });
        })
        .catch(() => {});
    },
    pageBack() {
      this.$router.back();
    }
    // Next() {
    //   console.log(123456)
    // }
  },
  watch: {
    dhWay(res) {
      this.sendData.dhWay = res;
    },
    otherSpecial(res) {
      this.sendData.otherSpecial = res;
    },
    hazardSb(res) {
      this.sendData.hazardSb = res;
    },
    dhzyPrincipal(res) {
      this.sendData.dhzyPrincipal = res;
    },
    dhzyRen(res) {
      this.sendData.dhzyRen = res;
    }
  },
  components: {
    DonghuoConfirm
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.donghuo {
  background-color: #f5f5f5;
  .next {
    width: 100%;
    height: 98px;
    margin-top: 25px;
    font-size: 32px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    line-height: 98px;
    background: rgba(96, 150, 248, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
  }
}
</style>
