import App from './App.vue'
//请求组件
import { myRequest } from './utils/api.js'
Vue.prototype.$myRequest = myRequest
// 下拉框组件
import xflSelect from './components/xfl-select/xfl-select.vue';
Vue.component('xfl-select', xflSelect);

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
