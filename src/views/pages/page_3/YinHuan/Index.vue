<template>
  <div class="yinhuan">
    <van-nav-bar
      title="隐患整改通知"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
    />
    <div class="cell_group">
      <!-- 整改单名称 -->
      <cell-input v-model="rectificationName" title="整改单名称" required placeholder="输入整改单名称"></cell-input>
      <!-- 整改公司 -->
      <!-- <div class="cell">
        <div class="cell_title">
          <span>整改公司</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" :value="rectificationCompany" placeholder="整改公司名称" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div> -->
      <select-company
        title="整改公司"
        required
        max="1"
        :storeModule="storeModule"
        storeKey="rectificationCompany"
        v-model="rectificationCompany"
      ></select-company>
      <select-department 
        title="整改部门或督察部门"
        required
        max="1"
        :storeModule="storeModule"
        storeKey="rectificationDepartment"
        v-model="rectificationDepartment"
      ></select-department>
      <!-- 违章单位 -->
      <!-- <div class="cell">
        <div class="cell_title">
          <span>
            整改部门或
            <br />督察部门
          </span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" v-model="rectificationDepartment" placeholder="整改部门名称" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div> -->
      <!-- 整改负责人 -->
      <!-- <cell-select-users
        title="整改负责人"
        required
        :storeModule="storeModule"
        storeKey="rectificationCharge"
        v-model="rectificationCharge"
      ></cell-select-users> -->
      <select-organization 
        title="整改负责人"
        required
        max="9"
        :storeModule="storeModule"
        storeKey="rectificationCharge"
        v-model="rectificationCharge"
      />
      <!-- 地点 -->
      <cell-input v-model="location" title="地点" required placeholder="输入地点"></cell-input>
      <!-- 隐患等级 -->
      <cell-picker title="隐患等级" required v-model="dangerLevel" :columns="dangerLevelColumns"></cell-picker>
      <!-- 隐患类型 -->
      <cell-picker title="隐患类型" required v-model="dangerType" :columns="dangerTypeColumns"></cell-picker>
      <!-- 隐患来源 -->
      <cell-picker
        title="隐患来源"
        required
        v-model="dangerSource"
        :columns="dangerSourceColumns"
        keyType="text"
      ></cell-picker>
      <!-- 是否处罚 -->
      <cell-picker title="是否处罚" required v-model="isPunish" :columns="isPunishColumns"></cell-picker>
      <!-- 处罚金额 -->
      <cell-input v-model="punishMoney" title="处罚金额" inputType="number" required placeholder="输入金额">
        <div slot="right">元</div>
      </cell-input>
      <!-- 是否处挂起 -->
      <cell-value title="是否处挂起" :value="isSuspendedColumns[isSuspended]" required></cell-value>
      <!-- 隐患描述 -->
      <cell-textarea title="隐患描述" required :value="dangerDesc" placeholder="输入内容"></cell-textarea>
      <!-- 上传图片 -->
      <div class="cell">
        <div class="cell_title">
          <span>上传图片</span>
        </div>
        <div class="cell_other">
          <div class="upload">
            <!-- <div class="upload_icon">
              <van-icon name="photo-o" />
            </div> -->
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
      <!-- <cell-select-users
        title="验收负责人"
        required
        :storeModule="storeModule"
        storeKey="acceptanceCharge"
        v-model="acceptanceCharge"
      ></cell-select-users> -->
      <select-organization 
        title="验收负责人"
        required
        max="9"
        :storeModule="storeModule"
        storeKey="acceptanceCharge"
        v-model="acceptanceCharge"
      />
    </div>
    <!-- <div class="next" @click="postData">提交</div> -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="postData">保存</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
