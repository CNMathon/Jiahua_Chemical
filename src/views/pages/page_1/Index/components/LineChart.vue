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
  name: "lineChart_1",
  data() {
    return {
      grid: { left: 20, right: 20, top: 20, bottom: 20 },
      title: {
        text: "停运/启动：14:58:03",
        textStyle: {
          color: "#666666",
          fontSize: 10
        },
        right: 20,
        top: 0
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
          formatter(value) {
            if (value === 0 || value === 12) {
              value = value.toFixed(2);
            } else {
              value = 23.59;
            }
            return value;
          },
          color: "#000000"
        },
        splitNumber: 3,
        min: 0,
        max: 24,
        interval: 12
      },
      chartExtend: {
        barWidth: "14px"
      },
      chartData: {
        columns: ["日期", "停运", "启动"],
        rows: [
          { 日期: "9-1", 停运: 12, 启动: 12 },
          { 日期: "9-2", 停运: 11, 启动: 13 },
          { 日期: "9-3", 停运: 10, 启动: 14 },
          { 日期: "9-4", 停运: 8, 启动: 16 },
          { 日期: "9-5", 停运: 14, 启动: 10 },
          { 日期: "9-6", 停运: 4, 启动: 20 }
        ]
      },
      chartSettings: {
        stack: { 用户: ["停运", "启动"] }
      }
    };
  }
};
</script>
