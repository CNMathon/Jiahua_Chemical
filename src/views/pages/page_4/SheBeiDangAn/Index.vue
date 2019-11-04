<template>
  <div class="cheng-bao-shang-ren-yuan">
    <van-sticky>
      <van-nav-bar
        title="设备档案"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
      <div class="tab">
        <div
          class="tab__item"
          :class="[active === 0 ? 'tab__item-active' : '']"
          @click="changeTabActive(0)"
        >
          全部设备
        </div>
        <div
          class="tab__item"
          :class="[active === 1 ? 'tab__item-active' : '']"
          @click="changeTabActive(1)"
        >
          书签设备
        </div>
      </div>
      <j-filter-bar
        v-model="searchValue"
        @search="getPageData(true)"
        @tap="showFilter = true"
      ></j-filter-bar>
    </van-sticky>
    <j-filter v-model="showFilter" @confirm="confirmFilter">
      <j-filter-search
        v-model="searchValues"
        @search="filterSearch"
      ></j-filter-search>
      <j-filter-item
        title="专业类别"
        :actions="sheetActions_1"
        @select="filterSelect_1"
      ></j-filter-item>
      <j-filter-item
        title="所属分厂"
        :actions="sheetActions_2"
        @select="filterSelect_2"
      ></j-filter-item>
    </j-filter>
    <van-pull-refresh v-model="isLoading" @refresh="getPageData(true)">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="getPageData()"
      >
        <div class="device-head">
          <div class="device-head__item">设备名称</div>
          <div class="device-head__item">设备位号</div>
          <div class="device-head__item">专业类别</div>
          <div class="device-head__item">书签</div>
        </div>
        <div v-for="(item, index) in 2" :key="index">
          <div class="device-list" v-if="index === active">
            <div v-for="(items, indexs) in 8" :key="indexs">
              <div class="device-item" @click="toDetail(indexs)">
                <div class="device-item__infos">除盐蒸发器</div>
                <div class="device-item__infos">E1091</div>
                <div class="device-item__infos">动设备</div>
                <div class="device-item__infos">
                  <van-icon
                    class-prefix="iconfont"
                    :name="index ? 'is_add_device' : 'add_device'"
                    :color="index ? '#6096F8' : '#9A9A9A'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "cheng_bao_shang_ren_yuan_index",
  mixins: [mixin],
  data() {
    return {
      active: 0,
      isLoading: false, //页面是否正在下拉刷新
      error: false, //加载错误
      loading: false, //页面是否在加载中
      finished: false, //数据是否加载完毕
      pageNow: 1, //当前页数
      pageSize: 20, //每页加载数量
      totalNumber: 10, //总条数
      pageList: [], //页面数据
      showFilter: false,
      searchValue: "",
      searchValues: "",
      sheetActions_1: [
        { name: "电器", index: 0 },
        { name: "仪表", index: 1 },
        { name: "机械", index: 2 },
        { name: "特种", index: 3 },
        { name: "化验", index: 4 },
        { name: "安全附件", index: 5 }
      ],
      sheetActions_2: [
        { name: "烧碱", index: 0 },
        { name: "新材料", index: 1 },
        { name: "动力中心", index: 2 },
        { name: "水处理站", index: 3 },
        { name: "硫化厂", index: 4 },
        { name: "脂肪酸厂", index: 5 }
      ]
    };
  },
  methods: {
    changeTabActive(index) {
      this.active = index;
    },
    // 过滤-搜索
    filterSearch(e) {
      console.log("e: ", e);
    },
    filterSelect_1(e) {
      console.log("e: ", e);
    },
    filterSelect_2(e) {
      console.log("e: ", e);
    },
    // 确认筛选
    confirmFilter() {},
    // 获取承包商人员列表
    getPageData(refresh = false) {
      if (refresh) {
        this.pageNow = 1;
        this.loading = true;
        this.finished = false;
      }
      // 数据全部加载完成
      else if (this.pageList.length >= this.totalNumber) {
        this.loading = false;
        this.finished = true;
        this.isLoading = false;
        return;
      }
      let sendData = {
        pageNo: this.pageNow,
        pageSize: this.pageSize,
        empName: this.searchValue,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_4
        .htCbsPersonInf(sendData)
        .then(res => {
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          this.pageNow = this.pageNow + 1;
          if (res.list === []) {
            this.finished = true;
            return;
          }
          this.pageList = refresh ? res.list : [...this.pageList, ...res.list];
          this.totalNumber = res.count;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
          this.finished = false;
          this.isLoading = false;
        });
    },
    toDetail(id) {
      this.$router.push({ path: `./detail/${id}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.cheng-bao-shang-ren-yuan {
  /deep/ .van-sticky {
    background-color: #fff;
  }
  .tab {
    margin: 25px auto;
    width: 670px;
    display: flex;
    align-items: center;
    border: 1px solid #6096f8;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    &__item {
      width: 335px;
      height: 64px;
      display: flex;
      color: #3875e5;
      font-size: 28px;
      align-items: center;
      justify-content: center;
    }
    &__item-active {
      color: #fff;
      background: #6096f8;
    }
  }
  .device-head {
    margin: 20px auto;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    width: 710px;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    overflow: hidden;
    &__item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 10px;
      box-sizing: border-box;
      &:first-child {
        width: 190px;
      }
      &:last-child {
        width: 70px;
      }
    }
  }
  .device-list {
    .device-item {
      margin: 0 auto;
      margin-bottom: 20px;
      padding: 40px 20px;
      box-sizing: border-box;
      width: 710px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__infos {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10px;
        box-sizing: border-box;
        font-size: 28px;
        &:first-child {
          width: 190px;
        }
        &:last-child {
          width: 70px;
        }
      }
      /deep/ .iconfont {
        font-size: 45px;
      }
    }
  }
}
</style>
