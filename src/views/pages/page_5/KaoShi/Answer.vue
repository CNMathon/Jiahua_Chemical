<template>
  <div class="answer">
    <van-sticky>
      <van-nav-bar title="科目名" left-text="返回" left-arrow @click-left="pageBack">
        <div slot="right" style="color:rgba(56,117,229,1);" @click="tapSend()">交卷</div>
      </van-nav-bar>
    </van-sticky>
    <van-skeleton title :row="13" :loading="isLoading" style="margin-top:30px;">
      <div class="contenter">
        <div class="header">
          <div>总题数：{{answerData.length}}</div>
          <div>考试时间：2小时</div>
          <div>剩余时间：{{time}}</div>
        </div>
        <div v-for="(item,index) in answerData" :key="index">
          <!-- 单选题 -->
          <div class="radio" v-if="item.questionType == 1">
            <div class="header-title">单选题</div>
            <div class="title" v-html="item.questionStem"></div>
            <van-radio-group v-model="item.myAnswer">
              <div v-for="(items,indexs) in item.children" :key="indexs">
                <van-radio
                  :name="items.itemCode"
                  class="radio-item"
                >{{items.itemCode}}.{{items.itemContent}}</van-radio>
              </div>
            </van-radio-group>
          </div>
          <!-- 多选题 -->
          <div class="checkbox" v-if="item.questionType == 2">
            <div class="header-title">多选题</div>
            <div class="title" v-html="item.questionStem"></div>
            <van-checkbox-group v-model="item.myAnswer">
              <div v-for="(items,indexs) in item.children" :key="indexs">
                <van-checkbox
                  :name="items.itemCode"
                  class="checkbox-item"
                >{{items.itemCode}}.{{items.itemContent}}</van-checkbox>
              </div>
            </van-checkbox-group>
          </div>
          <!-- 判断题 -->
          <div class="checkbox" v-if="item.questionType == 3">
            <div class="header-title">判断题</div>
            <div class="judge">
              <div class="title" v-html="item.questionStem"></div>
              <div class="judge-list">
                <div
                  class="judge-item"
                  :class="active(item.myAnswer === 'N')"
                  @click="item.myAnswer = 'N'"
                >错误</div>
                <div
                  class="judge-item"
                  :class="active(item.myAnswer === 'Y')"
                  @click="item.myAnswer = 'Y'"
                >正确</div>
              </div>
            </div>
          </div>
          <!-- 填空题 -->
          <div class="checkbox" v-if="item.questionType == 4">
            <div class="header-title">填空题</div>
            <div class="judge">
              <!-- <div class="title" v-html="item.questionStem"></div> -->
              <div v-for="(items,indexs) in item.questionStem" :key="indexs">
                <div v-if="items.type === 0">
                  <span v-html="items.value"></span>
                </div>
                <div v-if="items.type === 1">
                  <input v-model="item.myAnswer[items.key].val" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
