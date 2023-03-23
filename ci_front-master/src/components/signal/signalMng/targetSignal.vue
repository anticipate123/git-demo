<template>
  <div>
    <Tabs type="card" :animated="false">
      <TabPane label="目标信号库">
        <target-signal></target-signal>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import targetSignal from "../components/targetSignal";
export default {
  components: {
    targetSignal
  },

  methods: {}
};
</script>

<style></style>
