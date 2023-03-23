<template>
  <div>
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
          page-size="15"
          @on-change="pIndexChange"
          @on-page-size-change="pSizeChange"
          show-total
          show-elevator
          size="small"
        ></Page>
        <!-- pIndexChange(i) 页码改变 pSizeChange(s) 每页条数-->
      </div>
      <Modal v-model="visible"
             title="信号详情"
             :footer-hide="true"
             width="800"
      >
        <template v-if="detail">
          <div class="row template-form-item">
            <div class="col-6">
              <label class="margin-right-smaller text-dark text-bold">
                信号序号 :
              </label>
              {{ detail.label }}
            </div><div class="col-6">
              <label class="margin-right-smaller text-dark text-bold">
                中心频率(MHz) :
              </label>
              {{ detail.freq }}
            </div>
          </div>
          <div class="row template-form-item margin-top-small">
            <div class="col-6">
              <label class="margin-right-smaller text-dark text-bold">
                带宽(MHz) :
              </label>
              {{ detail.bw }}
            </div><div class="col-6">
              <label class="margin-right-smaller text-dark text-bold">
                TDMA :
              </label>
              <template v-if="detail.tdma.toLowerCase() === 'true'">
                <Tag color="#26a65b">包含</Tag>
              </template>
              <template v-else>
                <Tag color="default">不包含</Tag>
              </template>
            </div>
          </div>
          <div class="row template-form-item margin-top-small">
            <div class="col-6">
              <label class="margin-right-smaller text-dark text-bold">
                占空比(%) :
              </label>
              {{ detail.dutyCycle }}
            </div><div class="col-6">
              <label class="margin-right-smaller text-dark text-bold">
                载噪比(dB) :
              </label>
              {{ detail.power }}
            </div>
          </div>
          <div class="row template-form-item margin-top-small">
            <div class="col-6">
              <label class="margin-right-smaller text-dark text-bold">
                受到干扰 :
              </label>
              <template v-if="detail.interfered.toLowerCase() === 'true'">
                <Tag color="#26a65b">是</Tag>
              </template>
              <template v-else>
                <Tag color="default">否</Tag>
              </template>
            </div>
            <div class="col-6">
              <label class="margin-right-smaller text-dark text-bold">
                创建时间 :
              </label>
              {{ detail.createTime }}
            </div>
          </div>
          <div class="row template-form-item margin-top-small">
            <div class="col-6">
              <label class="margin-right-smaller text-dark text-bold">
                地区 :
              </label>
              {{ detail.region }}
            </div>
          </div>
          <div class="margin-top-small text-right">
            <Button type="primary" @click="this.closeModal">
              关闭
            </Button>
          </div>
        </template>
      </Modal>
  </div>
</template>

<script>
export default {
  name: "snapshotTable",
  components: {},
  props: {
    timeStampSelect: String
  },
  watch: {
    timeStampSelect: {
      // 此处监听 timeStampSelect 变量，当期有变化时执行
      handler(item1, item2) {
        // item1为新值，item2为旧值
        this.getTableData(item1);
        this.time = item1;
      }
    }
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
        pageSize: 15
      },
      time: null,
      tableData: [],
      total: 0,
      content: [],
      visible: false,
      detail: null,
      tableColumns: [
        {
          title: "信号序号",
          key: "label",
          align: "center",
          minWidth: 60,
          render: (h, record) => {
            return <a href="javascript:;" onClick={ (e) => { e.preventDefault(); this.onViewDetail(record.row) } }>{ record.row.label }</a>
          }
        },
        {
          title: "中心频率(MHz)",
          key: "freq",
          align: "center",
          minWidth: 100
        },
        {
          title: "带宽(MHz)",
          key: "bw",
          align: "center",
          minWidth: 60
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
  },
  mounted() {},
  methods: {
    onViewDetail(record) {
      console.log(record);
      this.detail = record;
      this.openModal();
    },
    openModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },

    //时间函数
    toDateTime(value) {
      let val = value.substring(0, 19);
      return val.replace("T", " ");
    },
    pIndexChange(i) {
      //页码改变
      this.tableData = [];
      this.selectParam.index = i;
      this.getTableData(this.time);
    },
    pSizeChange(s) {
      //切换每页条数
      this.selectParam.pageSize = s;
      if (this.selectParam.index == 1) {
        this.tableData = [];
        this.getTableData(this.time);
      }
    },
    //保留两位小数（不四舍五入）
    decimalPoint(p) {
      var total = p.toString();
      var num = parseFloat(p).toFixed(0);
      var length = num.toString().length;
      if (total.length == length) {
        total += ".00";
      } else if (total.length == length + 2) {
        total += "0";
      }
      var numf = total.substring(0, length + 3);
      return numf;
    },
    getTableData(timeStampSelect) {
      this.axios({
        url: "/api/snapshot/coarseDetectionWashedByCreateTime",
        method: "get",
        params: {
          createTime: timeStampSelect,
          pagenum: this.selectParam.index,
          pagesize: this.selectParam.pageSize
        }
      })
        .then(res => {
          let data = res.data.data;
          this.content = data.content;
          this.total = data.totalSize; //数据总数，一共多少条
          //console.log(this.total);
          //console.log(this.content);
          //console.log(data);

          this.tableData = [];
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
              region: this.content[i].region,
              signalIndex: this.content[i].signalIndex
            });
          }
        })
        .catch(error => {
          this.spin_show = false;
          this.$Message.error("Error! lineCharts getTimeStamp error");
        });
    }
  }
};
</script>

<style>
.line-chart {
  width: 100%;
  margin-top: 10px;
}
</style>
