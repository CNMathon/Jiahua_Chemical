<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar
        title="热力机械工作票详情"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="openAction"
      />
    </van-sticky>
    <div class="cell_group">
      <cell-value title="部门" :value="'动力中心'"></cell-value>
      <cell-value title="班组" :value="'甲班'"></cell-value>
      <cell-value title="工作负责人" :value="'王大锤'"></cell-value>
      <cell-value title="参加工作人数" :value="'2'"></cell-value>
      <cell-textarea title="工作内容" placeholder="热力机械作业票工作内容"></cell-textarea>
      <cell-time title="开始时间"></cell-time>
      <cell-time title="结束时间"></cell-time>
      <cell-textarea title="必须采取的安全措施" placeholder="热力机械作业票必须采取的安全措施"></cell-textarea>
      <cell-textarea title="措施执行情况" placeholder="热力机械作业票的措施执行情况"></cell-textarea>
      <cell-value title="工作票签发人" :value="'王大锤'"></cell-value>
      <cell-value title="签发时间" :value="'2019-01-01 13:00:00'"></cell-value>
      <cell-textarea title="运行值班人员补充的安全措施" placeholder="运行值班人员补充的安全措施"></cell-textarea>
      <cell-textarea title="补充措施执行情况" placeholder="补充措施执行情况"></cell-textarea>
      <cell-time title="批准工作结束时间"></cell-time>
      <cell-input title="值班长" :value="'手动输入'"></cell-input>
      <cell-time title="批准时间"></cell-time>
      <cell-time title="上述安全措施已全部执行，许可开始工作于"></cell-time>
      <cell-input title="工作许可人" :value="'手动输入'"></cell-input>
      <cell-input title="工作负责人" :value="'手动输入'"></cell-input>
      <cell-time title="工作负责人变更开始时间"></cell-time>
      <cell-input title="工作负责人变为" :value="'手动输入'"></cell-input>
      <cell-input title="工作票签发人" :value="'手动输入'"></cell-input>
      <cell-input title="工作许可人" :value="'手动输入'"></cell-input>
      <cell-time title="工作票有效期延长到"></cell-time>
      <cell-input title="值班长" :value="'手动输入'"></cell-input>
      <cell-input title="工作负责人" :value="'手动输入'"></cell-input>
      <cell-input title="工作许可人" :value="'手动输入'"></cell-input>
      <cell-time title="工作票终结时间"></cell-time>
      <cell-input title="工作负责人" :value="'手动输入'"></cell-input>
      <cell-input title="工作许可人" :value="'手动输入'"></cell-input>
      <cell-time title="允许恢复工作时间"></cell-time>
      <cell-input title="工作负责人" :value="'手动输入'"></cell-input>
      <cell-input title="工作许可人" :value="'手动输入'"></cell-input>
    </div>
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button>前进</button>
      <button>退回</button>
      <button>提交</button>
      <button>查看流程图</button>
      <button>查看流程记录</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>

<script>
import { business } from "@/mixin/business";
export default {
  name: "relijixie_details",
  mixins: [business],
  components: {},
  data() {
    return {
      dhLevelColumns: [],
      isShowAction: false
    };
  },
  created() {
    this.getDetailsData();
  },
  methods: {
    getDetailsData() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0
      });
      this.$api.page_3
        .getTaskById({
          TaskId: this.$route.query.id,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          console.log("res: ", res);
          this.$toast.clear();
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    onClickRight() {}
  }
};
</script>

<style lang="scss" scoped>
.whiteCell {
  background-color: #fff !important;
}
.action {
  padding-left: 30px;
  padding-right: 30px;
  background-color: transparent;
  button {
    width: 100%;
    height: 110px;
    margin-bottom: 20px;
    background-color: white;
    border: none;
    border-radius: 30px;
    color: rgb(0, 118, 255);
    font-size: 35px;
  }
}
</style>>
