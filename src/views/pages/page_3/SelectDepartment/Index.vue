<template>
  <div class="select-user">
    <van-nav-bar title="人员选择" left-text="返回" left-arrow @click-left="pageBack" />
    <div class="list">
      <!-- 多选 -->
      <van-checkbox-group v-model="result" :max="$route.query.max" v-if="!$route.query.radio">
        <van-cell-group>
          <van-cell v-for="(item, index) in list" clickable :key="item.id" @click="toggle(index)">
            <template slot="title">
              <div class="cell-title">{{ item.title }}</div>
            </template>
            <van-checkbox :name="item" ref="checkboxes" slot="icon" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <!-- 单选 -->
      <van-radio-group v-model="radio" v-else>
        <van-cell-group>
          <van-cell v-for="(item, index) in list" clickable :key="item.id" @click="tapRadio(index)">
            <template slot="title">
              <div class="cell-title">{{ item.title }}</div>
            </template>
            <van-radio slot="icon" :name="index" />
            <!-- <van-checkbox :name="item" ref="checkboxes" slot="icon" /> -->
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div
      class="action"
      v-if="!$route.query.radio"
      @click="pageBack"
    >确定（{{ result.length }}/{{ list.length }}）</div>
    <div class="action" v-else @click="pageBack">确定</div>
  </div>
</template>
<script>
export default {
  name: "selectUser",
  data() {
    return {
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
    this.getUserData();
  },
  methods: {
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
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_3
        .bmSelect(sendData)
        .then(res => {
          this.list = res;
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
      margin-left: 15px;
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
