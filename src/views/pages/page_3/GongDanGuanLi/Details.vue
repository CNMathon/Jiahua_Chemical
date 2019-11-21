<template>
  <div class="home">
    <van-nav-bar
      title="新建工单"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
    />
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value title="申请部门" required value="部门名称" disable></cell-value>
      <cell-value title="申请人" required value="人名" disable></cell-value>
      <cell-input title="工单名称" required placeholder="请输入工单名称"></cell-input>
      <cell-picker title="空间设备" required  :columns="shebeiList"></cell-picker>
      <cell-input title="作业地点" required placeholder="请输入作业地点"></cell-input>
      <cell-time title="维修开始时间" required></cell-time>
      <cell-time title="维修结束时间" required></cell-time>
      <cell-picker title="检修项目" required  :columns="jianxiuxiangmu"></cell-picker>
      <cell-picker title="维护类别" required  :columns="weihuleibie"></cell-picker>
      <cell-time title="维修时限" required></cell-time>
      <cell-select-user
        title="监护人"
        required
        :storeModule="storeModule"
      ></cell-select-user>
      <cell-picker title="检修班组" required  :columns="jianxiubanzu"></cell-picker>
      <cell-select-user
        title="作业人员"
        required
        :storeModule="storeModule"
      ></cell-select-user>
      <cell-select-user
        title="现场负责人"
        required
        :storeModule="storeModule"
      ></cell-select-user>
      <cell-select-user
        title="安全教育人"
        required
        :storeModule="storeModule"
      ></cell-select-user>
      <cell-textarea title="作业内容" required placeholder="请输入作业内容"></cell-textarea>
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardSb"
        :showList="list_3"
        :storeModule="storeModule"
      ></cell-select-tag>
    </div>
    <van-popup v-model="isShowAction" position="bottom" class="action">
        <button>提交</button>
        <button @click="closeAction">取消</button>
      </van-popup>
  </div>
</template>

<script>
import { business } from "@/mixin/business";
export default {
  name: "gongdanguanli_details",
  mixins: [business],
  components: {
  },
  data () {
    return {
      list_3: [
        "火灾、爆炸",
        "中度和窒息",
        "化学灼伤",
        "机械伤害",
        "触电",
        "高处坠落"
      ],
      storeModule: "gongdanguanli",
      jianxiubanzu:[4,5,6],
      weihuleibie:[3,4,5],
      jianxiuxiangmu:[2,3,4],
      shebeiList:[1,2,3],
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
