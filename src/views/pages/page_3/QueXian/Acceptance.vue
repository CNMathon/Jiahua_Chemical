<template>
  <div class="acceptance">
    <van-nav-bar
      title="缺陷"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 用户信息 -->
      <div class="cell">
        <div class="cell_user_header">
          <van-image
            round
            width="3.125rem"
            height="3.125rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="cell_user_info">
          <div class="cell_user_infos">缺陷提交人</div>
          <div class="cell_user_infos status">等待我处理</div>
        </div>
      </div>
      <!-- 空间设备 -->
      <div class="cell">
        <div class="cell_title">
          <span>空间设备</span>
        </div>
        <div class="cell_title">
          <span>设备A</span>
        </div>
      </div>
      <!-- 发现人 -->
      <div class="cell">
        <div class="cell_title">
          <span>发现人</span>
        </div>
        <div class="cell_title">
          <span>发现人名</span>
        </div>
      </div>
      <!-- 缺陷内容 -->
      <div class="cell">
        <div class="cell_title">
          <span>缺陷内容</span>
        </div>
        <div class="cell_other">
          <textarea
            class="cell_textarea"
            placeholder="请输入缺陷内容"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <!-- 缺陷类型 -->
      <div class="cell">
        <div class="cell_title">
          <span>缺陷类型</span>
          <span class="required">*</span>
        </div>
        <div class="cell_title">
          <span>类型A</span>
        </div>
      </div>
      <!-- 缺陷类型 -->
      <div class="cell">
        <div class="cell_title">
          <span>缺陷类型</span>
          <span class="required">*</span>
        </div>
        <div class="cell_title">
          <span>类型A</span>
        </div>
      </div>
      <!-- 发现时间 -->
      <div class="cell">
        <div class="cell_title">
          <span>发现时间</span>
        </div>
        <div class="cell_value" @click="timeShow = true">
          <span>2019-01-01 12:00</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
    </div>
    <div class="cell_group">
      <!-- 上传图片 -->
      <div class="cell">
        <div class="cell_title">
          <span>上传图片</span>
        </div>
        <div class="cell_other">
          <div class="upload">
            <div class="upload_icon">
              <van-icon name="photo-o" />
            </div>
            <div class="upload_box">
              <van-uploader
                :after-read="afterRead"
                v-model="fileList"
                preview-size="5rem"
                multiple
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 维修负责人 -->
      <div class="cell">
        <div class="cell_title">
          <span>维修负责人</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="输入负责人" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 验收结果 -->
      <div class="cell">
        <div class="cell_title">
          <span>验收结果</span>
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
    </div>
    <div class="next" @click="Next">提交</div>
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
  name: "acceptance",
  data() {
    return {
      timeShow: false,
      currentDate: new Date(),
      fileList: []
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
    // 取消时间选择
    onTimeCancel() {
      this.timeShow = false;
    },
    // 确认时间选择
    onTimeConfirm() {
      this.timeShow = false;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.acceptance {
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
