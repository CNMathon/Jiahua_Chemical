<template>
  <div class="cheng-bao-shang-ren-yuan-detali">
    <van-sticky>
      <van-nav-bar
        title="人员信息详细"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
    </van-sticky>
    <van-tabs
      v-model="active"
      sticky
      :offset-top="46"
      color="#6096F8"
      title-active-color="#3875E5"
      title-inactive-color="#4A4A4A"
    >
      <label v-for="(tabs, tabIndex) in tabList" :key="tabIndex">
        <van-tab :title="tabs.title">
          <van-pull-refresh
            v-model="tabs.isLoading"
            @refresh="getDataList(true)"
          >
            <van-list
              v-model="tabs.loading"
              :finished="tabs.finished"
              :error.sync="tabs.error"
              error-text="请求失败，点击重新加载"
              @load="getDataList()"
            >
              <!-- 人员信息 -->
              <label v-if="tabIndex === 0">
                <label v-for="(item, index) in tabs.dataList" :key="index">
                  <div class="tab-title">基本信息</div>
                  <cell-value title="人员头像">
                    <div slot class="slot-header">
                      <van-image
                        v-if="item.avatar"
                        class="header"
                        :src="item.avatar"
                      ></van-image>
                    </div>
                  </cell-value>
                  <cell-value
                    title="人员姓名"
                    :value="item.empName"
                  ></cell-value>
                  <cell-value
                    title="性别"
                    :value="judgeUserSex(item.sex)"
                  ></cell-value>
                  <cell-value title="民族" :value="item.nation"></cell-value>
                  <cell-value
                    title="身份证号码"
                    :value="item.empIdnumber"
                  ></cell-value>
                  <cell-value
                    title="所属单位"
                    :value="item.empCompany"
                  ></cell-value>
                  <cell-value title="职务" :value="item.duty"></cell-value>
                  <cell-value title="岗位" :value="item.post"></cell-value>
                  <cell-value
                    title="用工部门"
                    :value="item.ygdept"
                  ></cell-value>
                  <div class="tab-title">详细信息</div>
                  <cell-value
                    title="联系电话"
                    :value="item.phonenumber"
                  ></cell-value>
                  <cell-value
                    title="出生日期"
                    :value="item.birthday"
                  ></cell-value>
                  <cell-value title="电子邮箱" :value="item.email"></cell-value>
                  <cell-value
                    title="家庭住址"
                    :value="item.adress"
                  ></cell-value>
                  <cell-value title="婚姻状况" :value="item.ismarry==1?'已婚':item.ismarry==2?'未婚':item.ismarry==3?'离异':''"></cell-value>
                  <cell-value title="学历" :value="item.education==0?'小学':item.education==1?'初中':item.education==2?'高中':item.education==3?'中专':item.education==4?'大专':item.education==5?'本科':item.education==6?'硕士研究生':item.education==7?'博士研究生':''"></cell-value>
                  <cell-value title="学位" :value="item.degree==0?'小学':item.degree==1?'初中':item.degree==2?'高中':item.degree==3?'中专':item.degree==4?'大专':item.degree==5?'本科':item.degree==6?'硕士研究生':item.degree==7?'博士研究生':''"></cell-value>
                  <cell-value title="特殊作业" :value="item.specialWork==1?'是':'否'"></cell-value>
                  <cell-value title="工种" :value="item.typeofworker==0?'无':item.typeofworker==1?'金属焊接、切割作业':item.typeofworker==3?'起重机械作业':''"></cell-value>
                  <cell-value title="是否黑名单" :value="item.isblacklist==1?'是':item.isblacklist==2?'否':''"></cell-value>
                </label>
              </label>
              <!-- 资质材料 -->
              <label v-if="tabIndex === 1">
                <label v-for="(item, index) in tabs.dataList" :key="index">
                  <div class="content">
                    <cell-value
                      title="资质证件名称"
                      :value="item.name"
                    ></cell-value>
                    <cell-value
                      title="证件编号"
                      :value="item.zjCode"
                    ></cell-value>
                    <cell-value
                      title="材料类型"
                      :value="judgeEvidenceType(item.cailiaoType)"
                    ></cell-value>
                    <cell-value
                      title="证明单位"
                      :value="item.zmdw"
                    ></cell-value>
                    <cell-value
                      title="有效日期"
                      :value="item.indate"
                    ></cell-value>
                    <cell-value
                      title="备注"
                      :value="item.remarks?item.remarks:'无'"
                    ></cell-value>
                    <cell-other title="附件">
                      <div class="file-list" v-if="fujian[index].length > 0">
                        <div>
                          <div class="file-item" v-for="(items, indexs) in fujian[index]" :key="indexs">
                            <div @click="downLoadFile(items.fileUrl)" class="file-name">{{items.fileName}}</div>
                          </div>
                        </div>
                      </div>
                      <div class="no-file" v-else>无附件</div>
                    </cell-other>
                  </div>
                </label>
                <div
                  class="no-data"
                  v-if="tabs.dataList.length === 0 && !tabs.loading"
                >
                  暂无资质材料
                </div>
              </label>
              <!-- 培训记录 -->
              <label v-if="tabIndex === 2">
                <label v-for="(item, index) in tabs.dataList" :key="index">
                  <div class="content">
                    <cell-value
                      title="培训名称"
                      :value="item.trainName"
                    ></cell-value>
                    <cell-value
                      title="培训时间"
                      :value="item.trainDate"
                    ></cell-value>
                    <cell-value
                      title="培训结束时间"
                      :value="item.trainDate.substring(0,5)+'12-31'+item.trainDate.substring(10)"
                    ></cell-value>
                    <cell-value
                      title="培训记录"
                      :value="item.trainRecord"
                    ></cell-value>
                    <cell-value
                      title="培训类型"
                      :value="item.trainType==1?'承包商入厂培训':item.trainType==2?'日常培训':item.trainType==3?'违章培训':''"
                    ></cell-value>
                    <cell-value
                      title="考试得分"
                      :value="String(item.score)"
                    ></cell-value>
                    <cell-value
                      title="备注"
                      :value="item.remarks?item.remarks:'无'"
                    ></cell-value>
                  </div>
                </label>
                <div
                  class="no-data"
                  v-if="tabs.dataList.length === 0 && !tabs.loading"
                >
                  暂无培训记录
                </div>
              </label>
              <!-- 违章记录 -->
              <label v-if="tabIndex === 3">
                <label v-for="(item, index) in tabs.dataList" :key="index">
                  <div class="content">
                    <cell-value
                      title="违章编号"
                      :value="item.wzbh"
                    ></cell-value>
                    <cell-value
                      title="违章名称"
                      :value="item.breakrulename"
                    ></cell-value>
                    <cell-value
                      title="违章时间"
                      :value="item.punishTime"
                    ></cell-value>
                    <cell-value
                      title="违章类型"
                      :value="judgeViolationType(item.breakruletype)"
                    ></cell-value>
                    <cell-value
                      title="违章地点"
                      :value="item.occursite"
                    ></cell-value>
                    <cell-value
                      title="违章描述"
                      :value="item.incidentdes"
                    ></cell-value>
                    <cell-value
                      title="检查人员"
                      :value="item.checkuser"
                    ></cell-value>
                    <cell-value
                      title="检查时间"
                      :value="item.occurtime"
                    ></cell-value>
                    <cell-value
                      title="项目名称"
                      :value="item.pro.projectName"
                    ></cell-value>
                    <cell-value
                      title="处罚金额"
                      :value="item.punishcash==0?'0':item.punishcash"
                    ></cell-value>
                  </div>
                </label>
                <div
                  class="no-data"
                  v-if="tabs.dataList.length === 0 && !tabs.loading"
                >
                  暂无违章记录
                </div>
              </label>
              <!-- 入厂/离场记录 -->
              <label v-if="tabIndex === 4">
                <label v-for="(item, index) in tabs.dataList" :key="index">
                  <div class="content">
                    <cell-value
                      title="公司"
                      :value="item.company2.companyName"
                    ></cell-value>
                    <cell-value
                      title="单位"
                      :value="item.office.officeName"
                    ></cell-value>
                    <cell-value
                      title="人员入厂申请编号"
                      :value="item.rcsqbh"
                    ></cell-value>
                    <cell-value
                      title="人员申请时间"
                      :value="item.rysqtime"
                    ></cell-value>
                    <cell-value
                      title="允许入厂时间"
                      :value="item.yxrctime"
                    ></cell-value>
                    <cell-value
                      title="离场时间"
                      :value="item.lctime"
                    ></cell-value>
                  </div>
                </label>
                <div
                  class="no-data"
                  v-if="tabs.dataList.length === 0 && !tabs.loading"
                >
                  暂无入厂/离场记录
                </div>
              </label>
              <!-- 黑名单记录 -->
              <label v-if="tabIndex === 5">
                <label v-for="(item, index) in tabs.dataList" :key="index">
                  <div class="content">
                    <cell-value
                      title="拉入黑名单编号"
                      :value="item.code"
                    ></cell-value>
                    <cell-value
                      title="拉入黑名单原因"
                      :value="item.reason"
                    ></cell-value>
                    <cell-value
                      title="拉入黑名单提出人"
                      :value="item.proposeman"
                    ></cell-value>
                    <cell-value
                      title="拉入黑名单时间"
                      :value="item.proposetime"
                    ></cell-value>
                    <cell-value
                      title="取消黑名单编号"
                      :value="item.uncode"
                    ></cell-value>
                    <cell-value
                      title="取消黑名单原因"
                      :value="item.unreason"
                    ></cell-value>
                    <cell-value
                      title="取消黑名单提出人"
                      :value="item.unproposeman"
                    ></cell-value>
                    <cell-value
                      title="取消黑名单提出时间"
                      :value="item.unproposetime"
                    ></cell-value>
                  </div>
                </label>
                <div
                  class="no-data"
                  v-if="tabs.dataList.length === 0 && !tabs.loading"
                >
                  暂无黑名单记录
                </div>
              </label>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </label>
    </van-tabs>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "cheng_bao_shang_ren_yuan_detail",
  mixins: [mixin],
  data() {
    return {
      active: 0,
      tabList: [
        {
          title: "基本信息"
        },
        {
          title: "证明材料"
        },
        {
          title: "培训记录"
        },
        {
          title: "违章记录"
        },
        {
          title: "出入记录"
        },
        {
          title: "黑名单记录"
        }
      ],
      fujian:[]
    };
  },
  created() {
    let { tabList } = this;
    const pageParameter = {
      dataList: [], //数据列表
      isLoading: false, //页面是否正在下拉刷新
      error: false, //加载错误
      loading: false, //页面是否在加载中
      finished: false, //数据是否加载完毕
      pageNow: 1, //当前页数
      pageSize: 20, //每页加载数量
      totalNumber: 10 //总条数
    };
    let newTabList = tabList.map(item => {
      let newParameter = Object.assign(item, pageParameter);
      return newParameter;
    });
    this.tabList = newTabList;
  },
  methods: {
    getDataList(refresh = false) {
      let { tabList, active } = this;
      tabList = JSON.parse(JSON.stringify(tabList));
      active = JSON.parse(JSON.stringify(active));
      const AjaxList = [
        "htCbsPersonInf",
        "_stuffList",
        "_trainList",
        "_wzList",
        "_rclcList",
        "_backListPage"
      ];
      if (refresh) {
        tabList[active].loading = true;
        tabList[active].pageNow = 1;
        tabList[active].finished = false;
        this.$nextTick(() => {
          this.tabList = JSON.parse(JSON.stringify(tabList));
        });
      }
      // 数据全部加载完成
      else if (tabList[active].dataList.length >= tabList[active].totalNumber) {
        tabList[active].loading = false;
        tabList[active].isLoading = false;
        tabList[active].finished = true;
        this.$nextTick(() => {
          this.tabList = JSON.parse(JSON.stringify(tabList));
        });
        return;
      }
      let sendData = {
        pageNo: this.cbspageNow,
        pageSize: this.cbspageSize,
        id: this.$route.params.id,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_4[AjaxList[active]](sendData)
        .then(res => {
          tabList[active].totalNumber = res.count;
          tabList[active].pageNow = tabList[active].pageNow + 1;
          tabList[active].dataList = refresh
            ? res.list
            : [...tabList[active].dataList, ...res.list];
          tabList[active].error = false;
          tabList[active].loading = false;
          tabList[active].isLoading = false;
          this.$nextTick(() => {
            this.tabList = JSON.parse(JSON.stringify(tabList));
          });
          if(active==1){
            tabList[active].dataList.forEach((item,index)=>{
              console.log(item,index)
              this.getFileList(item.id, index);
            })
          }
        })
        .catch(() => {
          tabList[active].error = true;
          tabList[active].loading = false;
          tabList[active].finished = false;
          tabList[active].isLoading = false;
          this.$nextTick(() => {
            this.tabList = JSON.parse(JSON.stringify(tabList));
          });
        });
    },
    getFileList(id, index) {
      console.log("index: ", index);
      let sendData = {
        bizKey: id,
        bizType: "htCbsPeopleStuff_file",
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_4
        .fileList(sendData)
        .then(res => {
          if(res.result!='false'){
            this.fujian.push(res)
          }else{
            this.fujian.push([])
          }
          
          console.log(this.fujian)
        })
        .catch(() => {});
    },
    downLoadFile(url){
      window.open('http://mes1.jhec.com.cn:8080'+url)
    },
    // 判断用户性别
    judgeUserSex(type) {
      return type === 1 ? "男" : "女";
    },
    // 判断证明材料类型
    judgeEvidenceType(type) {
      const typeList = ["合同类", "接收函", "证件类", "其他证明"];
      return typeList[type];
    },
    // 判断违章类型
    judgeViolationType(type) {
      const typeList = ["违章指挥", "违反劳动法", "违章操作", "违反十大禁令"];
      return typeList[type];
    }
  }
};
</script>
<style lang="scss" scoped>
.cheng-bao-shang-ren-yuan-detali {
  .no-data {
    font-size: 34px;
    text-align: center;
    font-weight: 500;
    color: rgba(45, 44, 51, 1);
    line-height: 48px;
    margin-top: 200px;
  }
  .tab-title {
    box-sizing: border-box;
    padding: 30px 40px;
    font-size: 34px;
    font-weight: 500;
    color: rgba(45, 44, 51, 1);
    line-height: 48px;
    background-color: #ffffff;
    margin-top: 20px;
  }
  .tab-title::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    width: calc(100% - 80px);
    bottom: 0;
    left: 40px;
    border-bottom: 1px solid #e5e5e5;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .content {
    width: 690px;
    margin: 20px auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    overflow: hidden;
    .file-list {
      .file-item {
        margin: 10px 0;
        align-items: center;
        justify-content: space-between;
        .file-name {
          font-size: 28px;
          color: rgba(56, 117, 229, 1);
          line-height: 28px;
          text-align:right;
        }
      }
    }
    .no-file {
      font-size: 20px;
      color: #999;
    }
  }
}
</style>
