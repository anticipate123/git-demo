<template>
  <div>
    <Row> 
      <Col span="8" >
        <Card class="margin-left-small">
          <div class="template-headline" style="text-align: center;">
            配置信息
          </div>
          <left></left>
        </Card>
      </Col>
      <Col span="8">
        <Card class="margin-left-small">
          <div class="template-headline" style="text-align: center;">
            信号同步相关
          </div>
          <mid></mid>
        </Card>
      </Col>
      <Col span="8" style="width: 100%; height:100vh;">
        <Card class="margin-left-small" >
         <div class="template-headline" style="text-align: center;">
          用户识别置信度
          </div>
         <top></top>
        </Card>
        <Card class="margin-left-small">
       
         <bottom></bottom>
        </Card>
      </Col>
    </Row>
  </div>
  </template>

  <script>
import Left from "./scatter/left";
import Top from "./scatter/top";
import Mid from "./scatter/mid";
import Bottom from "./scatter/bottom";
    export default {
      components: {
      Left,
      Top,
      Mid,
      Bottom,
      },
      data() {
        return {
          // cityList: [CNN,RESNET],
        
        };
      },
      mounted(){
        
      },
      methods: {
      }

    };
  </script>
</template>
