<template>
  <div ref="myChart1" class="trend-container"></div>
</template>

<script>

export default {
  name: "staAnalysisLineChart",
  data() {
    return {
      myLineData: {
        darkMode: true,
        title: {
          text: "信号个数统计",
          // center: 'center',
          left: "center",
          textStyle: {
            color: "#515A6E",
            fontSize: 18
          }
        },
        grid: {
          top: 45,
          left:'8%',
        },
        // backgroundColor: "#100C2A",
        textStyle: {
          color: "#515A6E",
          fontSize: 18
        },
        lineStyle: {
          color: "#0099FF"    //折线颜色
        },
        xAxis: {
          type: 'category',
          name: '日期',
          data: ['22-2-20', '22-2-21', '22-2-22', '22-2-23', '22-2-24', '22-2-25', '22-2-26'],
          axisLine: {
            lineStyle: {
              color: "#515A6E",
              width: 1.5,
              type: "solid"
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '个数',
          axisLine: {
            lineStyle: {
              color: "#515A6E",
              width: 1.5,
              type: "solid"
            }
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:"#515A6E",
              width: 0.7,
              type: "dotted"
            }
          }
        },
        series: [{
          data: [100, 230, 224, 218, 105, 147, 280],
          type: 'line',
          symbolSize:6,
          itemStyle:{
            normal:{
              // 拐点上显示数值
              label : {
                show: true
              },
              borderColor:"#515A6E",  // 拐点边框颜色
            }
          }
        }]
      }
    };
  },
  created() {
  },
  mounted() {
    this.init();
  },
  methods: {
    /*获取数据getData()*/
    init(){
      let that = this;
      this.myChart = this.echarts.init(this.$refs.myChart1, "default", {
        height: window.innerHeight / 1.8,
        width: window.innerWidth * 0.82
      });
      this.myChart.setOption(this.myLineData)
      // window.onresize = this.myChart.resize;
    }
  }
}
</script>

<style scoped>

</style>
