<template>
	<div class="container">
		<router-view />
	</div>
</template>

<style lang="scss">
.container {
	max-width: 800px;
	margin: 0 auto;

	@media screen and (max-width: 900px) {
		margin: 0 50px;
	}
}
</style>
