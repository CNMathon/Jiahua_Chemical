<template>
  <div class="app" v-if="isShow">
    <div class="liquidfill">
      <ve-liquidfill
        class="liquidfill-item"
        width="5rem"
        height="5rem"
        :data="chartData"
        :settings="chartSettings"
        :tooltip-visible="false"
      ></ve-liquidfill>
      <div class="title">{{ title[type] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "liquidfill",
  props: {
    type: {
      type: Number,
      default: 0
    },
    value: Number
  },
  created() {
    console.log(`ballValue: `, this.value);
    this.init()
  },
  data() {
    return {
      isShow: true,
      color: ["#D85A38", "#1890FF", "#5DB739", "#8d4bbb"],
      title: ["培训合格率", "持证上岗率", "隐患整改率", "达标排放合格率"],
      chartSettings: {
        seriesMap: [
          {
            color: ["#D85A38"],
            label: {
              color: "#000000",
              fontSize: "1.33333rem"
            },
            outline: {
              borderDistance: "1px",
              itemStyle: {
                borderColor: "#D95D3B",
                borderWidth: 2
              }
            },
            center: ["50%", "50%"],
            radius: "98%",
            waveAnimation: true,
            animationDuration: 0,
            backgroundStyle: {
              color: "#ffffff"
            },
            silent: true
          }
        ]
      },
      chartData: {
        columns: ["title", "percent"],
        rows: [{percent: this.value}]
      }
    };
  },
  watch: {
    value() {
      this.init()
      console.log("change");
      this.dataMount();
    }
  },
  methods: {
    init() {
      this.chartSettings.seriesMap[0].color[0] = this.color[this.type];
      this.chartSettings.seriesMap[0].outline.itemStyle.borderColor = this.color[
        this.type
      ];
    },
    dataMount() {
      this.chartData.rows[0].percent = this.value;
    }
  }
};
</script>
<style lang="scss" scoped>
.liquidfill {
  display: table !important;
  margin: 30px 0 40px 0;
  .liquidfill-item {
    width: 100%;
    text-align: center;
    background-color: transparent !important;
  }
  .title {
    width: 100%;
    margin-top: 21px;
    text-align: center;
    font-size: 26px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 22px;
  }
}
</style>
