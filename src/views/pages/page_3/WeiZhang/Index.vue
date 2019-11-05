<template>
  <div class="weizhang">
    <van-nav-bar
      title="新建违章"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 项目名称 -->
      <div class="cell">
        <div class="cell_title">
          <span>项目名称</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="项目名称" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 违章名称 -->
      <cell-input
        v-model="sendData.wzmc"
        title="违章名称"
        required
        placeholder="输入违章名称"
      ></cell-input>
      <!-- 违章单位 -->
      <div class="cell">
        <div class="cell_title">
          <span>违章单位</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="违章单位" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 发生时间 -->
      <cell-time
        v-model="sendData.startTime"
        title="发生时间"
        required
      ></cell-time>
      <!-- 发生地点 -->
      <cell-input
        v-model="sendData.fsdd"
        title="发生地点"
        required
        placeholder="输入发生地点"
      ></cell-input>
      <!-- 检查人员 -->
      <div class="cell">
        <div class="cell_title">
          <span>检查人员</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="检查人员" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 违章人员 -->
      <div class="cell">
        <div class="cell_title">
          <span>违章人员</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="违章人员" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 违章考核标准 -->
      <div class="cell">
        <div class="cell_title">
          <span>违章考核标准</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="标准名称" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
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
            <input type="text" placeholder="标准名称" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 违章类型 -->
      <cell-picker
        title="违章类型"
        required
        v-model="sendData.wzlx"
        :columns="wzlxColumns"
      ></cell-picker>
      <!-- 处罚标准 -->
      <div class="cell">
        <div class="cell_title">
          <span>处罚标准</span>
        </div>
        <div class="cell_title">
          <span>自动获取</span>
        </div>
      </div>
      <!-- 处罚金额 -->
      <cell-input
        v-model="sendData.cfje"
        title="处罚金额"
        inputType="number"
        required
        placeholder="输入金额"
      >
        <div slot="right">元</div>
      </cell-input>
      <!-- 处罚金额 -->
      <div class="cell">
        <div class="cell_title">
          <span>处罚金额</span>
          <span class="required">*</span>
        </div>
        <div class="cell_title">
          <span>自动获取</span>
        </div>
      </div>
      <!-- 事件描述 -->
      <cell-textarea
        title="事件描述"
        required
        v-model="sendData.sjms"
        placeholder="输入内容"
      ></cell-textarea>
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
    <div class="cell_group">
      <div class="cell_group_title">培训记录</div>
      <!-- 培训时间 -->
      <cell-time v-model="sendData.pxsj" title="培训时间" required></cell-time>
      <!-- 培训负责人 -->
      <div class="cell">
        <div class="cell_title">
          <span>培训负责人</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="负责人" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 培训意见 -->
      <cell-textarea
        title="培训意见"
        required
        v-model="sendData.pxyj"
        placeholder="输入内容"
      ></cell-textarea>
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
    <van-popup class="popup" v-model="signatureShow" position="bottom">
      <Canvas @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import Canvas from "@/components/Canvas.vue";
export default {
  name: "weizhang",
  components: {
    Canvas
  },
  data() {
    return {
      sendData: {
        wzmc: "", //违章名称
        startTime: "", //发生时间
        fsdd: "", //发生地点
        wzlx: "", //违章类型
        cfje: "", //处罚金额
        sjms: "", //事件描述
        pxsj: "", //培训时间
        pxyj: "" //培训意见
      },
      wzlxColumns: [1, 2, 3],
      timeShow: false,
      currentDate: new Date(),
      fileList: [],
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
.weizhang {
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
