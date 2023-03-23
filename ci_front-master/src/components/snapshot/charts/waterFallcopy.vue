<template>
  <div>
    <div class="title">频谱瀑布图</div>
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
      waterFallWidth: 0,
      waterFallHeight: 0,
      maxNum: 0,
      minNum: 100,
      num: []
    };
  },
  props: {
    range: Array,
    xstart: Number,
    xend: Number,
    spin_show: Boolean
  },
  watch: {
    xstart: {
      handler(newVal) {
        if (this.num != []) {
          this.num = [];
          for (let i = newVal; i < this.xend; i++)
            this.num[i - newVal] = this.range[i];
          this.test(this.num);
        }
      }
    },
    xend: {
      handler(newVal) {
        if (this.num != []) {
          this.num = [];
          for (let i = this.xstart; i < newVal; i++)
            this.num[i - this.xstart] = this.range[i];
          this.test(this.num);
        }
      }
    },
    range: {
      handler(newVal) {
        if (this.num != []) {
          this.num = [];
          for (let i = this.xstart; i < this.xend; i++)
            this.num[i - this.xstart] = this.range[i];
          this.test(this.num);
        }
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    test(newVal) {
      this.waterFallWidth = newVal.length;
      for (let i = 0; i < newVal.length; i++) {
        if (newVal[i] < this.minNum) {
          this.minNum = newVal[i];
        } else if (newVal[i] > this.maxNum) {
          this.maxNum = newVal[i];
        }
      }
      console.log(this.maxNum,this.minNum);
      this.setColormap();
      this.createLegendCanvas();
      this.queryChartList(newVal);
    },
    //创建颜色库
    setColormap() {
      let colormap = require("colormap");
      this.colormap = colormap({
        colormap: "jet",
        nshades: this.maxNum * 3 + 6, //生成颜色数量，colormap.length
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
    //绘制图像
    rowToImageData(data) {
      let waterFall = this.$refs.waterFall;
      this.waterFall = waterFall.getContext("2d");
      waterFall.width = this.waterFallWidth;
      waterFall.height = this.$refs.waterFallContent.offsetHeight;
      if (this.$refs.waterFallContent !== undefined) {
        let canvasHeight = Math.floor(
          this.$refs.waterFallContent.offsetHeight / this.waterFallHeight
        );
        const imageData = this.waterFall.createImageData(data.length, 1); //创建新的空白 ImageData 对象
        //给每一个元素匹配对应的颜色
        for (let i = 0; i < imageData.data.length; i += 4) {
          const cindex = this.colorMapData(data[i / 4]);
          const color = this.colormap[cindex];
          imageData.data[i + 0] = color[0];
          imageData.data[i + 1] = color[1];
          imageData.data[i + 2] = color[2];
          imageData.data[i + 3] = 255;
        }
        for (let i = 0; i < canvasHeight; i++) {
          this.waterFall.putImageData(imageData, 0, i);
        }
      }
    },
    //返回数据对应的Colormap颜色
    colorMapData(data) {
      if (data == 0) return data;
      else if (data % 2 == 0) return Math.round(data * 2);
      else return Math.round(data * 3);
    },
    //瀑布图数据
    queryChartList(data) {
      this.waterFallHeight = 1;
      this.rowToImageData(data);
    }
  }
};
</script>
<style>
.neirong {
  height: 100%;
  width: 850px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
}

.legend {
  width: 25px;
  height: 150 px;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
}

.waterFall {
  width: 800px;
  height: 150px;
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
