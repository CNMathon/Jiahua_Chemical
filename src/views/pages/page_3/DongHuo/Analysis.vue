<template>
  <div class="donghuo_analysis">
    <van-nav-bar
      title="动火安全"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 申请部门 -->
      <div class="cell">
        <div class="cell_title">
          <span>申请部门</span>
          <span class="required">*</span>
        </div>
        <div class="cell_title">
          <span>部门名称</span>
        </div>
      </div>
      <!-- 申请人 -->
      <div class="cell">
        <div class="cell_title">
          <span>申请人</span>
          <span class="required">*</span>
        </div>
        <div class="cell_title">
          <span>人名</span>
        </div>
      </div>
      <!-- 动火地点及内容 -->
      <div class="cell border_none">
        <div class="cell_title">
          <span>动火地点及内容</span>
        </div>
        <div class="cell_other">
          <textarea
            class="cell_textarea"
            placeholder="请输入工作内容"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <div class="show_next">
        <van-icon class-prefix="iconfont" color="#6C6C6C" name="nextpage" />
      </div>
      <div class="left-title">动火分析1</div>
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
      <div class="add_device">
        <div class="swiper">
          <span class="swiper_item swiper_item_select"></span>
          <span class="swiper_item"></span>
        </div>
        <div class="add_device_action" @click="AddAnalysis">
          <van-icon name="add-o" color="#6096F8" />
        </div>
      </div>
    </div>
    <div class="cell_group">
      <!-- 环境分析图 -->
      <div class="cell">
        <div class="cell_title">
          <span>环境分析图</span>
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
      <!-- 动火初审人 -->
      <div class="cell">
        <div class="cell_title">
          <span>动火初审人</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 5"
              :key="index"
            >
              <div class="cell_other_peoples_header">
                <van-image
                  round
                  width="100%"
                  height="100%"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <span class="delete">
                  <van-icon name="cross" color="#ffffff" />
                </span>
              </div>
              <div class="cell_other_peoples_name">王安石</div>
              <div
                class="cell_other_peoples_arrow"
                v-if="index % 4 !== 0 || index === 0"
              >
                <img
                  src="./../../../../assets/images/arrow-right.svg"
                  alt
                  srcset
                />
              </div>
            </div>
            <div class="cell_other_add_peoples">+</div>
          </div>
        </div>
      </div>
      <!-- 监火人 -->
      <div class="cell">
        <div class="cell_title">
          <span>监火人</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 5"
              :key="index"
            >
              <div class="cell_other_peoples_header">
                <van-image
                  round
                  width="100%"
                  height="100%"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <span class="delete">
                  <van-icon name="cross" color="#ffffff" />
                </span>
              </div>
              <div class="cell_other_peoples_name">王安石</div>
              <div
                class="cell_other_peoples_arrow"
                v-if="index % 4 !== 0 || index === 0"
              >
                <img
                  src="./../../../../assets/images/arrow-right.svg"
                  alt
                  srcset
                />
              </div>
            </div>
            <div class="cell_other_add_peoples">+</div>
          </div>
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.donghuo_analysis {
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
