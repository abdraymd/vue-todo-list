<template>
	<div class="todo-item">
		<div class="todo-info">
			<input
				type="checkbox"
				class="input-checkbox"
				:checked="todo.completed"
				@change="checkTodo(todo)"
			/>
			<label :class="{ done: todo.completed }">{{ todo.title }}</label>
		</div>
		<div class="todo-actions">
			<button class="btn-icon btn-edit" @click="goToTodoEdit(todo.id)">&#9998;</button>
			<button class="btn-icon btn-delete" @click="deleteTodo(todo.id)">&#10006;</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	props: {
		todo: Object
	},
	computed: {
		...mapGetters(['getAllTodos'])
	},
	methods: {
		...mapActions(['deleteTodoFromDb', 'updateCompletedInDb']),
		deleteTodo(todoId) {
			this.deleteTodoFromDb(todoId)
		},
		checkTodo(todo) {
			this.updateCompletedInDb(todo)
		},
		goToTodoEdit(todoId) {
			this.$router.push(`/todos/edit/` + todoId)
		}
	}
}
</script>

<style lang="scss" scoped>
.todo-item {
	width: 100%;
	border: 0.1rem solid #ededed;
	border-bottom: none;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	padding: 10px 15px;

	&:last-child {
		border-bottom: 0.1rem solid #ededed;
	}
}

.todo-info {
	display: flex;
	align-items: baseline;
}

.input-checkbox {
	margin-right: 10px;
}

.done {
	text-decoration: line-through;
}

.todo-actions {
	display: flex;
	align-items: center;
	margin-left: 20px;

	button {
		margin-right: 15px;

		&:last-child {
			margin-right: 0;
		}
	}

	@media screen and (max-width: 380px) {
		flex-direction: column;

		button {
			margin-right: 0;
			margin-bottom: 10px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
