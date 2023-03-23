<template>
  <div class="anomalyDetGraphic">
    <div ref="graphic"></div>
  </div>
</template>

<script>
export default {
    name: "anomalyDetGraphic",
    props: ['graphicTitle'],//接父组件得值
    data(){
        return{
        }
    },
    methods : {
        getData(){
            this.axios({
                    url: '/static/anomalyDetGraphic/test.json',
                    method: 'get'                  
                }).then((res) => {
                    //console.log(res.data)
                    this.printChart(res.data)
                }).catch((error) => {
                    this.$Message.error('Error!');
                })

        },
        printChart(chartData){
            let option={
                    title: {
                        text: this.graphicTitle
                    },
                    xAxis: {
                        type:'time',
                        axisLabel: {
                            formatter: function (val) {
                                var date= new Date(val)
                                var texts=[date.getHours(),date.getMinutes()]
                                return texts.join(":")
                            }
                        }
                    },
                    yAxis: {
                        type:'value',
                        splitLine: {
                            show: false
                        }
                    },
                    visualMap: {
                        type:'piecewise',
                        max:1.5,
                        min:0.0
                    },
                    series: {
                        name: this.graphicTitle,
                        type: 'line',
                        data: chartData,
                        step: true,
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: 0.2
                            }, {
                                yAxis: 0.4
                            }, {
                                yAxis: 0.8
                            }, {
                                yAxis: 1.2
                            }]
                        }
                    }
                }
            let graphicMain = this.echarts.init(this.$refs.graphic, "default", {
                height: window.innerHeight * 0.7,
                width: window.innerWidth * 0.82
            });
            graphicMain.setOption(option);
        }
    },
    created() {
    },
    mounted() {
        this.getData();
        //获取数据
        //this.printChart();
    },
}
</script>

<style>
</style>