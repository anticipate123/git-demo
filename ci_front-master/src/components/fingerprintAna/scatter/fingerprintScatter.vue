<template>
  <div class="template-container">
    <div
      style="width: 100%; height: calc(100vh - 212px);"
      :id="`chart${type}`"
    ></div>
    <Spin fix v-if="loading"></Spin>
  </div>
</template>

<script>
export default {
  props: ["selectedIndex", "type"],
  data() {
    return {
      loading: false,

      myChart: "",
      CLUSTER_COUNT: "",
      option: {
        legend: {
          rigth: 10,
          data: []
        },
        xAxis: {
          min: value => -value.max,
          max: value => value.max
        },
        yAxis: {
          min: value => -value.max,
          max: value => value.max
        },
        series: []
      }
    };
  },
  watch: {
    selectedIndex: function(newData) {
      this.option.series = [];
      this.option.legend.data = [];
      this.send();
    },
    immediate: true,
    deep: true
  },
  methods: {
    getArray(str) {
      // 去掉所有的中括号
      const arr = [];
      str.split("").forEach(c => {
        if (c !== "[" && c !== "]" && c !== "," && c !== " ") arr.push(c);
      });
      return arr;
    },
    send() {
      this.loading = true;
      this.axios
        .post(
          "api/fingerPrintScatterController/getDataByLabel?label=" +
            this.selectedIndex
        )
        .then(res => {
          //console.log("测试" + this.option.series);
          let data = res.data.data;
          this.CLUSTER_COUNT = data.categoryCount;
          for (var i = 0; i < this.CLUSTER_COUNT; i++) {
            var k = i + 1;
            var single = "设备" + k;
            this.option.series[i] = {
              symbolSize: 20,
              data: [],
              type: "scatter",
              name: single,
              label: {
                emphasis: {
                  show: true,
                  formatter: function(param) {
                    return param.data;
                  },
                  position: "top"
                }
              }
            };
            this.option.legend.data.push(single);
          }
          var category = this.getArray(data.category);
          for (var j = 0; j < data.coordinateArray.length; j++) {
            this.option.series[category[j]].data.push(data.coordinateArray[j]);
          }

          const myChart = this.echarts.init(
            document.getElementById(`chart${this.type}`)
          );

          setTimeout(() => {
            myChart.setOption(this.option, true);
          }, 0);
        })
        .catch(error => {
          this.$Message.error("Error!");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {}
};
</script>
