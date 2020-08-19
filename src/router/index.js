import Vue from 'vue'
import VueRouter from 'vue-router'
import Todos from '../views/Todos.vue'
import TodoEdit from '../views/TodoEdit.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Todos
	},
	{
		path: '/todos',
		name: 'Todos',
		component: Todos
	},
	{
		path: '/todos/edit/:id',
		name: 'TodoEdit',
		component: TodoEdit
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
