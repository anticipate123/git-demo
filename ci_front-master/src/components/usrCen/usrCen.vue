<template>
	<Card>
		<Tabs :value="currentTab">
		  <TabPane label="用户管理" name="userManage">
			  <usr-mng></usr-mng>
		  </TabPane>
		  <TabPane label="个人信息" name="userInfo">
			 <update-info></update-info>
		  </TabPane>
		  <TabPane label="修改密码" name="password">
			<update-passwd></update-passwd>
		  </TabPane>
		</Tabs>
	  </Card>
</template>

<script>
    import usrMng from './components/usrMng'
    import updateInfo from './components/updateInfo'
    import updatePasswd from './components/updatePasswd'
    export default {
        components: {
            usrMng,
            updateInfo,
            updatePasswd
        },
        data() {
            return {
                currentTab: 'userInfo',

                tableData1: this.mockTableData1(),
                tableColumns1: [{
                    title: 'ID',
                    key: 'id'
                }, {
                    title: '卫星名称',
                    key: 'staName',
                }, {
                    title: '载波信号ID',
                    key: 'cwid',
                    "sortable": true
                }, {
                    title: '载波信号片段出现顺序',
                    key: 'cwKey',
                    "sortable": true
                }, {
                    title: '起始频点',
                    key: 'startFreq',
                    "sortable": true
                }, {
                    title: '截止频点',
                    key: 'stopFreq'
                }, {
                    title: '信号片段创建时间',
                    key: 'createTime',
                    "sortable": true
                }, {
                    title: '调制速率',
                    key: 'demRate',
                    "sortable": true
                }, {
                    title: '频偏',
                    key: 'freqOffset',
                    "sortable": true
                }, {
                    title: '调制方式',
                    key: 'demType',
                }, {
                    title: '编码方式',
                    key: 'encodeType',
                }, {
                    title: '帧格式',
                    key: 'frameForm',
                }, {
                    title: '加扰方式',
                    key: 'scrambling'
                }, {
                    title: '交织方式',
                    key: 'interveave'
                }]
            }
        },
        methods: {
            mockTableData1() {
                let data = [];
                data.push({
                    id: '1',
                    staName: 18,
                    cwid: '10000',
                    cwKey: '233333',
                    startFreq: 666,
                    stopFreq: 888,
                    createTime: 0,
                    demRate: 0,
                    freqOffset: 0,
                    demType: 0,
                    encodeType: 0,
                    frameForm: 0,
                    scrambling: 0,
                    interveave: 0
                }, {
                    id: '2',
                    staName: 18,
                    cwid: '10000',
                    cwKey: '233333',
                    startFreq: 666,
                    stopFreq: 888,
                    createTime: 0,
                    demRate: 0,
                    freqOffset: 0,
                    demType: 0,
                    encodeType: 0,
                    frameForm: 0,
                    scrambling: 0,
                    interveave: 0
                }, {
                    id: '3',
                    staName: 18,
                    cwid: '10000',
                    cwKey: '233333',
                    startFreq: 666,
                    stopFreq: 888,
                    createTime: 0,
                    demRate: 0,
                    freqOffset: 0,
                    demType: 0,
                    encodeType: 0,
                    frameForm: 0,
                    scrambling: 0,
                    interveave: 0
                }, {
                    id: '4',
                    staName: 18,
                    cwid: '10000',
                    cwKey: '233333',
                    startFreq: 666,
                    stopFreq: 888,
                    createTime: 0,
                    demRate: 0,
                    freqOffset: 0,
                    demType: 0,
                    encodeType: 0,
                    frameForm: 0,
                    scrambling: 0,
                    interveave: 0
                }, )
                return data;
            }
        },
        watch: {
            $route: {
                immediate: true,
                handler() {
                    if(this.$route.query) {
                        this.currentTab = this.$route.query.tab;
                    }
                }
            }
        }
    }
</script>

<style>

</style>