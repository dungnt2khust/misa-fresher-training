<template lang="">
	<div class="toast-message-list">
		<button
			@click="addToastMessage('success', 'Thêm mới thành công', 5000)"
			class="button"
		>
			add toast message
		</button>
		<div v-for="(item, index) in toastMessageList" :key="index"  class="toast-message toast-message--error">
			<div class="toast-message__body">
				<div class="toast-message__icon">
					<i class="fas"></i>
				</div>
				<span class="toast-message__title">{{item.content}}</span>
			</div>
			<div class="toast-message__cancel">
				<i class="fas fa-times"></i>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "BaseToastMessage",
	data() {
		return {
			iconClasses: [
				"fa-check-circle",
				"fa-exclamation-triangle",
				"fa-exclamation-circle",
				"fa-info-circle",
			],
			toastMessageList: [
				{
					type: "success",
					content: "Thêm mới thành công",
					duration: 5000,
				},
			],
		};
	},
	methods: {
		addToastMessage(type, content, duration) {
			this.toastMessageList.push({
				type: type,
				content: content,
				duration: duration,
			});
		},
	},
};
</script>
<style>
	@import url("../../css/common/toastMessage.css");
</style>
