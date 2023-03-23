import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 全局状态管理
const store = new Vuex.Store({
    state: {
        token: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '', // 全局存储token
        authority: sessionStorage.getItem('authority') ? sessionStorage.getItem('authority') : '', // 全局存储用户权限
        username: '', // 全局存储username
        passwd: '', // 存储加密password，注册后清空
        startFreq: "-1",
        endFreq: "-1",
        startTime: "1990-01-01:01-01-01",
        endTime: "1990-01-01:01-01-01",
        page: {
            index: 1, //当前页码
            size: 10, //每页条数
        },
        label: "-1",
        region: "",
    },
    getters: {

    },
    mutations: {
        updateIndex(state, index) { // 页码变更
            state.page.index = index
        },
        updateSize(state, size) { // 每页条数变更
            state.page.size = size
        },
        updatestartFreq(state, i) { //开始频率
            state.startFreq = i == "" ? "-1" : i

        },
        updateendFreq(state, i) { //结束频率
            state.endFreq = i == "" ? "-1" : i
        },
        updatestartTime(state, i) { //开始时间
            if (i === "") {
                state.region = ""
            } else {
                state.startTime = i
            }
        },
        updateendTime(state, i) { //结束时间
            state.endTime = i == "" ? "1990-01-01:01-01-01" : i
        },
        altRegion(state, i) { //地区
            state.region = i

        },
        altLabel(state, i) { //信号序号
            state.label = i == "" ? "-1" : i
        }
    },
    actions: {

    }
});

export default store