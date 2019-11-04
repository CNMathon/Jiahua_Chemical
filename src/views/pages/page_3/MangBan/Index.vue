<template>
  <div class="mangban">
    <van-nav-bar
      title="盲板抽堵安全"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value
        title="申请部门"
        required
        :value="$userInfo.officeName"
      ></cell-value>
      <!-- 申请人 -->
      <cell-value
        title="申请人"
        required
        :value="$userInfo.userName"
      ></cell-value>
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
      <div class="add_device">
        <div class="swiper">
          <span class="swiper_item swiper_item_select"></span>
          <span class="swiper_item"></span>
        </div>
        <div class="add_device_action" @click="addDevice">
          <van-icon name="add-o" color="#6096F8" />
        </div>
      </div>
    </div>
    <!-- 第二部分 -->
    <div class="cell_group">
      <!-- 生产部门作业负责人 -->
      <div class="cell">
        <div class="cell_title">
          <span>生产部门作业负责人</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <span>人名</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 作业部门负责人 -->
      <div class="cell">
        <div class="cell_title">
          <span>作业部门负责人</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value">
          <span>人名</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 涉及其他特殊作业 -->
      <div class="cell">
        <div class="cell_title">
          <span>涉及其他特殊作业</span>
          <span class="required">*</span>
        </div>
        <div class="cell_other">
          <van-col span="8" v-for="(item, index) in 4" :key="index">
            <div class="cell_type_tag">
              电焊
              <span class="delete">
                <van-icon name="cross" />
              </span>
            </div>
          </van-col>
          <van-col span="8">
            <div class="cell_type_tag_add" @click="toSelect(1)">+</div>
          </van-col>
        </div>
      </div>
    </div>
    <div class="next">下一步</div>
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
import { business } from "../../../../mixin/business";
export default {
  name: "mangban",
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
  mixins: [business],
  created() {},
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
    },
    addDevice() {
      this.$router.push({
        path: "./add_device"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.mangban {
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
