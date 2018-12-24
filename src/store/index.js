import Vue from 'vue';
import Vuex from 'vuex';
import charts from './modules/demo'


Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		charts
	}
});
