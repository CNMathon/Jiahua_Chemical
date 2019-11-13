<template>
  <div class="select-user">
    <van-nav-bar title="人员选择" left-text="返回" left-arrow @click-left="pageBack" />
    <div class="head">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
        :clearable="false"
      />
    </div>
    <div class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getUserData">
        <!-- 多选 -->
        <van-checkbox-group v-model="result" v-if="!$route.query.radio">
          <van-cell-group>
            <van-cell v-for="(item, index) in list" clickable :key="item.id" @click="toggle(index)">
              <template slot="title">
                <div class="cell-title">
                  <div class="header">
                    <img :src="item.avatarUrl" alt srcset />
                  </div>
                  <div class="info">
                    <div class="name">{{ item.userName }}</div>
                    <div class="department">{{ item.fullName }}</div>
                  </div>
                </div>
              </template>
              <van-checkbox :name="item" ref="checkboxes" slot="icon" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <!-- 单选 -->
        <van-radio-group v-model="radio" v-else>
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list"
              clickable
              :key="item.id"
              @click="tapRadio(index)"
            >
              <template slot="title">
                <div class="cell-title">
                  <div class="header">
                    <img :src="item.avatarUrl" alt srcset />
                  </div>
                  <div class="info">
                    <div class="name">{{ item.userName }}</div>
                    <div class="department">{{ item.fullName }}</div>
                  </div>
                </div>
              </template>
              <van-radio slot="icon" :name="index" />
              <!-- <van-checkbox :name="item" ref="checkboxes" slot="icon" /> -->
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
    </div>
    <div
      class="action"
      v-if="!$route.query.radio"
      @click="pageBack"
    >确定（{{ result.length }}/{{ pageSetting.count }}）</div>
    <div class="action" v-else @click="pageBack">确定</div>
  </div>
</template>
<script>
export default {
  name: "selectUser",
  data() {
    return {
      pageSetting: {
        count: 10, //数据总条数
        pageNo: 1, // 页码
        pageSize: 20 // 每页条数
      },
      searchValue: "", //搜索内容
      list: [],
      loading: false,
      finished: false,
      result: [],
      radio: ""
    };
  },
  created() {
    this.storeModule = this.$route.query.storeModule;
    this.storeKey = this.$route.query.storeKey;
    this.results = this.$store.state[this.storeModule][this.storeKey];
  },
  methods: {
    // 搜索
    onSearch() {
      this.list = "";
      this.getUserData();
    },
    // 取消搜索
    onCancel() {
      this.searchValue = "";
      this.list = "";
      this.getUserData();
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
      this.getUserData();
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    tapRadio(index) {
      this.radio = index;
    },
    clickChech() {
      this.$nextTick(index => {
        this.$refs.checkboxes[index].checked = true;
      });
    },
    // 获取用户列表
    getUserData() {
      let sendData = {
        refName: this.searchValue,
        pageNo: this.pageSetting.pageNo,
        pageSize: this.pageSetting.pageSize,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_3
        .userSelect(sendData)
        .then(res => {
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.list.length >= this.pageSetting.count) {
            this.finished = true;
            return;
          }
          let list = res.list.map(item => {
            let newItem = {};
            item.avatarUrl =
              this.$imageUrl + item.avatarUrl.replace("/ctxPath", "");
            newItem.avatarUrl = item.avatarUrl;
            newItem.userName = item.userName;
            newItem.userCode = item.userCode;
            newItem.fullName = item.refObj.office.officeName;
            return newItem;
          });
          this.pageSetting.count = res.count;
          this.pageSetting.pageNo = res.pageNo + 1;
          this.list = [...this.list, ...list];
        })
        .catch(() => {});
    },
    pageBack() {
      let obj = {
        key: this.storeKey,
        value: this.result
      };
      if (this.$route.query.radio) {
        obj.value = [];
        obj.value.push(this.list[this.radio]);
      }
      this.$store.dispatch(`${this.storeModule}/changTag`, obj);
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.select-user {
  padding-bottom: 100px;
  .list {
    .cell-title {
      display: flex;
      align-items: center;
      .header {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 20px;
        img {
          width: 90px;
          height: 90px;
        }
      }
      .info {
        width: 500px;
        overflow: hidden;
        .name {
          font-size: 28px;
          color: rgba(51, 51, 51, 1);
        }
        .department {
          font-size: 28px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
  .action {
    width: 100vw;
    height: 98px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(96, 150, 248, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
    font-size: 32px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
