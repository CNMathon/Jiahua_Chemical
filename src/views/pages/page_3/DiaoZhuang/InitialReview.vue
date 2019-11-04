<template>
  <div class="mangban">
    <van-nav-bar
      title="吊装安全作业许可证"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group" @click.stop="clickStop()">
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
      <!-- 吊装内容 -->
      <cell-textarea
        v-model="sendData.dznr"
        title="吊装内容"
        required
        placeholder="请输入吊装内容"
      ></cell-textarea>
      <!-- 吊装地点 -->
      <cell-value title="吊装地点" value="sendData.dzdd"></cell-value>
      <!-- 吊装工具名称 -->
      <cell-value title="吊装工具名称" value="sendData.dzgjmc"></cell-value>
      <!-- 起吊重物重量（t） -->
      <cell-value
        title="起吊重物重量（t）"
        value="sendData.qdzwzl"
      ></cell-value>
      <!-- 吊装人员及特殊工种作业证号 -->
      <div class="cell">
        <div class="cell_title">
          <span>
            吊装人员及
            <br />特殊工种作业证号
          </span>
        </div>
        <div class="cell_value">
          <div class="cell_value_people">
            <div class="cell_input">
              <span>{{ work_permit_1.name || "点击选择" }}</span>
              <van-icon name="plus" />
            </div>
            <div class="cell_input">
              <span>{{ work_permit_2.name || "点击选择" }}</span>
              <van-icon name="plus" />
            </div>
          </div>
        </div>
      </div>
      <!-- 吊装指挥及特殊工种作业证号 -->
      <div class="cell">
        <div class="cell_title">
          <span>
            吊装指挥及
            <br />特殊工种作业证号
          </span>
        </div>
        <div class="cell_value">
          <span>{{ work_permit_3.name || "点击选择" }}</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="whsb"
        :tagList="whsb"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 作业开始时间 -->
      <cell-time
        title="作业开始时间"
        v-model="sendData.zyksDate"
        :maxTime="sendData.zyjsDate"
        required
      ></cell-time>
      <!-- 作业结束时间 -->
      <cell-time
        title="作业结束时间"
        v-model="sendData.zyjsDate"
        :minTime="sendData.zyksDate"
        required
      ></cell-time>
      <!-- 作业负责人 -->
      <cell-select-user
        title="作业负责人"
        required
        :storeModule="storeModule"
        storeKey="zyfzr"
        v-model="sendData.zyfzr"
      ></cell-select-user>
      <!-- 监护人 -->
      <cell-select-user
        title="负责人"
        required
        :storeModule="storeModule"
        storeKey="jhr"
        v-model="sendData.jhr"
      ></cell-select-user>
    </div>
    <div class="next" @click="Next">下一步</div>
    <!-- 材质选择 -->
    <van-popup v-model="materialShowShow" position="bottom">
      <van-picker
        show-toolbar
        title="材质选择"
        :columns="materialColumns"
        @cancel="onMaterialCancel"
        @confirm="onMaterialConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
export default {
  name: "diaozhuang_index",
  mixins: [business],
  data() {
    return {
      storeModule: "diaozhuang",
      sendData: {
        dznr: "", //吊装内容
        dzdd: "", //吊装地点
        dzgjmc: null, //吊装工具名称
        qdzwzl: "", //起吊重物质量(t)
        whsb: [], //危害辨识
        zyksDate: "", //作业开始时间
        zyjsDate: "", //作业结束时间
        zyfzr: [], // 作业负责人
        jhr: [] //监护人
      },
      materialShowShow: false,
      material: {
        index: 0,
        value: ""
      },
      dzgjmcColumns: ["吊车", "行车", "把杆"],
      materialColumns: ["吊车", "行车", "把杆"],
      currentDate: new Date(),
      list_1: [
        "锁具断裂",
        "吊钩脱落",
        "设备倾倒",
        "吊装机械故障倾倒",
        "周边电线杆",
        "输电线",
        "危化品管道泄漏",
        "可燃液体",
        "气体泄漏"
      ]
    };
  },
  computed: mapState({
    whsb: state => state.diaozhuang.whsb,
    zyfzr: state => state.diaozhuang.zyfzr,
    jhr: state => state.diaozhuang.jhr,
    work_permit_1: state => state.diaozhuang.work_permit_1,
    work_permit_2: state => state.diaozhuang.work_permit_2,
    work_permit_3: state => state.diaozhuang.work_permit_3
  }),
  beforeDestroy() {
    this.$store.dispatch("diaozhuang/cleanState");
  },
  methods: {
    clickStop() {},
    // 选择作业证
    selectUser(work_permit) {
      console.log("work_permit: ", work_permit);
      this.$router.push({
        path: "./select_work_permit",
        query: {
          storeModule: this.storeModule,
          storeKey: work_permit
        }
      });
    },
    // 材质选择
    onMaterialConfirm(value, index) {
      this.materialShowShow = false;
      this.material = {
        index: index,
        value: value
      };
    },
    // 材质选择取消
    onMaterialCancel() {
      this.materialShowShow = false;
    },
    // 发送数据
    postData() {
      let dzryjtsgzzyzh = [];
      dzryjtsgzzyzh.push(this.work_permit_1.id);
      dzryjtsgzzyzh.push(this.work_permit_2.id);
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.whsb = this.stringData("whsb", "list_1");
      sendData.zyfzr = this.userString(sendData.zyfzr, "userName");
      sendData.jhr = this.userString(sendData.jhr, "userName");
      sendData.dzryjtsgzzyzh = dzryjtsgzzyzh.join(",");
      sendData.dzzhjtsgzzyzh = this.work_permit_3.id || "";
      sendData.sqbm = this.$userInfo.officeName;
      sendData.sqr_code = this.$userInfo.refCode;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseDzzypSave(sendData)
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
    }
  },
  watch: {
    whsb(res) {
      this.sendData.whsb = res;
    },
    zyfzr(res) {
      this.sendData.zyfzr = res;
    },
    jhr(res) {
      this.sendData.jhr = res;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.mangban {
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
  .cell_group {
    /deep/.cell {
      background-color: #eeeeee;
    }
  }
  .cell_input {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