export default {
  name: "answer",
  mixins: [mixin],
  data() {
    return {
      radio: "1",
      result: [],
      isLoading: true,
      answerData: [],
      save: 0,
      time: "2小时"
    };
  },
  created() {
    // this.$api.page_5
    //   .submitMyPaper(data, this.$userInfo.sessionId)
    //   .then(res => {
    //     if (res.remainMinutes == 0) {
    //       this.$Toast.success({
    //           message: "考试已结束",
    //           onClose() {
    //             that.pageBack();
    //           }
    //         });
    //     }
    //   })
  },
  mounted() {
    // 获取考试数据
    this.getPageData();
  },
  beforeDestroy() {
    clearInterval(this.save);
  },
  methods: {
    // 获取考试数据
    getPageData() {
      let sendData = {
        id: this.$route.query.id,
        showRes: "no",
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_5
        .getQueryMyPaperInfo(sendData)
        .then(res => {
          // 加载状态结束
          this.isLoading = false;
          res.map(item => {
            if (Number(item.questionType) === 2) {
              if (item.myAnswer === "") {
                item.myAnswer = [];
              } else {
                item.myAnswer = item.myAnswer.split(",");
              }
            }
            if (Number(item.questionType) === 4) {
              let reg = /([BlankArea])\w+/g;
              let regArr = item.questionStem.match(reg);
              let newQuestionStem = item.questionStem;
              newQuestionStem = newQuestionStem.replace(/\[/g, "");
              newQuestionStem = newQuestionStem.replace(/]/g, "");
              newQuestionStem = newQuestionStem.split(/(BlankArea\w+)/g);
              let arr = [];
              let num = 0;
              newQuestionStem.forEach(element => {
                if (element.indexOf("BlankArea") === -1) {
                  let obj = {
                    type: 0,
                    value: element
                  };
                  arr.push(obj);
                } else {
                  let obj = {
                    type: 1,
                    value: element,
                    key: num
                  };
                  arr.push(obj);
                  num = num + 1;
                }
              });
              item.questionStem = arr;
              if (item.myAnswer !== "") {
                return;
              }
              item.myAnswer = [];
              regArr.forEach((element, index) => {
                let obj = {
                  no: index + 1,
                  val: ""
                };
                item.myAnswer.push(obj);
              });
            }
            return item;
          });

          this.answerData = res;
          this.save = setInterval(() => {
            this.stopExam();
          }, 10000);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    // 计时器
    countDown() {
      let clock = window.setInterval(() => {
        const date1 = dayjs("2019-01-25");
        const date2 = dayjs("2018-06-05");
        date1.diff(date2); // 20214000000
      }, 1000);
    },
    // 判断题是否选中
    active(type) {
      return type ? "active" : "";
    },
    tapSend() {
      this.$dialog
        .confirm({
          message: "是否确认交卷"
        })
        .then(() => {
          this.stopExam(1);
        });
    },
    resultFormat(result) {
      var h = Math.floor((result / 3600) % 24);
      var m = Math.floor((result / 60) % 60);
      if (h < 1) {
        return (result = m + "分钟");
      } else {
        return (result = h + "小时" + m + "分钟");
      }
    },
    stopExam(isFinalSubmit = 0) {
      console.log(`isFinalSubmit: `, isFinalSubmit)
      let sendData = {
        id: this.$route.query.id,
        userCode: this.$userInfo.userCode,
        // __sid: this.$userInfo.sessionId,
        isFinalSubmit: isFinalSubmit,
        children: []
      };
      const answerData = JSON.parse(JSON.stringify(this.answerData));
      answerData.map(item => {
        if (Number(item.questionType) === 2) {
          item.myAnswer = item.myAnswer.join(",");
        }
        if (Number(item.questionType) === 4) {
          let myAnswer = [];
          for (const key in item.myAnswer) {
            if (item.myAnswer.hasOwnProperty(key)) {
              const element = item.myAnswer[key];
              myAnswer.push(element);
            }
          }
          item.myAnswer = myAnswer;
        }
        let obj = {
          sectionID: item.sectionID,
          questionID: item.questionID,
          myAnswer: item.myAnswer,
          myQuestionID: item.myQuestionID,
          questionScore: item.questionScore
        };
        sendData.children.push(obj);
      });
      let data = {
        data: sendData
      };
      let that = this;
      this.$api.page_5
        .submitMyPaper(data, this.$userInfo.sessionId)
        .then(res => {
          this.time = this.resultFormat(res.remainMinutes);
          if (res.remainMinutes === 0) {
            this.stopExam(1);
          }
          if (isFinalSubmit === 1) {
            this.$Toast.success({
              message: "提交成功",
              onClose() {
                that.pageBack();
              }
            });
          }
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.answer {
  padding-bottom: 30px;
  box-sizing: border-box;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
  box-sizing: border-box;
  font-size: 28px;
  color: rgb(43, 33, 33);
  line-height: 40px;
}
.contenter {
  padding: 0 25px;
  box-sizing: border-box;
}
.header-title {
  font-size: 34px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 48px;
  margin-bottom: 20px;
}
.radio {
  .title {
    margin-bottom: 30px;
    font-size: 32px;
    color: rgba(51, 51, 51, 1);
    line-height: 45px;
  }
  .radio-item {
    margin-bottom: 30px;
  }
}
.checkbox {
  .title {
    margin-bottom: 30px;
    font-size: 32px;
    color: rgba(51, 51, 51, 1);
    line-height: 45px;
  }
  .checkbox-item {
    margin-bottom: 30px;
  }
}
.judge {
  margin-bottom: 30px;
  .title {
    margin-bottom: 30px;
    font-size: 32px;
    color: rgba(51, 51, 51, 1);
    line-height: 45px;
  }
  .judge-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .judge-item {
      width: 260px;
      height: 68px;
      text-align: center;
      border-radius: 14px;
      border: 1px solid rgba(151, 151, 151, 1);
      font-size: 34px;
      color: rgba(51, 51, 51, 1);
      line-height: 68px;
    }
    .active {
      color: rgba(255, 255, 255, 1);
      background: rgba(56, 117, 229, 1);
      border: 1px solid rgba(56, 117, 229, 1);
    }
  }
}
</style>