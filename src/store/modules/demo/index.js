import axios from 'axios';
import {
	beConfig
} from '../../../configs/original';

const state = {
	num: 0,
	res: {
		title: "政务大数据展示平台",
		bar: [],
		lines: [],
		pie: [],
		circles: []
	},
	current: {
		type: '',
		index: 0
	}
}

const CHANGE_NUM = 'CHANGE_NUM';
const GET_DATA = 'GET_DATA';
const SET_CURRENT = 'SET_CURRENT';
const SET_RES = 'SET_RES';
const SET_TITLE = 'SET_TITLE';

const mutations = {
	[CHANGE_NUM](state, mutation) {
		state.num = mutation.payload;
	},

	[GET_DATA](state, mutation) {
		state.res = mutation.payload;
	},

	[SET_CURRENT](state, mutation) {
		state.current = mutation.payload;
	},

	[SET_TITLE](state, mutation) {
		state.res.title = mutation.payload;
	}
}

const actions = {
	/**
	 * 新加入数据
	 */
	async setData({
		state,
		commit
	}, args) {
		let temp = state.res;

		if (args.way) {
			temp[args.type].push(args.data);
		} else {
			temp[args.type] = [args.data];
		}

		commit({
			type: GET_DATA,
			payload: temp
		});
	},

	/**
	 * 更新原有的单位的数据
	 */
	async upData({
		state,
		commit
	}, args) {
		let temp = state.res;

		temp[args.type][args.index].width = args.data.width;
		temp[args.type][args.index].height = args.data.height;
		temp[args.type][args.index].left = args.data.left;
		temp[args.type][args.index].top = args.data.top;

		commit({
			type: GET_DATA,
			payload: temp
		});
	},

	/**
	 * 设置当前选中的单位的索引
	 */
	async setCurrent({
		state,
		commit
	}, args) {
		commit({
			type: SET_CURRENT,
			payload: {
				type: args.type,
				index: args.index
			}
		})
	},

	async setRes({
		state,
		commit
	}, args) {
		const type = state.current.type;
		const index = state.current.index;
		let data = state.res;

		data[type][index] = args;
		commit({
			type: GET_DATA,
			payload: data
		});
	},

	async setTitle({
			state,
			commit
		}, args) {
			commit({
				type: SET_TITLE,
				payload: args
			});
	},

	async removeItem({
		state,
		commit
	}) {
		const res = state.res;
		const current = state.current;
		res[current.type].splice([current.index], 1);

		commit({
			type: GET_DATA,
			payload: res
		});

		commit({
			type: SET_CURRENT,
			payload: {
				type: '',
				index: 0
			}
		})
	}
}

const getters = {

	/**
	 * 标题
	 */
	title(state) {
		return state.res.title
	},

	/**
	 * 总数据json
	 */
	res(state) {
		return state.res
	},

	/**
	 * 返回当前选中的单位
	 */
	current(state) {
		return state.current
	}
}

export default {
	state,
	mutations,
	actions,
	getters
};