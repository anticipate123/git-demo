<template>
  <Card :dis-hover="true">
    <Form ref="form" :model="form" id="form">
      <div class="clearfix">
        <div class="float-left margin-right-small">
          <Form-item label="起始频率" prop="startFreq" :label-width="80">
            <Input
              type="text"
              v-model="form.startFreq"
              placeholder="请输入起始频率"
              style="width: 200px"
            ></Input>
          </Form-item>
        </div>
        <div class="float-left margin-right-small">
          <Form-item label="终止频率" prop="endFreq" :label-width="80">
            <Input
              type="text"
              v-model="form.endFreq"
              placeholder="请输入终止频率"
              style="width: 200px"
            ></Input>
          </Form-item>
        </div>
        <template v-if="signal">
          <div class="float-left margin-right-small">
            <Form-item label="信号序号" prop="label" :label-width="80">
              <Input
                type="text"
                v-model="form.label"
                placeholder="请输入信号序号"
                style="width: 200px"
              ></Input>
            </Form-item>
          </div>
          <div class="float-left margin-right-small">
            <Form-item label="地区来源" prop="region" :label-width="80">
              <Input
                type="text"
                v-model="form.region"
                placeholder="请输入地区"
                style="width: 200px"
              ></Input>
            </Form-item>
          </div>
        </template>
<div class="float-left margin-right-small">
    <Form-item label="起始和终止时间" prop="time" :label-width="120">
        <DatePicker type="datetimerange" v-model="form.time" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期和时间" style="width: 350px"></DatePicker>
    </Form-item>
</div>
<div class="float-left">
    <Form-item>
        <Button type="primary" @click="handleSubmit('form')">筛选</Button>
        <Button @click="handleReset" class="margin-left-smaller">重置</Button
            >
          </Form-item>
        </div>
      </div>
    </Form>
  </Card>
</template>
<script>
	import $ from 'jquery'
export default {
  data() {
    return {
      form: {
        startFreq: "",
        endFreq: "",
        time: "",
        label: "",
        region: ""
      }
    };
  },
  props: ["signal"],
  methods: {
	cleanConten(){
				$("#form input").val("")
			},
    handleSubmit(name) {
      this.$emit(
        "filter",
        this.form.startFreq,
        this.form.endFreq,
        this.form.label,
        this.form.region,
        this.parseTime(this.form.time[0]),
        this.parseTime(this.form.time[1])
      );
    },

    handleReset() {
      this.$emit("reset");
    },
    parseTime: function(obj) {
      try {
        const year = obj.getFullYear();
        const month =
          obj.getMonth() + 1 >= 10
            ? obj.getMonth() + 1
            : "0" + (obj.getMonth() + 1);
        const day = obj.getDate() >= 10 ? obj.getDate() : "0" + obj.getDate();
        const hour =
          obj.getHours() > 10 ? obj.getHours() : "0" + obj.getHours();
        const minu =
          obj.getMinutes() > 10 ? obj.getMinutes() : "0" + obj.getMinutes();
        const seconds =
          obj.getSeconds() > 10 ? obj.getSeconds() : "0" + obj.getSeconds();
        return (
          year +
          "-" +
          month +
          "-" +
          day +
          ":" +
          hour +
          "-" +
          minu +
          "-" +
          seconds
        );
      } catch (e) {
        return "";
      }
    }
  }
};
</script>
<style>
/deep/ .ivu-form-item-label {
  text-align: center;
}
</style>