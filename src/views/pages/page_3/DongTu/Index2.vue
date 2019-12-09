<template>
  <div class="mangban">
    <van-sticky>
      <van-nav-bar
        title="动土安全"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="openAction"
      />
    </van-sticky>
    <van-skeleton title :row="3" :loading="isLoading" class="skeleton">
      <div class="app">
        <div class="cell_group">
          <!-- 申请部门 -->
          <cell-value title="申请部门" :value="apply.dept" disable></cell-value>
          <!-- 申请人 -->
          <cell-value title="申请人" :value="apply.name" disable></cell-value>
          <!-- 作业票编号 -->
          <cell-value title="作业票编号" :value="apply.code" disable></cell-value>
          <!-- 作业票状态 -->
          <cell-value title="作业票状态" value="审核" disable v-if="$route.query.status == 3"></cell-value>
          <cell-value title="作业票状态" value="有效" disable v-if="$route.query.status == 4"></cell-value>
          <cell-value title="作业票状态" value="已终结" disable v-if="$route.query.status == 5"></cell-value>
          <!-- 作业地点 -->
          <cell-input v-model="sendData.dtSite" title="作业地点" disable></cell-input>
          <!-- 涉及其他特殊作业 -->
          <cell-value title="涉及其他特殊作业" :value="String(sendData.otherSpecial)" disable></cell-value>
          <!-- 危害辨识 -->
          <cell-value title="危害辨识" :value="String(sendData.hazardSb)" disable></cell-value>
          <!-- 动土开始时间 -->
          <cell-value title="动土开始时间" :value="String(sendData.dtStarttime)" disable></cell-value>
          <!-- 动土结束时间 -->
          <cell-value title="动土结束时间" :value="String(sendData.dtEndtime)" disable></cell-value>
          <!-- 监护人 -->
          <cell-select-user
            title="监护人"
            :storeModule="storeModule"
            storeKey="guardian"
            v-model="sendData.guardian"
            disable
          ></cell-select-user>
          <!-- 作业部门 -->
          <cell-select-department
              title="作业部门"
              required
              :storeModule="storeModule"
              storeKey="dtDept"
              v-model="sendData.dtDept"
            ></cell-select-department>
          <!-- 作业负责人 -->
          <cell-select-user
            title="作业负责人"
            :storeModule="storeModule"
            storeKey="dtMan"
            v-model="sendData.dtMan"
            disable
          ></cell-select-user>
          <!-- 作业范围、内容、方式 -->
          <!-- <div class="cell border_none">
            <div class="cell_title">
              <span>作业范围、内容、方式</span>
            </div>
            <div class="cell_other">
              <div class="upload">
                <div class="upload_box">
                  <van-image width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                </div>
              </div>
            </div>
          </div> -->
          <!-- 安全措施 -->
          <div class="confirm">
            <div class="head">
              <div class="head_1">安全措施</div>
              <div class="head_2">确认</div>
              <div class="head_3">确认人</div>
            </div>
            <div class="confirm_list">
              <Signature
                v-for="(safe, index) in checked" :key="index"
                :checked="safe.safetyStatus === 1"
                :img="safe.affirmRen!=='0'?safe.affirmRen:''"
                :disable="true"
              >
                <div slot>{{safe.safetyCs}}</div>
              </Signature>
            </div>
          </div>
        </div>
        <!-- 画板Popup -->
        <van-popup
          class="popup"
          v-model="signatureShow"
          :close-on-click-overlay="false"
          position="bottom"
        >
          <Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
        </van-popup>
        <cell-textarea v-model="sendData.otherSafety" title="其他安全措施" required placeholder="请输入其他安全措施"></cell-textarea>
        <div class="signature" @click="signatureShow = true">
          <span>签字</span>
          <van-image v-if="sendData.othercsComplier" style="width:40px;margin-left:30px" :src="sendData.othercsComplier"></van-image>
          <van-icon style="float:right" name="edit" />
          <span style="float:right;font-size:14px;margin-right:30px">{{sendData.othercsTime}}</span>
          
        </div>
        <!-- 操作Popup -->
        <van-popup v-model="isShowAction" position="bottom" class="action">
          <button @click="postData">保存</button>
          <button @click="Next">工作流提交</button>
          <button @click="closeAction">取消</button>
        </van-popup>
      </div>
    </van-skeleton>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";

