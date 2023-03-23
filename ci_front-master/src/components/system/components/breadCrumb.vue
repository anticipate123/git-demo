<template>
    <!-- 网站层级结构组件 -->
    <Breadcrumb class="custom-bread-crumb">
        <BreadcrumbItem v-if="$route.name !== 'home'">
            <Icon type="logo-buffer"></Icon> 系统
        </BreadcrumbItem>
        <BreadcrumbItem v-if="$route.name !== 'home'">
<!--            <span :class="$route.meta.icon" style="margin-right: 4px;">{{$route.meta.title}}</span>-->
            <Icon :type="$route.meta.icon" style="margin-right: 4px;" /> {{$route.meta.title}}
        </BreadcrumbItem>
 <!--      <BreadcrumbItem v-if="$route.name === 'taskScenario'">
            <Icon :type="$route.meta.icon" style="margin-right: 4px;" /> 切换系统
            <Dropdown @on-click="handleClick" trigger="click">
                <Icon :size="18" type="md-arrow-dropdown"></Icon>
                <DropdownMenu class="dropdown" slot="list">
                <DropdownItem name="identification">认证识别</DropdownItem>
                <DropdownItem name="blind">盲识别</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        </BreadcrumbItem>-->
    </Breadcrumb>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    props: {
        breadCrumbList: {
            type: String
        }
    }
}
</script>

<style lang="stylus" scoped>
.custom-bread-crumb
    display inline
    margin-left 30px
    height 64px
    line-height 64px
.ivu-breadcrumb {
  color: #fff;
}
.ivu-breadcrumb>span:last-child {
  font-weight: 700;
  color: #fff;
}
</style>
