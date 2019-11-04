<template>
  <div class="yinhuan">
    <van-nav-bar
      title="隐患整改通知"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 整改单名称 -->
      <cell-input
        v-model="sendData.zgd"
        title="整改单名称"
        required
        placeholder="输入整改单名称"
      ></cell-input>
      <!-- 整改公司 -->
      <div class="cell">
        <div class="cell_title">
          <span>整改公司</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="整改公司名称" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 违章单位 -->
      <div class="cell">
        <div class="cell_title">
          <span>
            整改部门或
            <br />督察部门
          </span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="整改部门名称" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
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
      <!-- 地点 -->
      <cell-input
        v-model="sendData.dd"
        title="地点"
        required
        placeholder="输入地点"
      ></cell-input>
      <!-- 隐患等级 -->
      <cell-picker
        title="隐患等级"
        required
        v-model="sendData.yhdj"
        :columns="yhdjColumns"
      ></cell-picker>
      <!-- 隐患类型 -->
      <cell-picker
        title="隐患类型"
        required
        v-model="sendData.yhlx"
        :columns="yhlxColumns"
      ></cell-picker>
      <!-- 隐患来源 -->
      <div class="cell">
        <div class="cell_title">
          <span>隐患来源</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="自动带入" />
          </div>
        </div>
      </div>
      <!-- 是否处罚 -->
      <cell-picker
        title="是否处罚"
        required
        v-model="sendData.cf"
        :columns="cfColumns"
      ></cell-picker>
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
      <!-- 是否处挂起 -->
      <cell-picker
        title="是否处挂起"
        required
        v-model="sendData.wg"
        :columns="wgColumns"
      ></cell-picker>
      <!-- 隐患描述 -->
      <cell-textarea
        title="隐患描述"
        required
        v-model="sendData.yhms"
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
                :before-read="beforeRead"
                :before-delete="beforeDelete"
                v-model="fileList"
                preview-size="5rem"
                multiple
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
  </div>
</template>
<script>
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
export default {
  name: "yinhuan",
  mixins: [business, uploadFile],
  data() {
    return {
      sendData: {
        zgd: "", //整改单
        dd: "", //地点
        cf: "", //是否处罚
        wg: "", //是否处挂起
        yhdj: "", //隐患等级
        yhlx: "", //隐患类型
        cfge: "", //处罚金额
        yhms: "" //隐患描述
      },
      cfColumns: ["是", "否"],
      wgColumns: ["是", "否"],
      yhdjColumns: ["1", "2"],
      yhlxColumns: ["1", "2"]
    };
  },
  created() {},
  methods: {
    postData() {
      this.pageBack();
    },
    pageBack() {
      this.$router.back();
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
.yinhuan {
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
