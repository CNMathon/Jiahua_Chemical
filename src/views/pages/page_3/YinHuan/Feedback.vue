<template>
  <div class="yinhuan">
    <van-nav-bar
      title="隐患整改反馈"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 整改单名称 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改单名称</span>
        </div>
        <div class="cell_title">
          <span>整改单名称</span>
        </div>
      </div>
      <!-- 整改公司 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改公司</span>
        </div>
        <div class="cell_title">
          <span>整改公司名称</span>
        </div>
      </div>
      <!-- 整改部门或督察部门 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改部门或督察部门</span>
        </div>
        <div class="cell_title">
          <span>整改部门名称</span>
        </div>
      </div>
      <!-- 整改负责人 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改负责人</span>
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
          </div>
        </div>
      </div>
      <!-- 地点 -->
      <div class="cell">
        <div class="cell_title">
          <span>地点</span>
        </div>
        <div class="cell_title">
          <span>A地</span>
        </div>
      </div>
      <!-- 隐患等级 -->
      <div class="cell">
        <div class="cell_title">
          <span>隐患等级</span>
        </div>
        <div class="cell_title">
          <span>A</span>
        </div>
      </div>
      <!-- 隐患类型 -->
      <div class="cell">
        <div class="cell_title">
          <span>隐患类型</span>
        </div>
        <div class="cell_title">
          <span>A</span>
        </div>
      </div>
      <!-- 隐患来源 -->
      <div class="cell">
        <div class="cell_title">
          <span>隐患来源</span>
        </div>
        <div class="cell_title">
          <span>A</span>
        </div>
      </div>
      <!-- 是否处罚 -->
      <div class="cell">
        <div class="cell_title">
          <span>是否处罚</span>
        </div>
        <div class="cell_title">
          <span>是</span>
        </div>
      </div>
      <!-- 处罚金额 -->
      <div class="cell">
        <div class="cell_title">
          <span>处罚金额</span>
        </div>
        <div class="cell_title">
          <span>500元</span>
        </div>
      </div>
      <!-- 是否处挂起 -->
      <div class="cell">
        <div class="cell_title">
          <span>是否处挂起</span>
        </div>
        <div class="cell_title">
          <span>是</span>
        </div>
      </div>
      <!-- 隐患描述 -->
      <div class="cell">
        <div class="cell_title">
          <span>隐患描述</span>
        </div>
        <div class="cell_other">
          <textarea
            class="cell_textarea"
            placeholder="隐患描述"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="cell_other">
          <div class="upload">
            <div class="upload_icon">
              <van-icon name="photo-o" />
            </div>
            <div class="upload_box">
              <van-image
                width="5rem"
                height="5rem"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 验收负责人 -->
      <div class="cell">
        <div class="cell_title">
          <span>验收负责人</span>
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
          </div>
        </div>
      </div>
    </div>
    <div class="cell_group">
      <!-- 整改方案 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改方案</span>
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
      <!-- 动土开始时间 -->
      <div class="cell">
        <div class="cell_title">
          <span>动土开始时间</span>
        </div>
        <div class="cell_value" @click="timeShow = true">
          <span>2019-01-01 12:00</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 应急预案 -->
      <div class="cell">
        <div class="cell_title">
          <span>应急预案</span>
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
      <!-- 整改反馈时间 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改反馈时间</span>
        </div>
        <div class="cell_value" @click="timeShow = true">
          <span>2019-01-01 12:00</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 整改实际费用 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改实际费用</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="500" />
          </div>
          <span class="cell_value_arrow">元</span>
        </div>
      </div>
      <!-- 隐患原因 -->
      <div class="cell">
        <div class="cell_title">
          <span>隐患原因</span>
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
      <!-- 整改过程描述 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改过程描述</span>
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
      <!-- 整改成果 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改成果</span>
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
    </div>
    <div class="confirm_action">
      <div class="confirm_actions signature" @click="signatureShow = true">
        签字
      </div>
      <div class="confirm_actions confirm" @click="Next">提交</div>
    </div>
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
    <!-- 签字 -->
    <van-popup class="popup" v-model="signatureShow" position="bottom">
      <Canvas @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import Canvas from "@/components/Canvas.vue";
export default {
  name: "yinhuan",
  components: {
    Canvas
  },
  data() {
    return {
      fileList: [],
      timeShow: false,
      currentDate: new Date(),
      signatureShow: false
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
    // 取消时间选择
    onTimeCancel() {
      this.timeShow = false;
    },
    // 确认时间选择
    onTimeConfirm() {
      this.timeShow = false;
    },
    pageBack() {
      this.$router.back();
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
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
.yinhuan {
  min-height: 100vh;
  background-color: #f5f5f5;
  .confirm_action {
    width: 100vw;
    height: 100px;
    display: flex;
    align-items: center;
    .signature {
      flex: 1;
      height: 100px;
      font-size: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: 100px;
      background: rgba(248, 155, 96, 1);
    }
    .confirm {
      flex: 1;
      height: 100px;
      font-size: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: 100px;
      background: #6096f8;
    }
  }
  .popup {
    height: 568px;
  }
}
</style>
