<template>
  <div class="template-container">
    <div
      ref="myChart"
      id="main4"
      style="width:100%; height:calc(100vh - 242px);"
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
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          name: "小时",
          nameGap: 20,
          nameTextStyle: {
            fontSize: 15
          },
          nameLocation: "center",
          type: "category",
          data: []
        },
        yAxis: {
          name: "信号数量",
          nameGap: 40,
          nameTextStyle: {
            fontSize: 15
          },
          nameRotate: 90,
          nameLocation: "center",
          type: "value"
        },
        series: [
          {
            data: [], //[96, 120, 104, 98, 97, 100, 110, 85, 117, 96, 113, 99],
            type: "line",
            smooth: true
          }
        ]
      }
    };
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios
        .post("api/statisticsAnalysis/signal/groupByHour/mongodb", this.form)
        .then(result => {
          console.log("信号逐小时趋势分析", result);
          if (result.status === 200) {
            let data = result.data.data;
            for (let i = 0; i < data.length; i++) {
              this.option.xAxis.data.push(data[i].hour_);
              this.option.series[0].data.push(data[i].number);
            }
            var myChart3 = this.echarts.init(document.getElementById("main4"));
            setTimeout(() => {
              myChart3.setOption(this.option);
            }, 100);
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
