<template>
  <div class="kongjian_add_analysis">
    <div class="content">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
      <div class="cell_group" v-if="index === 0">
        <!-- 申请部门 -->
        <div class="cell">
          <div class="cell_title">
            <span>申请部门</span>
            <span class="required">*</span>
          </div>
          <div class="cell_selects">
            <van-col span="12" v-for="(item, index) in 2" :key="index">
              <div class="cell_select">
                <span class="cell_select_text">请选择</span>
                <div class="cell_select_image">
                  <img src="./../../../../assets/images/select.svg" alt />
                </div>
              </div>
            </van-col>
          </div>
        </div>
        <!-- 分析数据 -->
        <div class="cell">
          <div class="cell_title">
            <span>分析数据</span>
            <span class="required">*</span>
          </div>
          <div class="cell_selects">
            <van-col span="12" v-for="(item, index) in 2" :key="index">
              <div class="cell_input">
                <input type="text" placeholder="手工录入" />
              </div>
            </van-col>
          </div>
        </div>
        <!-- 时间 -->
        <div class="cell">
          <div class="cell_title">
            <span>时间</span>
          </div>
          <div class="cell_value" @click="timeShow = true">
            <span>2019-01-01 12:00</span>
            <span class="cell_value_arrow">
              <van-icon name="arrow" />
            </span>
          </div>
        </div>
        <!-- 部位 -->
        <div class="cell">
          <div class="cell_title">
            <span>部位</span>
          </div>
          <div class="cell_value">
            <div class="cell_input">
              <input type="text" placeholder="手工录入" />
            </div>
            <span class="cell_value_arrow">
              <van-icon name="search" />
            </span>
          </div>
        </div>
        <!-- 分析人 -->
        <div class="cell">
          <div class="cell_title">
            <span>分析人</span>
          </div>
          <div class="cell_value">
            <div class="cell_input">
              <input type="text" placeholder="手工录入" />
            </div>
            <span class="cell_value_arrow">
              <van-icon name="search" />
            </span>
          </div>
        </div>
      </div>
      <div class="cell_group" v-if="index === 1">
        <!-- 分析标准 -->
        <div class="cell">
          <div class="cell_title">
            <span>分析标准</span>
            <span class="required">*</span>
          </div>
          <div class="cell_title">
            <span>18%-23%</span>
          </div>
        </div>
        <!-- 分析数据 -->
        <div class="cell">
          <div class="cell_title">
            <span>分析数据</span>
            <span class="required">*</span>
          </div>
          <div class="cell_value">
            <div class="cell_input">
              <input type="text" placeholder="手工录入" />
            </div>
            <span class="cell_value_arrow">
              <van-icon name="search" />
            </span>
          </div>
        </div>
        <!-- 时间 -->
        <div class="cell">
          <div class="cell_title">
            <span>时间</span>
          </div>
          <div class="cell_value" @click="timeShow = true">
            <span>2019-01-01 12:00</span>
            <span class="cell_value_arrow">
              <van-icon name="arrow" />
            </span>
          </div>
        </div>
        <!-- 部位 -->
        <div class="cell">
          <div class="cell_title">
            <span>部位</span>
          </div>
          <div class="cell_value">
            <div class="cell_input">
              <input type="text" placeholder="手工录入" />
            </div>
            <span class="cell_value_arrow">
              <van-icon name="search" />
            </span>
          </div>
        </div>
        <!-- 分析人 -->
        <div class="cell">
          <div class="cell_title">
            <span>分析人</span>
          </div>
          <div class="cell_value">
            <div class="cell_input">
              <input type="text" placeholder="手工录入" />
            </div>
            <span class="cell_value_arrow">
              <van-icon name="search" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="next">下一步</div>
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
import { Toast } from "vant";
export default {
  name: "kongjian_add_analysis",
  data() {
    return {
      index: 0,
      title: "",
      fileList: [],
      timeShow: false,
      currentDate: new Date(),
      signatureShow: false
    };
  },
  created() {
    let index = Number(this.$route.query.index);
    this.index = index;
    this.title = this.$route.query.title;

    this.$router.beforeEach((to, from, next) => {
      next();
      // 返回上级页面销毁组件
      if (to.name === "kongjian_analysis") {
        this.$emit("destroy");
      }
    });
  },
  methods: {
    Next() {
      Toast.success("提交成功");
      setTimeout(() => {
        this.pageBack();
      }, 3500);
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
    },
    // 添加分析条目
    AddAnalysis() {
      this.$router.push({
        path: "./add_analysis"
      });
    },
    saveCanvas() {
      this.signatureShow = false;
      console.log("signatureShow: ");
    },
    cancelCanvas() {
      this.signatureShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.kongjian_add_analysis {
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
