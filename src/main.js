import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'
import '@/assets/scss/styles.scss'

Vue.config.productionTip = false

Vue.component('Paginate', Paginate)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
