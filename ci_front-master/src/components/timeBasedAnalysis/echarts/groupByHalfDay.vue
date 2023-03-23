<template>
  <div class="template-container">
    <div
      ref="myChart"
      id="main6"
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
          name: "日期",
          nameGap: 25,
          nameTextStyle: {
            fontSize: 15
          },
          nameLocation: "center",
          type: "category",
          data: []
        },
        yAxis: {
          name: "信号数量",
          nameGap: 45,
          nameTextStyle: {
            fontSize: 15
          },
          nameRotate: 90,
          nameLocation: "center",
          type: "value"
        },
        series: [
          {
            data: [],
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
      .post("api/statisticsAnalysis/signal/groupByWeekday/mongodb", this.form)
      .then(res => {
        console.log("信号半日趋势分析", res);
        if (res.status === 200) {
          console.log("------------");
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            this.option.xAxis.data.push(data[i].weekday_);
            this.option.series[0].data.push(data[i].number);
          }
          var myChart5 = this.echarts.init(document.getElementById("main6"));
          setTimeout(() => {
            myChart5.setOption(this.option);
            console.log("3", this.option);
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
