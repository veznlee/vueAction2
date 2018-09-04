<template>
    <div class="table">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-blue">
                        <!--<div class="layout-title">
                            <h4>入库单量走势</h4>
                        </div>-->
                        <div class="layout-content content-blue">
                            <div class="grid-content bg-purple">
                                <div id="main" style="width: 100%; min-height: 800px"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    var echarts = require('echarts');
    import 'echarts/map/js/china.js';
    import request from '../../../utils/request'
    export default {
        data() {
            return {
                Urls:{
                    tableList:'',
                    countList:'',
                    proList:'',
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                },
            }
        },
        created() {},
        watch:{},
        computed: {},
        methods: {
            DrawMap(){
                var myChart = echarts.init(document.getElementById('main'))
                function randomData() {
                    return Math.round(Math.random()*100);
                }
                var data = [
                    {
                        name: '齐齐哈尔'
                    }, {
                        name: '盐城'
                    }, {
                        name: '青岛'
                    }, {
                        name: '金昌'
                    }, {
                        name: '泉州'
                    }, {
                        name: '拉萨'
                    }, {
                        name: '上海浦东'
                    }, {
                        name: '攀枝花'
                    }, {
                        name: '威海'
                    }, {
                        name: '汕尾'
                    }, {
                        name: '克拉玛依'
                    }, {
                        name: '重庆市'
                    }, {
                        name: '北京市'
                    }, {
                        name: '贵阳市'
                    }

                ];
                var geoCoordMap = {
                    '齐齐哈尔': [123.97, 47.33],
                    '盐城': [120.13, 33.38],
                    '青岛': [120.33, 36.07],
                    '金昌': [102.188043, 38.520089],
                    '泉州': [118.58, 24.93],
                    '拉萨': [91.11, 29.97],
                    '上海浦东': [121.48, 31.22],
                    '攀枝花': [101.718637, 26.582347],
                    '威海': [122.1, 37.5],
                    '汕尾': [115.375279, 22.786211],
                    '克拉玛依': [84.77, 45.59],
                    '重庆市': [108.384366, 30.439702],
                    '北京市': [116.4551,40.2539],
                    '贵阳市': [106.63,26.65]

                };
                //var planePath = "path://M1004.3 473.6c-6.5 17.3-19.9 24.2-39.3 22.9-7.3-0.5-14.7 0.1-22.1-0.1-17.7-0.6-30.3-11.9-30.5-28.1-0.4-28.3-0.4-56.6 0-84.9 0.2-16.2 12.9-27.5 30.5-28.1 7.3-0.2 14.7 0.4 22.1-0.1 19.4-1.4 32.8 5.6 39.2 22.9l0.1 95.5zM21 378c6.5-17.3 19.8-24.2 39.2-22.9 7.3 0.5 14.7-0.1 22.1 0.1 17.5 0.5 30.4 12 30.6 28.1 0.3 28.3 0.3 56.6 0 84.9-0.2 16.1-13 27.6-30.5 28.1-7.3 0.2-14.7-0.4-22.1 0.1-19.4 1.3-32.7-5.7-39.2-22.9L21 378z m799.1 316.8c0-37.4 0.1-73.4 0-109.4s-18.7-55.8-58.2-61.4c-2.3-16.3-4.7-32.9-6.9-49.4-5.8-42.7-11.3-85.5-17.5-128.1-3.9-27.4-29.6-48.3-59.5-48.3-110.1-0.2-220.2-0.2-330.3 0-30.4 0.1-56 21-59.9 48.9-7.9 56.7-15.5 113.5-23.2 170.2-0.3 2.3-1 4.6-1.4 6.7-40.4 6.3-57.8 25.4-58 62.9-0.1 32.2 0 64.3 0 96.5v11c-12.3 0-23.8 0.9-35.1-0.2-15.8-1.6-25.8-13.7-25.8-29.4-0.1-55.8-0.1-111.6-0.1-167.3V190.3c0-38.5 25.2-61.8 66.8-61.8h602c43.5 0 68.2 22.8 68.2 63.3v471c0 20.9-12.3 32.1-35.1 32.1-8.3-0.1-16.6-0.1-26-0.1z m-0.4 113.4v53.6c0 19.8-12.5 31.4-33.9 31.4-18.6 0-37.1 0.1-55.7-0.1-20.4-0.1-32.8-11.6-32.9-30.4-0.1-17.7 0-35.4 0-53.8H328.1v50.4c-0.1 23.6-11.3 33.9-37 33.9-17.6 0-35.2 0.1-52.8-0.1-20.3-0.2-32.7-11.8-32.7-30.6-0.1-17.1-0.1-34.2-0.1-51.3 0-0.6-0.3-1.1-0.8-3h-27c-21-0.2-33.5-11.6-33.5-30.8v-23c0.1-19.4 12.4-30.7 33.5-30.7 99.2-0.1 198.4-0.1 297.5-0.1h369.5c25 0 36.3 10.5 36.4 33.5 0 7.4 0.2 14.8 0 22.1-0.5 17.2-13 28.5-31.7 28.9-9.5 0.2-19 0.1-29.7 0.1z";
                var planePath = "path://M1004.3 473.6c-6.5 17.3-19.9 24.2-39.3 22.9-7.3-0.5-14.7 0.1-22.1-0.1-17.7-0.6-30.3-11.9-30.5-28.1-0.4-28.3-0.4-56.6 0-84.9 0.2-16.2 12.9-27.5 30.5-28.1 7.3-0.2 14.7 0.4 22.1-0.1 19.4-1.4 32.8 5.6 39.2 22.9l0.1 95.5zM21 378c6.5-17.3 19.8-24.2 39.2-22.9 7.3 0.5 14.7-0.1 22.1 0.1 17.5 0.5 30.4 12 30.6 28.1 0.3 28.3 0.3 56.6 0 84.9-0.2 16.1-13 27.6-30.5 28.1-7.3 0.2-14.7-0.4-22.1 0.1-19.4 1.3-32.7-5.7-39.2-22.9L21 378z m799.1 316.8c0-37.4 0.1-73.4 0-109.4s-18.7-55.8-58.2-61.4c-2.3-16.3-4.7-32.9-6.9-49.4-5.8-42.7-11.3-85.5-17.5-128.1-3.9-27.4-29.6-48.3-59.5-48.3-110.1-0.2-220.2-0.2-330.3 0-30.4 0.1-56 21-59.9 48.9-7.9 56.7-15.5 113.5-23.2 170.2-0.3 2.3-1 4.6-1.4 6.7-40.4 6.3-57.8 25.4-58 62.9-0.1 32.2 0 64.3 0 96.5v11c-12.3 0-23.8 0.9-35.1-0.2-15.8-1.6-25.8-13.7-25.8-29.4-0.1-55.8-0.1-111.6-0.1-167.3V190.3c0-38.5 25.2-61.8 66.8-61.8h602c43.5 0 68.2 22.8 68.2 63.3v471c0 20.9-12.3 32.1-35.1 32.1-8.3-0.1-16.6-0.1-26-0.1z m-0.4 113.4v53.6c0 19.8-12.5 31.4-33.9 31.4-18.6 0-37.1 0.1-55.7-0.1-20.4-0.1-32.8-11.6-32.9-30.4-0.1-17.7 0-35.4 0-53.8H328.1v50.4c-0.1 23.6-11.3 33.9-37 33.9-17.6 0-35.2 0.1-52.8-0.1-20.3-0.2-32.7-11.8-32.7-30.6-0.1-17.1-0.1-34.2-0.1-51.3 0-0.6-0.3-1.1-0.8-3h-27c-21-0.2-33.5-11.6-33.5-30.8v-23c0.1-19.4 12.4-30.7 33.5-30.7 99.2-0.1 198.4-0.1 297.5-0.1h369.5c25 0 36.3 10.5 36.4 33.5 0 7.4 0.2 14.8 0 22.1-0.5 17.2-13 28.5-31.7 28.9-9.5 0.2-19 0.1-29.7 0.1z";
                var dataFrom = '贵阳市';
                myChart.setOption({
                    series: [{
                        type: 'map',
                        map: 'china'
                    }]
                });
                var convertData = function(data) {
                    var res = [];

                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];

                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                    return res;
                };
                var option = {
                    title: {
                        text: '物流运输分布',
                        left: 'center',
                        textStyle: {
                            color: '#1a1b4e',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontSize: 24
                        },
                        subtextStyle: {
                            color: '#58d9df',
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fontSize: 16
                        }
                    },
                    /*tooltip: {
                        trigger: 'item'

                    },*/
                    visualMap: {
                        min: 0,
                        max: 100,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],
                        calculable: true,
                        inRange: {
                            color: ['#ffffff', '#E0DAFF', '#ADBFFF', '#9CB4FF', '#6A9DFF', '#3889FF']
                        }
                    },
                    geo: {
                        map: 'china',
                        zoom: 1.2,
                        label: {
                            normal: {

                                show: true,
                                color: '#292929'
                            },
                            emphasis: {
                                show: false,
                                color: '#292929'
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#fbfbfb',
                                borderColor: '#b9b4b7'

                            },
                            emphasis: {
                                areaColor: '#fff464'
                            }
                        }
                    },
                    series: [
                        {
                            name: '贵阳市',
                            type: 'lines',
                            zlevel: 2,
                            symbolSize: 10,
                            effect: {
                                show: true,
                                period: 50,
                                symbol: planePath,
                                trailLength: 0,
                                symbolSize: 15

                            },
                            lineStyle: {
                                normal: {
                                    color:'#c60fff',
                                    width: 2,
                                    opacity:0.5,
                                    curveness:0.2
                                }
                            },
                            data: data.map(function (dataItem) {
                                return {
                                    fromName: dataFrom,
                                    toName: dataItem.name,
                                    coords: [
                                        geoCoordMap[dataFrom],
                                        geoCoordMap[dataItem.name]
                                    ]
                                }
                            })
                        },{
                            name: '供需占比',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(data),
                            symbolSize: 8,
                            showEffectOn: 'render',
                            rippleEffect: {
                                scale: 5,
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c60fff',
                                    shadowBlur: 20,
                                    shadowColor: '#333'
                                }
                            }
                        }, {
                            type: 'map',
                            mapType: 'china',
                            geoIndex: 0,
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [{
                                name: '北京',
                                value: randomData()
                            }, {
                                name: '天津',
                                value: randomData()
                            }, {
                                name: '上海',
                                value: randomData()
                            }, {
                                name: '重庆',
                                value: randomData()
                            }, {
                                name: '河北',
                                value: randomData()
                            }, {
                                name: '河南',
                                value: randomData()
                            }, {
                                name: '云南',
                                value: randomData()
                            }, {
                                name: '辽宁',
                                value: randomData()
                            }, {
                                name: '黑龙江',
                                value: randomData()
                            }, {
                                name: '湖南',
                                value: randomData()
                            }, {
                                name: '安徽',
                                value: randomData()
                            }, {
                                name: '山东',
                                value: randomData()
                            }, {
                                name: '新疆',
                                value: randomData()
                            }, {
                                name: '江苏',
                                value: randomData()
                            }, {
                                name: '浙江',
                                value: randomData()
                            }, {
                                name: '江西',
                                value: randomData()
                            }, {
                                name: '湖北',
                                value: randomData()
                            }, {
                                name: '广西',
                                value: randomData()
                            }, {
                                name: '甘肃',
                                value: randomData()
                            }, {
                                name: '山西',
                                value: randomData()
                            }, {
                                name: '内蒙古',
                                value: randomData()
                            }, {
                                name: '陕西',
                                value: randomData()
                            }, {
                                name: '吉林',
                                value: randomData()
                            }, {
                                name: '福建',
                                value: randomData()
                            }, {
                                name: '贵州',
                                value: randomData()
                            }, {
                                name: '广东',
                                value: randomData()
                            }, {
                                name: '青海',
                                value: randomData()
                            }, {
                                name: '西藏',
                                value: randomData()
                            }, {
                                name: '四川',
                                value: randomData()
                            }, {
                                name: '宁夏',
                                value: randomData()
                            }, {
                                name: '海南',
                                value: randomData()
                            }, {
                                name: '台湾',
                                value: randomData()
                            }, {
                                name: '香港',
                                value: randomData()
                            }, {
                                name: '澳门',
                                value: randomData()
                            }]
                        }
                    ]
                };

                myChart.setOption(option);


                myChart.on('mouseover', function(params) {
                    var city = params.name;


                    if (city == '广东' || city == '广西' || city == '海南') {

                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "广东"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "广西"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "海南"
                        });

                    }

                    if (city == '山东' || city == '江苏' || city == '浙江' || city == '安徽' || city == '福建' || city == '上海') {

                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "山东"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "江苏"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "浙江"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "安徽"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "福建"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "上海"
                        });

                    }

                    if (city == '湖北' || city == '湖南' || city == '河南' || city == '江西') {

                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "湖北"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "湖南"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "河南"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "江西"
                        });


                    }

                    if (city == '北京' || city == '天津' || city == '河北' || city == '山西' || city == '内蒙古') {

                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "北京"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "天津"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "河北"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "山西"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "内蒙古"
                        });


                    }
                    if (city == '宁夏' || city == '新疆' || city == '青海' || city == '陕西' || city == '甘肃') {

                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "宁夏"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "新疆"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "青海"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "陕西"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "甘肃"
                        });


                    }
                    if (city == '四川' || city == '云南' || city == '贵州' || city == '西藏' || city == '重庆') {

                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "四川"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "云南"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "贵州"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "西藏"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "重庆"
                        });


                    }
                    if (city == '辽宁' || city == '吉林' || city == '黑龙江') {

                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "辽宁"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "吉林"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "黑龙江"
                        });


                    }
                    if (city == '台湾' || city == '香港' || city == '澳门') {

                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "台湾"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "香港"
                        });
                        myChart.dispatchAction({
                            type: 'highlight',
                            name: "澳门"
                        });
                    }
                });

                myChart.on('mouseout', function(params) {
                    var city = params.name;


                    if (city == '广东' || city == '广西' || city == '海南') {

                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "广东"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "广西"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "海南"
                        });

                    }
                    if (city == '山东' || city == '江苏' || city == '浙江' || city == '安徽' || city == '福建' || city == '上海') {

                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "山东"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "江苏"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "浙江"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "安徽"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "福建"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "上海"
                        });

                    }
                    if (city == '湖北' || city == '湖南' || city == '河南' || city == '江西') {

                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "湖北"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "湖南"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "河南"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "江西"
                        });

                    }
                    if (city == '北京' || city == '天津' || city == '河北' || city == '山西' || city == '内蒙古') {

                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "北京"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "天津"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "河北"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "山西"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "内蒙古"
                        });

                    }
                    if (city == '宁夏' || city == '新疆' || city == '青海' || city == '陕西' || city == '甘肃') {

                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "宁夏"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "新疆"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "青海"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "陕西"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "甘肃"
                        });

                    }
                    if (city == '四川' || city == '云南' || city == '贵州' || city == '西藏' || city == '重庆') {

                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "四川"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "云南"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "贵州"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "西藏"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "重庆"
                        });

                    }
                    if (city == '辽宁' || city == '黑龙江' || city == '吉林') {

                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "辽宁"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "黑龙江"
                        });
                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "吉林"
                        });

                    }
                    if (city == '台湾' || city == '香港' || city == '澳门') {

                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "台湾"
                        });

                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "香港"
                        });


                        myChart.dispatchAction({
                            type: 'downplay',
                            name: "澳门"
                        });

                    }

                });
                /*myChart.setOption({
                    title: {
                        text: '物流运输分布',
                        subtext: '（运输率）',
                        textStyle: {
                            fontSize: 20
                        },
                        x: 'center'
                    },
                    tooltip: {
                        show: true,
                        formatter: function(params) {
                            console.log(params)
                            return params.name + '：' + params.data['value'] + '%'
                        },
                    },
                    visualMap: {
                        min: 0,
                        max: 5.5,
                        left: 'left',
                        top: 'bottom',
                        text: ['%', ''],
                        calculable: true,
                        inRange:{
                            color:['#ffffff','#d00000']
                        }
                    },
                    series: [{
                        name: '运输率',
                        type: 'map',
                        map: 'china',
                        roam: false,
                        label: {
                            show: false,
                        },
                        data:this.mapData
                    },
                    ]
                });*/
            }
        },
        mounted(){
            this.$nextTick(function() {
                this.DrawMap()
            })
        },
    }
</script>

<style scoped>
</style>
