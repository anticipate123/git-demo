<template>
    <Drawer :closable="false" width="400" v-model="value">
        <p :style="pStyle">{{viewData.username}}</p>
        <p :style="pStyle">基本信息</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">姓名: {{viewData.tname}}</i-col>
            </Row>
            <Row>
                <i-col span="12">账号名: {{viewData.username}}</i-col>
                <i-col span="12">权限: {{viewData.authority}}</i-col>
            </Row>
        </div>
        <Divider />
        <p :style="pStyle">用户身份</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">证件类型: {{viewData.certType | filter}}</i-col>
                <i-col span="12">证件号: {{viewData.certId | filter}}</i-col>
            </Row>
            <Row>
                <i-col span="12">所在地: {{viewData.location | filter}}</i-col>
            </Row>
            <Row>
                <i-col span="12">单位/公司: {{viewData.group | filter}}</i-col>
            </Row>
            <Row>
                <i-col span="12">职称: {{viewData.position | filter}}</i-col>
            </Row>
        </div>
        <Divider />
        <p :style="pStyle">联系方式</p>
        <div class="demo-drawer-profile">
            <Row>
                <i-col span="12">电话: {{viewData.tel | filter}}</i-col>
                <i-col span="12">电子邮箱: {{viewData.email}}</i-col>
            </Row>
        </div>
    </Drawer>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean
        },
        viewData: {
            type: Object
        }
    },
    data () {
        return {
            value: false,
            pStyle: {
                fontSize: '16px',
                color: 'rgba(0,0,0,0.85)',
                lineHeight: '24px',
                display: 'block',
                marginBottom: '16px'
            }
        }
    },
    watch: {
        show (val) {
            this.value = val
        },
        value (val) {
            if (val == false) this.$emit('mask-close', false)
        }
    },
    filters: {
        filter (val) {
            if (val) return val
            else return '无'
        }
    }
}
</script>

<style lang="stylus" scoped>
.demo-drawer-profile
    font-size: 14px
.demo-drawer-profile .ivu-col
    margin-bottom: 12px

</style>