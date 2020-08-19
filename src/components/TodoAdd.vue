<template>
	<form @submit.prevent="onSubmit">
		<input type="text" v-model="title" />
		<button type="submit">Add</button>
	</form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	data() {
		return {
			title: ''
		}
	},
	methods: {
		...mapActions(['createTodoInDb']),
		onSubmit() {
			if (this.title.trim()) {
				this.createTodoInDb(this.title.trim())
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
