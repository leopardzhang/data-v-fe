import echarts from 'echarts';
import Vue from 'vue';
import axios from 'axios';
import scale from '../../configs/scale' // 伸缩比

Vue.prototype.$echarts = echarts;

export default {
    name: 'Radar',
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
                title: {
                    text: '基础雷达图'
                },
                tooltip: {},
                legend: {
                    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [{
                            name: '销售（sales）',
                            max: 6500
                        },
                        {
                            name: '管理（Administration）',
                            max: 16000
                        },
                        {
                            name: '信息技术（Information Techology）',
                            max: 30000
                        },
                        {
                            name: '客服（Customer Support）',
                            max: 38000
                        },
                        {
                            name: '研发（Development）',
                            max: 52000
                        },
                        {
                            name: '市场（Marketing）',
                            max: 25000
                        }
                    ]
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [{
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: '预算分配（Allocated Budget）'
                        },
                        {
                            value: [5000, 14000, 28000, 31000, 42000, 21000],
                            name: '实际开销（Actual Spending）'
                        }
                    ]
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