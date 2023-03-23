import Vue from "vue";
import Router from "vue-router";
import "../assets/css/fonts/iconfont.css"; //iconfont
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "", //地址为空时跳转logi页面 也可以写成 path: '/'
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "Login - 登录"
      },
      component: resolve => require(["@/components/login/login"], resolve)
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "注册"
      },
      component: resolve => require(["@/components/register/register"], resolve)
    },
    {
      path: "/system",
      name: "system",
      component: resolve => require(["@/components/system/system"], resolve),
      beforeEnter: (to, from, next) => {
        // 取消路由拦截
        // next();
        if (to.path === "/login") {
          next();
        } else {
          let token = sessionStorage.getItem("Authorization");
          if (!token || token === "null" || token === "") {
            next("/login");
          } else {
            next();
          }
        }
        
      },
      children: [
        {
          path: "taskScenario",
          name: "taskScenario",
          meta: {
            icon: "ios-pulse-outline",
            title: "任务场景"
          },
          component: resolve =>
            require(["@/components/taskScenario/taskScenario"], resolve)
        },
        {
          path: "",
          name: "signalMng",
          meta: {
            icon: "ios-paw-outline",
            title: "信号管理"
          }
        },
        /*{
          path: "anomalyDet",
          name: "anomalyDet",
          meta: {
            icon: "ios-speedometer-outline",
            title: "异常检测"
          },
          component: resolve =>
            require(["@/components/anomalyDet/anomalyDet"], resolve)
        },*/
        {
          path: "staAnalysis",
          name: "staAnalysis",
          meta: {
            icon: "ios-stats-outline",
            title: "统计分析"
          }
        },
        {
          path: "timeBasedAnalysis",
          name: "timeBasedAnalysis",
          meta: {
            icon: "ios-alarm",
            title: "时间维度分析"
          },
          component: resolve => require(["@/components/timeBasedAnalysis/timeBasedAnalysis"], resolve)
        },
        {
          path: "freqAnalysis",
          name: "freqAnalysis",
          meta: {
            icon: "ios-stats-outline",
            title: "频率分析"
          },
          component: resolve =>
            require([
              "@/components/frequencyBasedAnalysis/freqAnalysis"
            ], resolve)
        },
        {
          path: "usrCen",
          name: "usrCen",
          meta: {
            icon: "ios-contacts-outline",
            title: "用户中心"
          },
          component: resolve => require(["@/components/usrCen/usrCen"], resolve)
        },
        {
          path: "configurationMng",
          name: "configurationMng",
          meta: {
            icon: "ios-cog-outline",
            title: "配置管理"
          },
          component: resolve =>
            require(["@/components/configurationMng/configurationMng"], resolve)
        },
        {
          path: "fingerprintAna",
          name: "fingerprintAna",
          meta: {
            icon: "ios-analytics-outline",
            title: "指纹分析"
          },
          component: resolve =>
            require(["@/components/fingerprintAna/fingerprintAna"], resolve)
        },
        {
          path: "authenticationIde",
          name: "authenticationIde",
          meta: {
            icon: "ios-analytics-outline",
            title: "认证识别"
          },
          component: resolve =>
            require(["@/components/authenticationIde/authenticationIde"], resolve)
        },

        {
          path: "rawData",
          name: "rawData",
          meta: {
            icon: "ios-hammer-outline",
            title: "原始数据"
          },
          component: resolve =>
            require(["@/components/signal/signalMng/rawData"], resolve)
        },
        {
          path: "cleanData",
          name: "cleanData",
          meta: {
            icon: "ios-help-buoy-outline",
            title: "清洗数据"
          },
          component: resolve =>
            require(["@/components/signal/signalMng/cleanData"], resolve)
        },
        {
          path: "targetSignal",
          name: "targetSignal",
          meta: {
            icon: "ios-alarm-outline",
            title: "目标信号库"
          },
          component: resolve =>
            require(["@/components/signal/signalMng/targetSignal"], resolve)
        },
        {
          path: "snapshot",
          name: "snapshot",
          meta: {
            icon: "ios-alarm-outline",
            title: "频谱快照"
          },
          component: resolve =>
            require(["@/components/snapshot/snapshot"], resolve)
        }
      ]
    }
  ],
  mode: "hash", // 项目打包，需使用 hash 模式，否则使用 history 模式会切换不了路由
  linkActiveClass: "active" // 设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置
});
