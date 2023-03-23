<template>
  <Card>
    <div>
      <div class="clearfix">
        <div class="float-left margin-right-small margin-bottom-small">
          <label class="margin-right-smaller">
              时间范围 : 
          </label>
          <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="请选择时间范围" style="width: 280px;" @on-ok="onRangeConfirm" v-model="rangeTime"></DatePicker>
        </div>
        <div class="float-left margin-right-small  margin-bottom-small">
            <label class="margin-right-smaller">
              分辨率 :
            </label>
            <Select
              v-model="resolution"
              style="width: 80px"
              @on-change="getRange"
            >
              <Option
                v-for="item in this.resolution_list"
                :value="item"
                :key="item"
              >{{ item }}</Option
              >
            </Select>
        </div>
        <div class="float-left template-form-item  margin-bottom-small">
          <div class="float-left margin-right-base">
            时间轴 :
          </div>
          <div class="float-left margin-right-base">
            <Slider
              v-model="timeStampIndex"
              :tip-format="tipFormat"
              @on-change="getRange"
              :marks="marks"
              style="width: 340px"
            ></Slider>
          </div>
          <div class="float-left">
            <Select
              v-model="timeStampIndex"
              @on-change="getRange"
              style="width: 170px;"
              class="margin-left-small"
            >
              <Option
                v-for="(item, index) in this.timestamps"
                :value="index"
                :key="item"
                >
                {{ item }}
              </Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
    <Row class="margin-top-large">
      <Col span="14">
        <div class="margin-right-small">
          <div>
            <div class="template-headline" style="margin-bottom: 0">
              频谱快照时序图
            </div>
            <div ref="line" id="snapshot_linechart"></div>
            <div class="margin-top-small clearfix template-form-item">
              <label class="float-left" style="display: inline-block; width: 70px;">
                数据区间 : 
              </label>
              <div class="float-left">
                  <Input v-model="xstart" style="width: 80px;" class="float-left"></Input>
                  <div class="float-left margin-left-base margin-right-base">
                    -
                  </div>
                  <Input v-model="xend" style="width: 80px;" class="float-left"></Input>
                  <Button type="primary" @click="XChange" class="float-left margin-left-base">
                    确定
                  </Button>
              </div>
            </div>
          </div>
          <div class="margin-top-base">
            <div class="margin-right-base">
              <div class="template-headline margin-bottom-base">频谱瀑布图</div>
              <water-fall-new 
                  :snapshots="snapshots" 
                  :xStart="xstart"
                  :xEnd="xend"
                  ref="waterfall"
              >
              </water-fall-new>
            </div>
          </div>
        </div>
      </Col>
      <Col span="10">
        <div class="margin-top-small">
          <snapshot-table
            :timeStampSelect="timestamps[timeStampIndex]"
          ></snapshot-table>
        </div>
      </Col>
    </Row>
  </Card>
</template>

<script>
import waterFall from "./charts/waterFall";

import waterFallNew from './charts/waterFallNew';
//import lineCharts from "./charts/lineCharts";
import snapshotTable from "./snapshotTable";
import moment from "moment";

