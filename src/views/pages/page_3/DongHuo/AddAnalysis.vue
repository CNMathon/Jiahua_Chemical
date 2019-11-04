<template>
  <div class="donghuo_analysis">
    <div class="content">
      <van-nav-bar
        title="动火安全"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
      <div class="cell_group">
        <!-- 动火时间 -->
        <div class="cell">
          <div class="cell_title">
            <span>动火时间</span>
          </div>
          <div class="cell_value" @click="timeShow = true">
            <span>2019-01-01 12:00</span>
            <span class="cell_value_arrow">
              <van-icon name="arrow" />
            </span>
          </div>
        </div>
        <!-- 分析人 -->
        <div class="cell">
          <div class="cell_title">
            <span>分析人</span>
            <span class="required">*</span>
          </div>
          <div class="cell_value">
            <div class="cell_input">
              <input type="text" placeholder="人名" />
            </div>
            <span class="cell_value_arrow">
              <van-icon name="search" />
            </span>
          </div>
        </div>
        <!-- 分析点名称 -->
        <div class="cell">
          <div class="cell_title">
            <span>分析点名称</span>
            <span class="required">*</span>
          </div>
          <div class="cell_title">
            <span>名称</span>
          </div>
        </div>
        <!-- 可燃气爆炸极限 -->
        <div class="cell">
          <div class="cell_title">
            <span>可燃气爆炸极限</span>
            <span class="required">*</span>
          </div>
          <div class="cell_title">
            <span>极限</span>
          </div>
        </div>
        <!-- 分析数据 -->
        <div class="cell">
          <div class="cell_title">
            <span>分析数据</span>
            <span class="required">*</span>
          </div>
          <div class="cell_title">
            <span>数据</span>
          </div>
        </div>
      </div>
    </div>
    <div class="next" @click="Next">确认</div>
    <!-- 时间选择 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="new Date()"
        @cancel="onTimeCancel"
        @confirm="onTimeConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "donghuo_analysis",
  data() {
    return {
      fileList: [],
      timeShow: false,
      currentDate: new Date()
    };
  },
  created() {},
  methods: {
    Next() {
      this.pageBack();
    },
    pageBack() {
      this.$router.back();
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    // 取消时间选择
    onTimeCancel() {
      this.timeShow = false;
    },
    // 确认时间选择
    onTimeConfirm() {
      this.timeShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.donghuo_analysis {
  min-height: 100vh;
  background-color: #f5f5f5;
  .content {
    min-height: calc(100vh - 123px);
  }
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
