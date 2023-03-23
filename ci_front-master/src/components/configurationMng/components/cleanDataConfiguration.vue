<template>
    <div>
    	<template v-if="!editable">
            <Form :label-width="100">
                <Form-item label="占空比 :" >
                    <div class="template-form-column">
                        {{ dataSource.dutyCycle }}
                    </div>
                </Form-item>
                <Form-item label="降噪比 :">
                    <div class="template-form-column">
                        {{ dataSource.power }}
                    </div>
                </Form-item>
                <Form-item label="带宽 :">
                    <div class="template-form-column">
                        {{ dataSource.bw }}
                    </div>
                </Form-item>
                <Form-item>
                  <Button type="success" icon="ios-create-outline" @click="onEdit">修改</Button>
                </Form-item>
            </Form>
        </template>
        <template v-else>
    	  <Form :label-width="100">
    		<Form-item label="占空比 :">
    		  <Input type="text" v-model="option.dutyCycle" style="width:200px">
    		  </Input>
    		</Form-item>
    		<Form-item label="降噪比 :">
    		  <Input type="text" v-model="option.power" style="width:200px">
    		  </Input>
    		</Form-item>
    		<Form-item label="带宽 :">
    		  <Input type="text" v-model="option.bw" style="width:200px"></Input>
    		</Form-item>
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
        name: "configurationMng",
        data() {
            return {
                option: {
                    dutyCycle: '',
                    power: '',
                    bw: ''
                },
                dataSource: null,
                editable: false
            }
        },
        methods: {
            async getData() {
                let {
                    data
                } = await this.axios.get('api/data/config/getConfig');

                this.dataSource = data.data;
            },
            onEdit() {
                /* 设置当前表单数据 */
                this.option.dutyCycle = this.dataSource.dutyCycle;
                this.option.power = this.dataSource.power;
                this.option.bw = this.dataSource.bw;

                this.editable = true;
            },
            onCancel() {
                this.editable = false;
            },
            async onSubmit() {
                let res = await this.axios.post('api/data/config/updateConfig',
                    this.option
                )
                if (res.status === 200) {
                    this.$Message.success('修改成功');
                    this.getData();
                } 
                else {
                    this.$Message.success('修改失败');
                }
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style>

</style>