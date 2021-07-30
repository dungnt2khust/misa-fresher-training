<template lang="">
	<div class="toast-message-list">
		<button
			@click="addToastMessage('error', 'Thêm mới thành công', 5000)"
			class="button"
		>
			add toast message
		</button>
		<div v-for="(item, index) in toastMessageList" :class="bindClass(item)" :key="index"  class="toast-message">
			<div class="toast-message__body">
				<div class="toast-message__icon">
					<i class="fas" :class="bindIcon(item)"></i>
				</div>
				<span class="toast-message__title"> {{item.content}}</span>
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
				// {
				// 	type: "success",
				// 	content: "Thêm mới thành công",
				// 	duration: 5000,
				// },
				// {
				// 	type: "error",
				// 	content: "Đã xảy ra lỗi",
				// 	duration: 5000,
				// },
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
		bindIcon(item) {
			var iconClasses = this.iconClasses;
			var iconClass;
			var returnClass = {};
			switch(item.type) {
				case 'success':
					iconClass = iconClasses[0];
					break;
				case 'error':
					iconClass = iconClasses[1];
					break;
				case 'warn':
					iconClass = iconClasses[2];
					break;
				case 'info':
					iconClass = iconClasses[3];
					break;
				default: 
					return '';
			}
			returnClass[iconClass] = true;
			return returnClass;
		},
		bindClass(item) {
			var type;
			var returnClass = {};
			switch(item.type) {
				case 'success':
					type = 'toast-message--success';
					break;
				case 'error':
					type = 'toast-message--error';
					break;
				case 'warn':
					type = 'toast-message--warn';
					break;
				case 'info':
					type = 'toast-message--info';
					break;
				default: 
					return '';
			}
			returnClass[type] = true;
			return returnClass;
		}
	},
	computed: {
		
	}
};
</script>
<style>
	@import url("../../css/common/toastMessage.css");
</style>
