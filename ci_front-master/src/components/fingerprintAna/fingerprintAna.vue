<template>
  <div>
    <Row> 
      <Col span="12">
        <Card class="margin-left-smaller">
          <div class="template-form-column">
            <label class="margin-right-smaller">通道一 :</label>
            <Select v-model="signal1" @on-change='indexSelect1' style="width:200px">
              <Option :value="item.label" v-for="item in cityList" v-bind:key="item.label">{{item.name}}</Option>
            </Select>
          </div>
          <div class="margin-top-small">
            <fingerprint-scatter-frist :selectedIndex="signal1" :type="1"></fingerprint-scatter-frist>
          </div>
        </Card>
      </Col>
      <Col span="12">
        <Card class="margin-left-smaller">
          <div class="template-form-column">
            <label class="margin-right-smaller">通道二 :</label>
            <Select v-model="signal2" @on-change='indexSelect2' style="width:200px" >
              <Option :value="item.label" v-for="item in cityList" v-bind:key="item.label">{{item.name}}</Option>
            </Select>
          </div>
          <div class="margin-top-small">
            <fingerprint-scatter-secend :selectedIndex="signal2" :type="2"></fingerprint-scatter-secend>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
  </template>

  <script>
    import FingerprintScatterFrist from "./scatter/fingerprintScatter";
    import FingerprintScatterSecend from "./scatter/fingerprintScatter";
    export default {
      components: {
        FingerprintScatterFrist,
        FingerprintScatterSecend
      },
      data() {
        return {
          signal2:"",
          signal1:"",
          totaldata:[],
          cityList: [],
        };
      },
      mounted(){
        this.loadData();
      },
      methods: {
        loadData(){
          this.axios
          .get("api/data/config/loadImportantSignal")
          .then(res => {
            this.totaldata = res.data.data;
            console.log(this.totaldata);
            //console.log(this.totaldata)
            for (var i = 0; i < this.totaldata.length ; i++) {
              var k = i + 1;
              let city={
                name: "signal" + k + " : " + this.totaldata[i].label,
                label: this.totaldata[i].label
              }
              this.cityList.push(city)
            }
            //console.log(this.cityList);
            this.signal1 = this.cityList[0].label;
            this.signal2 = this.cityList[1].label;
          })
          .catch(error => {
            this.$Message.error("Error!");
          });
        },
        indexSelect1(val){
          console.log("切换通道1" + val)
        },
        indexSelect2(val){
          console.log("切换通道2" + val)
        },
      }

    };
  </script>
</template>
