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
                  <div class="tab-title">个人基本信息</div>
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
                    :value="item.userName"
                  ></cell-value>
                  <cell-value
                    title="性别"
                    :value="judgeUserSex(item.userSex)"
                  ></cell-value>
                  <cell-value
                    title="入厂日期"
                    :value="item.userEntryDate"
                  ></cell-value>
                  <cell-value
                    title="出生日期"
                    :value="item.userBirthDate"
                  ></cell-value>
                  <cell-value
                    title="年龄"
                    :value="String(item.userAge)"
                  ></cell-value>
                  <cell-value
                    title="民族"
                    :value="judgeNationality(item.userNation)"
                  ></cell-value>
                  <cell-value title="籍贯" :value="item.userJg"></cell-value>
                  <cell-value
                    title="婚姻状况"
                    :value="judgeMarriage(item.maritalStatus)"
                  ></cell-value>
                  <cell-value title="学历"  :value="item.userEducation==0?'小学':item.userEducation==1?'初中':item.userEducation==2?'高中':item.userEducation==3?'中专':item.userEducation==4?'大专':item.userEducation==5?'本科':item.userEducation==6?'硕士研究生':item.userEducation==7?'博士研究生':''"></cell-value>
                  <cell-value
                    title="用户联系电话"
                    :value="item.userPhone"
                  ></cell-value>
                  <cell-value title="用户邮箱" :value="item.userEmil"></cell-value>
                  <cell-value title="家庭住址" :value="item.homeAdress"></cell-value>
                  <cell-value title="健康状态" :value="item.healthStatus==1?'健康':item.healthStatus==2?'亚健康':''"></cell-value>
                  <div class="tab-title">公司内部信息</div>
                  <cell-value title="所属部门" :value="item.userDept"></cell-value>
                  <cell-value title="所属公司" :value="item.userCompany"></cell-value>
                  <cell-value title="职务" :value="item.userJob"></cell-value>
                  <cell-value title="岗位" :value="item.post?item.post.postName:''"></cell-value>
                  <cell-value title="工种" :value="item.workType==0?'无':item.workType==1?'金属焊接、切割作业':item.workType==3?'起重机械作业':''"></cell-value>
                  <cell-value title="特殊工种" :value="item.specialWork==1?'是':'否'"></cell-value>
                </label>
              </label>
              <!-- 资质材料 -->
              <label v-if="tabIndex === 1">
                <label v-for="(item, index) in tabs.dataList" :key="index">
                  <div class="content">
                    <cell-value title="公司" :value="item.papersCompany"></cell-value>
                    <cell-value title="部门" :value="item.dept"></cell-value>
                    <cell-value title="证件类型" :value="item.papersType"></cell-value>
                    <cell-value title="证照号码" :value="item.papersNum"></cell-value>
                    <cell-value title="证照颁发机构" :value="item.papersDept"></cell-value>
                    <cell-value title="生效日期" :value="item.starttime"></cell-value>
                    <cell-value title="失效日期" :value="item.endtime"></cell-value>
                    <cell-value
                      title="年审日期"
                      :value="item.nianshenDate"
                    ></cell-value>
                    <cell-value title="年审结果" :value="item.nianshenResult==1?'通过':'未通过'"></cell-value>
                    <cell-value title="备注" :value="item.nianshenRemarks"></cell-value>
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
                <!-- <div class="no-data" v-if="tabs.dataList.length === 0 && !tabs.loading">暂无资质材料</div> -->
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
          title: "员工基本信息"
        },
        {
          title: "人员证件管理"
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
      const AjaxList = ["htUserInfoListData", "sumHtZxksPapers"];
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
      if (active === 0) {
        sendData.id = this.$route.params.id;
      } else {
        sendData.userCode = this.$route.params.code;
      }
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
            console.log(tabList[active].dataList)
            tabList[active].dataList.forEach((item,index)=>{
              this.getFileList(item.papersID, index);
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
    downLoadFile(url){
      window.open('http://mes1.jhec.com.cn:8080'+url)
    },
    getFileList(id, index) {
      console.log("index: ", index);
      let sendData = {
        bizKey: id,
        bizType: "htZxksPapers_file",
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
    // 判断用户性别
    judgeUserSex(type) {
      return Number(type) === 1 ? "男" : "女";
    },
    // 判断民族
    judgeNationality(type) {
      let types = type.substring(1);
      const typeList = ["汉族", "蒙古族", "回族"];
      return typeList[Number(types) - 1];
    },
    // 判断婚姻状况
    judgeMarriage(type) {
      let types = type;
      const typeList = ["已婚", "未婚", "离异"];
      return typeList[Number(types) - 1];
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
    position: relative;
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
  .slot-header {
    height: 84px;
    .header {
      width: 84px;
      height: 84px;
      background: rgba(216, 216, 216, 1);
    }
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
        text-align: right;
        align-items: center;
        justify-content: space-between;
        .file-name {
          font-size: 28px;
          color: rgba(56, 117, 229, 1);
          line-height: 28px;
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
