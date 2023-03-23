<template>
  <Card>
    <div class="template-headline">
      信号趋势分析
    </div>
    <Tabs @on-click="onTabChange">
      <TabPane label="逐月分析">
        <div class="line-container" name="groupByMonth">
          <group-by-month></group-by-month>
        </div>
      </TabPane>
      <TabPane label="逐周分析" name="groupByWeek">
        <div class="line-container">
          <group-by-week :active="groupByWeek"></group-by-week>
        </div>
      </TabPane>
      <TabPane label="逐日分析" name="groupByDay">
        <div class="line-container">
          <group-by-day :active="groupByDay"></group-by-day>
        </div>
      </TabPane>
      <TabPane label="逐小时累计分析" name="groupByHour">
        <div class="line-container">
          <group-by-hour :active="groupByHour"></group-by-hour>
        </div>
      </TabPane>
      <TabPane label="半日分析" name="groupByHalfDay">
        <div class="line-container">
          <group-by-half-day :active="groupByHalfDay"></group-by-half-day>
        </div>
      </TabPane>
    </Tabs>
  </Card>
</template>

<script>
import groupByMonth from "./echarts/groupByMonth";
import groupByWeek from "./echarts/groupByWeek";
import groupByDay from "./echarts/groupByDay";
import groupByHour from "./echarts/groupByHour";
import groupByHalfDay from "./echarts/groupByHalfDay";

export default {
  name: "timeBasedAnalysis",
  components: {
    groupByMonth,
    groupByWeek,
    groupByDay,
    groupByHour,
    groupByHalfDay
  },
  data() {
    return {
      groupByMonth: true,
      groupByWeek: false,
      groupByDay: false,
      groupByHour: false,
      groupByHalfDay: false
    }
  },
  methods: {
    onTabChange: function(name) {
      this[name] = true; 
    }
  }
};
</script>
