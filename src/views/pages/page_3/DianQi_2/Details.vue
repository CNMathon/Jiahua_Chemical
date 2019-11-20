<template>
  <div class="home">
    <van-nav-bar
      title="电气第一种工作票详情"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
      fixed
    />
    <div class="cell_group">
      <img
        src="data:image/jpeg;base64,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"
        alt
      />
      <van-cell title="已填写作业票预览" is-link />
      <img
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCAAiATUDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAUEBgMCAf/EABcBAAMBAAAAAAAAAAAAAAAAAAABAgP/2gAMAwEAAhADEAAAAe11S/KosibMsuovIPq1ZEaGeRUX0aymMyelA9bi0I0PCRUXkO4mPBP3QF530Ciq3CbJeW87zDumxLFUYQ8fjW1OWbSmsMnpFxy/r0Zpl1M9MULqlxznRieX52E+X9+hXDLqZ6ZIvSrjmOnE8v5rJ8r+9S0z5epUTXx8eyLiZOmaZy6P2i/CZaNS1Qnl1CoAAAAAAAAAAAAAAAAAAAAAAAAA/8QAIRAAAgICAgIDAQAAAAAAAAAAAgMABAETEBURFBI0UAX/2gAIAQEAAQUCrfV/GB2miq982cPdoX2BTsCi72SZw5uEr7EoF7JM4e3CV9iUXfyTOGs1L7AoH9DyfDmaldiU7Ap2JStZ9jHD7epnYFK1n2McWLek69jdjWTP56U2Nk9dcsgZr+FvxptRaLGXT115llZMV69nytD9s9deZYAjXptfIFWCbM115lgCNGu3MVrBnM115lleWI0WZos5mE2sSmowhBg8AoAzYU/drtymo1whweBUAFZU7LKq24lb6v41b6v43//EAB4RAAMAAQUBAQAAAAAAAAAAAAABAhEDEBITMSFA/9oACAEDAQE/AXaTxs7lenbOzuV6TSrwbwds7O1PpNKvNu2Rakv4tnqShPP1DpL0TTHCbyYKjLOpGCtNUTPE4o6kYKjJMcTijpROmk8mB6SFOFgcprApwsfl/8QAHREBAAMAAwADAAAAAAAAAAAAAQACERATMQMSQP/aAAgBAgEBPwEqpvBRfJ124KL5Gqe8dduCq+RqnvHXaNE4KWYmQF8iZC+GTYXydjNlbpLW2azsZsrfJa32ms7WN1mw+SLrsLY7F38v/8QAJhAAAQMDAwMFAQAAAAAAAAAAAQACEQMSoRAxMyEiURMyUGFyQf/aAAgBAQAGPwKl+R8PTdE9B0Qa6nbOt0SuHK4coNdSInW6J+lw5Qa6kRPSdbiJ+lw5Qa6lEmNS+J+lw5UOpQPOpfErhyuHK4co9tpGtopl3lcCPbaRraGXIy0tIVKzcAFNvaA2Z02yhZBcCo9ILjygXtgTOm2V2e4GVPpZQupgCZnTbK7PcDKn0x5Tb2AAHfTbKLW7rjCFzAB502yi1u64/wCyutILj3TjUAE/xQVLQi6m2QVxpxqACVBUgdVNNoc0pxqiCYCpfkfD0vyPh//EACQQAAIBAwQCAwEBAAAAAAAAAAERACExURBBYfBxkVDR4YHx/9oACAEBAAE/Ieyx8PUeagG8KXQJN76ODqJkoASm3XWJTb46UAoSTdtHDsyKwDcwEscCkpXLaOFbiwDcysmeII8GodtHKzF2bzn9eIQRDEWto4EwSWA3nLuoW66XgFBIMq8AqVyNTmWBViU23v8AICpXI1q9JMl2lmqUPMTgBEAfEQAp5fL0qgvQu6HAWJHeVFz4+54XXMBxWKuP80N0ftFW1BzKhDJfThpUaTY0N0ftB+gpAd4S3Z7hf3DyGBLY0ZM68ot20hxhLMy7/sArlWju2jJnXlAfA0EA7yuwmAi8IRBD5EBkAMqiN9UADiKix5hGYCQrxYS5vYw4g/ojZVAAIuLHmPWCK5hqANRgxKgAAOH9zssfD9lj4f8A/9oADAMBAAIAAwAAABBXjLTjbbfLjn7P/rjHTXCY+17+x3+7+3+8w480/wB/c8888888888888888888/8QAIBEBAQEAAgIBBQAAAAAAAAAAAQAREDEhQWFAUXGhsf/aAAgBAwEBPxDSHzw7ihXN/vDuKA2ANYVzeGsV2yUDW+f9Mzpwpixn0ROwTS84SHsh21IJ7ZD2TGrGEGUE+8E9sh7IXupFrPcoJnd8jCtNjdyQrrFT1h+IvpZ//8QAHREBAQEAAwADAQAAAAAAAAAAAREAECExQEFhUf/aAAgBAgEBPxCMHXBdGQLOC6N1OArDIFnB9HEgVhvyw1TgShkUc7MRRydDCPMxkMseGEeYWBkfeCRyx4YR5kMmWLgkf5vwMZIapMgSGXBvsZVfi//EACYQAQEAAgECBgIDAQAAAAAAAAERACExQVEQYXGBkfBQ8aHB0bH/2gAIAQEAAT8Q+47Pw5PI9bE/wwG8jui0XR1PCO5lvonSvPPoZLqaWvrjKwndq57YOv3eaWFIdU8IOUy4ZHKJwYHsbmlz24w0NUE0sLo6p4QcpipKHKJ0zZ1rGlvxgCJRumBqeZ8+CDlMFx0zlSwxFRNGO2nCrPOb7yeCDlM0rGcpLA+XEOfVHPbjnEjRHFWvXWAiOQTP4ygMijRHhvhRYJcVMkiwTucPRPnNrRCrejFAZFGiPDfbwospcmGw0hXBw/UzqDM1EqJ8OLjFBLsfO7i7FzC9gj3xBEeHOoEB3hp1yUsHj0T+8LxBLyOeePM/OO1AltBiyyamFDoHljwuclr+7BiARrNOl98Wa4bjUoHscHUVQUoWbWsDwuclv2cMiQ4eRE+HNA0/IAB+H84upvixDOXt4dVFX92AutSoKI/1igiCEc43UxvoUrB5mDRM6qKv7sQ0aCEIy+2KsNqeUR7+WGZOd/0wr8VYFYnR7f8AMho6jpW2euF1A0BG/bBcGVbo9XGHMSgQA6p2HEiAkjNnPn54EYSq6LtnrlXq2CN+2OHCqtq3q5uzBEGE7nYwBzBizkZrH3HZ+H+47Pw//9k="
        alt
      />
      <van-cell title="流程图" is-link />
      <van-cell title="10、上诉安全措施以全部实行,许可开始工作于" value="2019-01-03" is-link />
      <cell-input class="whiteCell" title="工作许可人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作负责人" :value="'手动输入'" disable></cell-input>
      <van-cell title="11、工作负责人变更：自原工作原负责人离去，变更为担任工作负责人。" value="2019-01-03 06:00" is-link />
      <cell-input class="whiteCell" title="工作票签发人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作许可人" :value="'手动输入'" disable></cell-input>
      <van-cell title="12、工作票延期：有效期延长到" value="2019-01-03 06:00" is-link />
      <cell-input class="whiteCell" title="值班人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作负责人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作许可人" :value="'手动输入'" disable></cell-input>
      <van-cell title="13、工作终结：工作人员已全部撤离，现场已清理完毕，工作结束于" value="2019-01-03 06:00" is-link />
      <cell-input class="whiteCell" title="工作负责人" :value="'手动输入'" disable></cell-input>
      <cell-input class="whiteCell" title="工作许可人" :value="'手动输入'" disable></cell-input>
    </div>
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="toPageShenPi">填写审批意见</button>
      <button @click="toPageLiuCheng">查看流程记录</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>

<script>
import { business } from "@/mixin/business";
export default {
  name: "dianqi_2_details",
  mixins: [business],
  components: {},
  data() {
    return {
      dhLevelColumns: [],
      isShowAction: false
    };
  },
  methods: {
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    onClickRight() {},

    toPageShenPi() {
      this.$router.push({ path: "./yijian" });
    },
    toPageLiuCheng() {
      this.$router.push({ path: "./liucheng" });
    }
  }
};
</script>

<style lang="scss" scoped>
.whiteCell {
  background-color: #fff !important;
}
.action {
  padding-left: 30px;
  padding-right: 30px;
  background-color: transparent;
  button {
    width: 100%;
    height: 110px;
    margin-bottom: 20px;
    background-color: white;
    border: none;
    border-radius: 30px;
    color: rgb(0, 118, 255);
    font-size: 35px;
  }
}
.cell_group {
  img {
    width: 90%;
    height: auto;
    margin: 10px 5%;
  }
}
</style>>
