<template>
<!--  <div>统计分析</div>-->
  <div>
    <Tabs type="card">
      <TabPane label="新增信号" class="tab">
        <Row :gutter="16">
          <Card shadow class="NewCreate" style="margin-bottom: 8px">
            <select-comp style="margin-left: 100px"></select-comp>
          </Card>
        </Row>
<!--        折线图组件区        -->
        <Row :gutter="16">
          <i-col>
            <Card shadow class="NewCreate" style="margin-bottom: 8px">
              <div>
                <sta-analysis-line-chart></sta-analysis-line-chart>
              </div>
            </Card>
          </i-col>
        </Row>
<!--        饼图组件区        -->
        <Row :gutter="16">
          <i-col>
            <Card shadow class="NewCreate">
              <div>
                <sta-analysis-pie-chart></sta-analysis-pie-chart>
              </div>
            </Card>
          </i-col>
        </Row>
      </TabPane>
      <TabPane label="消失信号">
        <Row :gutter="16">
          <Card shadow class="NewCreate" style="margin-bottom: 8px">
            <select-comp style="margin-left: 100px"></select-comp>
          </Card>
        </Row>
        <!--        折线图组件区        -->
        <Row :gutter="16">
          <i-col>
            <Card shadow class="NewCreate" style="margin-bottom: 8px">
              <div>
                <sta-analysis-line-chart></sta-analysis-line-chart>
              </div>
            </Card>
          </i-col>
        </Row>
        <!--        饼图组件区        -->
        <Row :gutter="16">
          <i-col>
            <Card shadow class="NewCreate" style="margin-bottom: 8px">
              <div>
                <sta-analysis-pie-chart></sta-analysis-pie-chart>
              </div>
            </Card>
          </i-col>
        </Row>
      </TabPane>
      <TabPane label="异常信号">
        <Row :gutter="16">
          <Card shadow class="NewCreate" style="margin-bottom: 8px">
            <select-comp style="margin-left: 100px"></select-comp>
          </Card>
        </Row>
        <!--        折线图组件区        -->
        <Row :gutter="16">
          <i-col>
            <Card shadow class="NewCreate" style="margin-bottom: 8px">
              <div>
                <sta-analysis-line-chart></sta-analysis-line-chart>
              </div>
            </Card>
          </i-col>
        </Row>
        <!--        饼图组件区        -->
        <Row :gutter="16">
          <i-col>
            <Card shadow class="NewCreate" style="margin-bottom: 8px">
              <div>
                <sta-analysis-pie-chart></sta-analysis-pie-chart>
              </div>
            </Card>
          </i-col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
//导入筛选区组件
import selectComp from '../components/selectTargetNet.vue';
//导入饼图组件
import pieChart from '../components/graphic/staAnalysisPieChart.vue';
//导入折线图组件
import StaAnalysisLineChart from "../components/graphic/staAnalysisLineChart";
import StaAnalysisPieChart from "../components/graphic/staAnalysisPieChart";

export default {
  components:{
    StaAnalysisPieChart,
    StaAnalysisLineChart,
    selectComp
  }
}
</script>
