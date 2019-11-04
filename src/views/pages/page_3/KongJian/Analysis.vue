<template>
  <div class="donghuo_analysis">
    <van-nav-bar
      title="受限空间安全"
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
    </div>
    <div class="cell_group">
      <!-- 受限空间所属空间 -->
      <div class="cell">
        <div class="cell_title">
          <span>受限空间所属空间</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="单位名称" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 作业内容 -->
      <div class="cell border_none">
        <div class="cell_title">
          <span>作业内容</span>
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
      <!-- 受限空间所属单位 -->
      <div class="cell">
        <div class="cell_title">
          <span>受限空间所属单位</span>
        </div>
        <div class="cell_title">
          <span>单位名称</span>
        </div>
      </div>
      <!-- 设备名称 -->
      <div class="cell">
        <div class="cell_title">
          <span>设备名称</span>
        </div>
        <div class="cell_title">
          <span>设备名称</span>
        </div>
      </div>
      <!-- 受限空间原有界质 -->
      <div class="cell">
        <div class="cell_title">
          <span>受限空间原有界质</span>
        </div>
        <div class="cell_title">
          <span>介质名称</span>
        </div>
      </div>
      <!-- 涉及其他特殊作业 -->
      <div class="cell">
        <div class="cell_title">
          <span>涉及其他特殊作业</span>
          <span class="required">*</span>
        </div>
        <div class="cell_other">
          <van-col span="8" v-for="(item, index) in 4" :key="index">
            <div class="cell_type_tag">电焊</div>
          </van-col>
        </div>
      </div>
      <!-- 危害辨识 -->
      <div class="cell">
        <div class="cell_title">
          <span>危害辨识</span>
          <span class="required">*</span>
        </div>
        <div class="cell_other">
          <van-col span="8" v-for="(item, index) in 4" :key="index">
            <div class="cell_type_tag">触电</div>
          </van-col>
        </div>
      </div>
      <!-- 作业开始时间 -->
      <div class="cell">
        <div class="cell_title">
          <span>作业开始时间</span>
        </div>
        <div class="cell_value">
          <span>2019-01-01 12:00</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 作业结束时间 -->
      <div class="cell">
        <div class="cell_title">
          <span>作业结束时间</span>
        </div>
        <div class="cell_value">
          <span>2019-01-01 12:00</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 作业部门负责人 -->
      <div class="cell">
        <div class="cell_title">
          <span>作业部门负责人</span>
          <span class="required">*</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 7"
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
      <!-- 监护人 -->
      <div class="cell">
        <div class="cell_title">
          <span>监护人</span>
          <span class="required">*</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 7"
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
      <!-- 作业人 -->
      <div class="cell">
        <div class="cell_title">
          <span>作业人</span>
          <span class="required">*</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 7"
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
      <!-- 抄送人 -->
      <div class="cell">
        <div class="cell_title">
          <span>抄送人</span>
          <span class="required">*</span>
        </div>
        <div class="cell_other">
          <div class="cell_other_people">
            <div
              class="cell_other_peoples"
              v-for="(item, index) in 7"
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
      <div class="show_next">
        <van-icon class-prefix="iconfont" color="#6C6C6C" name="nextpage" />
      </div>
    </div>
    <div class="cell_group">
      <div class="left-title">
        分析项目
        <span style="float:right">有毒有害介质</span>
      </div>
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
      <div class="add_device">
        <div class="swiper">
          <span class="swiper_item swiper_item_select"></span>
          <span class="swiper_item"></span>
        </div>
        <div class="add_device_action" @click="AddAnalysis(0, '有毒有害介质')">
          <van-icon name="add-o" color="#6096F8" />
        </div>
      </div>
    </div>
    <div class="cell_group">
      <div class="left-title">
        分析项目
        <span style="float:right">氧含量</span>
      </div>
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
      <div class="add_device">
        <div class="swiper">
          <span class="swiper_item swiper_item_select"></span>
          <span class="swiper_item"></span>
        </div>
        <div class="add_device_action" @click="AddAnalysis(0, '可燃气质')">
          <van-icon name="add-o" color="#6096F8" />
        </div>
      </div>
    </div>
    <div class="cell_group">
      <div class="left-title">
        分析项目
        <span style="float:right">氧含量</span>
      </div>
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
      <div class="add_device">
        <div class="swiper">
          <span class="swiper_item swiper_item_select"></span>
          <span class="swiper_item"></span>
        </div>
        <div class="add_device_action" @click="AddAnalysis(1, '氧含量')">
          <van-icon name="add-o" color="#6096F8" />
        </div>
      </div>
    </div>
    <div class="confirm_action">
      <div class="confirm_actions signature" @click="signatureShow = true">
        签字
      </div>
      <div class="confirm_actions confirm">提交</div>
    </div>
    <van-popup class="popup" v-model="signatureShow" position="bottom">
      <Canvas @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
    </van-popup>
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
import Canvas from "@/components/Canvas.vue";
import { Toast } from "vant";
export default {
  name: "donghuo_analysis",
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
    AddAnalysis(index, title) {
      this.$router.push({
        path: "./add_analysis",
        query: {
          index: index,
          title: title
        }
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
.donghuo_analysis {
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
}
</style>
