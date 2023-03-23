<template>
  <Card>
    <div class="template-headline">
      信号分布
    </div>
    <Tabs :animated="false">
      <TabPane  label="中心频率分布（MHz）">
        <frequency-chart></frequency-chart>
      </TabPane>
      <TabPane  label="带宽分布（MHz）">
        <bw-chart></bw-chart>
      </TabPane>
      <TabPane  label="载噪比分布（dB）">
        <power-chart></power-chart>
      </TabPane>
      <TabPane  label="占空比分布（%）">
        <duty-chart></duty-chart>
      </TabPane>
    </Tabs>
  </Card>
</template>

<script>
import frequencyChart from "./components/frequencyChart";
import bwChart from "./components/bwChart";
import powerChart from "./components/powerChart";
import dutyChart from "./components/dutyChart";
export default {
  name: "freqAnalysis",
  components:{
    frequencyChart,
    bwChart,
    powerChart,
    dutyChart
  },
}
</script>

<style scoped>

</style>
