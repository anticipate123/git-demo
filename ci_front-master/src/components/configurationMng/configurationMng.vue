<template>
  <div>
    <Row>
      <Col span="10">
        <Card class="margin-left-small">
          <div class="template-headline">
            数据清洗配置项
          </div>
          <clean-data-configuration></clean-data-configuration>
        </Card>
      </Col>
      <Col span="14">
        <Card class="margin-left-small">
          <div class="template-headline">
            通道管理配置项
          </div>
          <channel-configuration></channel-configuration>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import cleanDataConfiguration from "./components/cleanDataConfiguration";
import channelConfiguration from "./components/channelConfiguration";
export default {
  name: "configurationMng",
  components: {
    cleanDataConfiguration,
    channelConfiguration,
  },
}
</script>

<style>

</style>
