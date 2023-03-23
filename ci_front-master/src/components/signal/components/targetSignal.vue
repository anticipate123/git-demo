<template>
  <div>
    <target-signal-select
      :signal="true"
      ref="child"
      @filter="filterClick1(arguments)"
      @reset="resetData1"
    ></target-signal-select>
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
import targetSignalSelect from "./targetSignalSelect";
export default {
  components: {
    targetSignalSelect
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
        pageSize: 10,
      },
      total: 50,
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
                    color: "default",
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
        },
        {
          title: "备注",
          align: "center",
          minWidth: 100,
          key: "remarks",
          render:(h,params)=>{
            let timer=null
            if(params.row.remarks===""){
            return h('Input',{
              props:{
                type:'text',
                placeholder:"请输入",
                size:'small',
                value:"",
              },
              on:{
                input:(value)=>{
                  if(timer){
                    clearTimeout(timer)
                  }
                  timer=setTimeout(()=>{
                    this.axios({
                    url: "/api/data/targetSignal/signal/nonrepetitionLabel/setRemarks/mongodb",
                    method: "post",
                    data:{ 
                      _id: params.row._id,
                      remarks:value,
                      label:params.row.label
                    }
                  })
                    .then(res => {
                      console.log("success");
                    })
                    .catch(error => {
                      this.$Message.error("Error!");
                    });
                    //清空定时器
                    timer= null
                  },1000)
                }
              }
            })
          }else{
            return h('Input',{
              props:{
                type:'text',
                placeholder:"请输入",
                size:'small',
                value:params.row.remarks,
              },
              attrs:{
               id:"remarks"+params.index
           },
           on:{
                input:(value)=>{
                  if(timer){
                    clearTimeout(timer)
                  }
                  timer=setTimeout(()=>{
                    this.axios({
                    url: "/api/data/targetSignal/signal/nonrepetitionLabel/setRemarks/mongodb",
                    method: "post",
                    data:{ 
                      _id: params.row._id,
                      remarks:value,
                      label:params.row.label
                    }
                  })
                    .then(res => {
                      console.log("success");
                    })
                    .catch(error => {
                      this.$Message.error("Error!");
                    });
                    //清空定时器
                    timer= null
                  },5000)
                }
              }
            })
          }
          }
        },
        {
          title: "设备数目",
          align: "center",
          minWidth: 100,
          key: "category_count"
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
    this.getCoaDetec1();
  },
  methods: {
    toDateTime(value) {
      let val = value.substring(0, 19);
      return val.replace("T", " ");
    },
    filterClick1(params) {
      this.selectParam.updatestartFreq = params[0];
      this.selectParam.updateendFreq = params[1];
      this.selectParam.altLabel = params[2];
      this.selectParam.altRegion = params[3];
      this.selectParam.updatestartTime = params[4];
      this.selectParam.updateendTime = params[5];
      this.tableData = [];
      this.getCoaDetec1();
    },
    resetData1() {
      //this.$refs.child.cleanConten()
      this.selectParam.updatestartFreq = "-1";
      this.selectParam.updateendFreq = "-1";
      this.selectParam.altLabel = "-1";
      this.selectParam.altRegion = "";
      this.selectParam.updatestartTime = "1990-01-01:01-01-01";
      this.selectParam.updateendTime = "1990-01-01:01-01-01";
      this.selectParam.index = 1;
      this.selectParam.pageSize = 10;
      this.tableData = [];
      this.getCoaDetec1();
    },
    getCoaDetec1() {
      this.axios({
        url: "/api/data/targetSignal/signal/nonrepetitionLabel/mongodb",
        method: "post",
        data: {
          //请求数据
          startFreq: this.selectParam.updatestartFreq,
          endFreq: this.selectParam.updateendFreq,
          startTime: this.selectParam.updatestartTime,
          endTime: this.selectParam.updateendTime,
          label: this.selectParam.altLabel,
          region: this.selectParam.altRegion,
          pagenum: this.selectParam.index,
          pagesize: this.selectParam.pageSize,
        }
      })
        .then(res => {
          let data = res.data.data;
          this.content = data.content;
          //存入表中数据
          this.total = data.totalSize; //数据总数，一共多少条
          for (let i = 0; i < this.content.length; i++) {
            this.tableData.push({
            _id:this.content[i]._id,
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
            category_count:this.content[i].category_count,
            remarks:this.content[i].remarks
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
      this.getCoaDetec1();
    },
    pSizeChange(s) {
      //切换每页条数
      this.selectParam.pageSize = s;
      if (this.selectParam.index == 1) {
        this.tableData = [];
        this.getCoaDetec1();
      }
    }
  }
};
</script>

<style></style>
