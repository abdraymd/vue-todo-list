<template>
	<li>
		<div>
			<input type="checkbox" :checked="todo.completed" @change="todo.completed = !todo.completed" />
			<span :class="{ done: todo.completed }">{{ todo.title }}</span>
		</div>

		<button @click="deleteItem(todo.id)">&times;</button>
	</li>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	props: {
		todo: Object
	},
	methods: {
		...mapMutations(['deleteTodo']),
		deleteItem(todoId) {
			this.deleteTodo(todoId)
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
