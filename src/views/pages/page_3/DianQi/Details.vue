<template>
  <div class="dianqi-detail">
    <van-sticky>
      <van-nav-bar
        title="第一种工作票详情"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="openAction"
      />
    </van-sticky>
    <cell-value title="工作负责人(监护人)" :value="'动力中心'" disable></cell-value>
    <cell-value title="班组" :value="'甲班'" disable></cell-value>
    <cell-value title="工作负责人" :value="'王大锤'" disable></cell-value>
    <cell-value title="参加工作人数" :value="'2'" disable></cell-value>
    <cell-textarea title="工作内容和工作地点" placeholder="电器第一种作业票工作内容和工作地点" disable></cell-textarea>
    <cell-time title="开始时间" disable></cell-time>
    <cell-time title="结束时间" disable></cell-time>
    <cell-value title="安全措施附页" :value="'2张'" disable></cell-value>
    <cell-textarea title="应用开关和闸刀，包括已拉开关闸刀（注明编号）：" placeholder="请输入"></cell-textarea>
    <cell-textarea title="应合接地闸刀及应装接地线（注明地点）：" placeholder="请输入"></cell-textarea>
    <cell-textarea title="应设遮拦，应挂标示牌：" placeholder="请输入"></cell-textarea>
    <cell-input title="工作票签发人" :value="'手动输入'"></cell-input>
    <cell-time title="收到工作票时间"></cell-time>
    <cell-input title="值班负责人" :value="'手动输入'"></cell-input>
    <cell-textarea title="已拉开关和闸刀(注明编号):" placeholder="请输入"></cell-textarea>
    <cell-textarea title="已合接地闸刀及已装接地线(注明编号地点):" placeholder="请输入"></cell-textarea>
    <cell-textarea title="已装遮拦，已挂标示牌(注明地点):" placeholder="请输入"></cell-textarea>
    <cell-input title="工作许可人" :value="'手动输入'"></cell-input>
    <cell-input title="值班负责人" :value="'手动输入'"></cell-input>
    <cell-input title="值长" :value="'手动输入'"></cell-input>
    <cell-textarea title="工作地点保留带电部分和补充安全措施：" placeholder="请输入"></cell-textarea>
    <cell-time title="许可开始工作时间"></cell-time>
    <cell-input title="工作许可人" :value="'手动输入'"></cell-input>
    <cell-input title="工作负责人" :value="'手动输入'"></cell-input>
    <cell-input title="原工作负责人为" :value="'手动输入'"></cell-input>
    <cell-input title="现工作负责人变为" :value="'手动输入'"></cell-input>
    <cell-time title="变动时间"></cell-time>
    <cell-input title="工作票签发人" :value="'手动输入'"></cell-input>
    <cell-time title="工作票延期到"></cell-time>
    <cell-input title="工作负责人" :value="'手动输入'"></cell-input>
    <cell-input title="值长或值班负责人" :value="'手动输入'"></cell-input>
    <cell-time title="工作票终结时间"></cell-time>
    <cell-input title="工作负责人" :value="'手动输入'"></cell-input>
    <cell-input title="工作许可人" :value="'手动输入'"></cell-input>
    <cell-input title="接地线已拆除（组）" :value="'手动输入'"></cell-input>
    <cell-input title="接地闸刀已分闸（把）" :value="'手动输入'"></cell-input>
    <cell-input title="值班负责人" :value="'手动输入'"></cell-input>
    <cell-textarea title="备注：" placeholder="请输入"></cell-textarea>
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="toPageShenPi">填写审批意见</button>
      <button @click="toPageLiuCheng">查看流程记录</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>

<script>
import { business } from "@/mixin/business";
export default {
  name: "dianqidetails",
  mixins: [business],
  components: {},
  data() {
    return {
      dhLevelColumns: [],
      isShowAction: false
    };
  },
  methods: {
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    onClickRight() {},

    toPageShenPi() {
      this.$router.push({ path: "./yijian" });
    },
    toPageLiuCheng() {
      this.$router.push({ path: "./liucheng" });
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
