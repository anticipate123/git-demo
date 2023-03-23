<template>
  <div>
    <get-clean-data-select
      ref="child"
      :signal="true"
      @filter="filterClick(arguments)"
      @reset="resetData"
    ></get-clean-data-select>
    <Card class="margin-top-small">
      <Table
        ref="table"
        :data="tableData"
        :columns="tableColumns"
        stripe
      ></Table>
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
        <!-- pIndexChange(i) 页码改变 pSizeChange(s) 每页条数-->
      </div>
    </Card>
  </div>
</template>

<script>
import getCleanDataSelect from "./getCleanDataSelect";
export default {
  components: {
    getCleanDataSelect
  },
  data() {
    return {
      selectParam: {
        updatestartFreq: null,
        updateendFreq: null,
        altLabel: null,
        altRegion: null,
        updatestartTime: null,
        updateendTime: null,
        index: 1,
        pageSize: 10
      },
      total: 0,
      content: [],
      tableData: [],
      tableColumns: [
        {
          title: "信号序号",
          key: "label",
          align: "center",
          minWidth: 100
        },
        {
          title: "中心频率(MHz)",
          key: "freq",
          align: "center",
          minWidth: 180
        },
        {
          title: "带宽(MHz)",
          key: "bw",
          align: "center",
          minWidth: 180
        },
        {
          title: "TDMA",
          key: "tdma",
          align: "center",
          minWidth: 100,
          render: (h, record) => {
            if (record.row.tdma.toLowerCase() === "true") {
              return h(
                "Tag",
                {
                  props: {
                    color: "#26a65b"
                  }
                },
                "包含"
              );
            } else if (record.row.tdma.toLowerCase() === "false") {
              return h(
                "Tag",
                {
                  props: {
                    color: "default"
                  }
                },
                "不包含"
              );
            }
            return "";
          }
        },
        {
          title: "占空比(%)",
          key: "dutyCycle",
          align: "center",
          minWidth: 90
        },
        {
          title: "载噪比(dB)",
          key: "power",
          align: "center",
          minWidth: 160
        },
        {
          title: "受到干扰",
          key: "interfered",
          align: "center",
          minWidth: 100
        },
        {
          title: "创建时间",
          align: "center",
          minWidth: 100,
          key: "createTime"
        },
        {
          title: "地区",
          align: "center",
          minWidth: 100,
          key: "region"
        }
      ]
    };
  },
  created() {
    this.selectParam.updatestartFreq = "-1";
    this.selectParam.updateendFreq = "-1";
    this.selectParam.altLabel = "-1";
    this.selectParam.altRegion = "";
    this.selectParam.updatestartTime = "1990-01-01:01-01-01";
    this.selectParam.updateendTime = "1990-01-01:01-01-01";
    this.getCoaDetec();
  },

  methods: {
    toDateTime(value) {
      let val = value.substring(0, 19);
      return val.replace("T", " ");
    },
    filterClick(params) {
      console.log("111111", params);
      this.selectParam.updatestartFreq = params[0];
      this.selectParam.updateendFreq = params[1];
      this.selectParam.altLabel = params[2];
      this.selectParam.altRegion = params[3];
      this.selectParam.updatestartTime = params[4];
      this.selectParam.updateendTime = params[5];
      this.tableData = [];
      this.getCoaDetec();
    },
    resetData() {
      this.$refs.child.cleanConten();
      this.selectParam.updatestartFreq = "-1";
      this.selectParam.updateendFreq = "-1";
      this.selectParam.altLabel = "-1";
      this.selectParam.altRegion = "";
      this.selectParam.updatestartTime = "1990-01-01:01-01-01";
      this.selectParam.updateendTime = "1990-01-01:01-01-01";
      this.selectParam.index = 1;
      this.selectParam.pageSize = 10;
      this.tableData = [];
      this.getCoaDetec();
    },
    getCoaDetec() {
      this.axios({
        url: "/data/clean/signal/coarseDetectionWashed/mongodb",
        method: "post",
        data: {
          startFreq: this.selectParam.updatestartFreq,
          endFreq: this.selectParam.updateendFreq,
          startTime: this.selectParam.updatestartTime,
          endTime: this.selectParam.updateendTime,
          label: this.selectParam.altLabel,
          region: this.selectParam.altRegion,
          pagenum: this.selectParam.index,
          pagesize: this.selectParam.pageSize
        }
      })
        .then(res => {
          let data = res.data.data;
          this.content = data.content;
          console.log("coarseDetectionWashed", data);
          this.total = data.totalSize; //数据总数，一共多少条
          for (let i = 0; i < this.content.length; i++) {
            this.tableData.push({
              id: this.content[i].id,
              label: this.content[i].label,
              freq: this.decimalPoint(this.content[i].freq / 1000000),
              bw: this.decimalPoint(this.content[i].bw / 1000000),
              tdma: this.content[i].tdma,
              dutyCycle: this.decimalPoint(this.content[i].dutyCycle),
              power: this.decimalPoint(this.content[i].power),
              interfered: this.content[i].interfered,
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
      this.selectParam.index = i;
      this.getCoaDetec();
    },
    pSizeChange(s) {
      //切换每页条数
      this.selectParam.pageSize = s;
      if (this.selectParam.index == 1) {
        this.tableData = [];
        this.getCoaDetec();
      }
    }
  }
};
</script>

<style></style>
