<template>
  <div>
    <div class="content">
      <div class="neirong">
        <!--图例-->
        <div class="legend">
          <canvas ref="legend"></canvas>
        </div>
        <!--瀑布图 -->
        <div class="waterFall" ref="waterFallContent">
          <canvas ref="waterFall"></canvas>
        </div>
      </div>
    </div>
    <spin fix v-if="spin_show"></spin>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      loading: false,
      colormap: [],
      legend: null,
      waterFall: null,
      waterFallHeight: 0,
       waterFallWidth: 0,
      //
      waterFallIndex: 0,
      maxNum: 0,
      minNum: 100,
      num: [],
      total:[],
      s:[],
    };
  },
  props: {
    snapshots: Array,
    xstart: Number,
    xend: Number,
    spin_show: Boolean
  },
  watch: {
    xstart: {
      handler(newVal) {
        this.waterFallHeight = 20;
        this.waterFallIndex=0;
        this.waterFallWidth = this.xend-this.xstart;
        this.createWaterFallCanvas();
        this.getData( this.total);
      }
    },
    xend: {
      handler(newVal) {
        this.waterFallHeight = 20;
        this.waterFallIndex=0;
        this.waterFallWidth = this.xend-this.xstart;
        this.createWaterFallCanvas();
        this.getData(this.total);
      }
    },
    snapshots: {
      handler(newVal) {
       this.waterFallHeight = 20;
       this.waterFallIndex=0;
       this.total=[];
       this.total=newVal;
       for(let h=0;h<newVal.length;h++){
        for(let w=0;w<newVal[h].range.length;w++){
          if(newVal[h].range[w]>this.maxNum){
            this.maxNum=newVal[h].range[w];
          }
          else if(newVal[h].range[w]<this.minNum){
            this.minNum=newVal[h].range[w];
          }
        }
       }
        this.setColormap();
        this.createLegendCanvas();
       this.waterFallWidth = this.xend-this.xstart;
        this.createWaterFallCanvas();
       this.getData(newVal);
       },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    //获取数据，一行一行展示数据
    getData(data){
      for(let j=0;j<data.length;j++){
        this.num = [];
        this.s= [];
        this.s=data[j].range;
        for (let i = this.xstart; i < this.xend; i++){
          this.num[i - this.xstart] = this.s[i];
      }
        console.log('****', this.num);
       this.queryChartList(this.num);
      }
      while(this.waterFallIndex<20){
        var arr = new Array(this.xend-this.xstart+1).fill(0);
           this.queryChartList(arr);
    }
    },
    //创建颜色库
    setColormap() {
      let colormap = require("colormap");
      this.colormap = colormap({
        colormap: "jet",
        nshades: 150, //生成颜色数量，colormap.length
        format: "rba",
        alpha: 1
      });
    },

    //创建图例
    createLegendCanvas() {
      let legendRefs = this.$refs.legend; //this.$refs直接访问子组件
      this.legend = legendRefs.getContext("2d");
      let legendCanvas = document.createElement("canvas");
      let legendCanvasTemporary = legendCanvas.getContext("2d");
      //创建新的空白 ImageData 对象
      const imageData = legendCanvasTemporary.createImageData(
        1,
        this.colormap.length
      );
      //给图例上色
      for (let i = 0; i < this.colormap.length; i++) {
        const color = this.colormap[i];
        imageData.data[imageData.data.length - i * 4 + 0] = color[0];
        imageData.data[imageData.data.length - i * 4 + 1] = color[1];
        imageData.data[imageData.data.length - i * 4 + 2] = color[2];
        imageData.data[imageData.data.length - i * 4 + 3] = 255;
      }
      //将图例放到画布上
      legendCanvasTemporary.putImageData(imageData, 0, 0);
      //将刚刚画好的画布放到指定位置
      this.legend.drawImage(
        legendCanvasTemporary.canvas,
        0,
        0,
        1,
        this.colormap.length,
        50,
        -20,
        240,
        240
      );
    },
    //创建瀑布图
     createWaterFallCanvas() {
       let waterFall = this.$refs.waterFall;
       this.waterFall = waterFall.getContext("2d");
       waterFall.width = this.waterFallWidth;
       waterFall.height = this.$refs.waterFallContent.offsetHeight;
       },

    //绘制单行图像
    rowToImageData(data) {
      if (this.$refs.waterFallContent !== undefined) {
        let canvasHeight = Math.floor(
          this.$refs.waterFallContent.offsetHeight / this.waterFallHeight
        );
         let imgOld = this.waterFall.getImageData(0, 0, this.waterFallWidth, canvasHeight * this.waterFallIndex + 1)
        const imageData = this.waterFall.createImageData(data.length, 1); //创建新的空白 ImageData 对象
        //给每一个元素匹配对应的颜色

        for (let i = 0; i < imageData.data.length; i += 4) {
          const cindex = this.colorMapData(data[i / 4],0,149);
          const color = this.colormap[cindex];
          while(color==undefined){};
          imageData.data[i + 0] = color[0];
          imageData.data[i + 1] = color[1];
          imageData.data[i + 2] = color[2];
          imageData.data[i + 3] = 255;
        }
        for (let i = 0; i < canvasHeight; i++) {
          this.waterFall.putImageData(imageData, 0, i);
        }
        this.waterFall.putImageData(imgOld, 0, canvasHeight)
      }
    },
    //返回数据对应的Colormap颜色
   colorMapData(data, outMin, outMax) {
                if (data <= this.minNum) {
                    return outMin
                } else if (data >= this.maxNum) {
                    return outMax
                }
                return Math.round(((data - this.minNum) / (this.maxNum - this.minNum)) * outMax)
            },
   queryChartList(data)    
   {
      this.rowToImageData(data);
      this.waterFallIndex++
    }
  }
};
</script>
<style>
.neirong {
  height: 100%;
  width: 100%;
  margin: 20px auto;
  display: flex;
  justify-content: center;
}

.legend {
  width: 25px;
  height: 280 px;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
}

.waterFall {
  width: 800px;
  height: 280px;
  position: relative;
}

.tip {
  pointer-events: none;
  display: none;
  background-color: #0404049e;
  border-radius: 10px;
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.title {
  margin: 20px auto;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}
</style>
