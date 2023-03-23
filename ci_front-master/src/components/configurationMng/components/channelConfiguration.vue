<template>
  <div>
    <template v-if="!editable">
      <Form :label-width="100">
        <div class="row">
          <Form-item v-for="(item, index) in origin" :label="`重点信号${index + 1} :`" :key="index" class="col-6">
            <div class="template-form-column">
              {{ item }}
            </div>
          </Form-item>
        </div>
        <Form-item>
          <Button type="success" icon="ios-create-outline" @click="onEdit">修改</Button>
        </Form-item>
      </Form>
    </template>
    <template v-else>
      <Form :label-width="100">
        <Row>
        <Form-item v-for="(item, index) in changeable" :label="`重点信号${index + 1} :`" :key="index">
          <Col span="12">
          <Select style="width:200px" :value="item"  @on-change="(value) => { onSelectChange(value, index) }">
            <Option v-for="signal in options" :value="signal.label"  :key="signal.label" :disabled="changeable.indexOf(signal.label) > -1">{{ signal.label }}</Option>
          </Select>
          </Col>
        </Form-item>
        </Row>
        <Form-item>
          <Button type="primary" @click="onSubmit" class="margin-right-smaller">提交</Button>
          <Button @click="onCancel">取消</Button>
        </Form-item>
      </Form>
    </template>
  </div>
</template>

<script>
export default {
  name: "channelConfiguration",
  components: {

  },
  data() {
    return {
      editable: false,

      options: [],
      origin: [],
      changeable: [],
    }
  },
  methods: {
    getOptions(){
      this.axios({
        url: '/api/data/config/loadAllSignal/mongodb',
        method: 'get',
      }).then(res => {
        this.options = res.data.data;
      }).catch(error => {
        this.$Message.error("Error! getAllSignals error");
      });
    },

    getData() {
      this.axios({
        url: '/api/data/config/loadImportantSignal/mongodb',
        method: 'get',
      }).then(res => {
        const data = res.data.data;

        const origin = [];

        data.map(
          (ele, i) => {
            origin.push(ele.label);
          }
        );

        this.origin = origin;
      }).catch(error => {
        this.$Message.error("Error! getConfiguration error");
      })
    },

    onEdit() {
      /* 设置当前表单数据 */
      this.changeable = this.origin.slice();

      this.editable = true;
    },

    onCancel() {
      this.editable = false;
    },

    onSelectChange(value, index){
      const changeable = this.changeable.slice();
      changeable[index] = value;
      this.changeable = changeable;
    },

    onSubmit(){
      const requestData = [this.origin, this.changeable];
      this.axios({
        url: '/api/data/config/setImportantSignal/mongodb',
        method: 'post',
        data: requestData,
      }).then(res => {
        if (res.status === 200) {
          this.$Message.success('修改成功');
          this.getData();
        } else {
          this.$Message.success('修改失败');
        }
      }).catch(error => {
        this.$Message.error("Error! saveConfiguration error");
      })
    }
  },

  created() {
    this.getOptions();
    this.getData();
  }
}
</script>

<style>

</style>
