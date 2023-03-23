<template>
  <div ref="myChart2"></div>
</template>

<script>

export default {
  name: "staAnalysisPieChart",
  data() {
    return {
      myPieData: {
        title: [{
          text: '月份',
          left: '19%',
          top: '38%',
          textStyle:{
            color: "#515A6E"
          }
        },{
          text: '周日期',
          left: '53%',
          top: '38%',
          textStyle:{
            color: "#515A6E"
          }
        },{
          text: '小时',
          left: '85%',
          top: '38%',
          textStyle:{
            color: "#515A6E"
          }
        }],
        // title: {
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   left: 'center',
        //   textStyle: {
        //     color: "#EEF1FA"
        //   }
        // },
        tooltip: {
          trigger: 'item'
        },
        grid: {
          top: 45,
          left:'5%'
        },
        series: [
          {
            name: '月份',
            type: 'pie',
            radius: '30%',
            center: ['15%','19%'],
            color: ["#cee0ec","#73b3db","#2390d9","#0066a8"],
            data: [
              {value: 735, name: 'signal1'},
              {value: 580, name: 'signal2'},
              {value: 484, name: 'signal3'},
              {value: 300, name: 'signal4'}
            ],
            textStyle:{
              color: "#B9B8CE"
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },{
            name: '周日期',
            type: 'pie',
            radius: '30%',
            center: ['50%', '19%'],
            color: ["#cee0ec","#83b4d7","#248DD5"],
            data: [
              {value: 500, name: 'signal5'},
              {value: 484, name: 'signal6'},
              {value: 300, name: 'signal7'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },{
            name: '小时',
            type: 'pie',
            radius: '30%',
            center: ['85%', '19%'],
            data: [
              {value: 600, name: 'signal8'},
              {value: 484, name: 'signal9'},
              {value: 300, name: 'signal0'}
            ],
            color: ["#cee0ec","#83b4d7","#248DD5"],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    };
  },
  created() {
    // this.getData();
  },
  mounted() {
    this.init();
  },
  methods: {
    /*获取数据getData()*/
    init(){
      let that = this;
      this.myChart = this.echarts.init(this.$refs.myChart2, "default", {
        height: window.innerHeight/2,
        width: window.innerWidth * 0.82
      });
      this.myChart.setOption(this.myPieData)
      window.onresize = this.myChart.resize;
    }
  }
}
</script>

<style scoped>

</style>
