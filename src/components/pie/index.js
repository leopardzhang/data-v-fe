import echarts from 'echarts';
import Vue from 'vue';
import axios from 'axios';
import scale from '../../configs/scale' // 伸缩比

Vue.prototype.$echarts = echarts;

export default {
	name: 'Pie',
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

				title: {
					text: 'Customized Pie',
					left: 'center',
					top: 20,
					textStyle: {
						color: '#ccc'
					}
				},

				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},

				visualMap: {
					show: false,
					min: 80,
					max: 600,
					inRange: {
						colorLightness: [0, 1]
					}
				},
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: [{
							value: 335,
							name: '直接访问'
						},
						{
							value: 310,
							name: '邮件营销'
						},
						{
							value: 274,
							name: '联盟广告'
						},
						{
							value: 235,
							name: '视频广告'
						},
						{
							value: 400,
							name: '搜索引擎'
						}
					].sort((a, b) => a.value - b.value),
					roseType: 'radius',
					label: {
						normal: {
							textStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							}
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						}
					},
					itemStyle: {
						normal: {
							color: '#c23531',
							shadowBlur: 200,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},

					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay(idx) {
						return 100 * idx;
					}
				}]
			};

			axios.get(this.api).then((res) => {
				option.series[0].data = res.data.seriesData;
				option.series[0].name = res.data.name;
				option.title.text = res.data.title;

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