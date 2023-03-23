<template>
  <div>
    <Tabs type="card" :animated="false">
      <TabPane  label="清洗后数据">
        <get-clean-data></get-clean-data>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import getCleanData from "../components/getCleanData";
export default {
  components: {
    getCleanData,
  },

  methods: {

  }
}
</script>

<style>

</style>
