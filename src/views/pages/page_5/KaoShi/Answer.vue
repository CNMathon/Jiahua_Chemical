<template>
  <div class="answer">
    <van-sticky>
      <van-nav-bar title="科目名" left-text="返回" left-arrow @click-left="pageBack">
        <div slot="right" style="color:rgba(56,117,229,1);" @click="tapSend()">交卷</div>
      </van-nav-bar>
    </van-sticky>
    <div class="contenter">
      <div class="header">
        <div>总题数：30</div>
        <div>考试时间：2小时</div>
        <div>剩余时间：1小时</div>
      </div>
      <div class="header-title">一、单选题</div>
      <div class="radio">
        <div class="title">1.题目题目题目题目题目题目题目题目题目题目题目题目。</div>
        <van-radio-group v-model="radio">
          <van-radio name="1" class="radio-item">单选框 1</van-radio>
          <van-radio name="2" class="radio-item">单选框 2</van-radio>
          <van-radio name="3" class="radio-item">单选框 3</van-radio>
          <van-radio name="4" class="radio-item">单选框 4</van-radio>
        </van-radio-group>
      </div>
      <div class="radio">
        <div class="title">2.题目题目题目题目题目题目题目题目题目题目题目题目。</div>
        <van-radio-group v-model="radio">
          <van-radio name="1" class="radio-item">单选框 1</van-radio>
          <van-radio name="2" class="radio-item">单选框 2</van-radio>
          <van-radio name="3" class="radio-item">单选框 3</van-radio>
          <van-radio name="4" class="radio-item">单选框 4</van-radio>
        </van-radio-group>
      </div>
      <div class="header-title">二、多选题</div>
      <div class="checkbox">
        <div class="title">2.题目题目题目题目题目题目题目题目题目题目题目题目。</div>
        <van-checkbox-group v-model="result">
          <van-checkbox name="a" class="checkbox-item">复选框 a</van-checkbox>
          <van-checkbox name="b" class="checkbox-item">复选框 b</van-checkbox>
          <van-checkbox name="c" class="checkbox-item">复选框 c</van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="header-title">四、判断题</div>
      <div class="judge">
        <div class="title">2.题目题目题目题目题目题目题目题目题目题目题目题目。</div>
        <div class="judge-list">
          <div class="judge-item">错误</div>
          <div class="judge-item active">正确</div>
        </div>
      </div>
    </div>
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
      result: []
    };
  },
  methods: {
    tapSend() {
      this.$dialog
        .confirm({
          message: "是否确认交卷"
        })
        .then(() => {
          // on confirm
        });
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