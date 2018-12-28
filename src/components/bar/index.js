import echarts from 'echarts'
import Vue from 'vue'
import axios from 'axios'
import scale from '../../configs/scale'		// 伸缩比

Vue.prototype.$echarts = echarts;

export default {
	name: 'Bar',
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
				textStyle: {
					color: '#fff'
				},
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: null,
					axisTick: {
						alignWithLabel: true
					},
					nameTextStyle: {
						color: '#fff'
					}
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: '直接访问',
					type: 'bar',
					barWidth: '60%',
					data: null
				}]
			};

			axios.get(this.api).then((res) => {
				option.xAxis[0].data = res.data.xAxisData;
				option.series[0].data = res.data.seriesData;

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
