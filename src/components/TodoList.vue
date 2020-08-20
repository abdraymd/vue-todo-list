<template>
	<div class="todo-list">
		<ul>
			<li>
				<TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" />
			</li>
		</ul>
	</div>
</template>

<script>
import TodoItem from '@/components/TodoItem'

export default {
	props: {
		todos: Array
	},
	components: {
		TodoItem
	}
}
</script>

<style lang="scss" scoped>
.todo-list {
	margin-bottom: 20px;
}
</style>
