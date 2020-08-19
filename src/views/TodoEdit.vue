<template>
	<div>
		<p v-if="!todo">No todo</p>
		<form @submit.prevent="onSubmit">
			<input type="text" v-model="newTitle" />
			<button type="submit">Update</button>
			<button @click="goToTodos()">Cancel</button>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'TodoEdit',
	data() {
		return {
			todo: {},
			newTitle: ''
		}
	},
	computed: {
		...mapGetters(['getTodoById'])
	},
	mounted() {
		this.todo = this.getTodoById(this.$route.params.id)
		this.newTitle = this.todo.title
	},
	methods: {
		...mapActions(['updateTodoInDb']),
		onSubmit() {
			if (this.newTitle.trim()) {
				const updatedTodo = {
					id: this.todo.id,
					title: this.newTitle.trim(),
					completed: this.todo.completed,
					createdAt: this.todo.createdAt
				}

				this.updateTodoInDb(updatedTodo)
			}
		},
		goToTodos() {
			this.$router.push('/todos')
		}
	}
}
</script>

<style lang="scss" scoped>
form {
	display: flex;
	width: 500px;

	input {
		width: 100%;
	}

	button {
		width: 100px;
	}
}
</style>
