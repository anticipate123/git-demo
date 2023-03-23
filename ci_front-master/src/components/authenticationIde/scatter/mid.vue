<template>
  <div class="template-container">
    <!-- <div id="main" ref="myChart" style="width: 100%; height: 76vh;"></div> -->
    <div id="mainQ" ref="myChartQ" style="width: 100%; height: 38vh;"></div>
    <div id="mainR" ref="myChartR" style="width: 100%; height: 38vh;"></div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      optionQ:{
        title:{text:"Q数据",
    
      },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            areaStyle: {}
          }
        ]
      },

      optionR:{
        title:{text:"R数据"},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
      };
  },
  watch: {

   
  },
  methods: {
    linechart(){
      var myChart1 = this.echarts.init(document.getElementById("mainQ"));
      var myChart2 = this.echarts.init(document.getElementById("mainR"));
      myChart1.setOption(this.optionQ);
      myChart2.setOption(this.optionR);
    }
  },
  mounted() {
    this.linechart();

  }
};
</script>
