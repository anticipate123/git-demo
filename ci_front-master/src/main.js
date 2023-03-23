// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuex from "vuex";
import router from "./router";
import * as echarts from "echarts";
import ViewUI from "view-design";
import "../my-theme/index.less";
import Bus from "./assets/js/bus";
import axios from "./assets/js/axios";
import store from "./assets/js/store";
import "./assets/css/main.css";
import "./assets/css/fonts/iconfont.css";
import { Spin } from "view-design";
import { NavBar } from "vant";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// MD5加密
import md5 from "js-md5";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$md5 = md5;

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.echarts = echarts;
Vue.use(Vuex);
Vue.use(NProgress);
// Vue.use(echarts)
Vue.use(ViewUI);
// 初始化全局的事件总线
Vue.use(Bus);
Vue.use(NavBar);
Vue.use(ElementUI);
// Vue.prototype.$Spin = Spin;
// Vue.prototype.$Spin.config({
//   height:8,
//   width:8
// })
// 进度条配置
Vue.prototype.$Loading.config({
  color: "#2d8cf0",
  failedColor: "#CC0033",
  height: 8
  // percent: 25
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
