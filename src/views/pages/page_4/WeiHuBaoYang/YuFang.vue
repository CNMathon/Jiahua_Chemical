<template>
  <div class="main">
    <van-sticky>
      <van-nav-bar
        title="维护保养"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
        @click-right="onClickRight"
      >
        <div slot="right">操作</div>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <div class="status-title van-hairline--bottom">任务状态（待处理）</div>
      <cell-value title="计划性检修名称" value="名称"></cell-value>
      <cell-value title="空间设备位号" value="12345566"></cell-value>
      <cell-value title="空间设备名称" value="名称"></cell-value>
      <cell-value title="所属分厂" value="名称"></cell-value>
      <cell-value title="检修班组" value="名称"></cell-value>
      <cell-value title="检修等级" value="名称"></cell-value>
      <cell-textarea
        disabled
        title="作业内容"
        placeholder="请输入作业内容"
      ></cell-textarea>
      <cell-value title="工单编号" :border="false">
        <div style="color:rgba(56,117,229,1);">DHR1342567754</div>
      </cell-value>
    </div>
    <van-action-sheet
      v-model="showSheet"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      @cancel="onCancel"
    />
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "ji_hua_xing_zhi_xing",
  mixins: [mixin],
  data() {
    return {
      showSheet: false,
      actions: [
        { name: "申请变更", index: 0 },
        { name: "生成工单", index: 1 },
        { name: "非工单处理", index: 2 }
      ]
    };
  },
  methods: {
    onClickRight() {
      this.showSheet = true;
    },
    onCancel() {
      this.showSheet = false;
    },
    onSelect(e) {
      if (e.index === 0) {
        this.$router.push({ path: `../shen_qing_bian_geng/${0}` });
      }
      if (e.index === 2) {
        this.$router.push({
          path: `../yu_fang_zhi_xing/${0}`
        });
      }
    }
  }
};
</script>
<style scoped>
.content {
  margin-top: 20px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 0;
}
.status-title {
  width: calc(100% - 80px);
  margin: 0 auto;
  box-sizing: border-box;
  padding-bottom: 20px;
  font-size: 34px;
  font-weight: 500;
  color: rgba(224, 32, 32, 1);
  line-height: 48px;
}
</style>
