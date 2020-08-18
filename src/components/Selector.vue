<template>
	<select v-model="filterLocal" @change="$emit('change-filter', filterLocal)">
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
