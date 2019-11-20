<template>
  <div class="home">
    <van-nav-bar
      title="填写审批意见"
      left-text="返回"
      right-text="提交"
      left-arrow
      @click-left="pageBack"
      @click-right="sub"
      fixed
    />
    <div class="cell_group">
      <van-cell title="审批意见*" />
      <van-cell>
        <textarea name id rows="5" placeholder="请填入审批意见" v-model="approvalOpinion"></textarea>
      </van-cell>

      <van-cell>
        <j-filter-item title="下个节点处理人*" :actions="jiedianman" @select="jieDianManSelect" class="chulirenbox"></j-filter-item>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { business } from "@/mixin/business";
export default {
  name: "yijian",
  mixins: [business],
  components: {},
  data() {
    return {
      approvalOpinion:'',
      jiedianman: [
        {
          name: "李超",
          index: 1
        },
        {
          name: "丽丽",
          index: 2
        },
        {
          name: "张红",
          index: 3
        }]
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
    jieDianManSelect(e){
      console.log(e)
    },
    sub(){
      console.log(this.approvalOpinion)
    }
  }
};
</script>

<style lang="scss" scoped>
.whiteCell {
  background-color: #fff !important;
}

.cell_group {
  textarea {
    width: 100%;
    border-color: #b7b7bc;
  }
  input{
    border: none;
    outline: none;
    text-align: right;
  }
  .chulirenbox{
    border: none;
    outline: none;
  }
}
</style>>
