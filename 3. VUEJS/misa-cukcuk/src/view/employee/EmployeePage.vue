<template lang="">
	<div id="container">
		<TheControl/>
		<div class="container__main">
			<BaseTable/>
			<BasePagination/>	
		</div>
	</div>
</template>
<script>
	import TheControl from '../../components/layout/TheControl.vue'
	import BaseTable from '../../components/base/BaseTable.vue'
	import BasePagination from '../../components/base/BasePagination.vue'

	export default {
		name: "TheContainer",
		components: {
			TheControl,
			BaseTable,
			BasePagination
		},
	};
</script>
<style scoped></style>
