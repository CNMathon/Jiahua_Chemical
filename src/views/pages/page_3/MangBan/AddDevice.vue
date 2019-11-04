<template>
  <div class="mangban_add_device">
    <van-nav-bar
      title="添加设备管道"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 设备管道名称 -->
      <div class="cell">
        <div class="cell_title">
          <span>设备管道名称</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" />
        </div>
      </div>
      <!-- 介质 -->
      <div class="cell">
        <div class="cell_title">
          <span>介质</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" />
        </div>
      </div>
      <!-- 温度 -->
      <div class="cell">
        <div class="cell_title">
          <span>温度</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" />
        </div>
      </div>
      <!-- 压力 -->
      <div class="cell">
        <div class="cell_title">
          <span>压力</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" />
        </div>
      </div>
      <!-- 材质 -->
      <div class="cell">
        <div class="cell_title">
          <span>材质</span>
        </div>
        <div class="cell_value" @click="materialShowShow = true">
          <span>{{ material.value || "点击选择" }}</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 规格 -->
      <div class="cell">
        <div class="cell_title">
          <span>规格</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" />
        </div>
      </div>
      <!-- 编号 -->
      <div class="cell">
        <div class="cell_title">
          <span>编号</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" />
        </div>
      </div>
      <!-- 堵时间 -->
      <div class="cell">
        <div class="cell_title">
          <span>堵时间</span>
        </div>
        <div class="cell_value" @click="timeShow = true">
          <span>2019-01-01 12:00</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 抽时间 -->
      <div class="cell">
        <div class="cell_title">
          <span>抽时间</span>
        </div>
        <div class="cell_value" @click="timeShow = true">
          <span>2019-01-01 12:00</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 堵作业人 -->
      <div class="cell">
        <div class="cell_title">
          <span>堵作业人</span>
        </div>
        <div class="cell_value">
          <span>单位名称</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 抽作业人 -->
      <div class="cell">
        <div class="cell_title">
          <span>抽作业人</span>
        </div>
        <div class="cell_value">
          <span>单位名称</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 堵监护人 -->
      <div class="cell">
        <div class="cell_title">
          <span>堵监护人</span>
        </div>
        <div class="cell_value">
          <span>单位名称</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 抽监护人 -->
      <div class="cell">
        <div class="cell_title">
          <span>抽监护人</span>
        </div>
        <div class="cell_value">
          <span>单位名称</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
    </div>
    <div class="next" @click="pageBack">下一步</div>
    <!-- 材质选择 -->
    <van-popup v-model="materialShowShow" position="bottom">
      <van-picker
        show-toolbar
        title="材质选择"
        :columns="materialColumns"
        @cancel="onMaterialCancel"
        @confirm="onMaterialConfirm"
      />
    </van-popup>
    <!-- 时间选择 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="new Date()"
        @cancel="onTimeCancel"
        @confirm="onTimeConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "mangban_add_device",
  data() {
    return {
      materialShowShow: false,
      material: {
        index: 0,
        value: ""
      },
      materialColumns: ["特殊", "|类", "||类"],
      timeShow: false,
      currentDate: new Date(),
      list_1: [
        "登高",
        "动火",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ]
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      next();
      // 返回上级页面销毁组件
      if (to.name === "mangban_index") {
        this.$emit("destroy");
      }
    });
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    // 材质选择
    onMaterialConfirm(value, index) {
      this.materialShowShow = false;
      this.material = {
        index: index,
        value: value
      };
    },
    // 材质选择取消
    onMaterialCancel() {
      this.materialShowShow = false;
    },
    // 取消时间选择
    onTimeCancel() {
      this.timeShow = false;
    },
    // 确认时间选择
    onTimeConfirm() {
      this.timeShow = false;
    },
    toSelect(index) {
      this.$router.push({
        path: "./select",
        query: {
          index: index,
          showList: this[`list_${index}`]
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.mangban_add_device {
  background-color: #f5f5f5;
  .next {
    width: 100%;
    height: 98px;
    margin-top: 25px;
    font-size: 32px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    line-height: 98px;
    background: rgba(96, 150, 248, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
  }
}
</style>
