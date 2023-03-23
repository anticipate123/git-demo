<template>
  <div>
    <select-target-net
      :signal="false"
      @filter="filterClick(arguments)"
      @reset="resetData"
    ></select-target-net>
    <Card class="margin-top-small">
      <Table :data="tableData" :columns="tableColumns" stripe></Table>
      <!-- 分页 -->
      <div class="margin-top-small text-right">
        <Page
          :total="total"
          :page-size="this.$store.state.page.size"
          @on-change="pIndexChange"
          @on-page-size-change="pSizeChange"
          show-total
          show-sizer
          show-elevator
        ></Page>
      </div>
    </Card>
  </div>
</template>

<script>
import selectTargetNet from "./selectTargetNet";
export default {
  components: {
    selectTargetNet
  },
  created() {
    this.getCoaDetec();
  },
  data() {
    return {
      total: 10,
      content: [],
      tableData: [],
      tableColumns: [
        {
          title: "引导频率(MHz)",
          key: "freq_set",
          sortable: true,
          minWidth: 120,
          align: "center"
        },
        {
          title: "引导带宽(MHz)",
          key: "bw_set",
          align: "center",
          minWidth: 100
        },
        {
          title: "起始频点(MHz)",
          key: "start_freq",
          sortable: true,
          align: "center",
          minWidth: 120
        },
        {
          title: "截止频点(MHz)",
          key: "stop_freq",
          align: "center",
          minWidth: 120
        },
        {
          title: "合不合格",
          key: "pass_fail",
          align: "center",
          minWidth: 100
        },
        {
          title: "调制速率(Mbps)",
          key: "modulation_rate",
          align: "center",
          minWidth: 160
        },
        {
          title: "频偏(KHz)",
          key: "freq_offset",
          align: "center",
          minWidth: 170
        },
        {
          title: "调制方式",
          key: "modulation_type",
          align: "center",
          minWidth: 100
        },
        {
          title: "纠错方式",
          key: "fec_type",
          align: "center",
          minWidth: 100
        },
        {
          title: "帧格式",
          key: "frame_index",
          align: "center"
        },
        {
          title: "加扰方式",
          key: "scramble_type",
          align: "center",
          minWidth: 100
        },
        {
          title: "交织方式",
          key: "interleave",
          align: "center",
          minWidth: 100
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          minWidth: 110
        },
        {
          title: "地区",
          align: "center",
          minWidth: 120,
          key: "region"
        }
      ]
    };
  },
  methods: {
    toDateTime(value) {
      let val = value.substring(0, 19);
      return val.replace("T", " ");
    },
    filterClick(params) {
      this.$store.commit("updatestartFreq", params[0]);
      this.$store.commit("updateendFreq", params[1]);
      this.$store.commit("updatestartTime", params[3]);
      this.$store.commit("updateendTime", params[4]);
      this.tableData = [];
      this.getCoaDetec();
    },
    resetData() {
      this.$store.commit("updatestartFreq", "-1");
      this.$store.commit("updateendFreq", "-1");
      this.$store.commit("updatestartTime", "1990-01-01:01-01-01");
      this.$store.commit("updateendTime", "1990-01-01:01-01-01");
      this.tableData = [];
      this.getCoaDetec();
    },
    getCoaDetec() {
      this.axios({
        url: "/api/data/original/signal/fineDetection/mongodb",
        method: "post",
        data: {
          startFreq: this.$store.state.startFreq,
          endFreq: this.$store.state.endFreq,
          startTime: this.$store.state.startTime,
          endTime: this.$store.state.endTime,
          pagenum: this.$store.state.page.index,
          pagesize: this.$store.state.page.size
        }
      })
        .then(res => {
          let data = res.data.data;
          this.content = data.content;
          console.log("fine", data);
          this.total = data.totalSize; //数据总数，一共多少条
          for (let i = 0; i < this.content.length; i++) {
            this.tableData.push({
              id: this.content[i].id,
              freq_set: this.decimalPoint(this.content[i].freqSet / 1000000),
              bw_set: this.decimalPoint(this.content[i].bwSet / 1000000),
              start_freq: this.decimalPoint(
                this.content[i].startFreq / 1000000
              ),
              stop_freq: this.decimalPoint(this.content[i].stopFreq / 1000000),
              pass_fail: this.content[i].passFail,
              modulation_rate: this.decimalPoint(
                this.content[i].modulationRate / 1000000
              ),
              //   freq_offset: this.content[i].freqOffset,
              freq_offset: this.decimalPoint(this.content[i].freqOffset / 1000),
              modulation_type: this.content[i].modulationType,
              fec_type: this.content[i].fecType,
              frame_index: this.content[i].frameIndex,
              scramble_type: this.content[i].scrambleType,
              interleave: this.content[i].interleave,
              createTime: this.toDateTime(this.content[i].createTime),
              region: this.content[i].region
            });
          }
        })
        .catch(error => {
          this.$Message.error("Error!");
        });
    },
    //保留两位小数（不四舍五入）
    decimalPoint(p) {
      var totalnum = p.toString();
      var num = parseFloat(p).toFixed(0);
      var length = num.toString().length;
      if (totalnum.length == length) {
        totalnum += ".00";
      } else if (totalnum.length == length + 2) {
        totalnum += "0";
      }
      var numf = totalnum.substring(0, length + 3);
      return numf;
    },
    pIndexChange(i) {
      //页码改变
      this.tableData = [];
      this.$store.commit("updateIndex", i);
      this.getCoaDetec();
    },
    pSizeChange(s) {
      //切换每页条数
      this.$store.commit("updateSize", s);
      if (this.$store.state.page.index == 1) {
        this.tableData = [];
        this.getCoaDetec();
      }
    }
  }
};
</script>

<style></style>
