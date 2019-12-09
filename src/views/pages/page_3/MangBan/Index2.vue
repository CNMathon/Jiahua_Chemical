<template>
  <div class="mangban">
    <van-sticky>
      <van-nav-bar title="盲板抽堵安全"
                   left-text="返回"
                   right-text="操作"
                   left-arrow
                   @click-left="pageBack"
                   @click-right="openAction" />
    </van-sticky>
    <div class="header-cell">
      <!-- 申请部门 -->
      <cell-value title="申请部门"
                  :value="oldInfo.office?oldInfo.office.officeName:''"
                  disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人"
                  :value="oldInfo.user.userName"
                  disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号"
                  :value="$userInfo.dhzypCode"
                  disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态"
                  :value="zypztList[oldInfo.htStatus].name"
                  disable></cell-value>
    </div>
    <div class="cell_group"
         v-for="(item, index) in sendData.pipe"
         :key="index">
      <!-- 管道序号 -->
      <cell-value :title="'管道' + (index + 1)"
                  class="guandao-id"></cell-value>
      <!-- 设备管道名称 -->
      <cell-input disable title="设备管道名称"
      
                  v-model="item.pipeName"
                  placeholder="手工录入"></cell-input>
      <!-- 介质 -->
      <cell-input disable title="介质"
                  v-model="item.pipeMedium"
                  placeholder="手工录入"></cell-input>
      <!-- 温度 -->
      <cell-input disable title="温度"
                  v-model="item.pipeTemp"
                  placeholder="手工录入"></cell-input>
      <!-- 压力 -->
      <cell-input disable title="压力"
                  v-model="item.pipePressure"
                  placeholder="手工录入"></cell-input>
      <!-- 材质 -->
      <cell-picker disable title="材质"
                   v-model="sendData.pipe[index].pipeMaterial"
                   :columns="materialColumns" />
      <!-- 规格 -->
      <cell-input disable title="规格"
                  v-model="item.pipeSpec"
                  placeholder="手工录入"></cell-input>
      <!-- 编号 -->
      <cell-input disable title="编号"
                  v-model="item.pipeNumber"
                  placeholder="手工录入"></cell-input>
      <!-- 堵时间 -->
      <cell-time disable v-model="item.pipePullTime"
                 title="堵时间" />
      <!-- 抽时间 -->
      <cell-time disable v-model="item.pipeBlockTime"
                 title="抽时间" />
      <!-- 堵作业人 -->
      <cell-select-user disable title="堵作业人"
                        :storeModule="storeModule"
                        :storeKey="'pipeBlockOperator'+ index"
                        v-model="item.pipeBlockOperator" />
      <!-- 抽作业人 -->
      <cell-select-user disable title="抽作业人"
                        :storeModule="storeModule"
                        :storeKey="'pipePullOperator'+ index"
                        v-model="item.pipePullOperator" />
      <!-- 堵监护人 -->
      <cell-select-user disable title="堵监护人"
                        :storeModule="storeModule"
                        :storeKey="'pipeBlockGuardian'+ index"
                        v-model="item.pipeBlockGuardian" />
      <!-- 抽监护人 -->
      <cell-select-user disable title="抽监护人"
                        :storeModule="storeModule"
                        :storeKey="'pipePullGuardian'+ index"
                        v-model="item.pipePullGuardian" />

      
    </div>
    <!-- 第二部分 -->
    <div class="cell_group">
      <!-- 生产部门作业负责人 -->
      <cell-select-user disable title="生产部门作业负责人"
                        required
                        :storeModule="storeModule"
                        storeKey="scMan"
                        v-model="sendData.scMan"></cell-select-user>
      <!-- 作业部门负责人 -->
      <cell-select-user disable title="作业部门负责人"
                        required
                        :storeModule="storeModule"
                        storeKey="zyMan"
                        v-model="sendData.zyMan"></cell-select-user>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag disable required
                       title="涉及其他特殊作业"
                       storeKey="otherSpecial"
                       :tagList="sendData.otherSpecial"
                       :showList="list_1"
                       :storeModule="storeModule"></cell-select-tag>
    </div>
    <!-- 时间选择 -->
    <van-popup v-model="timeShow"
               position="bottom">
      <van-datetime-picker v-model="currentDate"
                           type="datetime"
                           :min-date="new Date()"
                           @cancel="onTimeCancel"
                           @confirm="onTimeConfirm" />
    </van-popup>

    <!-- 安全措施 -->
    <div class="confirm">
      <div class="head">
        <div class="head_1">安全措施</div>
        <div class="head_2">确认</div>
        <div class="head_3">确认人</div>
      </div>
      <div class="confirm_list">
        <div v-for="(item,index) in checked"
             :key="index">
          <Signature disable :checked="item.checked"
                     :img="item.img"
                     @checked="showSignature(index)"
                     @cancel="signatureCancel(index)">
            <span slot>{{item.safetyCs}}</span>
          </Signature>
        </div>
      </div>
      <!-- 画板Popup -->
      <van-popup class="popup"
                 v-model="signatureShow"
                 :close-on-click-overlay="false"
                 position="bottom">
        <Canvas ref="signature"
                @save="saveCanvas"
                @cancel="cancelCanvas"></Canvas>
      </van-popup>
    </div>
    <div class="cell border_none image-update">
      <div class="cell_title">
        <span>盲板位置图及编号</span>
      </div>
      <!-- <div class="cell_other">
                <textarea class="cell_textarea" placeholder="请输入工作内容" cols="30" rows="10"></textarea>
              </div>-->
      <div class="cell_other">
        <div class="upload">
          <!-- <div class="upload_icon">
                    <van-icon name="photo-o" />
                  </div>-->
          <div class="upload_box"
               style="margin-top:10px">
            <van-uploader v-model="fileList"
                          :before-read="beforeRead"
                          :before-delete="beforeDelete"
                          preview-size="5rem" />
          </div>
        </div>
      </div>
    </div>
    <!-- 操作Popup -->
    <van-popup v-model="isShowAction"
               position="bottom"
               class="action">
      <button @click="postData">保存</button>
      <button @click="Next">工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>
