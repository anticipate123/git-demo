<template>
	<div>
		<!-- 添加和搜索用户 -->
		<div class="clearfix">
            <div class="float-left">
			 <Button type="primary" @click="addUser()">添加用户</Button>
			</div>
            <div class="float-right">
				<Input v-model="searchVal" placeholder="请输入查询账号" clearable style="width: 200px" @keyup.enter.native="searchClick" />
				<Button type="primary" icon="ios-search" @click="searchClick()"></Button>
			</div>
		</div>
	
		<!-- 用户列表 -->
		<div class="margin-top-base">
			<Table :columns="list" :data="data" :loading="loading">
				<template slot-scope="{ row }" slot="username">
					<span>{{ row.username }}</span>
				</template>
<template slot-scope="{ row }" slot="authority">
					<span>{{ row.authority }}</span>
				</template>
<template slot-scope="{ row }" slot="tel">
					<span>{{ row.tel | filter }}</span>
				</template>
<template slot-scope="{ row, index }" slot="viewinfo">
					<a href="javascript:;" @click="viewInfo(row, index)">详细信息</a>
				</template>
<template slot-scope="{ row, index }" slot="action">
					<div>
						<Icon @click="handleEdit(row, index)" type="md-create" style="cursor: pointer"></Icon>
						<Icon @click="remove(row, index)" type="md-trash" class="margin-left-smaller" style="cursor: pointer"></Icon>
					</div>
				</template>
            </Table>
        </div>

<!-- 添加用户弹窗组件 -->
<create-drawer :show="createUser" :edit-data="editData" @on-close="closeDrawer"></create-drawer>

<!-- 查看用户信息弹窗组件 -->
<view-drawer :show="viewUser" :view-data="viewData" @mask-close="closeDrawer"></view-drawer>

<!-- 分页 -->
<div class="margin-top-base text-right">
    <Page :total="dataCount" :current="currentPage" :page-size="pageSize" show-elevator @on-change="changePage" />
</div>
</div>
</template>

<script>
    import createDrawer from './createDrawer'
    import viewDrawer from './viewDrawer'

    export default {
        components: {
            createDrawer,
            viewDrawer
        },
        data() {
            return {
                loading: false, // 表格是否为加载模式
                dataCount: 1, // 总数据条数
                currentPage: 1, // 当前页数
                pageSize: 10, // 每页条数
                // index: 0,
                createUser: false,
                viewUser: false,
                editData: {},
                viewData: {},
                searchVal: '', // 输入搜索值
                list: [{
                    title: '账号',
                    slot: 'username',
                    width: 150
                }, {
                    title: '姓名',
                    key: 'tname',
                    width: 120
                }, {
                    title: '电子邮箱',
                    key: 'email'
                }, {
                    title: '手机号码',
                    slot: 'tel',
                    width: 170
                }, {
                    title: '权限',
                    slot: 'authority',
                    width: 130
                }, {
                    title: '查看',
                    slot: 'viewinfo',
                    align: 'center',
                    width: 130
                }, {
                    title: '管理',
                    slot: 'action',
                    align: 'center',
                    width: 150
                }],
                data: [],
                // editIndex: -1,  // 当前聚焦的输入框的行数
                // editauthority: ''  // 权限输入框
                token: this.$store.state.token
            }
        },

        created() {
            this.loading = true
            this.getUserList()
        },

        methods: {
            /**
             * 获取用户列表，分页
             */
            getUserList() {
                this.axios.post('/api/admin/findalluser', {
                    'page': String(this.currentPage)
                }).then((res) => {
                    console.log(res)
                    let data = res.data.data
                    this.currentPage = data.pageNum
                    this.dataCount = data.totalSize
                    this.data = data.content
                    this.data.forEach((item, index, arr) => {
                        item.authority = this.getAuthority(item.accountLevel)
                            // if (item.tel == '') item.tel = '无'
                    });
                    this.loading = false
                }).catch((error) => {
                    console.log(error)
                    setTimeout(() => { // 无数据或者请求超时
                        this.loading = false
                            // this.$router.go(0);
                    }, 10000);
                    this.$Message.error('用户列表加载失败！')
                })
            },
            /**
             * 根据accountLevel显示用户身份，1-管理员，0-普通用户
             */
            getAuthority(val) {
                if (val === 1111) return '管理员'
                else return '普通用户'
            },
            /**
             * 搜索查询信息
             */
            searchClick() {
                console.log(this.searchVal)
                this.axios.post('/api/admin/finduser', {
                    'username': this.searchVal,
                    'token': this.token
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.data = []
                        let data = res.data.data
                        let authority = this.getAuthority(data.accountLevel)
                        console.log(authority)
                        this.data.push({
                            id: data.id,
                            username: data.username,
                            passwd: data.passwd,
                            tname: data.tname,
                            certId: data.certId,
                            certType: data.certType,
                            tel: data.tel,
                            email: data.email,
                            location: data.location,
                            group: data.group,
                            position: data.position,
                            accountLevel: data.accountLevel,
                            authority: authority
                        })
                    } else {
                        this.$Message.error('未查询到该账号！请重新输入完整的账号。')
                    }
                    // this.data.forEach((item, index, arr) => {
                    //     item.authority = this.getAuthority(item.accountLevel)
                    // });
                }).catch((error) => {
                    this.data = []
                        // this.$Message.error('error')
                })
            },

            /**
             * 添加用户，点击显示createDrawer子组件
             */
            addUser() {
                this.createUser = true
                this.editData = {}
            },
            /**
             * 关闭弹窗，从子组件接收到的值false赋值给show
             */
            closeDrawer(val) {
                this.createUser = val
                this.viewUser = val
            },
            /**
             * 查看用户详细信息
             */
            viewInfo(row, index) {
                this.viewUser = true
                this.viewData = row
            },

            /**
             * 修改操作
             */
            handleEdit(row, index) {
                this.index = index
                this.createUser = true
                this.editData = row
                console.log('row', row)
            },
            // /**
            //  * 成功修改后，表格数据更新
            //  */
            // changeSuccess (newrow, index) {
            //     this.list[index] = row
            // },
            /**
             * 删除某个普通账号
             * @param {string} username 用户名
             * @param {string} token 用户标识
             */
            remove(row, index) {
                return new Promise(() => {
                    this.$Modal.confirm({
                        title: '确认删除',
                        content: '您确认要停止并删除该账号吗？',
                        onOk: () => {
                            if (row.accountLevel === 1111) {
                                this.$Message.info('不可删除管理员用户！')
                            } else {
                                this.axios.post('/api/admin/removeuser', {
                                    'username': row.username,
                                    'token': this.token
                                }).then((res) => {
                                    this.data.splice(index, 1)
                                    this.$Message.success('删除成功！')
                                }).catch((error) => {
                                    console.log(error)
                                })
                            }
                        }
                    });
                });
            },
            /**
             * 分页
             */
            changePage(index) {
                console.log('string', String(index))
                this.currentPage = index
                    // this.data = []
                this.getUserList()
            }
        },

        // 监听输入搜索数据
        watch: {
            searchVal(val) {
                if (val === '') this.getUserList('1')
            }
        },
        // 文本格式化，值为空时过滤成“无”
        filters: {
            filter(val) {
                if (val) return val
                else return '无'
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .page-bottom {
        float: right;
        margin: 20px 0
    }
</style>