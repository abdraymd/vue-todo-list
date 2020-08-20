<template>
	<div>
		<div class="todos-header">
			<h3 class="header-3">Список действий</h3>
			<div class="todo-add">
				<TodoAdd />
			</div>
			<Selector :filter="todosFilter" :options="todosFilterOptions" @change-filter="changeFilter" />
		</div>
		<div class="loader" v-if="isLoading">
			<Loader />
		</div>
		<div v-else-if="allItems.length">
			<TodoList :todos="items" />
			<Paginate
				v-model="page"
				:page-count="pageCount"
				:click-handler="changePage"
				:prev-text="'&#x3c;'"
				:next-text="'&#x3e;'"
				:container-class="'pagination'"
			/>
		</div>
		<p v-else>Нет действий</p>
	</div>
</template>

<script>
import TodoAdd from '@/components/TodoAdd'
import TodoList from '@/components/TodoList'
import Selector from '@/components/Selector'
import Loader from '@/components/Loader'
import paginationMixin from '@/mixins/pagination.mixin'
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
			todosFilter: 'Все',
			todosFilterOptions: ['Все', 'Завершенные', 'Незавершенные']
		}
	},
	mixins: [paginationMixin],
	computed: {
		...mapGetters(['getAllTodos', 'isLoading'])
	},
	watch: {
		todosFilter: function() {
			if (this.todosFilter === 'Все') {
				this.paginateAllTodos()
			}

			if (this.todosFilter === 'Завершенные') {
				this.paginate(this.getAllTodos.filter(todo => todo.completed))
			}

			if (this.todosFilter === 'Незавершенные') {
				this.paginate(this.getAllTodos.filter(todo => !todo.completed))
			}
		},
		getAllTodos: function() {
			this.paginateAllTodos()
		}
	},
	mounted() {
		if (!this.getAllTodos.length) {
			this.fetchTodos().then(() => {
				this.paginateAllTodos()
				return
			})
		}

		this.paginateAllTodos()
	},
	methods: {
		...mapActions(['fetchTodos']),
		changeFilter(filter) {
			this.todosFilter = filter
		},
		paginateAllTodos() {
			this.paginate(this.getAllTodos)
		}
	}
}
</script>

<style lang="scss">
.todos-header {
	padding: 50px 0 20px 0;
}

.header-3 {
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 20px;
	text-align: center;
}

.todo-add {
	margin-bottom: 20px;
}

.loader {
	width: 40px;
	margin: 0 auto;
}

.pagination {
	background: #fff;
	display: flex;
	margin-bottom: 50px;

	li {
		display: block;
		height: 30px;
		width: 30px;
		padding-top: 5px;
		border-radius: 5px;
		background: #fff;
		color: #a1a1a1;
		font-size: 1rem;
		font-weight: 500;
		text-align: center;
		transition: all 0.2s ease-in;
		margin-right: 10px;

		&:last-child {
			margin-right: 0;
		}

		&:hover {
			background: #dedede;
		}

		a {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
}

.active {
	background: #639fff !important;
	color: #fff !important;
}

.disabled {
	pointer-events: none;
	background: #f2f2f2 !important;
}
</style>
