<template>
  <div class="donghuo">
    <van-nav-bar
      title="动火安全"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
      fixed
    />
    <div class="cell_group fixed-first">
      <!-- 申请部门 -->
      <cell-value title="申请部门" required :value="oldInfo.office?oldInfo.office.officeName:''" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" required :value="oldInfo.user.userName" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" :value="$route.query.id" disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" :value="htStatus(oldInfo.htStatus)" disable></cell-value>
      <!-- 动火地点及内容 -->
      <cell-textarea
        title="动火地点及内容"
        required
        v-model="sendData.siteContent"
        placeholder="请输入作业内容"
        disable
      ></cell-textarea>
      <!-- 动火级别 -->
      <cell-value title="动火级别" :value="dhLevelColumns[sendData.dhLevel - 1]" required disable arrow></cell-value>
      <!-- 动火方式 -->
      <cell-select-tag
        required
        title="动火方式"
        storeKey="dhWay"
        :tagList="sendData.dhWay"
        :showList="list_1"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 涉及其他作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="otherSpecial"
        :tagList="sendData.otherSpecial"
        :showList="list_2"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardSb"
        :tagList="sendData.hazardSb"
        :showList="list_3"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 动火开始时间 -->
      <cell-time v-model="sendData.dhStarttime" title="动火开始时间" required disable></cell-time>
      <!-- 动火结束时间 -->
      <cell-time v-model="sendData.dhEndtime" title="动火结束时间" required disable></cell-time>
      <!-- 动火作业负责人 -->
      <cell-select-user
        title="动火作业负责人"
        required
        :storeModule="storeModule"
        storeKey="dhzyPrincipal"
        v-model="sendData.dhzyPrincipal"
        disable
      ></cell-select-user>
      <!-- 动火人 -->
      <cell-select-user
        title="动火人"
        required
        :storeModule="storeModule"
        storeKey="dhzyRen"
        v-model="sendData.dhzyRen"
        disable
      ></cell-select-user>
      <!-- 动火安全 -->
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
          >
            <span slot>动火设备内部构件清理干净,蒸汽吹扫或水洗合格,达到用火条件。</span>
          </Signature>
          <Signature
            :checked="checked[1] ? checked[1].checked : false"
            :img="checked[1] ? checked[1].img : ''"
          >
            <span slot>断开与动火设备相连接的所有管线,加盲板</span>
            <span>
              <van-stepper :min="0" v-model="manbanNumber" />
            </span>
            <span slot>块</span>
          </Signature>
          <Signature
            :checked="checked[2] ? checked[2].checked : false"
            :img="checked[2] ? checked[2].img : ''"
          >
            <div slot>动火点周围的下水井、地漏、地沟、电缆沟等已清除易燃物,并已采取覆盖、铺沙、水封等手段进行隔离</div>
          </Signature>
          <Signature
            :checked="checked[3] ? checked[3].checked : false"
            :img="checked[3] ? checked[3].img : ''"
          >
            <div slot>罐区内动火点同一围堰内和防火间距内的油罐不同时进行脱水作业</div>
          </Signature>
          <Signature
            :checked="checked[4] ? checked[4].checked : false"
            :img="checked[4] ? checked[4].img : ''"
          >
            <div slot>高处作业已采取防火花飞溅措施</div>
          </Signature>
          <Signature
            :checked="checked[5] ? checked[5].checked : false"
            :img="checked[5] ? checked[5].img : ''"
          >
            <div slot>动火点周围易燃物已清除</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
          >
            <div slot>电焊回路线已接在焊件上,把线未穿过下水井或与其他设备搭接</div>
          </Signature>
          <Signature
            :checked="checked[7] ? checked[7].checked : false"
            :img="checked[7] ? checked[7].img : ''"
          >
            <div slot>乙炔气瓶(直立放置)、氧气瓶间距大于5米，与火源间的距离大于10米</div>
          </Signature>
          <Signature
            :checked="checked[8] ? checked[8].checked : false"
            :img="checked[8] ? checked[8].img : ''"
          >
            <div slot>
              <span>现场配备消防水带</span>
              <span>
                <van-stepper :min="0" v-model="fangshuidaiNumber" />
              </span>
              <span>根，灭火器</span>
              <span>
                <van-stepper :min="0" v-model="miehuoqiNumber" />
              </span>
              <span>台，铁锹</span>
              <span>
                <van-stepper :min="0" v-model="tieqiuNumber" />
              </span>
              <span>把，灭火毯</span>
              <span>
                <van-stepper :min="0" v-model="miehuotanNumber" />
              </span>
              <span>块</span>
            </div>
          </Signature>
        </div>
      </div>
      <!-- 动火分析 -->
      <div class="fenxi">
        <div class="fenxi__title">动火分析1</div>
        <!-- 动火分析时间 -->
        <cell-time v-model="sendData.dhfxTimeA" title="动火分析时间" required disable></cell-time>
        <!-- 分析点名称 -->
        <cell-input v-model="sendData.fxdNameA" title="分析点名称" placeholder="手工录入" required disable></cell-input>
        <!-- 可燃气体爆炸极限 -->
        <cell-picker
          title="可燃气体爆炸极限"
          required
          v-model="sendData.krqbzLimitationA"
          :columns="krqbzLimitationAColumns"
          disable
        ></cell-picker>
        <!-- 分析数据 -->
        <cell-input v-model="sendData.fxDataA" title="分析数据" required placeholder="手工录入" disable></cell-input>
        <!-- 分析人 -->
        <cell-select-user
          title="分析人"
          required
          :storeModule="storeModule"
          radio
          storeKey="fxRenA"
          v-model="sendData.fxRenA"
          disable
        ></cell-select-user>
      </div>
      <!-- 其他安全措施 -->
      <cell-textarea
        v-model="sendData.otherSafety"
        title="其他安全措施"
        placeholder="请输入其他安全措施"
        required
        disable
      ></cell-textarea>
      <div class="signature">
        <div class="signature__head">
          <div>签字</div>
          <div class="signature__image">
            <van-image width="100%" height="100%" :src="signatureA" />
          </div>
          <div class="signature__icon">{{signatureATime}}</div>
        </div>
      </div>
      <!-- 作业范围、内容、方式 -->
      <div class="cell border_none upload">
        <div class="cell_title">
          <span>环境分析图</span>
        </div>
        <div class="cell_other">
          <div class="upload">
            <div class="upload_box">
              <van-row gutter="20">
                <van-col span="8" v-for="(item,index) in fileListA" :key="index">
                  <van-image width="100" height="100" :src="item" />
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </div>
      <!-- 监火人 -->
      <cell-select-user
        title="监火人"
        required
        :storeModule="storeModule"
        radio
        :border="false"
        storeKey="dhSup"
        v-model="sendData.dhSup"
        disable
      ></cell-select-user>
      <!-- 操作Popup -->
      <van-popup v-model="isShowAction" position="bottom" class="action">
        <button>工作流提交</button>
        <button @click="closeAction">取消</button>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "donghuo",
  mixins: [business],
  components: {
    Canvas,
    Signature
  },
  data() {
    return {
      storeModule: "donghuo",
      sendData: {
        siteContent: "", //动火地点及内容
        dhLevel: null, //动火级别
        dhStarttime: "", //动火开始时间
        dhEndtime: "", //动火结束时间
        dhWay: [], //动火方式
        otherSpecial: [], //涉及其他特殊作业
        hazardSb: [], //危害辨识
        dhzyPrincipal: [], //动火作业负责人
        dhzyRen: [], //动火人
        otherSafety: "", //其他安全措施
        dhfxTimeA: "", //动火分析时间1
        fxdNameA: "", //分析点名称1
        krqbzLimitationA: null, //可燃气爆炸极限1
        fxDataA: "", //分析数据1
        fxRenA: [], //分析人1
        dhSup: [] //监火人
      },
      dhLevelColumns: ["制定位置特殊动火作业", "特殊", "|类", "||类"],
      krqbzLimitationAColumns: [
        "甲醇（6～36.5）",
        "乙醇（3.3～19）",
        "氯苯（1.3～11）",
        "氢气（4.1～72）",
        "甲苯（1.2～7）"
      ], //可燃气爆炸极限1
      list_1: [
        "电焊",
        "气（割）焊",
        "塑焊",
        "电钻",
        "风镐",
        "切割",
        "磨削",
        "喷灯"
      ],
      list_2: [
        "登高",
        "受限空间",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ],
      list_3: [
        "火灾、爆炸",
        "中度和窒息",
        "化学灼伤",
        "机械伤害",
        "触电",
        "高处坠落"
      ],
      manbanNumber: 0,
      fangshuidaiNumber: 0,
      miehuoqiNumber: 0,
      tieqiuNumber: 0,
      miehuotanNumber: 0,
      signatureShow: false,
      checked: [],
      selectSignatureShow: Number,
      isShowAction: false,
      oldInfo: {}, //主表信息
      childrenData: [], //子表信息
      fileListA: [],
      signatureA: "",
      signatureATime: ""
    };
  },
  created() {
    this.queryId = this.$route.query.id;
    this.getPageData();
  },
  methods: {
    // 清除所有数据
    clearData() {
      this.sendData.siteContent = ""; //动火地点及内容
      this.sendData.dhLevel = null; //动火级别
      this.sendData.dhStarttime = ""; //动火开始时间
      this.sendData.dhEndtime = ""; //动火结束时间
      this.sendData.dhWay = []; //动火方式
      this.sendData.otherSpecial = []; //涉及其他特殊作业
      this.sendData.hazardSb = []; //危害辨识
      this.sendData.dhzyPrincipal = []; //动火作业负责人
      this.sendData.dhzyRen = []; //动火人
    },
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },
    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    // 动火主表查询
    getPageData() {
      this.$api.page_3
        .htHseDhzypListData({
          dhzypCode: this.queryId,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          let info = res.list[0];
          this.oldInfo = info;
          for (const key in this.sendData) {
            if (key === "dhzyPrincipal") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
            } else if (key === "dhzyRen") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
            } else if (key === "fxRenA") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
            } else if (key === "dhSup") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
            } else if (key === "dhWay") {
              if (info[key])
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_1
                );
            } else if (key === "otherSpecial") {
              if (info[key])
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_2
                );
            } else if (key === "hazardSb") {
              if (info[key])
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_3
                );
            } else {
              this.sendData[key] = info[key];
            }
          }
          // 动火子表查询
          this.mylistDataD();
        });
    },
    // 动火子表查询
    mylistDataD() {
      this.$api.page_3
        .mylistDataD({
          id: this.oldInfo.id,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.childrenData = res;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  text-align: center;
  .head_1 {
    width: 420px;
    // background-color: red
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
  background-color: #f5f5f5;
  padding: 30px;
  box-sizing: border-box;

  &__head {
    display: flex;
    align-items: center;
  }

  &__image {
    margin-left: 10px;
    width: 112.5px;
    height: 45px;

    img {
      width: 112.5px;
      height: 45px;
    }
  }

  &__icon {
    margin-left: auto;
  }
}
.upload {
  padding: 30px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.fenxi {
  padding: 30px 0;
  padding-bottom: 0;
  box-sizing: border-box;

  &__title {
    padding: 30px;
    color: #fff;
    box-sizing: border-box;
    background-color: blue;
  }
}
</style>