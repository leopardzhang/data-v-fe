import Vue from 'vue'
import axios from 'axios'
import scale from '../../configs/scale' // 伸缩比

export default {
    name: 'Tables',

    props: {
        width: Number,
        height: Number,
        left: Number,
        top: Number,
        api: String
    },

    data() {
        return {
            table: [
                {
                    prop: 'name',
                    name: '姓名'
                },
                {
                    prop: 'date',
                    name: '日期'
                },
                {
                    prop: 'address',
                    name: '地址'
                }
            ],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },

    mounted() {

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
            // axios.get(this.api).then((res) => {
            //     option.xAxis[0].data = res.data.xAxisData;
            //     option.series[0].data = res.data.seriesData;
            // });
        }
    },

    watch: {
        api() {
            this.fnRest();
        }
    }
}