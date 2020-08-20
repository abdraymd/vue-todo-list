<template>
	<select class="select" v-model="filterLocal" @change="$emit('change-filter', filterLocal)">
		<option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
	</select>
</template>

<script>
export default {
	data() {
		return {
			filterLocal: this.filter
		}
	},
	props: {
		filter: String,
		options: Array
	}
}
</script>

<style lang="scss" scoped>
.select {
	width: 200px;
	height: 40px;
	padding: 10px 15px;
	font-size: 1rem;
	border: 0.1rem solid #dedede;
	background: #fff;
	transition: all 0.2s ease-in;

	&:focus {
		outline: none;
		border: 0.1rem solid #639fff;
	}

	@media screen and (max-width: 600px) {
		width: 100%;
	}
}
</style>