<script>
  import { business } from "../../../../mixin/business";
  import { mapState } from "vuex";
  import { uploadFile } from "../../../../mixin/uploadFile";
  import Canvas from "@/components/Canvas.vue";
  import Signature from "../components/Signature.vue";
  export default {
    name: "mangbanindex",
    data () {
      return {
        fileList: [],
        infoId: '',
        storeModule: "mangban",
        materialShowShow: false,
        material: {
          index: 0,
          value: ""
        },
        zypztList: [
          // 作业票状态列表
          { name: "请选择", index: '' },
          { name: "编辑", index: 1 },
          { name: "提交资料", index: 2 },
          { name: "初审", index: 3 },
          { name: "审核", index: 4 },
          { name: "有效", index: 5 },
          { name: "结束", index: 6 }
        ],
        materialColumns: ["碳钢", "不锈钢", "塑料", "聚四氟乙烯"],
        timeShow: false,
        currentDate: new Date(),
        list_1: [
          "登高",
          "动火",
          "临时用电",
          "盲板抽堵",
          "吊装",
          "动土",
          "断路作业"
        ],
        isShowAction: false,
        sendData: {
          scMan: [], // 生产部门作业负责人
          zyMan: [], // 作业部门负责人
          otherSpecial: [], //涉及其他特殊作业
          signatureImage: "", // 签名图片 - base64
          pipe: [
          ],
          __sid: localStorage.getItem("JiaHuaSessionId")
        },
        checked: [
          {
            safetyCs:
              "在有毒介质的管道、设备上作业时,尽可能降低系统压力,作业点应为常压",
            checked: false,
            img: ""
          },
          {
            safetyCs: "在有毒介质的管道、设备上作业时,作业人员穿戴适合的防护用具",
            checked: false,
            img: ""
          },
          {
            safetyCs:
              "易燃易爆场所,作业人员穿防静电工作服、工作鞋;作业时使用防爆灯具和防爆工具",
            checked: false,
            img: ""
          },
          {
            safetyCs: "易燃易爆场所,距作业地点30m 内无其他动火作业",
            checked: false,
            img: ""
          },
          {
            safetyCs:
              "在强腐蚀性介质的管道、设备上作业时,作业人员已采取防止酸碱灼伤的措施",
            checked: false,
            img: ""
          },
          {
            safetyCs: "介质温度较高、可能造成烫伤的情况下,作业人员已采取防烫措施",
            checked: false,
            img: ""
          },
          {
            safetyCs: "同一管道上不同时进行两处及两处以上的盲板抽堵作业",
            checked: false,
            img: ""
          }
        ],
        signatureShow: false,
        oldInfo: {},
        actRuTask:'',
        id:''
      };
    },
    computed: mapState({
      scMan: state => state.mangban.scMan,
      zyMan: state => state.mangban.zyMan,
      otherSpecial: state => state.mangban.otherSpecial,
      pipeBlockOperator1: state => state.mangban.pipeBlockOperator0,
      pipePullOperator1: state => state.mangban.pipePullOperator0,
      pipeBlockGuardian1: state => state.mangban.pipeBlockGuardian0,
      pipePullGuardian1: state => state.mangban.pipePullGuardian0,
      pipeBlockOperator2: state => state.mangban.pipeBlockOperator1,
      pipePullOperator2: state => state.mangban.pipePullOperator1,
      pipeBlockGuardian2: state => state.mangban.pipeBlockGuardian1,
      pipePullGuardian2: state => state.mangban.pipePullGuardian1,
      pipeBlockOperator3: state => state.mangban.pipeBlockOperator2,
      pipePullOperator3: state => state.mangban.pipePullOperator2,
      pipeBlockGuardian3: state => state.mangban.pipeBlockGuardian2,
      pipePullGuardian3: state => state.mangban.pipePullGuardian2,
      pipeBlockOperator4: state => state.mangban.pipeBlockOperator3,
      pipePullOperator4: state => state.mangban.pipePullOperator3,
      pipeBlockGuardian4: state => state.mangban.pipeBlockGuardian3,
      pipePullGuardian4: state => state.mangban.pipePullGuardian3
    }),
    components: {
      Canvas,
      Signature
    },
    mixins: [business, uploadFile],
    created () {
      this.infoId = this.$route.query.id ? this.$route.query.id : '';
      this.getInfo();
    },
    methods: {
      getInfo () {
        this.$api.page_3
          .htHseMbzypListDataById({
            __sid: localStorage.getItem("JiaHuaSessionId"),
            id: this.infoId
          })
          .then(res => {
            let info = res;
            this.oldInfo = info;
            console.log(info)
            this.id = info.id
            this.actRuTask = info.actRuTask?info.actRuTask.id:''
            console.log(this.id)
            this.sendData.scMan = this.reductionSelectUserObj(info.sc);
            this.sendData.zyMan = this.reductionSelectUserObj(info.zy);
            this.sendData.otherSpecial = this.reductionSelectTag(info.otherSpecial, this.list_1);
            //  格式化管道
            let pipiObj = (arr) => {
              let PullName = arr[10].split(",");
              let BlockName = arr[9].split(",");
              let BlockCode = new Array(BlockName.length).fill('').join(',');
              let PullCode = new Array(PullName.length).fill('').join(',');
              let pipePullOperator = this.assemblyStrToUserObj(PullCode,arr[10]);
              let pipeBlockOperator = this.assemblyStrToUserObj(BlockCode,arr[9]);
              let pipeBlockGuardian = [{'userName':arr[11].substr(0,arr[11].indexOf('&')),'userCode':arr[11].substr(arr[11].indexOf('&')+1,arr[11].length)}]
              let pipePullGuardian = [{'userName':arr[12].substr(0,arr[12].indexOf('&')),'userCode':arr[12].substr(arr[12].indexOf('&')+1,arr[12].length)}]
              console.log(pipePullGuardian)
              let obj = {
                'pipeName': arr[0],
                'pipeMedium': arr[1],
                'pipeTemp': arr[2],
                'pipePressure': arr[3],
                'pipeMaterial': arr[4],
                'pipeSpec': arr[5],
                'pipeNumber': arr[6],
                'pipePullTime': arr[7],
                'pipeBlockTime': arr[8],
                'pipeBlockOperator': this.reductionSelectUserObj(pipeBlockOperator),
                'pipePullOperator': this.reductionSelectUserObj(pipePullOperator),
                'pipeBlockGuardian': pipeBlockGuardian,
                'pipePullGuardian': pipePullGuardian,
              }
              return obj;
            }
            if (info.onePipe.length > 14) {
              let arr = info.onePipe.split("|");
              this.sendData.pipe.push(pipiObj(arr));
            }
            if (info.twoPipe.length > 14) {
              let arr = info.twoPipe.split("|");
              this.sendData.pipe.push(pipiObj(arr));
            }
            if (info.threePipe.length > 14) {
              let arr = info.threePipe.split("|");
              this.sendData.pipe.push(pipiObj(arr));
            }
            if (info.fourPipe.length > 14) {
              let arr = info.fourPipe.split("|");
              this.sendData.pipe.push(pipiObj(arr));
            }
            console.log(this.sendData)
            this.initListDataD(info.htHseMbzypSafetyList);
          })
          .catch(() => { });
      },
      //  初始化子票
      initListDataD(data) {
      //  this.checked
      let checked = {};
      data.forEach(item => {
        this.checked[parseInt(item.num)] = {
          checked: item.safetyStatus === 1,
          safetyCs: item.safetyCs,
          img: item.affirmRen === "0" ? "" : item.affirmRen
        };
      });
      console.log("this.checked", this.checked);
      this.$forceUpdate();
      // this.$nextTick(() => {
      //   this.donghuoInit = false;
      // });
    },
      Next () {
        console.log(this.actRuTask)
        if (this.actRuTask === '') {
          console.log(2)
          let data = {
            'id': this.id,
            'flowKey': 'htHseMbzypService',
            __sid: localStorage.getItem("JiaHuaSessionId")
          }
          this.$api.page_3.start('mbzyp/htHseMbzyp', data).then((res) => {
            if(res.result==='true'){
              console.log(res)
              if (res.groups) {
                this.$router.push({
                  name: 'daibanren', query: {
                    groups: res.groups.join(','),
                    taskId: res.taskId,
                    id: this.id,
                    type: 'htHseMbzypService'
                  }              })
              } else {
                this.$router.replace({ name: 'mangban_list' })
              }
            }else{
              this.$notify(res.message);
            }
          }).catch(() => this.$Toast.clear());
        } else {
          this.$router.push({
            name: 'mangban_shenpi',
            query: {
              id: this.id,
              actRuTask: this.actRuTask,
            }
          })
        }
      },
      filterPipeUser (info, arr) {
        info.pipeBlockOperator = this.reductionSelectUser(arr[9]);
        info.pipePullOperator = this.reductionSelectUser(arr[10]);
        info.pipeBlockGuardian = this.reductionSelectUser(arr[11]);
        info.pipePullGuardian = this.reductionSelectUser(arr[12]);
      },
      // 保存签名
      saveCanvas (e) {
        this.signatureShow = false;
        this.checked[this.selectSignatureShow].checked = true;
        this.checked[this.selectSignatureShow].img = e;
        this.sendData.signatureImage = e;
      },
      // 取消签名
      cancelCanvas () {
        this.checked[this.selectSignatureShow].checked = false;
        this.checked[this.selectSignatureShow].img = "";
        this.signatureShow = false;
      },
      // 显示签名
      showSignature (index) {
        this.selectSignatureShow = index;
         this.signatureShow = true;
      },
      // 取消签名
      signatureCancel (index) {
        this.checked[index].checked = false;
        this.checked[index].img = "";
      },

      // 打开操作Popup
      openAction () {
        this.isShowAction = true;
      },

      // 关闭操作Popup
      closeAction () {
        this.isShowAction = false;
      },

      pageBack () {
        this.$router.back();
      },
      // 材质选择
      onMaterialConfirm (value, index) {
        this.materialShowShow = false;
        this.material = {
          index: index,
          value: value
        };
      },

      postData () {
        let sendData = JSON.parse(JSON.stringify(this.sendData));
        let pipe = sendData.pipe;
        let dataStrArr = [];

        function formatMaterial (str) {
          if (str == `碳钢`) {
            return 1;
          }
          if (str == `不锈钢`) {
            return 2;
          }
          if (str == `塑料`) {
            return 3;
          }
          if (str == `聚四氟乙烯`) {
            return 4;
          }
        }

        for (let i = 0;i <= 3;i++) {
          if (pipe[i] == undefined) {
            dataStrArr[i] = `|||||||||||&|&`;
            continue;
          }
          let pipePullOperator = pipe[i].pipePullOperator.map(item => item.userName);
          let pipeBlockOperator = pipe[i].pipeBlockOperator.map(item => item.userName);
          dataStrArr[i] = `${pipe[i].pipeName}|${pipe[i].pipeMedium}|${pipe[i].pipeTemp}|${
            pipe[i].pipePressure
            }|${pipe[i].pipeMaterial}|${pipe[i].pipeSpec}|${
            pipe[i].pipeNumber
            }|${pipe[i].pipeBlockTime}|${pipe[i].pipePullTime}|${
            pipeBlockOperator.join(',')
            }|${pipePullOperator.join(',')}|${pipe[i].pipeBlockGuardian[0].userName}&${
            pipe[i].pipeBlockGuardian[0].userCode
            }|${pipe[i].pipePullGuardian[0].userName}&${pipe[i].pipePullGuardian[0].userCode}`;
        }
        let finSendData = {
          onePipe: dataStrArr[0],
          twoPipe: dataStrArr[1],
          threePipe: dataStrArr[2],
          fourPipe: dataStrArr[3],
          __sid: sendData.__sid
        };
        if (this.$route.query.id) {
          finSendData.id = this.oldInfo.id;
          finSendData.mbzypCode = this.oldInfo.mbzypCode;
        }
        let htHseMbzyp_file = this.fileList.map(item => {
          return item.id;
        });
         if (this.$route.query.id) {
          sendData.applyDept = this.oldInfo.office?this.oldInfo.office.officeName:'';
          sendData.applyer = this.oldInfo.user.userName;
          finSendData.applyDept = this.oldInfo.office?this.oldInfo.office.officeCode:'';//正式用
          finSendData.applyer = this.oldInfo.user.userCode;//正式用
        }else{
          sendData.applyDept = this.$userInfo.officeName;
          sendData.applyer = this.$userInfo.userName;
          finSendData.applyDept = this.$userInfo.officeCode;//正式用
          finSendData.applyer = this.$userInfo.userCode;//正式用
        }
        console.log("file", htHseMbzyp_file);
        finSendData.mbzypCode = this.infoId
        finSendData.htHseMbzyp_file = htHseMbzyp_file.join(",");
        finSendData.scMan = this.userString(sendData.scMan, "userCode");
        finSendData.zyMan = this.userString(sendData.zyMan, "userCode");
        finSendData.otherSpecial = this.stringData("otherSpecial", "list_1");
        finSendData.htHseMbzypSafetyList = this.checked.map((item, index) => {
          let obj = {
            zypId: "",
            num: index,
            safetyCs: item.safetyCs,
            safetyStatus: Number(item.checked),
            affirmRen: item.img
          };
          return obj;
        });
        console.log("finSendData: ", finSendData);
        console.log(this.fileList)
        this.$api.page_3.htHseMbzypSave(finSendData, this.$userInfo.sessionId).then(res => {
          console.log(res)
          if (res.result === 'true') {
            this.$toast('保存成功');
            // this.pageBack();
          } else {
            this.$notify(res.message);
          }
        });
      },
      // 材质选择取消
      onMaterialCancel () {
        this.materialShowShow = false;
      },
      // 取消时间选择
      onTimeCancel () {
        this.timeShow = false;
      },
      // 确认时间选择
      onTimeConfirm () {
        this.timeShow = false;
      },
      toSelect (index) {
        this.$router.push({
          path: "./select",
          query: {
            index: index,
            showList: this[`list_${index}`]
          }
        });
      },
      // 新增管道
      addDevice () {
        if (this.sendData.pipe.length < 4) {
          this.sendData.pipe.push({
            pipeName: "", // 设备管道名称
            pipeMedium: "", // 介质
            pipeTemp: "", // 温度
            pipePressure: "", // 压力
            pipeMaterial: "", // 材质
            pipeSpec: "", // 规格
            pipeNumber: "", // 编号
            pipePullTime: "", // 堵时间
            pipeBlockTime: "", // 抽时间
            pipeBlockOperator: [], // 堵作业人
            pipePullOperator: [], // 抽作业人
            pipeBlockGuardian: [], // 堵监护人
            pipePullGuardian: [] // 抽监护人
          });
        }
      }
    },
    watch: {
      zyMan (res) {
        this.sendData.zyMan = res;
      },
      scMan (res) {
        this.sendData.scMan = res;
      },
      otherSpecial (res) {
        this.sendData.otherSpecial = res;
      },
      pipeBlockOperator1 (res) {
        this.sendData.pipe[0].pipeBlockOperator = res;
      },
      pipePullOperator1 (res) {
        this.sendData.pipe[0].pipePullOperator = res;
      },
      pipeBlockGuardian1 (res) {
        this.sendData.pipe[0].pipeBlockGuardian = res;
      },
      pipePullGuardian1 (res) {
        this.sendData.pipe[0].pipePullGuardian = res;
      },
      pipeBlockOperator2 (res) {
        this.sendData.pipe[1].pipeBlockOperator = res;
      },
      pipePullOperator2 (res) {
        this.sendData.pipe[1].pipePullOperator = res;
      },
      pipeBlockGuardian2 (res) {
        this.sendData.pipe[1].pipeBlockGuardian = res;
      },
      pipePullGuardian2 (res) {
        this.sendData.pipe[1].pipePullGuardian = res;
      },
      pipeBlockOperator3 (res) {
        this.sendData.pipe[2].pipeBlockOperator = res;
      },
      pipePullOperator3 (res) {
        this.sendData.pipe[2].pipePullOperator = res;
      },
      pipeBlockGuardian3 (res) {
        this.sendData.pipe[2].pipeBlockGuardian = res;
      },
      pipePullGuardian3 (res) {
        this.sendData.pipe[2].pipePullGuardian = res;
      },
      pipeBlockOperator4 (res) {
        this.sendData.pipe[3].pipeBlockOperator = res;
      },
      pipePullOperator4 (res) {
        this.sendData.pipe[3].pipePullOperator = res;
      },
      pipeBlockGuardian4 (res) {
        this.sendData.pipe[3].pipeBlockGuardian = res;
      },
      pipePullGuardian4 (res) {
        this.sendData.pipe[3].pipePullGuardian = res;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/cell.scss";

  .mangban {
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

  .guandao-id {
    background-color: rgb(0, 142, 225) !important;
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

  .cell {
    background-color: white;
  }

  .header-cell {
    margin-bottom: 30px;
  }
  .image-update {
    flex-wrap: initial !important;
    padding: 10px 10px 0;
  }
</style>
