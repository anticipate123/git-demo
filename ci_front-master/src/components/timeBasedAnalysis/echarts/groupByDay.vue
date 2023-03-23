<template>
  <div class="template-container">
    <div
      ref="myChart"
      id="main3"
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          name: "日期"
        },
        yAxis: {
          name: "信号数量"
        },
        series: [
          {
            color: "#4153b6",
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
      .post("api/statisticsAnalysis/signal/groupByDay/mongodb", this.form)
      .then(result => {
        if (result.status === 200) {
          const data = result.data.data;

          const xAxisList = [];
          const dataList = [];

          data.forEach(
            (ele, i) => {
              xAxisList.push(ele.day_);
              dataList.push(ele.number);
            }
          );

          this.option.xAxis['data'] = xAxisList;
          this.option.series[0].data = dataList;

          var myChart3 = this.echarts.init(document.getElementById("main3"));
          setTimeout(() => {
            myChart3.setOption(this.option);
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


