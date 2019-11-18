<template>
  <div class="liquidfill">
    <ve-liquidfill
      class="liquidfill-item"
      width="5rem"
      height="5rem"
      :data="chartData"
      :settings="chartSettings"
      :tooltip-visible="false"
    ></ve-liquidfill>
    <div class="title">{{ title[type - 1] }}</div>
  </div>
</template>

<script>
export default {
  name: "liquidfill",
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.chartSettings.seriesMap[0].color[0] = this.color[this.type - 1];
    this.chartSettings.seriesMap[0].outline.itemStyle.borderColor = this.color[
      this.type - 1
    ];
    this.chartData.rows[0].title = this.title[this.type - 1];
  },
  data() {
    return {
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
            }
          }
        ]
      },
      chartData: {
        columns: ["title", "percent"],
        rows: [
          {
            title: "培训合格率",
            percent: 0.6
          }
        ]
      }
    };
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
