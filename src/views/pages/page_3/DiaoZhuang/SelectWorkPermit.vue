<template>
  <div class="select-user">
    <van-sticky>
      <van-nav-bar
        title="人员选择"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
    </van-sticky>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getUserData"
      >
        <van-radio-group v-model="result">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list"
              clickable
              :key="item.id"
              @click="toggle(index)"
            >
              <template slot="title">
                <div class="cell-title">
                  <div class="info">
                    <div class="name">{{ item.name }}</div>
                  </div>
                </div>
              </template>
              <van-radio :name="item" ref="checkboxes" slot="icon" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
    </div>
    <div class="action" @click="pageBack">确定</div>
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
      result: {}
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
      console.log(123);
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
    check() {
      console.log(this.results);
      //   this.result = JSON.parse(JSON.stringify(this.results));
      //   this.list.forEach((element, index) => {
      //     this.result.forEach(elements => {
      //       if (element.userCode === elements.userCode) {
      //         this.clickChech(index);
      //         console.log("elements.userCode: ", elements.userCode);
      //         console.log("index: ", index);
      //         // this.$refs.checkboxes[index].toggle();
      //         // this.$refs.checkboxes[index].toggle();
      //       }
      //     });
      //   });
    },
    clickChech() {
      this.$nextTick(index => {
        console.log(
          "this.$refs.checkboxes[index]: ",
          this.$refs.checkboxes.checked
        );
        this.$refs.checkboxes[index].checked = true;
      });
    },
    // 获取用户列表
    getUserData() {
      let sendData = {
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_3
        .htCbsPersonInf(sendData)
        .then(res => {
          console.log("res: ", res);
          if (res.length === 0) {
            this.finished = true;
            this.loading = false;
          }
          // 加载状态结束
          this.loading = false;
          this.list = res;
          this.check();
        })
        .catch(() => {});
    },
    pageBack() {
      let obj = {
        key: this.storeKey,
        value: this.result
      };
      this.$store.dispatch(`${this.storeModule}/changTag`, obj);
	  localStorage.setItem("isfresh",false);
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
          margin-left: 10px;
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
