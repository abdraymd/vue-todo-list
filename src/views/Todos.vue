<template>
	<div>
		<p>{{ todosCount }}</p>
		<TodoAdd />
		<Selector :filter="todosFilter" :options="todosFilterOptions" @change-filter="changeFilter" />
		<Loader v-if="loading" />
		<TodoList v-else-if="filteredTodos.length" :todos="filteredTodos" />
		<p v-else>No todos</p>
	</div>
</template>

<script>
import TodoAdd from '@/components/TodoAdd'
import TodoList from '@/components/TodoList'
import Selector from '@/components/Selector'
import Loader from '@/components/Loader'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Todos',
	components: {
		TodoAdd,
		TodoList,
		Selector,
		Loader
	},
	data() {
		return {
			todosFilter: 'all',
			todosFilterOptions: ['all', 'completed', 'incompleted'],
			loading: true
		}
	},
	computed: {
		...mapGetters(['allTodos', 'todosCount']),
		filteredTodos() {
			if (this.todosFilter === 'all') {
				return this.allTodos
			}

			if (this.todosFilter === 'completed') {
				return this.allTodos.filter(todo => todo.completed)
			}

			if (this.todosFilter === 'incompleted') {
				return this.allTodos.filter(todo => !todo.completed)
			}
		}
	},
	async mounted() {
		this.fetchTodos()
		this.loading = false
	},
	methods: {
		...mapActions(['fetchTodos']),
		changeFilter(filter) {
			this.todosFilter = filter
		}
	}
}
</script>
