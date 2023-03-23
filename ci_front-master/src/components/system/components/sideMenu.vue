<template>
  <div>
    <!-- 侧导航栏组件，可折叠 -->
    <slot></slot>
    <Menu
      :active-name="$route.name"
      theme="dark"
      width="auto"
      :class="menuitemClasses"
      @on-select="menuClick"
      :open-names="openNames"
      :accordion="true"
    >
      <MenuItem name="taskScenario" to="/system/taskScenario">
        <Icon
          size="20"
          type="ios-pulse-outline"
          :class="isCollapsed ? 'menu-icon-collapsed' : ''"
        ></Icon>
        <span v-if="!isCollapsed">任务场景</span>
      </MenuItem>
      <Submenu name="signalMng" class="submenu">
        <template slot="title">
          <Icon type="ios-paw-outline" :class="isCollapsed ? 'menu-icon-collapsed' : ''"></Icon>

          <span v-if="!isCollapsed">信号管理</span>
        </template>
        <MenuItem name="rawData" to="/system/rawData">
          <Icon
            type="ios-hammer-outline"
            :class="isCollapsed ? 'menu-icon-collapsed' : ''"
          ></Icon>
          <span v-if="!isCollapsed">原始数据</span>
        </MenuItem>
        <MenuItem name="cleanData" to="/system/cleanData">
          <Icon
            type="ios-help-buoy-outline"
            :class="isCollapsed ? 'menu-icon-collapsed' : ''"
          ></Icon>
          <span v-if="!isCollapsed">清洗数据</span>
        </MenuItem>
          <MenuItem name="targetSignal" to="/system/targetSignal">
          <Icon
            type="ios-alarm-outline"
            :class="isCollapsed ? 'menu-icon-collapsed' : ''"
          ></Icon>
          <span v-if="!isCollapsed">目标信号库</span>
        </MenuItem>
      </Submenu>
		<Submenu name="staAnalysis" class="submenu">
        <template slot="title">
          <Icon type="ios-stats-outline" :class="isCollapsed ? 'menu-icon-collapsed' : ''"></Icon>

          <span v-if="!isCollapsed">统计分析</span>
        </template>
        <MenuItem name="timeBasedAnalysis" to="/system/timeBasedAnalysis">
          <Icon
            type="ios-alarm"
            :class="isCollapsed ? 'menu-icon-collapsed' : ''"
          ></Icon>
          <span v-if="!isCollapsed">时间维度分析</span>
        </MenuItem>
 		    <MenuItem name="freqAnalysis" to="/system/freqAnalysis">
          <Icon
            type="ios-stats-outline"
            :class="isCollapsed ? 'menu-icon-collapsed' : ''"
          ></Icon>
          <span v-if="!isCollapsed">频率维度分析</span>
        </MenuItem>
      </Submenu> 
       <!--<MenuItem name="anomalyDet" to="/system/anomalyDet">
        <Icon
          type="ios-speedometer-outline"
          :class="isCollapsed ? 'menu-icon-collapsed' : ''"
        ></Icon>
        <span v-if="!isCollapsed">异常检测</span>
      </MenuItem> -->
       <MenuItem name="fingerprintAna" to="/system/fingerprintAna">
        <Icon
          type="ios-analytics-outline"
          :class="isCollapsed ? 'menu-icon-collapsed' : ''"
        ></Icon>
        <span v-if="!isCollapsed">指纹分析</span>
      </MenuItem>   
      <MenuItem name="authenticationIde" to="/system/authenticationIde">
        <Icon
          type="ios-analytics-outline"
          :class="isCollapsed ? 'menu-icon-collapsed' : ''"
        ></Icon>
        <span v-if="!isCollapsed">认证识别</span>
      </MenuItem>  
      <MenuItem name="snapshot" to="/system/snapshot">
        <Icon
          type="ios-alarm-outline"
          :class="isCollapsed ? 'menu-icon-collapsed' : ''"
        ></Icon>
        <span v-if="!isCollapsed">频谱快照</span>
      </MenuItem> 
       <MenuItem name="configurationMng" to="/system/configurationMng">
        <Icon
          type="ios-cog-outline"
          :class="isCollapsed ? 'menu-icon-collapsed' : ''"
        ></Icon>
        <span v-if="!isCollapsed">配置管理</span>
      </MenuItem>
      <MenuItem name="usrCen" to="/system/usrCen">
        <Icon
          type="ios-contacts-outline"
          :class="isCollapsed ? 'menu-icon-collapsed' : ''"
        ></Icon>
        <span v-if="!isCollapsed">用户中心</span>
      </MenuItem>
    </Menu>
</div>
</template>

      <script>
        export default {
          data() {
            return {
              authority: sessionStorage.getItem("authority"),
              graphItems: {
                name: "知识图谱",
                path: "knowledgeGraph"
                   }
            }
        },
               props: ['isCollapsed'],
        computed: {
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
             openNames() {
              //默认带初始化参数的定义new Map([[key,value],[key,value]]);
              let map = new Map([
                ["signalFragMng", ["1"]],
                ["signalMng", ["1"]],
                ["usrMng", ["4"]],
                ["userInfo", ["4"]],
                ["updatePassword", ["4"]]
              ]);
              //console.log(map.get(this.$route.name));
              return map.get(this.$route.name);
            }
        },

          methods: {
            menuClick(name) {
              console.log("name", name);
              console.log(this.$route.meta);
              // this.$emit()
              // if(name == 'knowledgeGraph') {
              //   this.gotoPage(this.graphItems.path)
              //   console.log(this.$store.state.iframeSrc);
              // }
            }
            // onClickLeft() {
            //   this.$router.go(-1);
            // },
            // gotoPage(path){
            //   this.$router.push(path);
            //
            //   this.$store.state.iframeSrc = this.$route.meta.link
            //   this.$store.state.iframeTitle = this.$route.meta.title
            // },
            // beforeunloadFn() {
            //   // console.log('刷新或关闭：',e)
            //   console.log("path:",this.$route.path)
            //   if(this.$route.path == '/system/knowledgeGraph') {
            //     this.gotoPage(this.graphItems.path)
            //   }
            // }
          },
          created() {
            // window.addEventListener('beforeunload', this.beforeunloadFn())
          },
          mounted() {
            //window.addEventListener('beforeunload', this.beforeunloadFn())
          },
          destroyed() {
            // window.removeEventListener('beforeunload', this.beforeunloadFn())
          }
        };
      </script>

      <style lang="stylus" scoped>
        .menu-icon-collapsed {
            font-size: 20px
        }
      </style>
    </Menu>
  </div></template
>
