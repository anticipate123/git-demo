<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider ref="sideMenu" hide-trigger collapsible :width="225" :collapsed-width="78" v-model="isCollapsed" class="layout-sider">
                <side-menu :isCollapsed="isCollapsed">
                    <div style="height: 64px; line-height: 64px; background-color: #303f9f" >
                        <img src="../../assets/images/uestc1.png" :class="isCollapsed ? 'margin-left-small' : 'margin-left-base'" :width="isCollapsed?44 : 56" alt='' style="vertical-align: middle"/>
                    </div>
                </side-menu>
            </Sider>
            <Layout>
                <Header class="layout-header-bar" :class="isCollapsed?'layout-header-collapsed':''">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 10px', color: '#fff'}" type="md-menu" size="24"></Icon>
                    <bread-crumb :bread-crumb-list="breadCrumbList"></bread-crumb>
                    <user-avatar class="navbar-right"></user-avatar>
                    <span class="user-name">{{username}}</span>
                </Header>
                <Content id="layout-content" class="layout-content" :class="isCollapsed?'layout-content-collapsed':''">
                    <div v-if="isCard === true" :bordered="false" :shadow="true" >
                        <!-- <keep-alive> -->
                            <router-view :username="username"></router-view>
                        <!-- </keep-alive> -->
                    </div>
                    <div v-else-if="isCard === false">
                        <router-view :username="username"></router-view>
                    </div>
                    <back-top :height="100" :bottom="50" :right="50" container=".layout-content"></back-top>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import sideMenu from './components/sideMenu.vue'
    import breadCrumb from './components/breadCrumb.vue'
    import userAvatar from './components/userAvatar.vue'
    import backTop from './components/backTop.vue'

    export default {
        data() {
            return {
                isCollapsed: false,
                isCard: Boolean,
                username: this.$store.state.username
            }
        },
        components: {
            sideMenu,
            breadCrumb,
            userAvatar,
            backTop
        },
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            breadCrumbList() {
                return this.$route.name
            }
        },
        watch: {
            '$route' (to, from) {
                // 监听路由变化
                let name = this.$route.name
                console.log(name)
                this.ifCard(name)
            }
        },
        mounted() {
            if (sessionStorage.getItem('username')) {
                let get_username = sessionStorage.getItem('username')
                this.username = get_username
                this.$store.state.username = get_username
            }
            // this.$store.commit('getToken')
            // console.log('1',this.$store.state.token)
            this.ifCard(this.breadCrumbList)
        },
        methods: {
            collapsedSider() {
                this.$refs.sideMenu.toggleCollapse();
            },
            ifCard(name) {
                if (name === '' || name === '') {
                    this.isCard = false
                } else {
                    this.isCard = true
                }
            }
        }
    }
</script>


<style lang="stylus" scoped>
    @import './system.styl'
</style>
