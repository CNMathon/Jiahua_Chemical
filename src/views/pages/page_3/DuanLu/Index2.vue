<template>
  <div class="mangban">
    <van-nav-bar
      v-if='status!=="5"'
      title="断路安全"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
    />
    <van-nav-bar
      v-else
      title="断路安全"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value title="申请部门" :value="sendData.apprDept" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" :value="sendData.apprRen" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" :value="sendData.permitCode" disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" value="编辑" disable></cell-value>
      <!-- 断路原因 -->
      <cell-select-tag
        disable
        required
        title="断路原因"
        storeKey="reason"
        :tagList="sendData.reason"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        disable
        required
        title="危害辨识"
        storeKey="endangerSign"
        :tagList="sendData.endangerSign"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 断路开始时间 -->
      <cell-time disable v-model="sendData.offtimeStart" title="断路开始时间" required></cell-time>
      <!-- 断路结束时间 -->
      <cell-time disable v-model="sendData.offtimeEnd" title="断路结束时间" required></cell-time>
      <!-- 作业部门 -->
      <cell-select-department
              disable
              title="作业部门"
              required
              :storeModule="storeModule"
              storeKey="workDept"
              v-model="sendData.workDept"
            ></cell-select-department>
      <!-- 作业部门负责人 -->
      <cell-select-user
        disable
        title="作业部门负责人"
        required
        :storeModule="storeModule"
        storeKey="workCharger"
        v-model="sendData.workCharger"
      ></cell-select-user>
      <!-- {{sendData.workCharger}} -->
      <!-- 涉及部门 -->
      <cell-select-department
              disable
              title="涉及部门"
              required
              :storeModule="storeModule"
              storeKey="involveDept"
              v-model="sendData.involveDept"
            ></cell-select-department>
      <!-- 断路地段示意图及相关说明-->
      <!-- <cell-textarea v-model="sendData.offExplain" title="断路地段示意图及相关说明" placeholder="请输入工作内容"></cell-textarea> -->
      <!-- <div class="cell border_none">
        <div class="cell_other">
          <div class="upload">
            <div class="upload_box">
              <van-uploader
                :before-read="beforeRead"
                :before-delete="beforeDelete"
                v-model="fileList"
                preview-size="5rem"
              />
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="confirm">
      <div class="head">
        <div class="head_1">安全措施</div>
        <div class="head_2">确认</div>
        <div class="head_3">确认人</div>
      </div>
      <div class="confirm_list">
        <Signature
          :checked="checked[0] ? checked[0].checked : false"
          :img="checked[0] ? checked[0].img : ''"
          disable
          @checked="showSignature(0)"
          @cancel="signatureCancel(0)"
        >
          <div slot>作业前,制定交通组织方案(附后),并已通知相关部门或单位</div>
        </Signature>
        <Signature
          :checked="checked[1] ? checked[1].checked : false"
          :img="checked[1] ? checked[1].img : ''"
          disable
          @checked="showSignature(1)"
          @cancel="signatureCancel(1)"
        >
          <div slot>作业前,在断路的路口和相关道路上设置交通警示标志,在作业区附近设置路栏、道路作业警示灯、导向标等交通警示设施</div>
        </Signature>
        <Signature
          :checked="checked[2] ? checked[2].checked : false"
          :img="checked[2] ? checked[2].img : ''"
          disable
          @checked="showSignature(2)"
          @cancel="signatureCancel(2)"
        >
          <div slot>夜间作业设置警示红灯，并设置固定的围栏</div>
        </Signature>
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
    <cell-textarea :disable="status!=='2'" v-model="sendData.otherSafety" title="其他安全措施" required placeholder="请输入其他安全措施"></cell-textarea>
        <div v-if="status=='2'" class="signature" @click="signatureShow = true">
          <span>签字</span>
          <van-image v-if="sendData.othercsComplier" style="width:40px;margin-left:30px" :src="sendData.othercsComplier"></van-image>
          <van-icon style="float:right" name="edit" />
          <span style="float:right;font-size:14px;margin-right:30px">{{sendData.othercsTime}}</span>
          
        </div>
        <div v-if="status!=='2'" class="signature">
          <span>签字</span>
          <van-image v-if="sendData.othercsComplier" style="width:40px;margin-left:30px" :src="sendData.othercsComplier"></van-image>
          <span style="float:right;font-size:14px;margin-right:30px">{{sendData.othercsTime}}</span>
          
        </div>
    <!-- 操作Popup -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button v-if="status=='2'" @click="postData">保存</button>
      <button @click="Next">工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "duanlu",
  mixins: [business, uploadFile],
  components: {
    Signature,
    Canvas
  },
  created() {
    // console.log(this.$route.query.id)
    // this.id = this.$route.query.id || 0;
    // this.getPageData();
  },
  data() {
    return {
      id: 0,
      storeModule: "duanlu",
      sendData: {
        reason: [], //断路原因
        endangerSign: [], //危害辨识
        offtimeStart: "", //断路时间（起）
        offtimeEnd: "", //断路时间（止）
        workCharger: [], //作业部门负责人
        //offExplain: "" //相关说明
        workDept:[],
        involveDept:[],
        otherSafety:'',
        othercsComplier:'',
        othercsTime:'',
        apprDept: "", // 申请部门
        apprRen: "", // 申请人
      },
      fileList: [], // 图片列表
      list_1: [
        "修理马路",
        "开挖埋设水管",
        "埋设电缆",
        "开挖沟渠",
        "吊装设备",
        "管道"
      ],
      list_2: ["人员受伤", "车辆伤害", "人员跌落沟渠"],
      isShowAction: false,
      signatureShow: false,
      selectSignatureShow: 0,
      checked: [
        {
          checked: false,
          image: ""
        },
        {
          checked: false,
          image: ""
        },
        {
          checked: false,
          image: ""
        }
			],
      canClean: false,
      actRuTask:'',
      status:''
    };
  },
  computed: mapState({
    reason: state => state.duanlu.reason,
    endangerSign: state => state.duanlu.endangerSign,
    workCharger: state => state.duanlu.workCharger,
    involveDept:state=>state.duanlu.involveDept,
    workDept:state=>state.duanlu.workDept
  }),
  // beforeDestroy() {
  //   if (this.canClean) {
  //     this.queryId = "";
  //     this.$store.dispatch("duanlu/cleanState");
  //   }
  // },
  activated() {
		// console.log(111111)
    // if (this.$route.query.status == undefined) {
		// 	this.$store.dispatch("duanlu/cleanState");
    //   this.sendData = {
    //     reason: [], //断路原因
    //     endangerSign: [], //危害辨识
    //     offtimeStart: "", //断路时间（起）
    //     offtimeEnd: "", //断路时间（止）
    //     workCharger: [], //作业部门负责人
    //     offExplain: "" //相关说明
    //   };
    // }
    console.log("code:", this.$route.query.code);
    if (this.$route.query.code&&sessionStorage.getItem('flag')=='1') {
      this.sendData={
        reason: [], //断路原因
        endangerSign: [], //危害辨识
        offtimeStart: "", //断路时间（起）
        offtimeEnd: "", //断路时间（止）
        workCharger: [], //作业部门负责人
        involveDept:[],
        workDept:[],
        apprDept: "", // 申请部门
        apprRen: "", // 申请人
      }
      this.getPageData();
      sessionStorage.removeItem('flag')
    }else if(!this.$route.query.code&&sessionStorage.getItem('flag')=='1'){
      this.sendData={
        reason: [], //断路原因
        endangerSign: [], //危害辨识
        offtimeStart: "", //断路时间（起）
        offtimeEnd: "", //断路时间（止）
        workCharger: [], //作业部门负责人
        involveDept:[],
        workDept:[],
        apprDept: "", // 申请部门
        apprRen: "", // 申请人
      }
      sessionStorage.removeItem('flag')
    }
  },
  methods: {
    // 工作流提交
    workflowSubmit() {
      if (this.$route.query.code == undefined) {
        this.$notify('请先保存表单')
      }
    },
    Next() {
      console.log(33333333333)
        if (this.actRuTask === '') {
          console.log(2)
          let data = {
            'id': this.id,
            'flowKey': 'htHseDlzypService',
            __sid: localStorage.getItem("JiaHuaSessionId")
          }
          this.$api.page_3.start('dlzyp/htHseDlzyp', data).then((res) => {
            if(res.result==='true'){
              console.log(res)
              if (res.groups) {
                this.$router.push({
                  name: 'daibanren', query: {
                    groups: res.groups.join(','),
                    taskId: res.taskId,
                    id: this.id,
                    type: 'htHseDlzypService'
                  }              })
              } else {
                this.$router.replace({ name: 'duanlu_list' })
              }
            }else{
              this.$notify(res.message);
            }
          }).catch(() => this.$Toast.clear());
        } else {
          console.log(22222222222222)
          this.$router.push({
            name: 'duanlu_shenpi',
            query: {
              id: this.id,
              actRuTask: this.actRuTask,
              status:this.status
            }
          })
        }
    },
    getPageData() {
      this.$api.page_3
        .htHseDlzypListDataById({
          __sid: localStorage.getItem("JiaHuaSessionId"),
          id: this.$route.query.code
        })
        .then(res => {
          this.listData = res;
          this.isLoading = false;
          console.log(this.listData);
          this.id = res.id
          this.sendData.apprDept= this.listData.sqbm.officeName, // 申请部门
          this.sendData.apprRen= this.listData.sqr.userName
          this.actRuTask = this.listData.actRuTask?this.listData.actRuTask.id:''
          this.status = this.listData.htStatus
          this.sendData.offtimeEnd = this.listData.offtimeEnd
          this.sendData.offtimeStart = this.listData.offtimeStart
          this.sendData.reason = this.reductionSelectTag(
                  this.listData.reason,
                  this.list_1
                );
          this.sendData.endangerSign = this.reductionSelectTag(
                  this.listData.endangerSign,
                  this.list_2
                );
          this.sendData.otherSafety = this.listData.otherSafety
          this.sendData.othercsTime = this.listData.othercsTime
          this.sendData.othercsComplier = this.listData.othercsComplier
          this.sendData.workDept = [{
            name:this.listData.zybm.officeName,
            id:this.listData.zybm.id
          }];
          this.sendData.workCharger = this.reductionSelectUserObj(this.listData.zybmfzr);
          this.sendData.involveDept = [{
            name:this.listData.sjbm,
            id:this.listData.involveDept
          }];
          console.log(this.sendData)
        })
        .catch(() => {});
    },
    reductionSelectDept(data) {
      let newArr = [];
      let arr = data.split(",");
      arr.forEach(element => {
        let obj = {};
        obj.name = element;
        newArr.push(obj);
      });
      return newArr;
    },
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },
    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    // 保存主、子表
    postData(again = false, zypId) {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      console.log(this.fileList)
      let htHseDtzyp_file = this.fileList.map(item => {
        return item.id;
      });
      sendData.id = this.id
      sendData.reason = this.stringData("reason", "list_1");
      sendData.endangerSign = this.stringData("endangerSign", "list_2");
      if (this.$route.query.code) {
        sendData.apprDept = this.listData.sqbm.officeCode;
        sendData.applyer = this.listData.sqr.userCode;
      } else {
        sendData.apprDept = this.$userInfo.officeCode;
        sendData.applyer = this.$userInfo.userCode;
      }
      sendData.htHseDtzyp_file = htHseDtzyp_file.join(",");
      sendData.workCharger = sendData.workCharger[0].userCode
      sendData.workDept = sendData.workDept[0].id
      sendData.involveDept = sendData.involveDept[0].id
      sendData.__sid = this.$userInfo.sessionId;
      let List = [
        {
          num: 1,
          safetyCs: `作业前,制定交通组织方案(附后),并已通知相关部门或单位`,
          affirmRen: this.checked[0] ? this.checked[0].img : 0,
          safetyStatus: this.checked[0] ? 1 : 0
        },
        {
          num: 2,
          safetyCs: `作业前,在断路的路口和相关道路上设置交通警示标志,在作业区附近设置路栏、道路作业警示灯、导向标等交通警示设施`,
          affirmRen: this.checked[1] ? this.checked[1].img : 0,
          safetyStatus: this.checked[1] ? 1 : 0
        },
        {
          num: 3,
          safetyCs: `夜间作业设置警示红灯，并设置固定的围栏`,
          affirmRen: this.checked[2] ? this.checked[2].img : 0,
          safetyStatus: this.checked[2] ? 1 : 0
        }
      ];
      console.log(List);
      if (again) {
        // List.map(item => {
        //   item.zypId = zypId;
        // });
        sendData.htHseDlzypSaftyList = List;
      }
      console.log("sendData: ", sendData);
      this.$api.page_3
        .htHseDlzypSave(sendData, this.$userInfo.sessionId)
        .then(res => {
          console.log("res: ", res);
          if (again) {
            this.$Toast.success({
              message: "提交成功",
              onClose() {
                that.pageBack();
              }
            });
          } else {
            // 保存子表
            this.postData(true, res.message);
          }
        })
        .catch(() => {});
    },
    // 显示签名
    showSignature(index) {
      console.log("index: ", index);
      console.log("显示签名");
      this.selectSignatureShow = index;
      this.checked[index].checked = true;
      this.signatureShow = true;
    },
    // 取消签名
    signatureCancel(index) {
      console.log("index: ", index);
      console.log("取消");
      this.checked[index].checked = false;
      this.checked[index].img = "";
    },
    // 保存签名
    saveCanvas(e) {
      console.log(123)
      console.log("e: ", e);
      this.signatureShow = false;
      this.sendData.othercsComplier = e;
      this.sendData.othercsTime = this.$dayjs(new Date()).format("YYYY-MM-DD HH:mm")
    },
    // 取消签名
    cancelCanvas() {
      console.log("取消签名");
      this.signatureShow = false;
    }
  },
  watch: {
    reason(res) {
      this.sendData.reason = res;
    },
    endangerSign(res) {
      this.sendData.endangerSign = res;
    },
    workCharger(res) {
      this.sendData.workCharger = res;
    },
    workDept(res){
      this.sendData.workDept = res
    },
    involveDept(res){
      this.sendData.involveDept = res
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";

.mangban {
  background-color: #fff;

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

.head {
  display: flex;
  text-align: center;
  margin-bottom: 20px;

  .head_1 {
    width: 420px;
  }

  .head_2 {
    width: 100px;
  }

  .head_3 {
    width: 300px;
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
.signature {
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
</style>
