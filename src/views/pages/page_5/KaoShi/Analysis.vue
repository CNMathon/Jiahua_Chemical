<template>
  <div class="answer">
    <van-sticky>
      <van-nav-bar title="科目名" left-text="返回" left-arrow @click-left="pageBack"></van-nav-bar>
    </van-sticky>
    <van-skeleton title :row="13" :loading="isLoading" style="margin-top:30px;">
      <div class="contenter">
        <div class="header">
          <div>总题数：{{answerData.length}}</div>
          <div>得分：60</div>
        </div>
        <div v-for="(item,index) in answerData" :key="index">
          <!-- 单选题 -->
          <div class="radio" v-if="item.questionType == 1">
            <div class="header-title">单选题</div>
            <div class="title" v-html="item.questionStem"></div>
            <van-radio-group v-model="item.myAnswer" disabled>
              <div v-for="(items,indexs) in item.children" :key="indexs">
                <van-radio
                  :name="items.itemCode"
                  class="radio-item"
                >{{items.itemCode}}.{{items.itemContent}}</van-radio>
              </div>
            </van-radio-group>
            <div class="analysis">
              <div class="analysis__item">
                <div class="analysis__item_title">解题分析：</div>
                <div class="analysis__item_text" v-html="item.questionAnalize"></div>
              </div>
              <div class="analysis__item">
                <div class="analysis__item_title">正确答案：</div>
                <div class="analysis__item_text">{{item.questionAnswer}}</div>
              </div>
              <div class="analysis__item">
                <div class="analysis__item_title">考生答案：</div>
                <div class="analysis__item_text">{{item.myAnswer}}</div>
              </div>
            </div>
          </div>
          <!-- 多选题 -->
          <div class="checkbox" v-if="item.questionType == 2">
            <div class="title" v-html="item.questionStem"></div>
            <van-checkbox-group v-model="item.myAnswer" disabled>
              <div v-for="(items,indexs) in item.children" :key="indexs">
                <van-checkbox
                  :name="items.itemCode"
                  class="checkbox-item"
                >{{items.itemCode}}.{{items.itemContent}}</van-checkbox>
              </div>
            </van-checkbox-group>
            <div class="analysis">
              <div class="analysis__item">
                <div class="analysis__item_title">解题分析：</div>
                <div class="analysis__item_text" v-html="item.questionAnalize"></div>
              </div>
              <div class="analysis__item">
                <div class="analysis__item_title">正确答案：</div>
                <div class="analysis__item_text">{{item.questionAnswer}}</div>
              </div>
              <div class="analysis__item">
                <div class="analysis__item_title">考生答案：</div>
                <div class="analysis__item_text">{{item.myAnswer}}</div>
              </div>
            </div>
          </div>
          <!-- 判断题 -->
          <div class="checkbox" v-if="item.questionType == 3">
            <div class="header-title">判断题</div>
            <div class="judge">
              <div class="title" v-html="item.questionStem"></div>
              <div class="judge-list">
                <div class="judge-item">错误</div>
                <div class="judge-item">正确</div>
              </div>
            </div>
            <div class="analysis">
              <div class="analysis__item">
                <div class="analysis__item_title">解题分析：</div>
                <div class="analysis__item_text" v-html="item.questionAnalize"></div>
              </div>
              <div class="analysis__item">
                <div class="analysis__item_title">正确答案：</div>
                <div class="analysis__item_text">{{item.questionAnswer === 'Y' ? '正确' : '错误'}}</div>
              </div>
              <div class="analysis__item">
                <div class="analysis__item_title">考生答案：</div>
                <div class="analysis__item_text">{{item.myAnswer === 'Y' ? '正确' : '错误'}}</div>
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
  name: "Analysis",
  mixins: [mixin],
  data() {
    return {
      radio: "1",
      result: [],
      isLoading: true,
      answerData: []
    };
  },
  mounted() {
    // 获取考试数据
    this.getPageData();
  },
  methods: {
    // 获取考试数据
    getPageData() {
      let sendData = {
        id: this.$route.query.id,
        showRes: "yes",
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_5
        .getQueryMyPaperInfo(sendData)
        .then(res => {
          // 加载状态结束
          this.isLoading = false;
          this.answerData = res;
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
      this.stopExam();
      // this.$dialog
      //   .confirm({
      //     message: "是否确认交卷"
      //   })
      //   .then(() => {
      //  this.stopExam();
      //     // on confirm
      //   });
    },
    stopExam() {}
  }
};
</script>
<style lang="scss" scoped>
.answer {
  padding-bottom: 30px;
  box-sizing: border-box;
  /deep/ .van-radio__label--disabled {
    color: #333333;
  }
  /deep/ .van-checkbox__label--disabled {
    color: #333333;
  }
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
.analysis {
  font-size: 28px;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  &__item {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    &_title {
      width: 180px;
    }
  }
}
</style>