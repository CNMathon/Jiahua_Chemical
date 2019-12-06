<template>
  <div class="app">
    <van-nav-bar
      title="培训签到"
    />
    <div class="main">
      <div class="title">安全生产知识培训</div>
      <div class="content">
        <div>培训部门：{{pageData.office.fullName}}</div>
        <div>培训负责人：{{pageData.pxRen}}</div>
        <div>培训等级：{{pageData.pxLevel}}</div>
        <div>培训方式：{{pxWayCol[pageData.pxWay]}}</div>
        <div>培训课时：{{pageData.pxHours}}课时</div>
      </div>
      <div class="button-area">
        <van-button type="info" size="large" @click="jumpTo('/page_5/photo')">签到</van-button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      pageData: {},
      pxWayCol: ["内部培训", "外部培训", "现场演练", "自学"]
    }
  },
  created() {
    console.log(`Code: `, this.$route.query.code)
    this.isGetCode()
    this.getPageData()
  },
  methods: {
    isGetCode() {
      if (!this.$route.query.code) {
        this.$router.replace('/page_1')
      } 
    },
    getPageData() {
      this.$api.page_5
        .pxzxHtZxksPxzxListData({
          __sid: localStorage.JiaHuaSessionId,
          code:this.$route.query.code
        })
        .then(res => {
          console.log(`pageData: `, res.list[0])
          this.pageData = res.list[0]
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app {
    .main {
      color: gray;
      text-align: center;
      .title {
        margin-top: 200px;
      }
      .content {
        margin-top: 80px;
        div {
          margin-bottom: 20px;
        }
      }
      .button-area {
        position: fixed;
        width: 100%;
        bottom: 10px;
        padding-left: 40px;
        padding-right: 40px;
        box-sizing: border-box;
      }
    }
  }
</style>