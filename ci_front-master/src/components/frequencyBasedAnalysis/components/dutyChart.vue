<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col span="12" >
        <div ref="dutyChart"></div>
      </Col>
      <Col span="12">
        <Table :columns="dutycolumns" :data="dutydata"></Table>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "dutyChart",
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
          splitNumber: 2,
          axisLabel: {
            show: true,
            formatter:function(value,index){
              return value.toFixed(2)
            },
            color: '#333'
          },
          indicator: [
            { name: '(10,30]', max: 100, color: '#333' },
            { name: '(30,50]', max: 100, color: '#333' },
            { name: '(50,70]', max: 100, color: '#333' },
            { name: '(70,90]', max: 100, color: '#333' },
            { name: '(90,100]', max: 100, color: '#333' }
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
            name: 'duty',
            type: 'radar',
            color: '#ffe434',
            data: [
              {
                value: [51, 25, 20, 20, 80],
                areaStyle: {
                  color: 'rgba(255, 228, 52, 0.6)'
                }
              }
            ]
          }
        ]
      },
      dutycolumns: [
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
      dutydata: [
        {
          section: '(10,30]',
          value: 0,
          percentage: 0
        },
        {
          section: '(30,50]',
          value: 0,
          percentage: 0
        },
        {
          section: '(50,70]',
          value: 0,
          percentage: 0
        },
        {
          section: '(70,90]',
          value: 0,
          percentage: 0
        },
        {
          section: '(90,100]',
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
        url: "/api/statisticsAnalysis/signal/groupByDuty/mongodb",
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
          this.dutydata[i].value = res.data.data[i].number;
          sum += res.data.data[i].number;
          if(res.data.data[i].number > max){
            max = res.data.data[i].number;
          }
        }
        if(sum > 0){
          for(let i=0;i<res.data.data.length;i++){
            this.dutydata[i].percentage = (this.dutydata[i].value / sum * 100).toFixed(2)  + '%';
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
      this.myChart = this.echarts.init(this.$refs.dutyChart, "default", {
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
