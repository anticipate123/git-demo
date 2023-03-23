<template>
  <Card>
    <div class="template-headline">
        任务场景
    </div>
    <div style="width:100%; height:calc(100vh - 201px);" ref="myEchart"></div>
  </Card>
</template>
<script>
    import "../../../static/map/js/China.js";
    export default {
        name: "echarts",
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.initChart();
        },
        beforeDestroy() {
            if (!this.chart) {
                return;
            }
            this.chart.dispose();
            this.chart = null;
        },
        methods: {
            initChart() {
                let that = this;
                this.chart = this.echarts.init(this.$refs.myEchart);
                // window.onresize = this.echarts.init(this.$refs.myEchart).resize;

                var name_title = "";
                var nameColor = " rgb(55, 75, 113)";
                var name_fontFamily = "等线";
                var name_fontSize = 18;
                var mapName = "china";
                var data = [{
                    name: "北京",
                }, {
                    name: "天津",
                }, {
                    name: "河北",
                }, {
                    name: "山西",
                }, {
                    name: "内蒙古",
                }, {
                    name: "辽宁",

                }, {
                    name: "吉林",

                }, {
                    name: "黑龙江",

                }, {
                    name: "上海",

                }, {
                    name: "江苏",

                }, {
                    name: "浙江",

                }, {
                    name: "安徽",

                }, {
                    name: "福建",

                }, {
                    name: "江西",

                }, {
                    name: "山东",

                }, {
                    name: "河南",

                }, {
                    name: "湖北",

                }, {
                    name: "湖南",

                }, {
                    name: "重庆",

                }, {
                    name: "四川",

                }, {
                    name: "贵州",

                }, {
                    name: "云南",

                }, {
                    name: "西藏",

                }, {
                    name: "陕西",

                }, {
                    name: "甘肃",

                }, {
                    name: "青海",

                }, {
                    name: "宁夏",

                }, {
                    name: "新疆",

                }, {
                    name: "广东",

                }, {
                    name: "广西",

                }, {
                    name: "海南",

                }, ];

                var geoCoordMap = {};

                /*获取地图数据*/
                this.chart.showLoading();
                var mapFeatures = this.echarts.getMap(mapName).geoJson.features;
                this.chart.hideLoading();
                mapFeatures.forEach(function(v) {
                    // 地区名称
                    var name = v.properties.name;
                    // 地区经纬度
                    geoCoordMap[name] = v.properties.cp;
                });

                console.log("============geoCoordMap===================")
                console.log(geoCoordMap)
                console.log("================data======================")
                var max = 480,
                    min = 9; // todo
                var maxSize4Pin = 100,
                    minSize4Pin = 20;

                var convertData = function(data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord,
                            });
                        }
                    }
                    return res;
                };
                console.log('convertData', convertData(data))
                console.log(data);

                let option = {
                    title: {
                        text: name_title,
                        x: "center",
                        textStyle: {
                            color: nameColor,
                            fontFamily: name_fontFamily,
                            fontSize: name_fontSize,
                        }
                    },
                    tooltip: {
                        trigger: "item",
                        triggerOn: "click",
                        formatter: function(params) {
                            console.log("params", params)
                            console.log("paramsname", params.name)

                            if (params.name !== '西藏') {
                                var res = '<center>请选择其他地区<center>'
                                res += params.name + ' : 没有数据';
                                return res
                            } else {
                                return '西藏来源'
                            }
                        }
                    },
                    geo: {
                        show: true,
                        map: mapName,
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false,
                            },
                        },
                        roam: false,
                        zoom: 1.2,
                        regions: data.map((ele) => {
                            const obj = {};
                            obj.name = ele.name;
                            obj.itemStyle = obj.name === '西藏' ? { areaColor: '#5470c6', borderColor: '#333333', emphasis: { areaColor: '#5470c6' }} : { areaColor: '#eeeeee', borderColor: '#333333', emphasis: { areaColor: '#eeeeee' }};
                            return obj;  
                        })
                    },
                    series: [{
                            name: "散点",
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            data: convertData(data),
                            rippleEffect: {
                                scale: 1 // 设置涟漪动画的缩放比例
                            },
                            color: "#666666",
                            label: {
                                normal: {
                                    formatter: "{b}",
                                    position: "right",
                                    show: true,
                                },
                                emphasis: {
                                    show: true,
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: "#f9b5ae",
                                },
                            },
                        },

                    ],
                };

                console.log(option);

                this.chart.setOption(option);
                this.chart.on('click', function(params) {
                    if (params.name == '西藏') {
                        that.$store.commit("updatestartFreq", "-1");
                        that.$store.commit("updateendFreq", "-1");
                        that.$store.commit("updatestartTime", "1990-01-01:01-01-01");
                        that.$store.commit("updateendTime", "1990-01-01:01-01-01");
                        that.$store.commit("altLabel", "-1");
                        that.$store.commit("altRegion", "");
                        that.$router.push("/system/rawData");
                    }
                });

            }
        }
    };
</script>
<style>
    /* .echarts {
        background-image: url('../../assets/images/map.jpg');
        /* background-repeat: no-repeat; */
    /* background-color: rgba(40, 126, 255, 0.5); 
        background-size: cover
    } */
</style>