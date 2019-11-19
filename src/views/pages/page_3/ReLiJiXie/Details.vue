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
      <van-cell title="已填写作业票预览" is-link />
      <van-cell title="流程图" is-link />
      <van-cell title="10、上诉安全措施以全部实行,许可开始工作于"  value="2019-01-03" is-link />
      <cell-input class="whiteCell" title="工作许可人"  :value="'手动输入'" disable ></cell-input>
      <cell-input class="whiteCell" title="工作负责人"  :value="'手动输入'" disable ></cell-input>
      <van-cell title="11、工作负责人变更：自原工作原负责人离去，变更为担任工作负责人。"  value="2019-01-03 06:00" is-link />
      <cell-input class="whiteCell" title="工作票签发人"  :value="'手动输入'" disable ></cell-input>
      <cell-input class="whiteCell" title="工作许可人"  :value="'手动输入'" disable ></cell-input>
      <van-cell title="12、工作票延期：有效期延长到"  value="2019-01-03 06:00" is-link />
      <cell-input class="whiteCell" title="值班人"  :value="'手动输入'" disable ></cell-input>
      <cell-input class="whiteCell" title="工作负责人"  :value="'手动输入'" disable ></cell-input>
      <cell-input class="whiteCell" title="工作许可人"  :value="'手动输入'" disable ></cell-input>
      <van-cell title="13、工作终结：工作人员已全部撤离，现场已清理完毕，工作结束于"  value="2019-01-03 06:00" is-link />
      <cell-input class="whiteCell" title="工作负责人"  :value="'手动输入'" disable ></cell-input>
      <cell-input class="whiteCell" title="工作许可人"  :value="'手动输入'" disable ></cell-input>
    </div>
    <van-popup v-model="isShowAction" position="bottom" class="action">
        <button >前进</button>
        <button >后退</button>
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
  components: {
  },
  data () {
    return {
      dhLevelColumns: [],
      isShowAction: false,
    }
  },
  methods : {
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    onClickRight () {}
  }
};
</script>

<style lang="scss" scoped>
.whiteCell{
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
