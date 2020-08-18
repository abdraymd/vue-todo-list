<template>
	<form @submit.prevent="onSubmit">
		<input type="text" v-model="title" />
		<button type="submit">Add</button>
	</form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	data() {
		return {
			title: ''
		}
	},
	methods: {
		...mapMutations(['addTodo']),
		onSubmit() {
			if (this.title.trim()) {
				const newTodo = {
					id: Date.now(),
					title: this.title,
					completed: false
				}

				this.addTodo(newTodo)
				this.title = ''
			}
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
