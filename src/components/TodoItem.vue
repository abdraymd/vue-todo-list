<template>
	<li>
		<div>
			<input type="checkbox" :checked="todo.completed" @change="checkTodo(todo)" />
			<span :class="{ done: todo.completed }">{{ todo.title }}</span>
		</div>

		<div>
			<button @click="goToTodoEdit(todo.id)">&#9998;</button>
			<button @click="deleteTodo(todo.id)">&times;</button>
		</div>
	</li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	props: {
		todo: Object
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
li {
	width: 500px;
	border: 1px solid #ededed;
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	margin-bottom: 1rem;
}

.done {
	text-decoration: line-through;
}
</style>
