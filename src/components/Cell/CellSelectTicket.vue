<template>
  <div class="app">
    <cell-value
      :title="title"
      required
    >
      <img
        src="@/assets/images/add.jpg"
        class="cell_add_button"
        @click="pageJumping"
      />
    </cell-value>
    <div class="cell_other">
      <van-col span="24" v-for="(item, index) in tagList" :key="index">
        <div class="cell_type_tag">
          <span>
            xxx作业票：{{ item.ticketCode }}
          </span>
          <span class="delete" v-if="!disable">
            <van-icon name="cross" @click="removeItem(index)" />
          </span>
        </div>
      </van-col>
    </div>
  </div>
  
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "cell_select_user",
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    return {
      values: []
    };
  },
  props: {
    title: String,
    storeModule: String,
    storeKey: String,
    required: {
      type: Boolean,
      default: false
    },
    value: Array,
    max: 0
  },
  data() {
    return {
      tagList: []
    }
  },
  methods: {
    pageJumping() {
      this.jumpTo('./ticket', {
        storeKey: this.storeKey,
        storeModule: this.storeModule
      })
    },
    toSelectUser() {
      if (this.disable) return;
      this.$router.push({
        path: "./select_project",
        query: {
          storeModule: this.storeModule,
          storeKey: this.storeKey,
        }
      });
    },
    removeItem(index) {
      let tagList = this.deepCopy(this.tagList)
      tagList.splice(index, 1)
      this.$store.dispatch(`${this.storeModule}/changTag`, {
        key: this.storeKey,
        value: tagList
      });
    },
    showNames() {
      if (!this.isDataEmpty(this.value)) {
        return this.value[0].projectName
        // let arr = JSON.parse(JSON.stringify(this.value));
				// console.log(this.value)
				// console.log("value")
        // let newArr = arr.map(item => {
				// 	console.log(item)
        //   return item.userName;
        // });
        // return newArr.join(",");
      }
    }
  },
  watch: {
    vuexData() {
      this.tagList = this.vuexData
      console.log(`VuexData: `, this.vuexData)
    }
  },
  computed: {
    vuexData() {
      return this.$store.state[this.storeModule][this.storeKey]
    }
  },
  created() {
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
  .cell_value {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 28px;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
    line-height: 40px;
    .cell_value_arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
    }
  }
}
.border {
  &::after {
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
.disable {
  background-color: #f5f5f5 !important;
}

.cell_other {
  padding-left: 40px;
  padding-right: 40px;
}

.cell_type_tag {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 20px;
  background: #6096f8;
  color:white;
  margin-bottom: 10px;
}

.delete {
  font-size: 35px;
}
</style>

<style lang="scss" scoped>
.cell_add_button {
  width: 40px;
}
</style>