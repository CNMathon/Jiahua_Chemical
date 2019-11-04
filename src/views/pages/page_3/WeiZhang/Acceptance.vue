<template>
  <div class="weizhang_acceptance">
    <van-sticky>
      <van-nav-bar
        title="违章"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
    </van-sticky>
    <!-- 项目名称 -->
    <div class="cell_group">
      <div class="cell">
        <div class="cell_title">
          <span>项目名称</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="输入项目名称" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <div class="cell">
        <div class="cell_title">
          <span>检查人员</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="输入检查人员" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 事件描述 -->
      <div class="cell">
        <div class="cell_title">
          <span>事件描述</span>
          <span class="required">*</span>
        </div>
        <div class="cell_other">
          <textarea
            class="cell_textarea"
            placeholder="输入内容"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <!-- 违章类型 -->
      <div class="cell">
        <div class="cell_title">
          <span>违章类型</span>
          <span class="required">*</span>
        </div>
        <div class="cell_select" @click="gradeShow = true">
          <span class="cell_select_text">{{ grade.value || "请选择" }}</span>
          <div class="cell_select_image">
            <img src="./../../../../assets/images/select.svg" alt />
          </div>
        </div>
      </div>
      <!-- 违章名称 -->
      <div class="cell">
        <div class="cell_title">
          <span>违章名称</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="输入违章名称" />
          </div>
        </div>
      </div>
      <!-- 发生地点 -->
      <div class="cell">
        <div class="cell_title">
          <span>发生地点</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="输入发生地点" />
          </div>
        </div>
      </div>
      <!-- 违章人员 -->
      <div class="cell">
        <div class="cell_title">
          <span>违章人员</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_value_people">
            <div class="cell_input">
              <input type="text" placeholder="输入违章人员名称" />
              <van-icon name="plus" />
            </div>
            <div class="cell_input">
              <input type="text" placeholder="输入违章人员名称" />
              <van-icon name="search" />
            </div>
          </div>
        </div>
      </div>
      <!-- 违章项目 -->
      <div class="cell">
        <div class="cell_title">
          <span>违章项目</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="输入整改负责人" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 发生时间 -->
      <div class="cell">
        <div class="cell_title">
          <span>发生时间</span>
        </div>
        <div class="cell_value" @click="timeShow = true">
          <span>2019-01-01 12:00</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <div class="cell">
        <div class="cell_title">
          <span>处罚金额</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="输入金额" />
          </div>
          <span class="cell_value_arrow">元</span>
        </div>
      </div>
    </div>
    <div class="next" @click="Next">提交</div>
    <!-- 动火级别 -->
    <van-action-sheet
      v-model="gradeShow"
      :actions="gradeColumns"
      cancel-text="取消"
      @select="onSelect"
      @cancel="gradeShow = false"
    />
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
  name: "weizhang_acceptance",
  data() {
    return {
      gradeShow: false,
      grade: {
        value: ""
      },
      gradeColumns: [{ name: "|类", index: 1 }, { name: "||类", index: 2 }],
      timeShow: false,
      currentDate: new Date()
    };
  },
  created() {},
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
    onSelect(item) {
      this.grade = {
        value: item.name
      };
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.gradeShow = false;
    },
    // 取消时间选择
    onTimeCancel() {
      this.timeShow = false;
    },
    // 确认时间选择
    onTimeConfirm() {
      this.timeShow = false;
    },
    toSelect(index) {
      this.$router.push({
        path: "./select",
        query: {
          index: index,
          showList: this[`list_${index}`]
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.weizhang_acceptance {
  min-height: 100vh;
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
}
</style>
