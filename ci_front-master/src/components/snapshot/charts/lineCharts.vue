<template>
  <div style="position: relative; height: 70vh">
    <Row type="flex" justify="space-around">
      <Col span="10">
        开始时间：<Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px" v-model="startTimeStamp" ></Date-picker>
      </Col>
      <Col span="10">
        结束时间：<Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px" v-model="endTimeStamp"></Date-picker>
      </Col>
      <Col>
        <Button type="primary" @click="selectTimeStamp">筛选</Button>
      </Col>
    </Row>
    <div ref="line" id="snapshot_linechart"></div>
    <Slider v-model="timeStampIndex" :tip-format="tipFormat" @on-change="getData"></Slider>
    <spin fix v-show="spin_show"></spin>
  </div>
</template>

<script>
export default {
  name: "lineCharts",
  data(){
    return{
      spin_show: false,
      startTimeStamp: null,
      endTimeStamp:null,
      timeStampIndex: 0,
      timestamps : [],
      option : {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: '频谱快照时序图'
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        // dataZoom: [
        //   {
        //     type: 'inside',
        //     start: 0,
        //     end: 10
        //   },
        //   {
        //     start: 0,
        //     end: 10
        //   }
        // ],
        series: [
          {
            name: 'freq',
            type: 'line',
            smooth: true,
            areaStyle: {},
            data: [1,2,3,4,5,6,7,8,9]
          }
        ]
      },
    }
  },
  computed: {
    chart_hight(){
      return document.getElementById('snapshot_linechart').clientWidth * 0.6;
    },
    chart_width(){
      return document.getElementById('snapshot_linechart').clientWidth * 0.8;
    },
  },
  methods: {
    tipFormat(val){
      return this.timestamps[val];
    },
    getData(){
      this.spin_show = true;
      this.axios.get('/api/snapshot/getSnapshotByTimeStamp/mongodb',{
        params: {
          timestamp: this.timestamps[this.timeStampIndex],
          startNum:null,
          endNum:null,
        }
      }).then(res=>{
        console.log(res);
        this.option.series[0].data = res.data.data.range;
        this.myChart.setOption(this.option);
        this.spin_show = false;
      }).catch(error => {
        this.spin_show = false;
        this.$Message.error("Error!lineCharts getData error");
      })
    },
    formatDateTime(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h=h < 10 ? ('0' + h) : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      let second=date.getSeconds();
      second=second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },
    selectTimeStamp(){
      if(this.startTimeStamp !== '' && this.endTimeStamp !== ''){
        let sub = this.endTimeStamp.getTime() - this.startTimeStamp.getTime();
        if(sub > 1800000 || sub < 0){
          alert('时间戳区间长度应该在0到30分钟以内！');
          this.startTimeStamp = null;
          this.endTimeStamp = null;
        }
        this.printChart(this.formatDateTime(this.startTimeStamp),this.formatDateTime(this.endTimeStamp));
      }
      else if(this.startTimeStamp === '' && this.endTimeStamp === ''){
        this.printChart();
      }
      else {
        alert('时间戳区间长度应该在0到30分钟以内！');
        this.startTimeStamp = null;
        this.endTimeStamp = null;
      }
    },
    initChart(){
      this.myChart = this.echarts.init(this.$refs.line, "default", {
        height: this.chart_hight,
        width: this.chart_width,
      });
    },
    printChart(startTime,endTime){
      this.spin_show = true;
      this.axios({
        url: "/api/snapshot/getTimeStamp",
        method: "get",
        params: {
          startTime: startTime,
          endTime: endTime,
        }
      }).then(res => {
        console.log(res);
        this.timestamps = res.data.data;
        this.axios.get('/api/snapshot/getSnapshotByTimeStamp/mongodb',{
          params: {
            timestamp: this.timestamps[0],
            startNum:null,
            endNum:null,
          }
        }).then(res=>{
          console.log(res);
          this.option.series[0].data = res.data.data.range;
          this.myChart.setOption(this.option);
          this.spin_show = false;
        }).catch(error => {
          this.spin_show = false;
          this.$Message.error("Error!lineCharts getData error");
        })
      }).catch(error => {
        this.spin_show = false;
        this.$Message.error("Error! lineCharts getTimeStamp error");
      })
    },
  },
  mounted() {
    this.initChart();
    this.printChart();
  },
}
</script>

<style scoped>

</style>
