<template>
  <div class="cell" @click="toSelectUser">
    <div class="cell_title">
      <span>{{ title }}</span>
      <span class="required" v-if="required">*</span>
    </div>
    <div class="cell_other_people">
      <div class="cell_other_peoples" v-if="values.length>0" v-for="(item, index) in values" :key="index">
        <div class="cell_other_peoples_header">
          <van-image round width="100%" height="100%" :src="item.avatarUrl" />
          <span class="delete" @click.stop="deleteItem(index)">
            <van-icon name="cross" color="#ffffff" />
          </span>
        </div>
        <div class="cell_other_peoples_name">{{item.userName}}</div>
        <div class="cell_other_peoples_arrow" v-if="index % 4 !== 0 || index === 0">
          <img src="../../assets/images/arrow-right.svg" alt srcset />
        </div>
      </div>
      <div class="cell_other_add_peoples">+</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cell_select_users",
  data() {
    return {
      values: []
    };
  },
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    title: String,
    storeModule: String,
    storeKey: String,
    required: {
      type: Boolean,
      default: false
    },
    value: Array
  },
  watch: {
    value(val) {
      console.log(val)
      if(val.length===0){
        this.values=[]
      }else{
        this.values = val;
      }
    }
  },
  methods: {
    toSelectUser() {
      this.$router.push({
        path: "./select_user",
        query: {
          storeModule: this.storeModule,
          storeKey: this.storeKey
        }
      });
    },
    deleteItem(index) {
      let newValue = JSON.parse(JSON.stringify(this.values));
      let newValues = newValue.filter((item, indexs) => {
        return index !== indexs;
      });
      this.values = newValues;
    }
  }
};
</script>
<style lang="scss" scoped>
.cell {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 30px 40px;
  position: relative;
  background-color: #ffffff;
  .cell_title {
    width: 50%;
    font-size: 28px;
    font-weight: 400;
    color: rgba(45, 44, 51, 1);
    line-height: 40px;
    .required {
      color: #cf2323;
    }
  }
  // 用户选择
  .cell_other_people {
    margin-top: 30px;
    display: grid;
    grid-gap: 10px 54px;
    grid-template-columns: repeat(5, 1fr);
    .cell_other_peoples {
      position: relative;
      .cell_other_peoples_header {
        width: 88px;
        height: 88px;
        margin: 0 auto;
        margin-bottom: 5px;
        position: relative;
        background: rgba(220, 220, 220, 1);
        border: 4px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        .delete {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 35px;
          height: 35px;
          background: rgba(108, 108, 108, 1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
        }
      }
      .cell_other_peoples_name {
        font-size: 20px;
        text-align: center;
        font-weight: 400;
        color: rgba(45, 44, 51, 1);
        line-height: 28px;
      }
      .cell_other_peoples_arrow {
        width: 41px;
        position: absolute;
        top: 22px;
        left: 95px;
        img {
          width: 100%;
        }
      }
    }
    .cell_other_add_peoples {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 88px;
      height: 88px;
      background: rgba(220, 220, 220, 1);
      border: 4px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      font-size: 70px;
      color: #979797;
    }
  }
  .cell::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    width: calc(100% - 80px);
    bottom: 0;
    left: 40px;
    border-bottom: 1px solid #e5e5e5;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
