<template>
  <div class="cheng-bao-shang-detali">
    <van-sticky>
      <van-nav-bar
        title="承包商详情"
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
      <van-pull-refresh v-model="isLoading" @refresh="getDataList(true)">
        <van-tab title="基本信息">
          <van-list
            v-model="info[0].loading"
            :finished="info[0].finished"
            :error.sync="info[0].error"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多了"
            @load="getDataList"
          >
            <label v-for="(item, index) in info[0].list" :key="index">
              <div class="tab-title">公司信息</div>
              <cell-value title="承包商名称" :value="item.cbsName"></cell-value>
              <cell-value
                title="承包商类型"
                :value="judgeType(item.cbsType)"
              ></cell-value>
              <cell-value
                title="公司性质"
                :value="judgeGS(item.companyType)"
              ></cell-value>
              <cell-value
                title="法人代表"
                :value="item.cbsRepresentative"
              ></cell-value>
              <cell-value
                title="公司地址"
                :value="item.companyAddress"
              ></cell-value>
              <cell-value
                title="注册地址"
                :value="item.registerAddress"
              ></cell-value>
              <cell-value
                title="公司电话"
                :value="item.companyTel"
              ></cell-value>
              <cell-value
                title="公司传真"
                :value="item.companyFax"
              ></cell-value>
              <cell-value title="公司邮箱" :value="item.email"></cell-value>
              <cell-value title="成立日期" :value="item.foundDate"></cell-value>
              <cell-value title="注册资本" :value="item.registerCapital"></cell-value>
              <div class="tab-title">财务信息</div>
              <cell-value
                title="银行信用等级"
                :value="item.cbsCommpanyBankCredit"
              ></cell-value>
              <cell-value
                title="开户名称"
                :value="item.cbsCommpanyOpenName"
              ></cell-value>
              <cell-value
                title="开户银行"
                :value="item.cbsCommpanyOpenBank"
              ></cell-value>
              <cell-value
                title="银行账号"
                :value="item.cbsCommpanyBankName"
              ></cell-value>
              <cell-value
                title="纳税识别号"
                :value="item.cbsCommpanyTaxpayer"
              ></cell-value>
              <cell-value
                title="统一社会信用代码"
                :value="item.cbsCommpanyTyshCreditCode"
              ></cell-value>
              <cell-value
                title="营业执照号码"
                :value="item.cbsCommpanyBusinessLicense"
              ></cell-value>
            </label>
          </van-list>
        </van-tab>
        <van-tab title="资质材料">
          <van-list
            v-model="info[1].loading"
            :finished="info[1].finished"
            :error.sync="info[1].error"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多了"
            @load="getDataList"
          >
            <label v-for="(item, index) in info[1].list" :key="index">
              <div class="content">
                <cell-value
                  title="资质证件名称"
                  :value="item.matirialList"
                ></cell-value>
                <cell-value
                  title="证件编号"
                  :value="item.credentialsCode"
                ></cell-value>
                <cell-value
                  title="有效日期"
                  :value="item.validDate"
                ></cell-value>
                <cell-value
                  disabled
                  :value="item.credentialsDescribe"
                  title="证件描述"
                ></cell-value>
                <cell-other title="附件清单">
                  <div class="file-list" v-if="fujian[index].length > 0">
                    <label v-for="(items, indexs) in fujian[index]" :key="indexs">
                      <div class="file-item">
                        <div @click="downLoadFile(items.fileUrl)" class="file-name">{{items.fileName}}</div>
                        
                      </div>
                    </label>
                  </div>
                  <div class="no-file" v-else>无附件</div>
                </cell-other>
              </div>
            </label>
          </van-list>
        </van-tab>
        <van-tab title="联系人列表">
          <van-list
            v-model="info[2].loading"
            :finished="info[2].finished"
            :error.sync="info[2].error"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多了"
            @load="getDataList"
          >
            <label v-for="(item, index) in info[2].list" :key="index">
              <div class="content">
                <cell-value
                  title="联系人姓名"
                  :value="item.contactsName"
                ></cell-value>
                <cell-value
                  title="联系人所属部门"
                  :value="item.contactsDept"
                ></cell-value>
                <cell-value
                  title="联系人职务"
                  :value="item.contactsPost"
                ></cell-value>
                <cell-value
                  title="联系人电话"
                  :value="item.contactsTel"
                ></cell-value>
                <cell-value
                  title="电子邮箱"
                  :value="item.email || '暂无邮箱'"
                ></cell-value>
                <cell-value
                  title="备注"
                  :value="item.remarks"
                ></cell-value>
              </div>
            </label>
          </van-list>
        </van-tab>
      </van-pull-refresh>
    </van-tabs>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "cheng_bao_shang_detali",
  mixins: [mixin],
  data() {
    return {
      active: 0,
      isLoading: false, //是否正在下拉刷新
      info: [
        // 基本信息
        {
          list: [],
          error: false, //加载错误
          loading: false, //是否正在加载
          finished: false, //是否加载完毕
          pageNow: 1, //当前页数
          pageSize: 20, //每页加载数量
          totalNumber: 10 //总条数
        },
        // 资质材料
        {
          list: [],
          error: false, //加载错误
          loading: false, //是否正在加载
          finished: false, //是否加载完毕
          pageNow: 1, //当前页数
          pageSize: 20, //每页加载数量
          totalNumber: 10 //总条数
        },
        // 联系人列表
        {
          list: [],
          error: false, //加载错误
          loading: false, //是否正在加载
          finished: false, //是否加载完毕
          pageNow: 1, //当前页数
          pageSize: 20, //每页加载数量
          totalNumber: 10 //总条数
        }
      ],
      fujian:[]
    };
  },
  created() {},
  methods: {
    //下载附件
    downLoadFile(url){
      window.open('http://mes1.jhec.com.cn:8080'+url)
    },
    // 承包商详情
    getDataList(refresh = false) {
      let info = this.info[this.active];
      if (refresh) {
        info.pageNow = 1;
        info.loading = true;
        info.finished = false;
      }
      // 判断数据全部加载完成
      else if (info.list.length >= info.totalNumber) {
        info.loading = false;
        info.finished = true;
        this.isLoading = false;
        return;
      }
      let sendData = {
        id: this.$route.params.id,
        __sid: this.$userInfo.sessionId
      };
      let key = [
        "htCbsXxglJbxxDetail",
        "htCbsXxglJbxxDetails",
        "htCbsXxglJbxxUserList"
      ];
      this.$api.page_4[key[this.active]](sendData)
        .then(res => {
          // 加载状态结束
          info.loading = false;
          this.isLoading = false;
          info.pageNow = info.pageNow + 1;
          if (this.active === 0) {
            info.list = res;
            info.totalNumber = 1;
            info.finished = true;
            return;
          }
          if (res.list === []) {
            info.finished = true;
            return;
          }
          
          info.list = refresh ? res.list : [...info.list, ...res.list];
          info.totalNumber = res.count;
          console.log(info)
          if (this.active === 1) {
            res.list.map((element, index) => {
              this.getFileList(element.id, index);
              return element;
            });
          }
        })
        .catch(() => {
          info.loading = false;
          info.error = true;
          info.finished = false;
          this.isLoading = false;
        });
    },
    judgeType(type) {
      let companyType = ["长期承包商", "项目承包商"];
      return companyType[type];
    },
    judgeGS(type) {
      let companyType = [
        "国有企业",
        "集体所有制企业",
        "联营企业",
        "中外合资企业",
        "外商独资企业",
        "中外合作企业",
        "私营企业",
        "其他企业"
      ];
      return companyType[type];
    },
    // 资质材料-附件清单
    getFileList(id, index) {
      console.log("index: ", index);
      let sendData = {
        bizKey: id,
        bizType: "htCbsXxglZrzzsc_file",
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_4
        .fileList(sendData)
        .then(res => {
          this.fujian.push(res)
          console.log(this.fujian)
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.cheng-bao-shang-detali {
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
