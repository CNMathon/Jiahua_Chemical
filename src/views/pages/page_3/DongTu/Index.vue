<template>
  <div class="mangban">
    <van-nav-bar
      title="动土安全"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
      fixed
    />
    <div class="fixed-first">
      <van-skeleton title :row="3" :loading="isLoading" class="skeleton">
        <div class="app">
          <div class="cell_group">
            <!-- 申请部门 -->
            <cell-value title="申请部门" :value="$userInfo.officeName" disable></cell-value>
            <!-- 申请人 -->
            <cell-value title="申请人" :value="$userInfo.userName" disable></cell-value>
            <!-- 作业票编号 -->
            <cell-value title="作业票编号" :value="$route.query.code" disable></cell-value>
            <!-- 作业票状态 -->
            <cell-value title="作业票状态" value="编辑" disable></cell-value>
            <!-- 作业部门 -->
            <div class="cell">
              <div class="cell_title">
                <span>作业部门</span>
              </div>
              <div class="cell_value">
                <span>部门名1、部门名2</span>
                <span class="cell_value_arrow">
                  <van-icon name="search" />
                </span>
              </div>
            </div>
            <!-- 作业地点 -->
            <cell-input v-model="sendData.dtSite" title="作业地点" required placeholder="手工录入"></cell-input>
            <!-- 涉及其他特殊作业 -->
            <cell-select-tag
              required
              title="涉及其他特殊作业"
              storeKey="otherSpecial"
              :tagList="sendData.otherSpecial"
              :showList="list_1"
              :storeModule="storeModule"
            ></cell-select-tag>
            <!-- 危害辨识 -->
            <cell-select-tag
              required
              title="危害辨识"
              storeKey="hazardSb"
              :tagList="sendData.hazardSb"
              :showList="list_2"
              :storeModule="storeModule"
            ></cell-select-tag>
            <!-- 动土开始时间 -->
            <cell-time v-model="sendData.dtStarttime" title="动土开始时间" required></cell-time>
            <!-- 动土结束时间 -->
            <cell-time v-model="sendData.dtEndtime" title="动土结束时间" required></cell-time>
            <!-- 监护人 -->
            <cell-select-user
              title="监护人"
              required
              :storeModule="storeModule"
              storeKey="guardian"
              v-model="sendData.guardian"
            ></cell-select-user>
            <!-- 作业负责人 -->
            <cell-select-user
              title="作业负责人"
              required
              :storeModule="storeModule"
              storeKey="dtMan"
              v-model="sendData.dtMan"
            ></cell-select-user>
            <!-- 作业范围、内容、方式 -->
            <div class="cell border_none image-update">
              <div class="cell_title">
                <span>动土范围示意图及相关说明</span>
              </div>
              <!-- <div class="cell_other">
                <textarea class="cell_textarea" placeholder="请输入工作内容" cols="30" rows="10"></textarea>
              </div>-->
              <div class="cell_other">
                <div class="upload">
                  <!-- <div class="upload_icon">
                    <van-icon name="photo-o" />
                  </div>-->
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
            </div>
            <!-- 安全措施 -->
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
                  @checked="showSignature(0)"
                  @cancel="signatureCancel(0)"
                >
                  <div slot>作业人员已进行了安全教育</div>
                </Signature>
                <Signature
                  :checked="checked[1] ? checked[1].checked : false"
                  :img="checked[1] ? checked[1].img : ''"
                  @checked="showSignature(1)"
                  @cancel="signatureCancel(1)"
                >
                  <div slot>作业地点处于易燃易爆场所，需要动火时已办理动火证</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>地下电力点啦已确认保护措施已落实</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>地下通讯电（光）缆、局域网络电（光）缆已确认保护措施已落实</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>地下供排水、消防管道、工艺管道已确认保护措施已落实。</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>已按作业方案图划线和立绘</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>动土地点有电线、管道等地下设施，已向作业单位交代并派人监护；作业时情挖做使用铁棒、铁镐或抓斗等机械工具。</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>作业现场围栏、警戒线、告示牌、夜间照明、警示灯已按要求设置</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>已进行放坡处理和固壁支撑</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>人员出入口和撤离安全措施已落实：</div>
                  <span
                    :class="safe.indexOf('梯子') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('safe', '梯子', false)"
                  >梯子</span>
                  <span
                    :class="safe.indexOf('修坡道') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('safe', '修坡道', false)"
                  >修坡道</span>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>施工作业已报</div>
                  <span
                    :class="report.indexOf('公司办') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('report', '公司办', false)"
                  >公司办</span>
                  <span
                    :class="report.indexOf('消防队') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('report', '消防队', false)"
                  >消防队</span>
                  <span
                    :class="report.indexOf('安全环保部') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('report', '安全环保部', false)"
                  >安全环保部</span>
                  <span
                    :class="report.indexOf('公司调度') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('report', '公司调度', false)"
                  >公司调度</span>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>夜间作业采用足够、充足照明，</div>
                  <div slot>A防水型灯</div>
                  <span
                    :class="waterLight.indexOf('36V') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('waterLight', '36V')"
                  >36V</span>
                  <span
                    :class="waterLight.indexOf('24V') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('waterLight', '24V')"
                  >24V</span>
                  <span
                    :class="waterLight.indexOf('12V') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('waterLight', '12V')"
                  >12V</span>
                  <div slot>防爆型灯</div>
                  <span
                    :class="boomLight[0] == '36V' ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('boomLight', '36V')"
                  >36V</span>
                  <span
                    :class="boomLight[0] == '24V' ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('boomLight', '24V')"
                  >24V</span>
                  <span
                    :class="boomLight[0] == '12V' ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('boomLight', '12V')"
                  >12V</span>
                  <div slot>作业人员已佩戴防护器械</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2] ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>动土范围内无障碍物，并在总图上做标记</div>
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
          <!-- 操作Popup -->
          <van-popup v-model="isShowAction" position="bottom" class="action">
            <button @click="postData">保存</button>
            <button @click="workflowSubmit">工作流提交</button>
            <button @click="closeAction">取消</button>
          </van-popup>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
