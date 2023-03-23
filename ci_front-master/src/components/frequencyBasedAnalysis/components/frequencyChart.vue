<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col span="12" >
        <div ref="freqChart"></div>
      </Col>
      <Col span="12">
        <Table :columns="freqcolumns" :data="freqdata"></Table>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "frequencyChart",
  data(){
    return{
      myChart: null,
      option : {
        title: {
          text: ''
        },
        legend: {

        },
        radar: {
          // shape: 'circle',
          axisLabel: {
            show: true,
            formatter:function(value,index){
              return value.toFixed(2)
            },
            color: '#333'
          },
          indicator: [
            { name: '(3050,3450]', max: 25, color: '#333' },
            { name: '(3450,3650]', max: 25, color: '#333' },
            { name: '(3650,3850]', max: 25, color: '#333' },
            { name: '(3850,4050]', max: 25, color: '#333' },
            { name: '(4050,4250]', max: 25, color: '#333' }
          ],
          splitArea: {
            areaStyle: {
              color: ['#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          }
        },
        series: [
          {
            name: 'freq',
            type: 'radar',
            color: '#ffe434',
            data: [
              {
                value: [18, 24, 16, 20, 23],
                areaStyle: {
                  color: 'rgba(255, 228, 52, 0.6)'
                }
              }
            ]
          }
        ]
      },
      freqcolumns: [
        {
          title: '区间',
          key: 'section'
        },
        {
          title: '值',
          key: 'value'
        },
        {
          title: '百分比',
          key: 'percentage'
        }
      ],
      freqdata: [
        {
          section: '(3050,3450]',
          value: 0,
          percentage: 0
        },
        {
          section: '(3450,3650]',
          value: 0,
          percentage: 0
        },
        {
          section: '(3650,3850]',
          value: 0,
          percentage: 0
        },
        {
          section: '(3850,4050]',
          value: 0,
          percentage: 0
        },
        {
          section: '(4050,4250]',
          value: 0,
          percentage: 0
        },
      ],
    }
  },
  methods : {
    getData(){
      this.$Spin.show();
      this.axios({
        url: "/api/statisticsAnalysis/signal/groupByFreq/mongodb",
        method: "post",
        data: {
          startTime: this.$store.state.startTime,
          endTime: this.$store.state.endTime,
        }
      }).then(res => {
        let sum = 0;
        let max = 0;
        for(let i=0;i<res.data.data.length;i++){
          this.option.series[0].data[0].value[i] = res.data.data[i].number;
          this.freqdata[i].value = res.data.data[i].number;
          sum += res.data.data[i].number;
          if(res.data.data[i].number > max){
            max = res.data.data[i].number;
          }
        }
        if( sum > 0){
          for(let i=0;i<res.data.data.length;i++){
            this.freqdata[i].percentage = (this.freqdata[i].value / sum * 100).toFixed(2)  + '%'
          }
        }
        if(max > this.option.radar.indicator[0].max){
          for(let i=0;i<this.option.radar.indicator.length;i++){
            this.option.radar.indicator[i].max = max;
          }
        }
        this.myChart.setOption(this.option);
      }).catch(error => {
        this.$Message.error("Error!frequencyChart getData error");
      }).finally(() => {
            this.$Spin.hide();
          })
    },
    printChart(){
      this.myChart = this.echarts.init(this.$refs.freqChart, "default", {
        height: window.innerHeight * 0.7,
        width: window.innerWidth * 0.4,
      });
      this.getData();
    }
  },
  created() {

  },
  mounted() {
    this.printChart();
  },
}
</script>

<style scoped>

</style>
