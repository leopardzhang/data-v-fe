import echarts from 'echarts';
import Vue from 'vue';
import axios from 'axios';
import scale from '../../configs/scale' // 伸缩比

Vue.prototype.$echarts = echarts;

export default {
    name: 'Scatter',
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
            const option = {
                xAxis: {},
                yAxis: {},
                series: [{
                    symbolSize: 20,
                    data: [
                        [10.0, 8.04],
                        [8.0, 6.95],
                        [13.0, 7.58],
                        [9.0, 8.81],
                        [11.0, 8.33],
                        [14.0, 9.96],
                        [6.0, 7.24],
                        [4.0, 4.26],
                        [12.0, 10.84],
                        [7.0, 4.82],
                        [5.0, 5.68]
                    ],
                    type: 'scatter'
                }]
            };

            myChart.setOption(option, true);
            myChart.resize();

            // axios.get(this.api).then((res) => {
            //     option.series[0].data = res.data.seriesData;
            //     option.series[0].name = res.data.name;
            //     option.title.text = res.data.title;

            //     myChart.setOption(option, true);
            //     myChart.resize();
            // });
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