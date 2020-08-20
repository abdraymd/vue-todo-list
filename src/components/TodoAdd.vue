<template>
	<form @submit.prevent="onSubmit" class="form">
		<div class="form-group">
			<input type="text" class="input-text" v-model="title" placeholder="Новое действие..." />
			<button type="submit" class="btn-block btn-submit">Добавить</button>
		</div>
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
				this.createTodoInDb(this.title.trim()).then(() => {
					this.title = ''

					if (+this.$route.query.page !== 1) {
						this.$parent.changePage(1)
						this.$router.go()
					}
				})
			}
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
</style>
