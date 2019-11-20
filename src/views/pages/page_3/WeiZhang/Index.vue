<template>
  <div class="weizhang">
    <van-nav-bar
      title="新建违章"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="isShowAction=true"
    />
    <div class="cell_group">
      <!-- 修改 -->
      <cell-input title="项目名称" required :value="sendData.xmmc" placeholder="项目名称" />
      <cell-input v-model="sendData.wzmc" title="违章名称" required placeholder="输入违章名称" />
      <!-- 修改 -->
      <cell-input v-model="sendData.wzmc" title="违章单位" required placeholder="单位名称" />
      <cell-time v-model="sendData.startTime" title="发生时间" required></cell-time>
      <cell-input v-model="sendData.fsdd" title="发生地点" required placeholder="输入发生地点"></cell-input>
      <cell-select-user
        title="检察人员"
        required
        :storeModule="storeModule"
        storeKey="dhzyPrincipal"
        v-model="sendData.jcry"
      />
			<cell-select-user
        title="违章人员"
        required
        :storeModule="storeModule"
        storeKey="dhzyPrincipal"
        v-model="sendData.wzry"
      />
			<cell-select-tag
        title="违章考核标准"
        required
        :storeModule="storeModule"
        storeKey="dhzyPrincipal"
        v-model="sendData.wzry"
      />
			<!-- 修改 -->
      <cell-input v-model="sendData.fsdd" title="违章项目" required placeholder="项目名称"></cell-input>
			<cell-select-tag
        title="违章类型"
        required
        :storeModule="storeModule"
        storeKey="dhzyPrincipal"
        v-model="sendData.wzlx"
      />
			<!-- 修改 -->
			<cell-input v-model="sendData.wzmc" title="处罚标准" required placeholder="自动读取" />
      <cell-textarea title="事件描述" required v-model="sendData.sjms" placeholder="输入内容"/>
      <!-- 上传图片 -->
      <div class="cell">
        <div class="cell_title">
          <span>上传图片</span>
        </div>
        <div class="cell_other">
          <div class="upload">
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
    <!-- 操作Popup -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="Next">保存</button>
      <button @click="isShowAction=false">取消</button>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import Canvas from "@/components/Canvas.vue";
import { uploadFile } from "@/mixin/uploadFile";
export default {
  name: "weizhang",
  mixins: [uploadFile],
  components: {
    Canvas
  },
  data() {
    return {
			storeModule: "weizhang",
      isShowAction: false,
      sendData: {
        xmmc: "", //项目名称
        wzmc: "", //违章名称,
        wzdw: "", // 违章单位
        startTime: "", //发生时间
        fsdd: "", //发生地点
        jcry: "", // 检察人员
        wzry: "", // 违章人员
        wzkhbz: "", // 违章考核标准
        wzxm: "", // 违章项目
        wzlx: "", //违章类型
        cfbz: "", // 处罚标准
        sjms: "", //事件描述,
        wztp: [] // 违章图片
        // cfje: "", //处罚金额
        // pxsj: "", //培训时间
        // pxyj: "" //培训意见
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
			this.sendData.__sid = localStorage.JiaHuaSessionId
			console.log(this.sendData);
			this.$api.page_3
				.htCbsBreakrulesmanageSave(this.sendData)
				.then(res => {
					console.log(res)
				})
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
    },
    onClickProjectName() {
      this.$router.push({
        path: "/Component/CasSelect/Project"
      });
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

.clickInput {
  background-color: white;
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
</style>
