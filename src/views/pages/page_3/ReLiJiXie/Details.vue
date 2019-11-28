<template>
  <div class="home">
    <van-nav-bar
      title="热力机械工作票详情"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
    />
    <div class="cell_group">
      <cell-value title="部门" :value="'动力中心'"></cell-value>
      <cell-value title="班组" :value="'甲班'"></cell-value>
      <cell-value title="工作负责人" :value="'王大锤'"></cell-value>
      <cell-value title="参加工作人数" :value="'2'"></cell-value>
      <cell-textarea title="工作内容" required placeholder="热力机械作业票工作内容"></cell-textarea>
      <cell-time title="开始时间" required></cell-time>
      <cell-time title="结束时间" required></cell-time>
      <cell-textarea title="必须采取的安全措施" required placeholder="热力机械作业票必须采取的安全措施"></cell-textarea>
      <cell-textarea title="措施执行情况" required placeholder="热力机械作业票的措施执行情况"></cell-textarea>
      <van-cell title="已填写作业票预览" is-link />
      <van-cell title="流程图" is-link />
      <van-cell title="10、上诉安全措施以全部实行,许可开始工作于" value="2019-01-03" is-link />
      <cell-input class="whiteCell" title="工作许可人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作负责人" :value="'手动输入'" disable></cell-input>
      <van-cell title="11、工作负责人变更：自原工作原负责人离去，变更为担任工作负责人。" value="2019-01-03 06:00" is-link />
      <cell-input class="whiteCell" title="工作票签发人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作许可人" :value="'手动输入'" disable></cell-input>
      <van-cell title="12、工作票延期：有效期延长到" value="2019-01-03 06:00" is-link />
      <cell-input class="whiteCell" title="值班人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作负责人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作许可人" :value="'手动输入'" disable></cell-input>
      <van-cell title="13、工作终结：工作人员已全部撤离，现场已清理完毕，工作结束于" value="2019-01-03 06:00" is-link />
      <cell-input class="whiteCell" title="工作负责人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作许可人" :value="'手动输入'" disable></cell-input>
    </div>
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button>前进</button>
      <button>后退</button>
      <button>提交</button>
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
