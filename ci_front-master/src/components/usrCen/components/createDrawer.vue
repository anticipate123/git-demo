<template>
    <Drawer title="添加普通账号" v-model="value" width="500" :mask-closable="false" :styles="styles">
        <Form ref="formData" :model="formData" :rules="ruleInfo" :label-width="110">
            <FormItem label="用户名" prop="username">
                <Input v-model="formData.username" placeholder="请输入新添账号名" />
            </FormItem>
            <FormItem label="密码" prop="passwd" v-show="Object.keys(editData).length === 0">
                <Input v-model="formData.passwd" placeholder="请输入新添账号密码" type="password"/>
            </FormItem>
            <FormItem label="姓名" prop="tname">
                <Input v-model="formData.tname" placeholder="请输入真实姓名" />
            </FormItem>
            <FormItem label="电子邮箱" prop="email">
                <AutoComplete v-model="formData.email" @on-search="autoEmail" placeholder="请输入电子邮箱">
                    <Option v-for="item in mailSuffix" :value="item" :key="item">{{ item }}</Option>
                </AutoComplete>
            </FormItem>
            <FormItem label="手机号" prop="tel">
                <Input v-model="formData.tel" placeholder="请输入手机号" />
            </FormItem>
            <FormItem label="证件类型" prop="certType">
                <Select v-model="formData.certType" placeholder="请选择证件类型 (选填)">
                    <Option value="身份证">身份证</Option>
                    <Option value="护照">护照</Option>
                    <Option value="工作证">工作证</Option>
                    <Option value="军官证">军官证</Option>
                </Select>
            </FormItem>
            <FormItem label="证件号码" prop="certId">
                <Input v-model="formData.certId" placeholder="请输入证件号码 (选填)" />
            </FormItem>
            <FormItem label="所在地" prop="location">
                <Input v-model="formData.location" placeholder="请输入所在地 (选填)" />
            </FormItem>
            <FormItem label="单位/公司" prop="group">
                <Input v-model="formData.group" placeholder="请输入单位（公司）" />
            </FormItem>
            <FormItem label="职称" prop="position">
                <Input v-model="formData.position" placeholder="请输入职称 (选填)" />
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="onClose()">取消</Button>
            <Button type="primary" @click="submit('formData')">提交</Button>
        </div>
    </Drawer>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean
        },
        editData: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {
            value: false,
            mailSuffix: [],
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            formData: {
                username: '',
                passwd: '',
                tname: '',
                certType: '',
                certId: '',
                tel: '',
                email: '',
                location: '',
                group: '',
                position: '',
                accountlevel: 1110,
                token: ''
            },
            ruleInfo: {
                username: [
                    { required: true, message: '请填写新添账号名', trigger: 'blur' }
                ],
                passwd: [
                    { required: true, message: '密码不可为空', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur' }
                ],
                tname: [
                    { required: true, message: '请填写真实姓名', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请填写电子邮箱', trigger: 'blur' },
                ],
                tel: [
                    { required: false, message: '请填写手机号码', trigger: 'blur' },
                    { type: 'string', len: 11, message: '请输入11位手机号', trigger: 'blur' }
                ],
                certType: [
                    { required: false, message: '请选择证件类型', trigger: 'change' }
                ],
                certId: [
                    { required: false, message: '请填写证件号码', trigger: 'blur' }
                ],
                location: [
                    { required: false, message: '请填写所在地', trigger: 'blur' }
                ],
                group: [
                    { required: false, message: '请填写单位（公司）', trigger: 'blur' }
                ],
                position: [
                    { required: false, message: '请填写职称', trigger: 'blur' }
                ]
            },
            oldFormData: {}
        }
    },

    computed: {
        // 将输入密码MD5加密
        passwd () {
            return this.$md5(this.formData.passwd)
        },
        token () {
            return this.$store.state.token
        }
    },

    methods: {
        /**
         * 自动完成邮箱后缀
         */
        autoEmail (value) {
            this.mailSuffix = !value || value.indexOf('@') >= 0 ? [] : [
                value + '@qq.com',
                value + '@sina.com',
                value + '@163.com'
            ];
        },
        onClose () {
            this.$emit('on-close', false)
            this.formData = this.oldFormData
            // console.log(this.oldFormData)
        },
        submit (name) {
            if (this.oldFormData.passwd !== this.formData.passwd) {
                this.formData.passwd = this.passwd
            }
            this.formData.token = this.token
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (Object.keys(this.editData).length !== 0) { this.updateuser() }
                    else { this.adduser() }
                } else {
                    this.$Message.error('请填写所有信息!');
                }
            })
        },
        /**
         * 调用添加新账号接口
         */
        adduser () {
            // console.log('form',typeof(this.formData))
            this.axios.post('/api/admin/adduser', JSON.stringify(this.formData), {
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }).then((res) => {
                console.log(res)
                if (res.data.code === 200) {
                    this.$Message.success('新账号创建成功！')
                } else {
                    this.$Message.error(res.data.msg)
                }
                // 刷新页面 or 调用getUserList*******************
                setTimeout(() => {
                    this.$parent.getUserList()
                }, 1500);
                this.$emit('on-close', false)
            }).catch((error) => {
                console.log(error)
                this.$Message.error('新账号创建失败！')
            })
        },
        /**
         * 调用修改账号信息接口
         */
        updateuser () {
            let form = this.formData
            delete form.authority
            delete form._index
            delete form._rowKey
            this.axios({
                url: '/api/admin/updateuserinfo',
                method: 'post',
                data: {
                    id: this.formData.id,
                    username: this.formData.username,
                    tname: this.formData.tname,
                    certId: this.formData.certId,
                    certType: this.formData.certType,
                    tel: this.formData.tel,
                    email: this.formData.email,
                    location: this.formData.location,
                    group: this.formData.group,
                    position: this.formData.position,
                    accountLevel: this.formData.accountLevel,
                    passwd: this.formData.passwd
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
            }).then(result => {
                // res.data.data
                console.log('result', result)
                this.$parent.getUserList()
                // this.$parent.changeSuccess(result.data.data, this.index)
                this.$Message.success('修改成功！');
                this.$emit('on-close', false)
            }).catch(error => {
                console.log('error', error)
                this.$Message.error('修改失败！');
            })
        }
    },

    watch: {
        show (val) {
            this.value = val
        },
        editData (val) {
            this.formData = { ...val }
            this.oldFormData = JSON.parse(JSON.stringify(this.formData))
            console.log('edit', val)
        },
        value (val) {
            if (val == false) {
                this.$emit('on-close', false)
                this.formData = this.oldFormData
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.demo-drawer-footer
    width 100%
    position: absolute
    bottom 0
    left 0
    border-top 1px solid #e8e8e8
    padding 10px 16px
    text-align right
    background #fff

</style>
