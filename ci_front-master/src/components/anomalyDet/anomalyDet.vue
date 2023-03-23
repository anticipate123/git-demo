<template>
  <Card>
    <!-- <Row>
        <Col span="12">
            <div><span>通道一：</span> 
                <Select v-model="targetSingnal_1" style="width:200px">
                    <Option v-for="item in channelList" :value="item.label" v-bind:key="item.id">{{ item.label }}</Option>
                </Select>
            </div>
        </Col>
        <Col span="12">
            <div><span>通道二：</span>
                <Select v-model="targetSingnal_2" style="width:200px">
                    <Option v-for="item in channelList" :value="item.label" v-bind:key="item.id">{{item.label}}</Option>
                </Select>
            </div>
        </Col>
    </Row>
    <Row>
        <Card shadow class="graphic1" style="margin-bottom: 8px">
            <graphic :graphicTitle="graphicTitle1"></graphic>
        </Card>
        <Card shadow class="graphic2"  style="margin-bottom: 8px">
            <graphic :graphicTitle="graphicTitle2"></graphic>
        </Card>
    </Row> -->

    <div class="clearfix">
        <div class="template-headline float-left margin-right-base template-form-item">
            异常检测重点信号
        </div>
        <div class="float-left">
            <div class="float-left">
              <Select style="width:150px">
                <Option key="1">通道一</Option>
                <Option key="2">通道二</Option>
              </Select>
            </div>
            <div class="float-left margin-left-smaller">
              <Select v-model="targetSingnal_1" style="width:200px">
                  <Option
                    v-for="item in cityList"
                    :value="item.name"
                    :key="item.name"
                    >{{ item.name }}</Option
                  >
                </Select>
            </div>
        </div>
    </div>
    <div class="margin-top-small">
      <graphic :graphicTitle="graphicTitle1"></graphic>
    </div>
  </Card>
</template>

<script>
import graphic from "./graphic/anomalyDetGraphic";
export default {
    name: "anomalyDet",
    components:{
        graphic
    },
  data() {
    return {
        graphicTitle1: '',
        graphicTitle2: '异常检测重点信号2',
        targetSingnal_1:'',
        targetSingnal_2:'',
        channelList: []
    }
  },
  created() {
      this.getChannelList();
  },
  mounted() {
  },
  methods: {
      getChannelList(){
          this.axios({
                    url: '/api/data/config/loadImportantSignal',
                    method: 'get'                  
                }).then((res) => {
                    //console.log(res.data.data)
                    this.channelList = res.data.data
                    this.targetSingnal_1 = this.channelList[0].label
                    this.targetSingnal_2 = this.channelList[0].label
                }).catch((error) => {
                    this.$Message.error('Error!');
                })

      }
   }

}
</script>

<style>

</style>