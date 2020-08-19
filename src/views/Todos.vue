<template>
	<div>
		<p>{{ todosCount }}</p>
		<TodoAdd />
		<Selector :filter="todosFilter" :options="todosFilterOptions" @change-filter="changeFilter" />
		<Loader v-if="isLoading" />
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
			todosFilterOptions: ['all', 'completed', 'incompleted']
		}
	},
	computed: {
		...mapGetters(['getAllTodos', 'todosCount', 'isLoading']),
		filteredTodos() {
			if (this.todosFilter === 'all') {
				return this.getAllTodos
			}

			if (this.todosFilter === 'completed') {
				return this.getAllTodos.filter(todo => todo.completed)
			}

			if (this.todosFilter === 'incompleted') {
				return this.getAllTodos.filter(todo => !todo.completed)
			}
		}
	},
	mounted() {
		if (!this.getAllTodos.length) this.fetchTodos()
	},
	methods: {
		...mapActions(['fetchTodos']),
		changeFilter(filter) {
			this.todosFilter = filter
		}
	}
}
</script>
