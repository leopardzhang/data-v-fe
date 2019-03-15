import echarts from 'echarts'
import {
    prepareBoxplotData
} from 'echarts/extension/dataTool'
import Vue from 'vue'
import axios from 'axios'
import scale from '../../configs/scale' // 伸缩比

Vue.prototype.$echarts = echarts;

export default {
    name: 'BoxPlot',
    props: {
        width: Number,
        height: Number,
        left: Number,
        top: Number,
        api: String
    },

    data() {
        return {
            positionX: '',
            positionY: '',
            current: false
        }
    },

    mounted() {
        this.fnRest();
    },
    methods: {
        handleMousedown(e) {
            const _this = this;
            this.$emit('setCurrent', {});
            this.current = true;

            let odiv = e.currentTarget;
            let disX = e.clientX / scale - odiv.offsetLeft;
            let disY = e.clientY / scale - odiv.offsetTop;
            document.onmousemove = (e) => {
                let left = e.clientX / scale - disX;
                let top = e.clientY / scale - disY;

                this.positionX = top;
                this.positionY = left;

                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';

                _this.$emit('setPosition', {
                    left: Math.ceil(left),
                    top: Math.ceil(top),
                    width: _this.width,
                    height: _this.height
                });
            };
            document.onmouseup = () => {
                _this.$emit('setCurrent', {});
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        handleMouseup() {
            this.current = false;
        },

        fnRest() {
            const chart = this.$refs.chart;
            const myChart = this.$echarts.init(chart);
            var data = prepareBoxplotData([
                [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
                [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
                [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
                [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
            ]);

            const option = {
                title: [{
                        text: 'Michelson-Morley Experiment',
                        left: 'center',
                    },
                    {
                        text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
                        borderColor: '#999',
                        borderWidth: 1,
                        textStyle: {
                            fontSize: 14
                        },
                        left: '10%',
                        top: '90%'
                    }
                ],
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%'
                },
                xAxis: {
                    type: 'category',
                    data: data.axisData,
                    boundaryGap: true,
                    nameGap: 30,
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        formatter: 'expr {value}'
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'km/s minus 299,000',
                    splitArea: {
                        show: true
                    }
                },
                series: [{
                        name: 'boxplot',
                        type: 'boxplot',
                        data: data.boxData,
                        tooltip: {
                            formatter(param) {
                                return [
                                    'Experiment ' + param.name + ': ',
                                    'upper: ' + param.data[5],
                                    'Q3: ' + param.data[4],
                                    'median: ' + param.data[3],
                                    'Q1: ' + param.data[2],
                                    'lower: ' + param.data[1]
                                ].join('<br/>');
                            }
                        }
                    },
                    {
                        name: 'outlier',
                        type: 'scatter',
                        data: data.outliers
                    }
                ]
            };

            // axios.get(this.api).then((res) => {
            //     option.xAxis[0].data = res.data.xAxisData;
            //     option.series[0].data = res.data.seriesData;

            //     myChart.setOption(option, true);
            //     myChart.resize();
            // });

            myChart.setOption(option, true);
            myChart.resize();
        }
    },

    watch: {
        width() {
            this.fnRest();
        },

        height() {
            this.fnRest();
        },

        api() {
            this.fnRest();
        }
    }
}
