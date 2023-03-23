<template>
  <div>
  <div class="template-container">
    <div style="width: 100%; height:38vh;position: :absolute;">
      <div class="template-headline" style="text-align: center;">
          结果
          </div>
          <div id="echart"></div>
    </div>
  </div>
  </div>
</template>

<script>

export default {

  components: {
   
},
  data() {
    return {
      option : {
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      //将表盘分成几个部分
      splitNumber: 10,
      //样式设置
      itemStyle: {
        color: '#58D9F9',
        shadowColor: 'rgba(0,138,255,0.45)',
        //阴影设置
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      //内部进度设置
      progress: {
        show: true,
        roundCap: true,
        width: 18
      },
      //指针样式设置
      pointer: {
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        length: '75%',
        width: 16,
        offsetCenter: [0, '5%']
      },
      
      //半圈设置
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 18
        }
      },
      //内部刻度设置
      axisTick: {
        splitNumber: 2,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      //分割界限的刻度设置
      splitLine: {
        length: 1,
        lineStyle: {
          width: 1,
          color: '#999'
        }
      },
      //内部数据样式设置
      axisLabel: {
        distance: 30,
        color: '#999',
        fontSize: 20
      },
      detail: {
        backgroundColor: '#fff',
        borderColor: '#58D9F9',
        borderWidth: 2,
        width: '100%',
        lineHeight: 50,
        height: 40,
        borderRadius: 8,
        offsetCenter: [0, '35%'],
        valueAnimation: true,
        formatter: function (value) {
          return '{value|用户A：正常用户}';
        },
        rich: {
          value: {
            fontSize: 20,
            fontWeight: 'bolder',
            color: '#58D9F9'
          },
        }
      },
      data: [
        {
          value: 88
        }
      ]
    }
  ]
}
    };
  },
  watch: {

   
  },
  methods: {
    test(){
      var myChart3 = this.echarts.init(document.getElementById("echart"));
    myChart3.setOption(this.option);
    }
  },
  mounted() {
    this.test();
  }
};
</script>
<style>
/* .name{
  position: absolute;
  top:10%;
  left:50%;
  transform:translateX(-50%);
} */
#echart{
  position: absolute;
  top:5%;
  left:30%;
 width:400px;
 height:400px;
  transform:translateX(-30%);
}

</style>