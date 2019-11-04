<template>
  <div class="donghuo">
    <van-nav-bar
      title="受限空间安全"
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
      <!-- 受限空间所属空间 -->
      <div class="cell">
        <div class="cell_title">
          <span>受限空间所属空间</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value" @click="routeToChoose">
          <span>{{ sendData.zySskj.length == 0 ? "单位名称" : zySskj }}</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 作业内容 -->
      <cell-textarea
        title="作业内容"
        required
        v-model="sendData.zyContent"
        placeholder="请输入作业内容"
      ></cell-textarea>
      <!-- 设备名称 -->
      <cell-input
        title="设备名称"
        required
        v-model="sendData.devicename"
        placeholder="请输入设备名称"
      ></cell-input>
      <!-- 受限空间原有界质 -->
      <cell-input
        title="受限空间原有界质"
        required
        v-model="sendData.sxkjNeurogen"
        placeholder="请输入界质名称"
      ></cell-input>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="zyOtherspecial"
        :tagList="zyOtherspecial"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="zywhBs"
        :tagList="zywhBs"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 作业开始时间 -->
      <cell-time
        title="作业开始时间"
        required
        v-model="sendData.zyStarttime"
      ></cell-time>
      <!-- 作业结束时间 -->
      <cell-time
        title="作业结束时间"
        v-model="sendData.zyEndtime"
        required
      ></cell-time>
      <!-- 作业部门负责人 -->
      <div class="cell">
        <div class="cell_title">
          <span>作业部门负责人</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 7"
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
      </div>
      <!-- 监护人 -->
      <div class="cell">
        <div class="cell_title">
          <span>监护人</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 7"
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
      </div>
      <!-- 作业人 -->
      <div class="cell">
        <div class="cell_title">
          <span>作业人</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 7"
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
      </div>
      <!-- 抄送人 -->
      <div class="cell">
        <div class="cell_title">
          <span>抄送人</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 7"
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
      </div>
    </div>
    <div class="next" @click="Next">下一步</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "../../../../mixin/business";
export default {
  name: "kongjian",
  mixins: [business],
  data() {
    return {
      storeModule: "kongjian",
      sendData: {
        zyContent: "", //作业内容
        devicename: "", //设备名称
        sxkjNeurogen: "", //受限空间内原有介质
        zyOtherspecial: [], //涉及的其他特殊作业
        zywhBs: [], //危害辨识
        zyStarttime: "", //作业开始时间
        zyEndtime: "", //作业结束时间
        zySskj: [] // 受限空间所属空间
      },
      list_1: [
        "登高",
        "动火",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ],
      list_2: [
        "火灾",
        "爆炸",
        "中毒",
        "窒息",
        "烫伤",
        "灼伤",
        "机械伤害",
        "高处坠落"
      ]
    };
  },
  computed: mapState({
    zyOtherspecial: state => state.kongjian.zyOtherspecial,
    zywhBs: state => state.kongjian.zywhBs
  }),
  beforeDestroy() {
    this.$store.dispatch("kongjian/cleanState");
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.zyOtherspecial = this.stringData("zyOtherspecial", "list_1");
      sendData.zywhBs = this.stringData("zywhBs", "list_2");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applyRen = this.$userInfo.userName;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseSxkjzypSave(sendData)
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

    routeToChoose() {
      let newArr = [];
      this.$api.page_3
        .bmSelect({
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          console.log(res);
          for (let key in res) {
            newArr.push(res[key].name);
          }
          this.$router.push({
            name: "kongjian_select",
            query: {
              showList: newArr
            }
          });
        });
    }
  },
  watch: {
    zyOtherspecial(res) {
      this.sendData.zyOtherspecial = res;
    },
    zywhBs(res) {
      this.sendData.zywhBs = res;
    }
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
