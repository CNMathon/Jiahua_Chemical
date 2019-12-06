<template>
  <div class="app">
    <van-nav-bar
      title="培训考试"
    />
    <div class="main">
      <div class="title">安全生产知识培训</div>
      <div class="content">
        <div>总分：{{pageData.totalScore}}</div>
        <div>及格分：{{pageData.passScore}}</div>
        <div>考试时长： {{pageData.examTime}}分钟</div>
        <div>考试时间：{{startDate}} - {{endDate}}</div>
      </div>
      <div class="button-area">
        <van-button type="info" size="large" @click="jumpTo(`/page_5/kao_shi_answer?id=${pageData.manageID}`)">考试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageData: {}
    }
  },
  methods: {
    getPageData() {
      this.$api.page_5
        .myexamMyexamListData({
          __sid: localStorage.JiaHuaSessionId,
          userCode: localStorage.JiaHuaUserCode,
          manageID: this.$route.query.code,
        })
        .then(res => {
          console.log(`pageData: `, res.list[0])
          this.pageData = res.list[0]
        })
    },
    dateFormat(timestamp) {
      let initTime = new Date(timestamp)
      let year = initTime.getFullYear()
      let month = initTime.getMonth() + 1
      let date = initTime.getDate()
      return `${year}.${month}.${date}`
    }
  },
  computed: {
    startDate() {
      if (!this.pageData.startDate) { return }
      return this.dateFormat(this.pageData.startDate)
    },
    endDate() {
      if (!this.pageData.endDate) { return }
      return this.dateFormat(this.pageData.endDate)
    },
  },
  created() {
    console.log(`Code: `, this.$route.query.code)
    this.getPageData()
  }
}
</script>

<style lang="scss" scoped>
  .app {
    .main {
      color: gray;
      text-align: center;
      .title {
        margin-top: 150px;
      }
      .content {
        margin-top: 120px;
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
      }
    }
  }
</style>