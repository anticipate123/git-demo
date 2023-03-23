<template>
    <div class="template-container">
      <div
        ref="myChart"
        id="main2"
        style="width: 100%; height: calc(100vh - 242px);"
      ></div>
      <Spin fix v-if="loading"></Spin>
    </div>
</template> 

<script>
export default {
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
              name: "信号数量"
            },
            yAxis: {
              name: "月份"
            },
            series: [
              {
                type: "bar",
                barMaxWidth: 40,
                color: "#4153b6",
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
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.loading = true;
            this.axios
                .post("api/statisticsAnalysis/signal/groupByMonth/mongodb", this.form)
                .then(result => {
                    console.log("信号逐月趋势分析", result);
                    if (result.status === 200) {
                        let data = result.data.data;
                        
                        const xAxisList = [];
                        const dataList = [];

                        data.forEach(
                          (ele, i) => {
                            xAxisList.push(ele.yearMonth_.substr(0, 4) + '-' + ele.yearMonth_.substr(4, 2));
                            dataList.push(ele.number);
                          }
                        );

                        this.option.xAxis['data'] = xAxisList;
                        this.option.series[0].data = dataList;

                        var myChart = this.echarts.init(document.getElementById("main2"));
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
    }
}
</script>