import Signature from "../components/Signature.vue";
import Canvas from "@/components/Canvas.vue";
export default {
  name: "dongtu",
  mixins: [business, uploadFile],
  components: {
    Signature,
    Canvas
  },
  data() {
    return {
      storeModule: "dongtu",
      sendData: {
        dtSite: "", //作业地点
        dtStarttime: "", //动土开始时间
        dtEndtime: "", //动土结束时间
        otherSpecial: [], //涉及其他作业
        hazardSb: [], //危害辨识
        guardian: [], //监护人
        dtMan: [] //作业部门负责人
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
      safe: [],
      report: [],
      waterLight: [],
      boomLight: [],
      checked: [],
      isShowAction: false,
      queryId: "",
      isLoading: false,
      signatureShow: false,
      isSave: false,
      canClean: false,
    };
  },
  computed: mapState({
    otherSpecial: state => state.dongtu.otherSpecial,
    hazardSb: state => state.dongtu.hazardSb,
    guardian: state => state.dongtu.guardian,
    dtMan: state => state.dongtu.dtMan
  }),
  beforeRouteLeave(to, from, next) {
    if (to.name === "dongtu_list") {
      this.queryId = "";
      for (const key in this.sendData) {
        if (this.sendData.hasOwnProperty(key)) {
          console.log("typeof this.sendData[key]: ", typeof this.sendData[key]);
          if (typeof this.sendData[key] === "object") {
            this.sendData[key] = [];
          } else {
            this.sendData[key] = "";
          }
        }
      }
      next();
    } else {
      next();
    }
  },
  activated() {
    console.log("code:", this.$route.query.code);
    if (this.$route.query.code) {
      if (this.queryId !== this.$route.query.code) {
        this.queryId = this.$route.query.code;
        this.getPageData();
      }
    }
  },
  // beforeDestroy() {
  //   if (this.canClean) {
  //     this.queryId = "";
  //     this.$store.dispatch("dongtu/cleanState");
  //   }
  // },
  methods: {
    // 工作流提交
    workflowSubmit() {
      if (this.$route.query.status == undefined) {
        this.$notify('请先保存表单')
      }
    },

    // 选择器选择事件
    // groupArr => 选择值存放变量 => String => 必填
    // value => 选择值 => String => 必填
    // isSingle => 是否单选 => Boolean => 选填（默认为true）
    changeChoose(groupArr, value, isSingle = true) {
      if (!isSingle) {
        const index = this[groupArr].indexOf(value);
        if (index == -1) {
          this[groupArr].push(value);
        } else {
          this[groupArr].splice(index);
        }
      }
      else {
        this[groupArr].splice(0);
        this[groupArr].push(value);
      }
    },
    // 显示签名
    showSignature(index) {
      console.log("index: ", index);
      console.log("显示签名");
      this.selectSignatureShow = index;
      this.signatureShow = true;
    },
    signatureCancel(index) {
      console.log("index: ", index);
      console.log("取消");
      this.checked[index].checked = false;
      this.checked[index].img = "";
    },

    changeSafe(id) {
      let index = this.safe.indexOf(id);
      if (index == -1) {
        this.safe.push(id);
      } else {
        this.safe.splice(index);
      }
    },
    changeReport(id) {
      let index = this.report.indexOf(id);
      if (index == -1) {
        this.report.push(id);
        // console.log(this.report)
      } else {
        this.report.splice(index);
        // console.log(this.report)
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

    saveCanvas(e) {
      this.signatureShow = false;
      this.checked[this.selectSignatureShow] = {
        checked: false,
        img: ""
      };
      this.checked[this.selectSignatureShow].img = e;
      console.log("signatureShow: ");
    },
    cancelCanvas() {
      this.checked[this.selectSignatureShow].checked = false;
      this.checked[this.selectSignatureShow].img = "";
      this.signatureShow = false;
    },

    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      let htDeviceDefect_file = this.fileList.map(item => {
        return item.id;
      });
      console.log("file", htDeviceDefect_file);
      sendData.otherSpecial = this.stringData("otherSpecial", "list_1");
      sendData.hazardSb = this.stringData("hazardSb", "list_2");
      sendData.guardian = this.userString(sendData.guardian, "userName");
      sendData.dtMan = this.userString(sendData.dtMan, "userName");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applyer = this.$userInfo.userName;
      sendData.dtSite = this.sendData.dtSite; // 作业地点
      sendData.htDeviceDefect_file = htDeviceDefect_file.join(",");
      sendData.__sid = this.$userInfo.sessionId;
      sendData.dtStarttime = this.sendData.dtStarttime;
      sendData.dtEndtime = this.sendData.dtEndtime;
      let htHseDtzypListData = [
        {
          id: this.$route.query.id,
          
        },
      ]
      sendData.htHseDtzypListData = htHseDtzypListData;
      if (this.$route.query.id) {
        sendData.id = this.$route.query.id
      }
      if (
        this.isDataEmpty(
          sendData.dtSite,
          sendData.otherSpecial,
          sendData.hazardSb,
          sendData.dtStarttime,
          sendData.dtEndtime,
          sendData.guardian,
          sendData.dtMan
        )
      ) {
        console.log(123);
        this.notify();
        return;
      }
      console.log("sendData", sendData);
      this.$api.page_3
        .htHseDtzypSave(sendData)
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
        .htHseDtzypListData({
          dtzypCode: this.$route.query.code,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.isLoading = false;
          let info = res.list[0];
          console.log("pageData: ", info);
          console.log("id: ", info.id);
          this.sendData.id = info.id;
          for (const key in this.sendData) {
            if (key === "guardian") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
            } else if (key === "dtMan") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
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
          console.log("this.sendData: ", this.sendData);
        });
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
  .image-update {
    flex-wrap: initial !important;
  }
}
</style>
