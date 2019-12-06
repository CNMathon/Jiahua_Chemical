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
        text: "单位：" + this.title,
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
      // let str = '';
      // if (data.length > 0) {
      //   str = new Date(data[0][0]).toLocaleTimeString() + '至' +  new Date(data[data.length - 1][0]).toLocaleTimeString();
      //   str = "date";
      // } else {
      //   str = '没有有效数据';
      // }
      data.forEach((item) => {
        let time = new Date (item[0]);
        let obj = {}
        obj.date = (time.getMonth() + 1) + '/' + time.getDay() + ' ' + time.getHours() + ':' + time.getMinutes() ;
        obj.value = item[1];
        rows.push(obj);
      });
      rows.splice(rows.length - 1 ,1);
      this.chartData.rows = rows;
    }
  }
};
</script>
