<template>
  <div class="app">
    <div class="action">
      <div class="title">{{title}}</div>
      <div class="template">
        <div class="picker">
          <cell-pickers :columns="value.modList.config" v-model="value.modList.value"></cell-pickers>
        </div>
        <div class="btn" @click="addLine">增加行</div>
        <div class="btn" @click="delLine">删除行</div>
      </div>
    </div>
    <div class="cell-group">
      <div class="title">
        <div>安全措施</div>
        <div>是否符合要求</div>
      </div>
      <div class="content">
        <div class="content-item" v-for="(item, index) in value.content" :key="index">
          <div class="checked">
            <van-checkbox v-model="item.checked" />
          </div>
          <div class="safe">
            <input v-model="item.safe" />
          </div>
          <div class="status">
            <cell-pickers :columns="item.stat.config" v-model="item.stat.value" />
          </div>
        </div>
      </div>
    </div>
    <!-- <button @click="testme">testme</button> -->
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    title: String,
    value: {
      modList: {
        config: [],
        value: [],
        
      }, // 模板List
      content: [] // 内容
    } // 安全措施板块
  },
  mounted(){
    console.log(333)
    console.log(this.value)
  },  
  methods: {
    // testme() {
    //   console.log(this.value)
    // },
    addLine() {
      this.value.content.push(this.contentData());
    },
    contentData() {
      let data = {
        checked: false,
        safe: this.value.modList.config[this.value.modList.value - 1],
        stat: {
          config: ["是", "否", "不涉及"],
          value: [],
        },
        id: this.value.modList.id[this.value.modList.value - 1]
      }
      console.log(data)
      return data
    },
    delLine() {
      let arr = [];
      this.value.content.map(item => {
        if (item.checked != true) {
          arr.push(item);
        }
      });
      this.value.content = arr;
      console.log(arr);
    }
  },
  data() {
    return {
      srcConCol: ["是", "否", "不涉及"] // 安全措施内容Col
    };
  },
};
</script>

<style lang="scss" scoped>
.app {
  padding: 30px 40px;
  font-size: 28px;
  .action {
    .template {
      margin-top: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-size: 28px;
      color: #2d2c33;
      line-height: 40px;
      .picker {
        width: 50%;
        margin-right: auto;
      }
      .btn {
        padding: 5px 10px;
        box-sizing: border-box;
        border: 1px solid #333;
        margin-left: 10px;
      }
    }
  }
  .cell-group {
    margin-top: 30px;
    .title {
      display: flex;
      justify-content: space-around;
    }
    .content-item {
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      .checked {
        width: 10%;
      }
      .safe {
        width: 40%;
        input {
          width: 100%;
          height: 100%;
        }
        // border: 1px solid #cfcfcf;
        // background-color: red;
      }
      .status {
        width: 40%;
        margin-left: 10%;
      }
    }
  }
}
</style>

<style lang="scss">
</style>