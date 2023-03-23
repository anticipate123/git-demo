<template>
	<div class="water-fall clearfix">
		<div class="float-left">
			<template v-if="snapshots.length === 1">
				<div class="water-fall-timeline single">
					<div v-for="(item, i) in snapshots" class="water-fall-timeline-row">
						{{ formatDate(item.timeStamp) }}
					</div>
				</div>
			</template>
			<template v-else>
				<div class="water-fall-timeline multi">
					<div v-for="(item, i) in snapshots" class="water-fall-timeline-row" v-if="i === 0">
						{{ formatDate(item.timeStamp) }}
					</div>
					<div>
						<div>...</div> 
					</div>
					<div v-for="(item, i) in snapshots" class="water-fall-timeline-row" v-if="i === snapshots.length - 1">
						{{ formatDate(item.timeStamp) }}
					</div>
				</div>
			</template>
		</div>
		<div class="float-left water-fall-chart">
			<canvas ref="waterFall"></canvas>
		</div>
		<div class="float-left water-fall-legend">
			<canvas ref="legend"></canvas>
		</div>
		<div class="float-left water-fall-limits">
			<div class="water-fall-limits-row">
				100
			</div>
			<div class="water-fall-limits-row text-primary text-bold">
				50
			</div>
			<div class="water-fall-limits-row">
				0
			</div>
		</div>
	</div>
</template>
<script>
	import colormap from 'colormap';
	import moment from 'moment';

	export default {
		props: {
			snapshots: Array,
			xStart: Number,
			xEnd: Number
		},
		data() {
			return {
				colormap: [],
				legend: null,
				waterFall: null,
				maximum: 100,
				area: 0
			}
		},
		mounted() {
			this.setColormap();
		},
		methods: {
			setColormap() {
				this.colormap = colormap({
					colormap: 'jet',
					format: 'rba',
					alpha: 1
				})
			},
			createLegend() {
				this.legend = this.$refs.legend.getContext('2d');
                const legendUnit = document.createElement('canvas').getContext('2d');
                legendUnit.width = 1
                const imageData = legendUnit.createImageData(1, this.colormap.length);
                for (let i = 0; i < this.colormap.length; i++) {
                    const color = this.colormap[i];
                    imageData.data[imageData.data.length - i * 4 + 0] = color[0];
			        imageData.data[imageData.data.length - i * 4 + 1] = color[1];
			        imageData.data[imageData.data.length - i * 4 + 2] = color[2];
			        imageData.data[imageData.data.length - i * 4 + 3] = 255;
                }
                legendUnit.putImageData(imageData, 0, 0);
                this.legend.drawImage(legendUnit.canvas,0, 0, 1, this.colormap.length, 50, 0, 200, this.legend.canvas.height); 
			},
			createWaterFall() {
				if (this.snapshots.length) {
					const waterFall = this.$refs.waterFall.getContext('2d');

					this.waterFall = waterFall;

					const rowLength = Math.round(150 / this.snapshots.length);

					this.snapshots.forEach(
						(ele, i) => {
							const array = this.area ? ele.range.slice(this.xStart, this.xEnd) : ele.range; 
							this.drawWaterFallRow(array, rowLength, i);
						}
					)
				}
			},
			drawWaterFallRow(data, height, index) {
				const imageData = this.waterFall.createImageData(data.length, 1);

				let imageOrigin;
				if (index) {
					imageOrigin = this.waterFall.getImageData(0, 0, this.waterFall.canvas.width * 2, height * index);
				}

				for (let i = 0; i < data.length; i++) {
					const index = this.dataToColormap(Number(data[i]));
					const color = this.colormap[index];
					imageData.data[i * 4 + 0] = color[0];
					imageData.data[i * 4 + 1] = color[1];
                    imageData.data[i * 4 + 2] = color[2];
                    imageData.data[i * 4 + 3] = 255;
				}
				for (let i = 0; i < height; i++) {
					this.waterFall.putImageData(imageData, 0, i);
				}

				if (imageOrigin) this.waterFall.putImageData(imageOrigin, 0, height);
                
			},
			dataToColormap(data) {
				return Math.round(data * 72 / this.maximum) > 71 ? 71 : Math.round(data * 72 / this.maximum);
			},
			formatDate(date) {
				return moment(date).format('YYYY-MM-DD HH:mm:ss')
			},
			onAreaChange() {
				this.area = this.xEnd - this.xStart;
				this.createWaterFall();
			}
		},
		watch: {
			snapshots: {
				handler(newVal) {
					this.createWaterFall();
					this.createLegend();
				}
			}
		}
	}
</script>
<style>
	.water-fall-timeline {
		width: 70px;
		height: 300px;
		display: flex;
		flex-direction: column;
	}

	.water-fall-timeline.single {
		justify-content: center;
	}

	.water-fall-timeline.multi {
		justify-content: space-between;
	}

	.water-fall-timeline-row,
	.water-fall-limits-row {
		font-size: 12px;
		line-height: 19px;
	}

	.water-fall-legend {
		width: 25px;
	}

	.water-fall canvas {
		width: 100%;
		height: 300px;
	}

	.water-fall-chart {
		width: calc(100% - 125px);
	}

	.water-fall-limits {
		width: 30px;
		height: 300px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>