import echarts from 'echarts'
import Vue from 'vue'
import axios from 'axios'
import scale from '../../configs/scale' // 伸缩比

Vue.prototype.$echarts = echarts;

export default {
    name: 'Circles',
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
            document.onmouseup = (e) => {
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
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {
                            value: 335,
                            name: '直接访问'
                        },
                        {
                            value: 310,
                            name: '邮件营销'
                        },
                        {
                            value: 234,
                            name: '联盟广告'
                        },
                        {
                            value: 135,
                            name: '视频广告'
                        },
                        {
                            value: 1548,
                            name: '搜索引擎'
                        }
                    ]
                }]
            };

            axios.get(this.api).then((res) => {
                option.legend.data = res.data.legendData;
                option.series[0].data = res.data.seriesData;
                option.series[0].name = res.data.seriesName;

                myChart.setOption(option, true);
                myChart.resize();
            });
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