export default {
  name: "yinhuan",
  mixins: [business, uploadFile],

  data() {
    return {
      storeModule: "yinhuan",
      id: 0,
      isShowAction: false,
      rectificationName: "", //整改单
      rectificationCompany: "", //整改公司
      rectificationDepartment: [], //整改部门
      rectificationCharge: [], //整改负责人
      location: "", //地点
      isPunish: "", //是否处罚
      isSuspended: 0, //是否处挂起
      dangerLevel: "", //隐患等级
      dangerType: "", //隐患类型
      dangerSource: "", //隐患来源
      acceptanceCharge: [], //验收负责人
      punishMoney: "", //处罚金额
      dangerDesc: "", //隐患描述
      isPunishColumns: ["是", "否"],
      isSuspendedColumns: ["否", "是"], //隐患来源
      dangerSourceColumns: [
        "行为观察卡",
        "风险/隐患识别卡",
        "安全检查记录",
        "承包商约谈"
      ],
      dangerLevelColumns: ["一般", "较大", "重大"], //隐患等级
      dangerTypeColumns: [
        "作业票",
        "喷溅/泄露",
        "狭小空间/阻碍",
        "个人防护设备",
        "电气",
        "燃烧/火灾",
        "工具使用不当",
        "作业设备/工具缺陷",
        "标签标示",
        "敲击/打击",
        "能量隔离",
        "环保",
        "跌落/绊倒",
        "卫生",
        "机械完整性",
        "交通",
        "中毒/窒息"
      ] //隐患类型
    };
  },
  computed: mapState({
    acceptanceCharges: state => state.yinhuan.acceptanceCharge,
    rectificationCharges: state => state.yinhuan.rectificationCharge,
    rectificationDepartments:state=>state.yinhuan.rectificationDepartment,
    rectificationCompanys:state=>state.yinhuan.rectificationCompany
  }),
  activated() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getDataInfo();
    }
    console.log(this.rectificationCompany)
    console.log(this.location)
    if (sessionStorage.getItem("flag") === "1") {
        (this.rectificationName = ""), //整改单
        (this.rectificationCompany = ""), //整改公司
        (this.rectificationDepartment = []), //整改部门
        (this.rectificationCharge = []), //整改负责人
        (this.location = ""), //地点
        (this.isPunish = ""), //是否处罚
        (this.isSuspended = 0), //是否处挂起
        (this.dangerLevel = ""), //隐患等级
        (this.dangerType = ""), //隐患类型
        (this.dangerSource = ""), //隐患来源
        (this.acceptanceCharge = []), //验收负责人
        (this.punishMoney = ""), //处罚金额
        (this.dangerDesc = ""); //隐患描述
      sessionStorage.removeItem("flag");
    }
  },
  watch: {
    // 验收负责人
    acceptanceCharges(val) {
      this.acceptanceCharge = val;
    },
    // 验收负责人
    rectificationCharges(val) {
      this.rectificationCharge = val;
    },
    rectificationDepartments(val){
      this.rectificationDepartment = val
    },
    rectificationCompanys(val){
      this.rectificationCompany = val
    },
    //隐患等级
    dangerLevel(val) {
      if (val === 3) {
        this.isSuspended = 1;
      } else {
        this.isSuspended = 0;
      }
    },
    //隐患等级
    dangerSource(val) {
      this.dangerSource = val;
    }
  },
  methods: {
    closeAction() {
      this.isShowAction = false;
    },
    openAction() {
      this.isShowAction = true;
    },
    //获取详情
    getDataInfo() {
      this.$api.page_3
        .dangerRectificationForm({
          __sid: localStorage.getItem("JiaHuaSessionId"),
          id: this.id
        })
        .then(res => {
          const info = res.dangerRectification;
          this.rectificationName = info.rectificationName || "";
          this.rectificationCompany = info.rectificationCompany || "";
          this.rectificationDepartment = info.rectificationDepartment || "";
          this.location = info.location || "";
          this.id = info.id;
          this.isPunish = Number(info.isPunish) || "";
          this.dangerLevel = Number(info.dangerLevel) || "";
          this.dangerType = Number(info.dangerType) || "";
          this.dangerSource = Number(info.dangerSource) || "";
          this.punishMoney = Number(info.punishMoney) || "";
          this.dangerDesc = info.dangerDesc || "";
          if (info.ysfzr) {
            this.acceptanceCharge.push({
              avatarUrl: info.ysfzr.avatarUrl,
              fullName: "",
              userCode: info.ysfzr.userCode,
              userName: info.ysfzr.userName
            });
          }
          if (info.zgfzr) {
            this.rectificationCharge.push({
              avatarUrl: info.zgfzr.avatarUrl,
              fullName: "",
              userCode: info.zgfzr.userCode,
              userName: info.zgfzr.userName
            });
          }
        })
        .catch(() => {});
    },
    // 发送数据
    postData() {
      // this.isDataEmpty_throw({
      //   data: [
      //     this.rectificationName, // 整改单名称
      //     this.rectificationCompany, // 整改公司
      //     this.rectificationDepartment, // 整改部门或督察部门
      //     this.rectificationCharge, // 整改负责人
      //     this.location, // 地点
      //     this.dangerLevel, // 隐患等级
      //     this.dangerType, // 隐患类型
      //     this.dangerSource, // 隐患来源
      //     this.isPunish, // 是否处罚
      //     this.punishMoney, // 处罚金额
      //     this.isSuspendedColumns[this.isSuspended], // 是否处挂起
      //     this.dangerDesc, // 隐患描述
      //     this.fileList, // 上传图片
      //     this.acceptanceCharge, // 验收负责人
      //   ],
      //   err: () => {
      //     this.$notify('请输入将表单内容填写完整')
      //   }
      // });
      const that = this;
      let rectificationCharge = [];
      this.rectificationCharge.forEach(item => {
        rectificationCharge.push(item.userCode);
      });
      let acceptanceCharge = [];
      this.acceptanceCharge.forEach(item => {
        acceptanceCharge.push(item.userCode);
      });
      let sendData = {
        rectificationName: this.rectificationName, //整改单
        rectificationCompany: this.rectificationCompany, //整改公司
        rectificationDepartment: this.rectificationDepartment[0].id, //整改部门
        rectificationCharge: rectificationCharge.join(","), //整改负责人
        location: this.location, //地点
        isPunish: this.isPunish, //是否处罚
        isSuspended: this.isSuspended, //是否处挂起
        dangerLevel: this.dangerLevel, //隐患等级
        dangerType: this.dangerType, //隐患类型
        dangerSource: this.dangerSource, //隐患来源
        acceptanceCharge: acceptanceCharge.join(","), //验收负责人
        punishMoney: this.punishMoney, //处罚金额
        dangerDesc: this.dangerDesc,
        id: this.$route.query.id ? this.$route.query.id : "",
        __sid: localStorage.getItem("JiaHuaSessionId") //隐患描述
      };
      console.log(sendData);
      this.$api.page_3
        .dangerRectificationSave(sendData)
        .then(res => {
          this.$Toast.success({
            message: "提交成功",
            onClose() {
              that.pageBack();
            }
          });
        })
        .catch(() => {});
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
