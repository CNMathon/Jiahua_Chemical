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
        <van-icon class-prefix="iconfont" name="baojing" color="#FC942C" slot="right" />
      </van-nav-bar>
    </van-sticky>
    <van-tabs
      type="card"
      v-model="active"
      sticky
      :offset-top="46"
      color="#6096F8"
      title-inactive-color="#6096F8"
      @click="getPageData"
    >
      <div v-for="(tabs, tabIndex) in tabList" :key="tabIndex">
        <van-tab :title="tabs.title">
          <van-skeleton title :row="3" :loading="isLoading">
            <!-- 综合信息 -->
            <div v-if="tabIndex === 0">
              <!-- <div v-for="(item, index) in tabs.dataList" :key="index"> -->
              <div v-for="(item, index) in 1" :key="index">
                <div class="content Information">
                  <label v-for="(item, index) in pageList" :key="index">
                    <cell-value
                      :title="item.title"
                      :value="String(item.value)"
                      v-if="item.title != '描述'"
                    ></cell-value>
                    <cell-textarea disable :title="item.title" :value="item.value" v-else></cell-textarea>
                  </label>
                  <label></label>
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
                  <div class="status-item" v-for="(items, indexs) in 8" :key="indexs">
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
                  @click="getTechPara"
                >
                  <van-tab title="设备参数">
                    <div
                      class="tab-content__contenter van-hairline--surround"
                      v-for="(item, index) in sbcsList"
                      :key="index"
                    >
                      <div class="tabs-head">
                        <div class="tabs-head__item">项目名称</div>
                        <div class="tabs-head__item">功能参数</div>
                        <div class="tabs-head__item">备注</div>
                      </div>
                      <div class="tabs-list">
                        <div class="tabs-list__item">{{item.projectName || '空'}}</div>
                        <div class="tabs-list__item">{{item.functionInfo || '空'}}</div>
                        <div class="tabs-list__item">{{item.rmearks || '空'}}</div>
                      </div>
                    </div>
                  </van-tab>
                  <van-tab title="运行判异">
                    <div class="tab-content__contenter van-hairline--surround" v-for="(item, index) in sbcsList" :key="index">
                      <div class="tabs-head">
                        <div class="tabs-head__item">部位</div>
                        <div class="tabs-head__item">项目名称</div>
                        <div class="tabs-head__item">判断标准</div>
                        <div class="tabs-head__item">备注</div>
                      </div>
                      <div class="tabs-list">
                        <div class="tabs-list__item">{{item.position || '空'}}</div>
                        <div class="tabs-list__item">{{item.projectName || '空'}}</div>
                        <div class="tabs-list__item">{{item.judgement || '空'}}</div>
                        <div class="tabs-list__item">{{item.rmearks || '空'}}</div>
                      </div>
                    </div>
                  </van-tab>
                  <van-tab title="检修标准">
                    <div class="tab-content__contenter van-hairline--surround" v-for="(item, index) in yxpyList" :key="index">
                      <div class="tabs-head">
                        <div class="tabs-head__item">项目名称</div>
                        <div class="tabs-head__item">功能参数</div>
                        <div class="tabs-head__item">备注</div>
                      </div>
                      <div class="tabs-list">
                        <div class="tabs-list__item">{{item.projectName || '空'}}</div>
                        <div class="tabs-list__item">{{item.functionInfo || '空'}}</div>
                        <div class="tabs-list__item">{{item.rmearks || '空'}}</div>
                      </div>
                    </div>
                  </van-tab>
                </van-tabs>
              </div>
            </div>
          </van-skeleton>
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
      isLoading: false,
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
      ],
      pageList: [
        {
          title: "设备编码",
          value: ""
        },
        {
          title: "设备名称",
          value: ""
        },
        {
          title: "上级树位置",
          value: ""
        },
        {
          title: "设备类别",
          value: ""
        },
        {
          title: "设备位号",
          value: ""
        },
        {
          title: "设备类型",
          value: ""
        },
        {
          title: "所属部门",
          value: ""
        },
        {
          title: "专业类别",
          value: ""
        },
        {
          title: "设备位置",
          value: ""
        },
        {
          title: "有效状态",
          value: ""
        },
        {
          title: "描述",
          value: "123"
        }
      ],
      loadingStat: [
        {
          text: "设备参数",
          isLoading: false
        },
        {
          text: "设备实时",
          isLoading: false
        },
        {
          text: "技术参数",
          isLoading: false,
          children: [
            {
              text: "设备参数",
              isLoading: false
            },
            {
              text: "运行判异",
              isLoading: false
            },
            {
              text: "检修标准",
              isLoading: false
            }
          ]
        }
      ],
      sbcsList: [],
      yxpyList: []
    };
  },
  created() {
    console.log("id:", this.$route.query.id);
    this.getGenInfo();
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
    // 判断数据是否首次加载
    // 参数n => itemName => 依次传入N个项目名，注意按层级关系排列 => String
    checkFirstLoad(itemName) {
      // const args = [...arguments]
      // console.log(args)
      // let position = null
      // function a() {
      // }
      // if (this.loadingStat == ) {}
      // if(this.loadedContent.indexOf(e) == -1) {
      //   this.loadedContent.push(e)
      //   return true
      // }
      // else {
      //   return false
      // }
    },
    getPageData(name, title) {
      // 获取综合信息
      if (name == 0) {
        this.getGenInfo();
      }
      // 获取设备实时
      if (name == 1) {
        this.getRealtime();
      }
      // 获取技术参数
      if (name == 2) {
        this.getTechPara(0);
        this.getTechPara(1);
        this.getTechPara(2);
      }
    },
    // 获取数据 - 综合信息
    getGenInfo() {
      // if ( !this.checkFirstLoad(0) ) { return }
      const that = this;
      this.isLoading = true;
      this.$api.page_4
        .spaceDeviceSelectIndexNew({
          id: this.$route.query.id,
          __sid: localStorage.JiaHuaSessionId
        })
        .then(res => {
          // 请求结束后的页面内容赋值
          // => 参数1 => filterTitle => 筛选内容title值
          // => 参数2 => opeValue => 筛选内容新value值
          function filterAss(filterTitle, opeValue) {
            that.pageList.filter(
              item => item.title == filterTitle
            )[0].value = opeValue;
          }

          let resMain = res.list[0];
          filterAss("设备编码", resMain.devicePosition);
          filterAss("设备名称", resMain.deviceName);
          // filterAss('上级树位置', resMain.)
          filterAss("设备类别", resMain.deviceCategory);
          filterAss("设备位号", resMain.devicePosition);
          filterAss("设备类型", resMain.deviceType);
          filterAss("所属部门", resMain.spaceDept);
          filterAss("专业类别", resMain.specialtyType);
          filterAss("设备位置", resMain.deviceLocation);
          filterAss("有效状态", resMain.spaceState == 0 ? "有效" : "无效");
          console.log("GenInfo:", resMain);
          this.isLoading = false;
        });
    },
    // 获取数据 - 设备实时
    getRealtime() {
      // if ( !this.checkFirstLoad(1) ) { return }
      this.isLoading = true;
      const that = this;
      this.$api.page_4
        .deviceSpaceRealTime({
          // deviceId: this.$route.query.id,
          "deviceId": "6050000000000000800",
          __sid: localStorage.JiaHuaSessionId
        })
        .then(res => {
          // 请求结束后的页面内容赋值
          // => 参数1 => filterTitle => 筛选内容title值
          // => 参数2 => opeValue => 筛选内容新value值
          // function filterAss(filterTitle, opeValue) {
          //   that.pageList.filter(
          //     item => item.title == filterTitle
          //   )[0].value = opeValue;
          // }

          // let resMain = res.list[0];
          // filterAss("设备编码", resMain.devicePosition);
          // filterAss("设备名称", resMain.deviceName);
          // // filterAss('上级树位置', resMain.)
          // // filterAss('设备类别', resMain.)
          // filterAss("设备位号", resMain.devicePosition);
          // filterAss("设备类型", resMain.deviceType);
          // filterAss("所属部门", resMain.spaceDept);
          // filterAss("专业类别", resMain.specialtyType);
          // filterAss("设备位置", resMain.deviceLocation);
          // filterAss("有效状态", resMain.spaceState == 0 ? "有效" : "无效");
          console.log("Realtime:", res);
          this.isLoading = false;
        });
    },
    // 获取数据 - 技术参数
    // => 参数1 => parTytpe => 技术参数类型 => Number => 1(设备参数)/2(运行判异)/3(检修标准)
    getTechPara(parTytpe = 0) {
      // if ( !this.checkFirstLoad(2) ) { return }
      this.isLoading = true;
      const that = this;
      this.$api.page_4
        .deviceInfoListDeviceParameter({
          // 'deviceId.id': String(this.$route.query.id),
          "deviceId.id": "6050000000000000800",
          parTytpe: parTytpe,
          __sid: localStorage.JiaHuaSessionId
        })
        .then(res => {
          let resMain = res.list;
          // 请求结束后的页面内容赋值
          // => 参数1 => filterTitle => 筛选内容title值
          // => 参数2 => opeValue => 筛选内容新value值
          // function filterAss(filterTitle, opeValue) {
          //   that.pageList.filter(
          //     item => item.title == filterTitle
          //   )[0].value = opeValue;
          // }

          // let resMain = res.list[0];
          // filterAss("设备编码", resMain.devicePosition);
          // filterAss("设备名称", resMain.deviceName);
          // // filterAss('上级树位置', resMain.)
          // // filterAss('设备类别', resMain.)
          // filterAss("设备位号", resMain.devicePosition);
          // filterAss("设备类型", resMain.deviceType);
          // filterAss("所属部门", resMain.spaceDept);
          // filterAss("专业类别", resMain.specialtyType);
          // filterAss("设备位置", resMain.deviceLocation);
          // filterAss("有效状态", resMain.spaceState == 0 ? "有效" : "无效");
          console.log(`parTytpe-${parTytpe}:`, resMain);
          this.sbcsList = [];
          switch (parTytpe) {
            case 0:
              resMain.map((item, index) => {
                this.sbcsList.push({
                  projectName: item.projectName,
                  functionInfo: item.functionInfo,
                  rmearks: item.rmearks
                });
              });
              break;
            case 1:
              resMain.map((item, index) => {
                this.sbcsList.push({
                  position: item.position,
                  projectName: item.projectName,
                  judgement: item.judgement,
                  rmearks: item.rmearks
                });
              });
              break;
            case 2:
              resMain.map((item, index) => {
                this.yxpyList.push({
                  projectName: item.projectName,
                  functionInfo: item.functionInfo,
                  rmearks: item.rmearks
                });
              });
              break;
          }
          this.isLoading = false;
        });
    },
    // 跳转到趋势图
    toQuShiTu(index) {
      this.$router.push({ path: `./qushitu?id=${index}` });
    },
    // 跳转到报警页面
    tapBaoJing() {
      this.$router.push({ path: `./baojing?id=${2}` });
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
