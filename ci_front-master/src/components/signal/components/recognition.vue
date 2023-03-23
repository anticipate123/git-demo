<template>
  <div>
    <select-target-net
      :isLabelShow="true"
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
      total: 30, //数据总数

      content: [],
      tableData: [],
      tableColumns: [
        {
          title: "引导中心频率(MHz)",
          key: "freq_set",
          align: "center",
          minWidth: 130,
          fixed: "left"
        },
        {
          title: "引导带宽(MHz)",
          key: "bw_set",
          align: "center",
          minWidth: 100
        },
        {
          title: "调制方式",
          key: "modulation_type",
          align: "center",
          minWidth: 100
        },
        {
          title: "中心频率(MHz)",
          key: "center_freq",
          align: "center",
          minWidth: 100
        },
        {
          title: "3dB带宽(MHz)",
          key: "bw_threedb",
          align: "center",
          minWidth: 100
        },
        {
          title: "幅度均值",
          key: "amp_mean",
          align: "center",
          minWidth: 100
        },
        {
          title: "幅度方差",
          key: "amp_variance",
          align: "center",
          minWidth: 100
        },
        {
          title: "三阶中心矩",
          key: "amp_third_center",
          align: "center",
          minWidth: 130
        },
        {
          title: "四阶中心矩",
          key: "amp_fourth_center",
          align: "center",
          minWidth: 130
        },
        {
          title: "幅度对称度",
          key: "amp_symmetry",
          align: "center",
          minWidth: 130
        },
        {
          title: "二阶矩",
          key: "second_moment",
          align: "center",
          minWidth: 100
        },
        {
          title: "四阶矩",
          key: "fourth_moment",
          align: "center",
          minWidth: 100
        },
        {
          title: "盒维数因子",
          key: "box_factor",
          sortable: true,
          align: "center",
          minWidth: 130
        },
        {
          title: "信息维数",
          key: "info_dimension",
          align: "center",
          minWidth: 100
        },
        {
          title: "功率谱均值",
          key: "power_mean",
          align: "center",
          minWidth: 120
        },
        {
          title: "功率谱方差",
          key: "power_variance",
          align: "center",
          minWidth: 80
        },
        {
          title: "功率谱三阶中心矩",
          key: "power_third_center",
          align: "center",
          minWidth: 100
        },
        {
          title: "功率谱四阶中心矩",
          key: "power_fourth_center",
          align: "center",
          minWidth: 100
        },
        {
          title: "幅度偏度",
          key: "amp_skewness",
          align: "center",
          minWidth: 100
        },
        {
          title: "幅度峰度",
          key: "amp_kurtosis",
          align: "center",
          minWidth: 100
        },
        {
          title: "高阶矩R",
          key: "r",
          align: "center",
          minWidth: 90
        },
        {
          title: "高阶矩J",
          key: "j",
          align: "center",
          minWidth: 90
        },
        {
          title: "盒维数",
          key: "box_dimension",
          align: "center",
          minWidth: 100
        },
        {
          title: "功率谱偏度",
          key: "power_skewness",
          align: "center",
          minWidth: 90
        },
        {
          title: "功率谱峰度",
          key: "power_kurtosis",
          align: "center",
          minWidth: 90
        },
        /*{
          title: "是否改变",
          key: "chaged",
          align: "center",
          minWidth: 100,
          render: (h, record) => {
            console.log(record)
            if (record.row.tdma.toLowerCase() === "true") {
              return h(
                "Tag",
                {
                  props: {
                    color: "#26a65b"
                  }
                },
                "是"
              );
            } else if (record.row.tdma.toLowerCase() === "false") {
              return h(
                "Tag",
                {
                  props: {
                    color: "default"
                  }
                },
                "否"
              );
            }
            return "";
          }
        },*/
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
        url: "/api/data/original/signal/recongnition",
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
          console.log("recong", data);
          this.total = data.totalSize; //数据总数，一共多少条
          for (let i = 0; i < this.content.length; i++) {
            this.tableData.push({
              id: this.content[i].id,
              freq_set: this.decimalPoint(this.content[i].freqSet / 1000000),
              bw_set: this.decimalPoint(this.content[i].bwSet / 1000000),
              modulation_type: this.content[i].modulationType,
              center_freq: this.decimalPoint(
                this.content[i].centerFreq / 1000000
              ),
              bw_threedb: this.decimalPoint(
                this.content[i].bwThreedb / 1000000
              ),
              amp_mean: this.decimalPoint(this.content[i].ampMean),
              amp_variance: this.decimalPoint(this.content[i].ampVariance),
              amp_third_center: this.decimalPoint(
                this.content[i].ampThirdCenter
              ),
              amp_fourth_center: this.decimalPoint(
                this.content[i].ampFourthCenter
              ),
              amp_symmetry: this.decimalPoint(this.content[i].ampSymmetry),
              second_moment: this.decimalPoint(this.content[i].secondMoment),
              fourth_moment: this.decimalPoint(this.content[i].fourthMoment),
              box_factor: this.decimalPoint(this.content[i].boxFactor),
              info_dimension: this.decimalPoint(this.content[i].infoDimension),
              power_mean: this.decimalPoint(this.content[i].powerMean),
              power_variance: this.decimalPoint(this.content[i].powerVariance),
              power_third_center: this.decimalPoint(
                this.content[i].powerThirdCenter
              ),
              power_fourth_center: this.decimalPoint(
                this.content[i].powerFourthCenter
              ),
              amp_skewness: this.decimalPoint(this.content[i].ampSkewness),
              amp_kurtosis: this.decimalPoint(this.content[i].ampKurtosis),
              r: this.decimalPoint(this.content[i].r),
              j: this.decimalPoint(this.content[i].j),
              box_dimension: this.decimalPoint(this.content[i].boxDimension),
              power_skewness: this.decimalPoint(this.content[i].powerSkewness),
              power_kurtosis: this.decimalPoint(this.content[i].powerKurtosis),
              chaged: this.content[i].chaged,
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
