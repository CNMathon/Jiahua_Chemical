<template>
  <div class="line-chart">
    <ve-histogram
      height="9.375rem"
      :grid="grid"
      :title="title"
      :yAxis="yAxis"
      :data="chartData"
      :settings="chartSettings"
      :extend="chartExtend"
      :legend-visible="false"
      :tooltip-visible="false"
    ></ve-histogram>
  </div>
</template>
<script>
export default {
  name: "lineChart_2",
  data() {
    return {
      grid: { left: 40, right: 20, top: 10, bottom: 20 },
      title: {
        text: "单位：m",
        textStyle: {
          color: "#333333",
          fontSize: 12
        },
        left: 40,
        top: 10
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: "#D9D9D9"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      chartExtend: {
        barWidth: "14px"
      },
      chartData: {
        columns: ["日期", "访问用户", "下单用户"],
        rows: [
          { 日期: "9-1", 访问用户: 1393, 下单用户: 1393, 下单率: 0.32 },
          { 日期: "9-2", 访问用户: 3530, 下单用户: 3530, 下单率: 0.26 },
          { 日期: "9-3", 访问用户: 2923, 下单用户: 2923, 下单率: 0.76 },
          { 日期: "9-4", 访问用户: 1723, 下单用户: 1723, 下单率: 0.49 },
          { 日期: "9-5", 访问用户: 3792, 下单用户: 3792, 下单率: 0.323 },
          { 日期: "9-6", 访问用户: 4593, 下单用户: 4593, 下单率: 0.78 }
        ]
      },
      chartSettings: {
        itemStyle: {
          color: "#6096F8"
        },
        showLine: ["访问用户"]
      }
    };
  }
};
</script>
