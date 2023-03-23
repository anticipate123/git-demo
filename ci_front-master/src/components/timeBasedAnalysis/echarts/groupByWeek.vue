<template>
  <div class="template-container">
    <div
      ref="myChart"
      id="main5"
      style="width: 100%; height: calc(100vh - 242px);"
    ></div>
    <Spin fix v-if="loading"></Spin>
  </div>
</template>

<script>
export default {
  props: ['active'],
  data() {
    return {
      loading: false,
      form: {
        endTime: "",
        startTime: ""
      },
      option: {
        legend: {
          data: ["最大值", "最小值", "平均值"]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          name: "周数"
        },
        yAxis: {
          name: "信号数量"
        },
        series: [
          {
            color: "#4153b6",
            name: "最大值",
            key: "max",
            type: "bar",
            barMaxWidth: 40,
            label: {
              show: true,
              position: 'top',
              color: '#333'
            }
          },
          {
            color: "#26a65b",
            name: "平均值",
            key: "median",
            type: "bar",
            barMaxWidth: 40,
            label: {
              show: true,
              position: 'top',
              color: '#333'
            }
          },
          {
            color: "#ef4836",
            name: "最小值",
            key: "min",
            type: "bar",
            barMaxWidth: 40,
            label: {
              show: true,
              position: 'top',
              color: '#333'
            }
          }
        ]
      }
    };
  },
  methods: {
    getData(){
      this.loading = true;
      this.axios
      .post("api/statisticsAnalysis/signal/groupByWeek/mongodb", this.form)
      .then(result => {
        if (result.status === 200) {
          const data = result.data.data;

          const xAxisList = [];
          const minList = [];
          const maxList = [];
          const medianList = [];

          data.forEach(
            (ele, i) => {
              xAxisList.push(ele.week_.replace(/,/,' 至 '));
              minList.push(ele.number[0]);
              medianList.push(ele.number[1]);
              maxList.push(ele.number[2]);
            }
          );

          this.option.xAxis['data'] = xAxisList;
          this.option.series.find((ele) => ele.key === 'min').data = minList;
          this.option.series.find((ele) => ele.key === 'median').data = medianList; 
          this.option.series.find((ele) => ele.key === 'max').data = maxList;

          var myChart = this.echarts.init(document.getElementById("main5"));
          setTimeout(() => {
            myChart.setOption(this.option);
          }, 0);
        }
      })
      .catch(err => {})
      .finally(() => {
        this.loading = false;
      })
    }
  },
  watch: {
    active: function(value){
      if (value) {
        this.getData();
      }
    }
  }
};
</script>
