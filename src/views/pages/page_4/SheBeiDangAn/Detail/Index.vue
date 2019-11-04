<template>
  <div class="cheng-bao-shang-ren-yuan-detali">
    <van-sticky>
      <van-nav-bar
        title="设备详情"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
        @click-right="tapBaoJing"
      >
        <van-icon
          class-prefix="iconfont"
          name="baojing"
          color="#FC942C"
          slot="right"
        />
      </van-nav-bar>
    </van-sticky>
    <van-tabs
      type="card"
      v-model="active"
      sticky
      :offset-top="46"
      color="#6096F8"
      title-inactive-color="#6096F8"
    >
      <div v-for="(tabs, tabIndex) in tabList" :key="tabIndex">
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
              <!-- 综合信息 -->
              <div v-if="tabIndex === 0">
                <!-- <div v-for="(item, index) in tabs.dataList" :key="index"> -->
                <div v-for="(item, index) in 1" :key="index">
                  <div class="content Information">
                    <cell-value title="设备编码" value="26532"></cell-value>
                    <cell-value title="设备名称" value="名称A"></cell-value>
                    <cell-value
                      title="上级树位置"
                      value="位置名称"
                    ></cell-value>
                    <cell-value title="设备类别" value="类别名称"></cell-value>
                    <cell-value title="设备位号" value="56665"></cell-value>
                    <cell-value title="设备类型" value="名称A"></cell-value>
                    <cell-value title="所属部门" value="部门名称"></cell-value>
                    <cell-value title="专业类别" value="类别名称"></cell-value>
                    <cell-value title="设备位置" value="位置名称"></cell-value>
                    <cell-value title="有效状态" value="有效"></cell-value>
                    <cell-textarea disabled title="描述" value></cell-textarea>
                  </div>
                </div>
              </div>
              <!-- 设备实时 -->
              <div v-if="tabIndex === 1">
                <!-- <div v-for="(item, index) in tabs.dataList" :key="index"> -->
                <div v-for="(item, index) in 1" :key="index">
                  <div class="status">
                    <div class="status-head">
                      <div class="status-head__item">点名</div>
                      <div class="status-head__item">点值</div>
                      <div class="status-head__item">单位</div>
                      <div class="status-head__item">状态</div>
                      <div class="status-head__item">趋势图</div>
                    </div>
                    <div
                      class="status-item"
                      v-for="(items, indexs) in 8"
                      :key="indexs"
                    >
                      <div class="status-item__item">除盐蒸发器</div>
                      <div class="status-item__item">E1091</div>
                      <div class="status-item__item">动设备</div>
                      <div class="status-item__item">异常</div>
                      <div class="status-item__item" @click="toQuShiTu(indexs)">
                        <van-icon
                          class-prefix="iconfont"
                          name="qushitubiao"
                          color="#FFFC27"
                          size="1.3rem"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="no-data" v-if="tabs.dataList.length === 0 && !tabs.loading">暂无资质材料</div> -->
              </div>
              <!-- 技术参数 -->
              <div v-if="tabIndex === 2" class="tab-content">
                <div>
                  <van-tabs
                    type="card"
                    v-model="actives"
                    color="#6096F8"
                    title-inactive-color="#6096F8"
                  >
                    <van-tab title="设备参数">
                      <div
                        class="tab-content__contenter van-hairline--surround"
                      >
                        <div class="tabs-head">
                          <div class="tabs-head__item">项目名称</div>
                          <div class="tabs-head__item">功能参数</div>
                          <div class="tabs-head__item">备注</div>
                        </div>
                        <div class="tabs-list">
                          <div class="tabs-list__item">1</div>
                          <div class="tabs-list__item">1</div>
                          <div class="tabs-list__item">1</div>
                        </div>
                      </div>
                    </van-tab>
                    <van-tab title="运行判异">
                      <div
                        class="tab-content__contenter van-hairline--surround"
                      >
                        <div class="tabs-head">
                          <div class="tabs-head__item">部位</div>
                          <div class="tabs-head__item">项目名称</div>
                          <div class="tabs-head__item">判断标准</div>
                          <div class="tabs-head__item">备注</div>
                        </div>
                        <div class="tabs-list">
                          <div class="tabs-list__item">1</div>
                          <div class="tabs-list__item">1</div>
                          <div class="tabs-list__item">1</div>
                          <div class="tabs-list__item">1</div>
                        </div>
                      </div>
                    </van-tab>
                    <van-tab title="检修标准">
                      <div
                        class="tab-content__contenter van-hairline--surround"
                      >
                        <div class="tabs-head">
                          <div class="tabs-head__item">项目名称</div>
                          <div class="tabs-head__item">功能参数</div>
                          <div class="tabs-head__item">备注</div>
                        </div>
                        <div class="tabs-list">
                          <div class="tabs-list__item">1</div>
                          <div class="tabs-list__item">1</div>
                          <div class="tabs-list__item">1</div>
                        </div>
                      </div>
                    </van-tab>
                  </van-tabs>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </div>
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
      actives: 0,
      tabList: [
        {
          title: "综合信息"
        },
        {
          title: "设备实时"
        },
        {
          title: "技术参数"
        }
      ]
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
    // 跳转到趋势图
    toQuShiTu(index) {
      this.$router.push({ path: `../qushitu/${index}` });
    },
    // 跳转到报警页面
    tapBaoJing() {
      this.$router.push({ path: `../baojing/${2}` });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .van-tabs--card {
  padding: 0;
}
/deep/ .van-tabs__wrap {
  padding: 15px 0;
  background-color: #fff;
}
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
  width: 100%;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  overflow: hidden;

  .file-list {
    .file-item {
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .file-name {
        font-size: 28px;
        color: rgba(56, 117, 229, 1);
        line-height: 28px;
      }
    }
  }
}

.Information {
  background-color: transparent !important;
  /deep/ .cell {
    margin-bottom: 20px;
    border-radius: 6px;
    &::after {
      display: none;
    }
  }
}

// 设备实时
.status {
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.status-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  box-sizing: border-box;
  &__item {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: rgba(51, 51, 51, 1);
    line-height: 32px;
    &:first-child {
      width: 220px;
      justify-content: flex-start;
      padding-left: 10px;
      box-sizing: border-box;
    }
  }
}
.status-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: rgba(96, 150, 248, 1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 45px 10px;
  box-sizing: border-box;

  &__item {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
    &:first-child {
      width: 220px;
    }
  }
}
.tab-content {
  background-color: #fff;
  margin-top: 10px;
  min-height: 50vh;
  /deep/ .van-tabs--card {
    padding-top: 10px;
  }
  /deep/ .van-tabs__wrap {
    padding-top: 0;
    background-color: #fff;
  }
}
.tab-content__contenter {
  width: calc(100% - 60px);
  margin: 20px auto;
  padding: 10px 30px;
  box-sizing: border-box;
  .tabs-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__item {
      flex: 1;
      text-align: center;
      font-size: 28px;
      color: rgba(51, 51, 51, 1);
      line-height: 60px;
    }
  }
  .tabs-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__item {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
