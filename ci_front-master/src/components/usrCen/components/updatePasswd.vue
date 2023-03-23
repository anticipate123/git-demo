<template>
    <div class="profile">
        <!-- 修改密码 -->
        <div class="editPassword">
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100">
                <FormItem label="旧密码">
                    <Input type="password" v-model="editPasswordForm.oldpasswd" />
                </FormItem>
                <FormItem label="新密码">
                    <Input type="password" v-model="editPasswordForm.newpasswd" />
                </FormItem>
                <FormItem label="确认新密码">
                    <Input type="password" v-model="editPasswordForm.newpasswdDup" />
                </FormItem>
                <p class="text-right">
                    <span class="text-italic"><span class="text-danger">*</span> 请输入至少6位字符的密码（数字、字母等）</span>
                    <a href="javascript:;" class="margin-left-small" @click="forget">忘记密码</a>
                </p>
            </Form>
            <div class="updateBtn">
                <Button @click="undatePw" type="primary">提交</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        username: {
            type: String
        }
    },
    data () {
        return {
            editPasswordForm: {                 // 修改密码表单数据
                oldpasswd: '',
                newpasswd: '',
                newpasswdDup: ''
            },
        }
    },
    methods: {
        /**
         *上传新密码
        */
        undatePw () {
            this.axios.post('/api/user/chpwd', {
                'username': this.username,
                'oldpasswd': this.$md5(this.editPasswordForm.oldpasswd),
                'newpasswd': this.$md5(this.editPasswordForm.newpasswd),
                'newpasswdDup': this.$md5(this.editPasswordForm.newpasswdDup)
            }).then((res) => {
                if (res.data.code === 200) {
                    this.$Message.success('修改成功，请重新登录！')
                    setTimeout(() => {
                        this.$store.commit('delToken')
                        this.$router.push('/login')
                    }, 2000);
                } else {
                    this.$Message.error(res.data.msg);
                    this.editPasswordForm = {}
                }
            }).catch((error) => {
                this.editPasswordForm = {}
                this.$Message.error('修改失败，请重试！')
            })
        },
        /**
         *忘记密码
         */
        forget () {
            this.$router.push('/login')
            this.$store.commit('delToken')
        }
    }
}
</script>

<style lang="stylus" scoped>
.profile
    padding 15px
    display flex
    justify-content center
    align-items center
.editPassword 
    margin-left 20px
    width 40%
    min-height 500px
    padding 15px
.subhead
    display: flex;
    padding-bottom: 8px;
    margin-bottom: 16px;
    border-bottom: 1px solid #e1e4e8;
    flex-flow: row wrap;
    h2
        font-size: 24px;
        font-weight: 400;
        flex: 1 1 auto;
.updateBtn
    margin-top 20px
    display flex
    justify-content center
</style>