export default {
  name: "snapshot",
  components: {
    //lineCharts,
    waterFall,
    snapshotTable,
    waterFallNew
  },
  data() {
    return {
      //-------折线图数据
      spin_show: false,
      startTimeStamp: null, //时间戳筛选
      endTimeStamp: null,
      rangeTime: null,
      timeStampIndex: 0,
      timestamps: [],
      range: [],
      snapshots:[],
      num: [],
      xaxis: [],
      xstart: 0, //datazoom区间
      xend: 100,
      resolution_list: ['2048','4096','8192'],    //分辨率列表
      resolution: 'ALL',     //分辨率
      option: {
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          }
        },
        grid: {
          left: "5%",
          right: "5%"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"]
        },
        dataZoom: [
          {
            type: "inside",
            startValue: 0,
            endValue: 100
          },
          {
            startValue: 0,
            endValue: 100
          }
        ],
        series: [
          {
            name: "freq",
            type: "line",
            smooth: true,
            areaStyle: {},
            data: []
          }
        ]
      },
      marks: {}
    };
  },
  computed: {
    chart_hight() {
      return document.getElementById("snapshot_linechart").clientWidth * 0.6; 
    },
  },
  methods: {
    XChange() {
      this.option.dataZoom[0].startValue = this.xstart;
      this.option.dataZoom[0].endValue = this.xend;
      this.option.dataZoom[1].startValue = this.xstart;
      this.option.dataZoom[1].endValue = this.xend;
      this.myChart.setOption(this.option);

      this.$refs.waterfall.onAreaChange();
    },
    tipFormat(val) {
      return this.timestamps[val];
    },
    getRange() {
      this.spin_show = true;
      //2022/7/14 直接给后端传选择的时间戳的index和整个时间戳列表
      this.axios
        .post("/api/snapshot/getSnapshotByTimeStamp/mongodb", 
          {
            timestamps: this.timestamps,
            selectIndex: this.timeStampIndex,
            startNum: null,
            endNum: null,
            rp: this.resolution,
          },
        )
        .then(res => {
          console.log(res.data.data);
          this.snapshots = res.data.data;
          this.option.series[0].data =this.snapshots[0].range;
          this.range = this.snapshots[0].range;
          this.xaxis = [];
          for (let i = 0; i <this.range.length; i++) {
            this.xaxis[i] = i;
          }
          this.option.xAxis.data = this.xaxis;
          this.option.dataZoom[0].startValue = this.xstart;
          this.option.dataZoom[0].endValue = this.xend;
          this.option.dataZoom[1].startValue = this.xstart;
          this.option.dataZoom[1].endValue = this.xend;
          this.myChart.setOption(this.option);
          this.spin_show = false;
        })
        .catch(error => {
          this.spin_show = false;
          this.$Message.error("Error!getRange error");
        });
    },
    onRangeConfirm() {
      if(this.rangeTime.length) {
        const startTime = moment(this.rangeTime[0]).format('YYYY-MM-DD HH:mm:ss');
        const endTime = moment(this.rangeTime[1]).format('YYYY-MM-DD HH:mm:ss');

        if (moment(startTime).add(30, 'minutes') < moment(endTime)) {
          alert("时间区间长度应该在0到30分钟以内！");
          return;
        }

        this.printChart(startTime, endTime);
      }
    },
    formatDateTime(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    selectTimeStamp() {
      if (this.startTimeStamp !== "" && this.endTimeStamp !== "") {
        let sub = this.endTimeStamp.getTime() - this.startTimeStamp.getTime();
        if (sub > 1800000 || sub < 0) {
          alert("时间戳区间长度应该在0到30分钟以内！");
          this.startTimeStamp = null;
          this.endTimeStamp = null;
        }
        this.printChart(
          this.formatDateTime(this.startTimeStamp),
          this.formatDateTime(this.endTimeStamp)
        );
      } else if (this.startTimeStamp === "" && this.endTimeStamp === "") {
        this.printChart();
      } else {
        alert("时间戳区间长度应该在0到30分钟以内！");
        this.startTimeStamp = null;
        this.endTimeStamp = null;
      }
    },
    initChart() {
      this.myChart = this.echarts.init(this.$refs.line, "default", {
        height: this.chart_hight
      });
      this.myChart.on("datazoom", this.datazoomChange);
    },
    printChart(startTime, endTime) {
      this.spin_show = true;
      this.axios({
        url: "/api/snapshot/getTimeStamp/mongodb",
        method: "get",
        params: {
          startTime: startTime,
          endTime: endTime
        }
      })
        .then(res => {
          const responseData = res.data.data.reverse();

          this.timestamps = responseData;

          this.marks = {
            0 : responseData[0]
          }; 
          this.marks[responseData.length / 2] = {
            style: {
              color: '#4153b6',
              fontWeight: 'bold'
            },
            label: responseData[responseData.length / 2 - 1]
          } 
          this.marks[responseData.length] = responseData[responseData.length - 1];

          this.getRange();
        })
        .catch(error => {
          this.spin_show = false;
          this.$Message.error("Error! lineCharts getTimeStamp error");
        });
    },
    datazoomChange(param) {
      this.xstart = this.myChart.getModel().option.dataZoom[0].startValue;
      this.xend = this.myChart.getModel().option.dataZoom[0].endValue;
    }
  },
  created() {},
  mounted() {
    this.initChart();
    this.printChart();
  }
};
</script>

<style></style>
