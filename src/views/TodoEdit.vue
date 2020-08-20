<template>
	<div class="todos-header">
		<h3 class="header-3">Изменение действия</h3>
		<p v-if="!todo">Действие не существует</p>
		<form @submit.prevent="onSubmit" class="form" v-else>
			<div class="form-group">
				<input type="text" class="input-text" v-model="newTitle" />
				<button type="submit" class="btn-block btn-submit">Редактировать</button>
			</div>
			<button @click="goToTodos()" class="btn-block btn-cancel">Отменить</button>
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
.input-text {
	margin-right: 20px;

	@media screen and (max-width: 600px) {
		margin-right: 0;
		margin-bottom: 20px;
	}
}

.btn-cancel {
	margin-top: 15px;
}
</style>