export default {
  name: "dongtuindex",
  mixins: [business, uploadFile],
  data() {
    return {
      storeModule: "dongtu",
      apply: {
        name: '',
        dept: '',
        code: '',
      },
      oldInfo: {},
      sendData: {
        dtSite: "", //作业地点
        dtStarttime: "", //动土开始时间
        dtEndtime: "", //动土结束时间
        otherSpecial: [], //涉及其他作业
        hazardSb: [], //危害辨识
        guardian: [], //监护人
        dtDept:[],
        otherSafety:'',
        dtMan: [], //作业部门负责人
        othercsComplier:'',//签名
        othercsTime:''
      },
      list_1: [
        "动火",
        "登高",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ],
      list_2: [
        "物体打击",
        "机械伤害",
        "触电",
        "坍塌",
        "中毒窒息",
        "火灾",
        "受限空间"
      ],
      isShowAction: false,
      queryId: "",
      signatureShow: false,
      isLoading: false,
      checked: [],
      safe: [],
      report: [],
      waterLight: [],
      boomLight: [],
      actRuTask:'',
      id:''
    };
  },
  components: {
    Signature,
    Canvas
  },
  computed: mapState({
    otherSpecial: state => state.dongtu.otherSpecial,
    hazardSb: state => state.dongtu.hazardSb,
    guardian: state => state.dongtu.guardian,
    dtMan: state => state.dongtu.dtMan
  }),
  created () {
    this.pageInit();
  },
  activated() {
  },
  beforeDestroy() {
    this.queryId = "";
  },
  methods: {
    pageInit() {
      if (this.$route.query.code) {
        if (this.queryId !== this.$route.query.code) {
          this.queryId = this.$route.query.code;
          this.getPageData();
        }
      } else {
        this.apply ={
            name: this.$userInfo.userName,
            dept: this.$userInfo.officeName,
            code: '',
          };
      }
      this.initChecked();
    },
    initChecked() {
      this.checked = [];
      for (let i = 0; i < 13; i++) {
        let obj = { checked: false };
        this.checked.push(obj);
      }
    },
    Next(){
      console.log(33333333333)
        if (this.actRuTask === '') {
          console.log(2)
          let data = {
            'id': this.id,
            'flowKey': 'htHseDtzypService',
            __sid: localStorage.getItem("JiaHuaSessionId")
          }
          this.$api.page_3.start('dtzyp/htHseDtzyp', data).then((res) => {
            if(res.result==='true'){
              console.log(res)
              if (res.groups) {
                this.$router.push({
                  name: 'daibanren', query: {
                    groups: res.groups.join(','),
                    taskId: res.taskId,
                    id: this.id,
                    type: 'htHseDtzypService'
                  }              })
              } else {
                this.$router.replace({ name: 'dongtu_list' })
              }
            }else{
              this.$notify(res.message);
            }
          }).catch(() => this.$Toast.clear());
        } else {
          this.$router.push({
            name: 'dongtu_shenpi',
            query: {
              id: this.id,
              actRuTask: this.actRuTask,
              status:'2'
            }
          })
        }
    },
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },

    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      let htDeviceDefect_file = this.fileList.map(item => {
        return item.id;
      });
      sendData.otherSpecial = this.stringData("otherSpecial", "list_1");
      sendData.hazardSb = this.stringData("hazardSb", "list_2");
      sendData.guardian = this.userString(sendData.guardian, "userCode");
      sendData.dtMan = this.userString(sendData.dtMan, "userCode");
      sendData.dtDept = this.userString(sendData.dtDept, "id");
      sendData.htDeviceDefect_file = htDeviceDefect_file.join(",");
      // sendData.id =
      sendData.__sid = this.$userInfo.sessionId;
      if (this.queryId) {
        sendData.applyDept = this.oldInfo.office.officeCode;
        sendData.applyer = this.oldInfo.user.userCode;
        sendData.htHseDtzypSafetyList = this.oldInfo.htHseDtzypSafetyList;
      } 
      console.log(sendData)
      this.$api.page_3
        .htHseDtzypSave(sendData, this.$userInfo.sessionId)
        .then(() => {
          this.$Toast.success({
            message: "提交成功",
            onClose() {
              that.pageBack();
            }
          });
        })
        .catch(() => {});
    },
    // 编辑-获取页面数据
    getPageData() {
      this.isLoading = true;
      this.$api.page_3
        .htHseDtzypListDataById({
          id: this.$route.query.code,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.isLoading = false;
          let info = res;
          this.oldInfo = res;
          this.actRuTask = info.actRuTask?info.actRuTask.id:''
          this.id = info.id
          console.log("info: ", info);
          this.sendData.id = info.id;
           for (const key in this.sendData) {
            if (key === "guardian") {
              this.sendData[key] = this.reductionSelectUserObj({
                userName: info.jhr,
                userCode: info.guardian
              });
            } else if (key === "dtMan") {
              this.sendData[key] = this.reductionSelectUserObj(info.zyfzr);
            } else if (key === "dtDept") {
              this.sendData[key] = [
                {
                  id: info.zybm.id,
                  name: info.zybm.officeName
                }
              ];
            } else if (key === "otherSpecial") {
              if (info[key])
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_1
                );
            } else if (key === "hazardSb") {
              if (info[key])
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_2
                );
            } else {
              this.sendData[key] = info[key];
            }
          }
          this.apply ={
            name: info.office.officeName,
            dept: info.user.userName,
            code: info.dtzypCode,
          };
          // this.sendData.applyDept = this.oldInfo.office.officeName;
          // this.sendData.applyer = this.oldInfo.user.userName;
          // if (info.htHseDtzypSafetyList.length > 0) {
          //   this.initChilderData(info.htHseDtzypSafetyList)
          // }
          this.checked = info.htHseDtzypSafetyList;
          console.log("this.sendData: ", this.sendData);
        });
    },
    initChilderData (res) {
      let checked = {};
        console.log("动土", res);
        res.forEach((item, inx) => {
          if (item.safetyStatus && item.safetyStatus === 1) {
            checked[item.num] = {
              checked: true,
              safetyCs: item.safetyCs,
              img: item.affirmRen,

            };
          } else {
            checked[item.num] = {
              checked: false,
              safetyCs: item.safetyCs,
              img: "",
            };
          }
        });
        this.checked = Object.values(checked);
    },
    reductionSelectDept(data) {
      console.log(data)
      let newArr = [];
      let arr = data.split(",");
      arr.forEach(element => {
        let obj = {};
        obj.name = element;
        newArr.push(obj);
      });
      return newArr;
    },
    // 保存签名
    saveCanvas(e) {
      console.log(123)
      console.log("e: ", e);
      this.signatureShow = false;
      this.sendData.othercsComplier = e;
      this.sendData.othercsTime = this.$dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    // 取消签名
    cancelCanvas() {
      console.log("取消签名");
      this.signatureShow = false;
    }
  },
  watch: {
    otherSpecial(res) {
      this.sendData.otherSpecial = res;
    },
    hazardSb(res) {
      this.sendData.hazardSb = res;
    },
    guardian(res) {
      this.sendData.guardian = res;
    },
    dtMan(res) {
      this.sendData.dtMan = res;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.mangban {
  .cell_group {
    /deep/ .cell {
      background-color: #f5f5f5;
    }
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
}
.signature {
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
</style>
