<template>
  <div class="line-chart">
    <ve-line
      height="9.375rem"
      :grid="grid"
      :title="locTitle"
      :yAxis="yAxis"
      :data="chartData"
      :settings="chartSettings"
      :extend="chartExtend"
      :legend-visible="false"
      :tooltip-visible="true"
    ></ve-line>
  </div>
</template>
<script>
import { create } from 'domain';
export default {
  name: "tagsName_lineChart",
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      grid: { left: 40, right: 20, top: 10, bottom: 20 },
      locTitle: {
        text: this.title,
        textStyle: {
          color: "#333333",
          fontSize: 12
        },
        left: 10,
        top: 10
      },
      xAxis: {
        name:'时间',
        nameLocation: 'end',
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: [],
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: "#D9D9D9"
          },
          data: [],
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
        columns: ['date', 'value'],
        rows: []
      },
      chartSettings: {
        itemStyle: {
          color: "#6096F8"
        },
        showLine: [],
        labelMap: {
          'value': '历史值',
          'date': '时间'
        },
      }
    };
  },
  watch: {
    data (val) {
      console.log('val', val);
      this.paserData(val);
    }
  },
  created () {
    this.paserData(this.data);
  },
  methods: {
    paserData (data) {
      let columns = [];
      let rows = [];
      let xData= [];
      let yData= [];
      data.forEach((item) => {
        let time = new Date (item[0]);
        let obj = {};
        obj.date = (time.getMonth() + 1) + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() ;
        obj.value = item[1];
        yData.push(item[1]);
        xData.push(obj.date);
        rows.push(obj);
      });
      rows.splice(rows.length - 1 ,1);
      this.chartData.rows = rows;
      // this.xAxis.data = xData;
      // this.yData.data = yData;
    }
  }
};
</script>
